module.exports = {
  name: "profil",
  usage: "/profil <kullanıcı> <goruntule>",
  options: [
    {
      name: "user",
      description: "Kullanıcıyı etiketleyiniz.",
      type: 6, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    },
    {
      name: "goruntule",
      description: "Profilde neyi görmek istediğinizi seçiniz.",
      type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      choices: [
        {
          name: "Bilgiler",
          value: "bilgiler",
        },
        {
          name: "Oyunadığı Oyunları",
          value: "oyunlar",
        }
      ],
      required: true,
    },
  ],
  category: "Bot",
  description: "Profilinizde ekli olan ama artık oynamadığınız oyunu kaldırırsınız.",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(console.error);
    const myuser = await userModel.findOne({ userID: interaction.user.id });
    if(!myuser) return system.replyError(interaction, "Hesabınız bulunamadı. Lütfen `/hesap_olustur` komutunu kullanın.");
    let user = interaction.options.getUser("user");
    user = await userModel.findOne({ userID: user.id });
    if(!user) return system.replyError(interaction, "Kullanıcı bulunamadı.");
    let goruntule = interaction.options.getString("goruntule"); 
    if(goruntule == "oyunlar") {
      let games = [];
      for(let key in user.favorite_games) {
        games.push(`${user.favorite_games[key].name}`);
      }
      if(games.length == 0) return system.replyError(interaction, "Bu kullanıcının sevdiği oyun bulunmuyor. Lütfen daha sonra tekrar deneyiniz.");
      interaction.editReply({ content: `Sevdiği oyunlar: ${games.join(", ")}`, ephemeral: true }).catch(console.error);
    } else if(goruntule == "bilgiler") {
      let embed = new EmbedBuilder()
        .setTitle(`${user.name} adlı kullanıcının profil bilgileri:`)
        .addFields(
          {
            name: "Ad",
            value: `${user.name}`,
          },
          {
            name: "Yaş",
            value: `${user.age}`,
          },
          {
            name: "Şehir",
            value: `${user.plateCode}`,
          },
          {
            name: "Burç",
            value: `${user.bushing}`,
          },
          {
            name: "Cinsiyet",
            value: `${user.sex}`,
          },
          {
            name: "Doğrulama",
            value: `${user.verified ? "Doğrulanmış" : "Doğrulanmamış"}`,
          },
          {
            name: "Kayıt Tarihi",
            value: `${user.createdAt}`,
          },
          {
            name: "Hakkında",
            value: `${user.about}`,
          }
        )
        .setColor(0x00ff00) // Green
      interaction.editReply({ embeds: [embed], ephemeral: true }).catch(console.error);
    } else {
      system.replyError(interaction, "Lütfen geçerli bir seçim yapınız.");
    }
  },
};