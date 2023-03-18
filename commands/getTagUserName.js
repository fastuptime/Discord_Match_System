module.exports = {
  name: "isim_etiket",
  usage: "/isim_etiket <userid>",
  options: [
    {
      name: "userid",
      description: "Kullanıcı ID'sini giriniz.",
      type: 3, // Integer => 4 | String => 3 | Boolean => 5 | User => 6 | Channel => 7 | Role => 8
      required: true,
    }
  ],
  category: "Bot",
  description: "Kullanıcı ID'sini girerek kullanıcı adını ve etiketini alabilirsiniz. (Örnek: `User#0001`)",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(console.error);
    const myuser = await userModel.findOne({ userID: interaction.user.id });
    if(!myuser) return system.replyError(interaction, "Hesabınız bulunamadı. Lütfen `/hesap_olustur` komutunu kullanın.");
    let user = interaction.options.getString("userid");
    if(isNaN(user)) return system.replyError(interaction, "Kullanıcı ID'si geçersiz.");
    user = await userModel.findOne({ userID: user });
    if(!user) return system.replyError(interaction, "Kullanıcı bulunamadı.");
    user = await client.users.fetch(user.userID);
    system.replySuccess(interaction, `Kullanıcı: \`${user.username}#${user.discriminator}\``);
  },
};