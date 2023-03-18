module.exports = {
  name: "arkadas_oner",
  usage: "/arkadas_oner <oyun_kodu> <il_kodu> <cinsiyet>",
  options: [
    
    {
        name: "cinsiyet",
        description: "Cinsiyet giriniz. (Erkek/Bayan)",
        type: 3,
        required: true,
        choices: [
            {
                name: "Bayan",
                value: "bayan",
            },
            {
                name: "Erkek",
                value: "erkek",
            }
        ],
    },
    {
      name: "oyun_kodu",
      description: "Oyun kodunu giriniz. (/oyunlar komutu ile görebilirsiniz.)",
      type: 4,
      required: false,
    },
    {
      name: "il_kodu",
      description: "İl kodunu giriniz. (/iller komutu ile görebilirsiniz.)",
      type: 4,
      required: false,
    }
  ],
  category: "Bot",
  description: "Arkadaş önerir",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(console.error);
    let oyun_kodu = interaction.options.getInteger("oyun_kodu");
    let il_kodu = interaction.options.getInteger("il_kodu");
    let cinsiyet = interaction.options.getString("cinsiyet");

    if(il_kodu && iller[il_kodu] === undefined) return system.replyError(interaction, "Böyle bir il kodu bulunamadı.");
    if(oyun_kodu && oyunlar.find(o => o.id == oyun_kodu) === undefined) return system.replyError(interaction, "Böyle bir oyun kodu bulunamadı.");
    if(cinsiyet && cinsiyet !== "bayan" && cinsiyet !== "erkek") return system.replyError(interaction, "Cinsiyet değeri geçersiz. Lütfen `bayan` veya `erkek` giriniz.");

    let secenekler = [
        {
            enabled: oyun_kodu ? true : false, // Seçenek etkin mi? (true/false)
            name: "GamesCode", // Seçenek adı
            value: oyun_kodu, // Seçenek değeri
        },
        {
            enabled: il_kodu ? true : false, // Seçenek etkin mi? (true/false)
            name: "CityCode", // Seçenek adı
            value: iller[il_kodu], // Seçenek değeri
        },
        {
            enabled: cinsiyet ? true : false, // Seçenek etkin mi? (true/false)
            name: "Gender", // Seçenek adı
            value: cinsiyet, // Seçenek değeri
        }
    ];


    system.matchFirends(interaction, interaction.user.id, secenekler);
  },
};