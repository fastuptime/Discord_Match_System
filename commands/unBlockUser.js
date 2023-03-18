module.exports = {
  name: "engelle_kaldir",
  usage: "/engelle_kaldir <user>",
  options: [
    {
      name: "user",
      description: "Kullanıcı seçiniz.",
      type: 6, // STRING = 3, INTEGER = 4, BOOLEAN = 5, USER = 6, CHANNEL = 7, ROLE = 8
      required: true,
    }
  ],
  category: "Bot",
  description: "Kullanıcının engelini kaldırır.",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(console.error);
    let username = interaction.options.getUser("user");
    const userBu = await userModel.findOne({ userID: username.id });

    if(!userBu) return system.replyError(interaction, "Kullanıcı bulunamadı.");
    const engellemekIsteyen = await userModel.findOne({ userID: interaction.user.id });
    if(!engellemekIsteyen) return system.replyError(interaction, "Kullanıcı bulunamadı.");
    if(engellemekIsteyen.username == username) return system.replyError(interaction, "Kendini engelleyemezsin veya engelini kaldıramazsın.");

    if(!engellemekIsteyen.blocked_users.find(x => x.userID == userBu.userID)) return system.replyError(interaction, "Kullanıcı zaten engellenmemiş.");

    engellemekIsteyen.blocked_users = engellemekIsteyen.blocked_users.filter(x => x.userID != userBu.userID);
    engellemekIsteyen.save();
    
    system.replySuccess(interaction, `${userBu.name}, engeli kaldırıldı.`);
  },
};