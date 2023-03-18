module.exports = {
    name: "hesap_olustur",
    usage: "/hesap_olustur <ad> <soyad> <cinsiyet> <burc> <yas> <plaka_kodu> <hakkinda>",
    options: [
        {
            name: "ad",
            description: "Adınızı giriniz.",
            type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 3,
            max: 24,
            required: true
        }, 
        {
            name: "soyad",
            description: "Soyadınızı giriniz.",
            type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 3,
            max: 24,
            required: true
        },
        {
            name: "cinsiyet",
            description: "Cinsiyetinizi giriniz.",
            type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            choices: [
                {
                    name: "Erkek",
                    value: "Erkek"
                },
                {
                    name: "Bayan",
                    value: "Bayan"
                }
            ],
            required: true
        },
        {
            name: "burc",
            description: "Burcunuzu giriniz.",
            type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            choices: [
                {
                    name: "Koç",
                    value: "Koç"
                },
                {
                    name: "Boğa",
                    value: "Boğa"
                },
                {
                    name: "İkizler",
                    value: "İkizler"
                },
                {
                    name: "Yengeç",
                    value: "Yengeç"
                },
                {
                    name: "Aslan",
                    value: "Aslan"
                },
                {
                    name: "Başak",
                    value: "Başak"
                },
                {
                    name: "Terazi",
                    value: "Terazi"
                },
                {
                    name: "Akrep",
                    value: "Akrep"
                },
                {
                    name: "Yay",
                    value: "Yay"
                },
                {
                    name: "Oğlak",
                    value: "Oğlak"
                },
                {
                    name: "Kova",
                    value: "Kova"
                },
                {
                    name: "Balık",
                    value: "Balık"
                },
            ],
            required: true
        },
        {
            name: "yas",
            description: "Yaşınızı giriniz.",
            type: 4, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 1,
            max: 2,
            required: true
        },
        {
            name: "plaka_kodu",
            description: "Plaka kodunuzu giriniz. (Örn: 1, 34, 6)",
            type: 4, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 1,
            max: 2,
            required: true
        },
        {
            name: "hakkinda",
            description: "Hakkında bilgilerinizi giriniz.",
            type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 24,
            max: 1024,
            required: true
        }
    ],
    category: "Bot",
    description: "Hesap oluşturur.",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true }).catch(console.error);
        let {
            ad,
            soyad,
            cinsiyet,
            yas,
            plaka_kodu,
            hakkinda,
            burc
        } = interaction.options.data.reduce((acc, cur) => {
            acc[cur.name] = cur.value;
            return acc;
        }, {});
        let user = await userModel.findOne({ userID: interaction.user.id });
        if (user) return system.replyError(interaction, "Zaten bir hesabınız var.");
        if (Number(yas) < 12 || Number(yas) > 99) return system.replyError(interaction, "Yaş 12 ile 99 arasında olmalıdır.");

        if (Number(plaka_kodu) < 1 || Number(plaka_kodu) > 81) return system.replyError(interaction, "Plaka kodu 1 ile 81 arasında olmalıdır. (Örn: 1, 34, 6)");
        let il = iller[plaka_kodu];
        if (!il) return system.replyError(interaction, "Plaka kodu 1 ile 81 arasında olmalıdır. (Örn: 1, 34, 6)");
        let newUser = new userModel({
            userID: interaction.user.id,
            name: ad,
            surname: soyad,
            age: Number(yas),
            plateCode: il,
            about: hakkinda,
            sex: cinsiyet,
            bushing: burc
        });
        await newUser.save().catch(console.error);

        if (Number(yas) < 13) {
            system.replySuccess(interaction, "Hesabınız oluşturuldu. Hoşgeldin! Yaşınız 13 den küçük olduğu için biz herhangi bir sorumluluk kabul etmiyoruz.");
        } else {
            system.replySuccess(interaction, "Hesabınız oluşturuldu. Hoşgeldin!");
        }
    }
}