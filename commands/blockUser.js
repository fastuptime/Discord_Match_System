module.exports = {
  name: "engelle",
  usage: "/engelle <user> <sebep>",
  options: [
    {
      name: "user",
      description: "Kullanıcı seçiniz.",
      type: 6, // STRING = 3, INTEGER = 4, BOOLEAN = 5, USER = 6, CHANNEL = 7, ROLE = 8
      required: true,
    },
    {
      name: "sebep",
      description: "Sebep giriniz.",
      type: 3, // STRING = 3, INTEGER = 4, BOOLEAN = 5, USER = 6, CHANNEL = 7, ROLE = 8
      required: true,
    },
  ],
  category: "Bot",
  description: "Kullanıcıyı engeller.",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(console.error);
    let username = interaction.options.getUser("user");
    let sebep = interaction.options.getString("sebep");
    const userBu = await userModel.findOne({ userID: username.id });

    if(!userBu) return system.replyError(interaction, "Kullanıcı bulunamadı.");
    const engellemekIsteyen = await userModel.findOne({ userID: interaction.user.id });
    if(!engellemekIsteyen) return system.replyError(interaction, "Kullanıcı bulunamadı.");
    if(engellemekIsteyen.username == username) return system.replyError(interaction, "Kendini engelleyemezsin.");

    if(engellemekIsteyen.blocked_users.find(x => x.userID == userBu.userID)) return system.replyError(interaction, "Kullanıcı zaten engellenmiş.");

    engellemekIsteyen.blocked_users.push({
      userID: userBu.userID,
      reason: sebep,
      date: moment().format("DD/MM/YYYY HH:mm:ss"),
    });
    engellemekIsteyen.save();
    
    system.replySuccess(interaction, `${userBu.name}, engellendi.`);
  },
};