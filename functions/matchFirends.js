global.wiodb = require("old-wio.db");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function checkUserLimit(interaction, userID) {
    let wiodbUser = wiodb.fetch(`wiodb_${userID}`);
    if(!wiodbUser) {
        wiodb.set(`wiodb_${userID}`, { user: userID, eslesme_sayisi: 0 });
    }

    if(wiodbUser?.eslesme_sayisi >= config.dayMatchLimit)  system.replyError(interaction, "Günlük öneri limitinize ulaştınız. Lütfen yarın tekrar deneyiniz.");
    if(wiodbUser?.eslesme_sayisi >= config.dayMatchLimit) return true;
}

async function addUserLimit(interaction, userID) {
    let wiodbUser = wiodb.fetch(`wiodb_${userID}`);
    if(!wiodbUser) {
        wiodb.set(`wiodb_${userID}`, { user: userID, eslesme_sayisi: 0 });
        wiodbUser = wiodb.fetch(`wiodb_${userID}`);
    }

    wiodb.set(`wiodb_${userID}`, { user: userID, eslesme_sayisi: wiodbUser.eslesme_sayisi + 1 });
}

async function match(interaction, userID, secenekler) {
    let userHesap = await userModel.findOne({ userID: userID });
    if(!userHesap) return system.replyError(interaction, "Mevcut bir hesabınız yok.");

    if(await checkUserLimit(interaction, userID)) return;

    let bulunan_sonuclar;
    let eslestir = await userModel.find({ sex: secenekler[2].value % 2 == 0 ? "Bayan" : "Erkek" });
    let oyunun_adi = oyunlar.find(x => x.id == secenekler[0].value)?.name;

    if(secenekler[0].enabled && secenekler[1].enabled) {
        bulunan_sonuclar = eslestir.filter(x => x.favorite_games.find(y => y.name == oyunun_adi && x.plateCode == secenekler[1].value));
    } else if(secenekler[0].enabled) {
        bulunan_sonuclar = eslestir.filter(x => x.favorite_games.find(y => y.name == oyunun_adi));
    } else if(secenekler[1].enabled) {
        bulunan_sonuclar = eslestir.filter(x => x.plateCode == secenekler[1].value);
    } else {
        bulunan_sonuclar = eslestir;
    }

    if(bulunan_sonuclar.length == 0) return system.replyError(interaction, "Eşleşme Bulunamadı.");

    bulunan_sonuclar = bulunan_sonuclar.filter(x => x.userID != userHesap.userID);
    bulunan_sonuclar = bulunan_sonuclar.filter(x => !userHesap.blocked_users.find(y => y.userID == x.userID));

    if(bulunan_sonuclar.length == 0) return system.replyError(interaction, "Eşleşme Bulunamadı.");

    let embed_bulunan_eslesme = new EmbedBuilder()
    .setTitle(`${config.name} - Bulunan Eşleşmeler`)
    .setColor(0x00ff00) // Green
    bulunan_sonuclar = shuffle(bulunan_sonuclar);
    bulunan_sonuclar = bulunan_sonuclar.slice(0, 3);
    bulunan_sonuclar.forEach((x, i) => {
        embed_bulunan_eslesme.addFields(
            {
                name: `Eşleşme ${i + 1}`,
                value: `**Adı:** ${x.name}\n**Sevdiği Oyunlar:** ${x.favorite_games.map(x => x.name).join(", ")}\n**Şehir:** ${x.plateCode}\n**Cinsiyeti:** ${x.sex}\n**Yaşı:** ${x.age}\n**ID:** ${x.userID}`
            }
        );
    });

    await addUserLimit(interaction, userID);

    interaction.editReply({ embeds: [embed_bulunan_eslesme] });
}

module.exports = match;