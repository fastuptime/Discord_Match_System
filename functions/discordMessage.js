function replyError(interaction, message) {
    const embed = new EmbedBuilder()
    .setTitle(`${message}`)
    .setColor(0xff0000) // Red

    interaction.editReply({ embeds: [embed], ephemeral: true }).catch(console.error);
}

function replySuccess(interaction, message) {
    const embed = new EmbedBuilder()
    .setTitle(`${message}`)
    .setColor(0x00ff00) // Green

    interaction.editReply({ embeds: [embed], ephemeral: true }).catch(console.error);
}

module.exports.replySuccess = replySuccess;
module.exports.replyError = replyError;