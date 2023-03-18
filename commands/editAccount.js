module.exports = {
    name: "bilgilerimi_duzenle",
    usage: "/bilgilerimi_duzenle <ad> <soyad> <cinsiyet> <burc> <yas> <plaka_kodu> <hakkinda>",
    options: [
        {
            name: "ad",
            description: "Adınızı giriniz.",
            type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 3,
            max: 24,
            required: false
        }, 
        {
            name: "soyad",
            description: "Soyadınızı giriniz.",
            type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 3,
            max: 24,
            required: false
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
            required: false
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
            required: false
        },
        {
            name: "yas",
            description: "Yaşınızı giriniz.",
            type: 4, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 1,
            max: 2,
            required: false
        },
        {
            name: "plaka_kodu",
            description: "Plaka kodunuzu giriniz. (Örn: 1, 34, 6)",
            type: 4, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 1,
            max: 2,
            required: false
        },
        {
            name: "hakkinda",
            description: "Hakkında bilgilerinizi giriniz.",
            type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
            min: 24,
            max: 1024,
            required: false
        }
    ],
    category: "Bot",
    description: "Bilgilerinizi düzenlersiniz.",
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
        if (!user) return system.replyError(interaction, "Hesabınız bulunamadı. Lütfen `/hesap_olustur` komutunu kullanın.");
        if (Number(yas) < 12 || Number(yas) > 99) return system.replyError(interaction, "Yaş 12 ile 99 arasında olmalıdır.");

        if (Number(plaka_kodu) < 1 || Number(plaka_kodu) > 81) return system.replyError(interaction, "Plaka kodu 1 ile 81 arasında olmalıdır. (Örn: 1, 34, 6)");

        user.name = ad || user.name;
        user.surname = soyad || user.surname;
        user.age = Number(yas) || user.age;
        user.plateCode = Number(plaka_kodu) || user.plateCode;
        user.about = hakkinda || user.about;
        user.sex = cinsiyet || user.sex;
        user.bushing = burc || user.bushing;
        user.save();

        system.replySuccess(interaction, "Hesap bilgileriniz düzenlendi.");
    }
}