module.exports = {
  name: "oyunlar",
  usage: "/oyunlar",
  category: "Bot",
  description: "Tüm oyunları gösterir.",
  run: async (client, interaction) => {
    let games = [];
    //----------------------- MMORPG -----------------------//
    for(let key in oyunlar) {
      games.push(`${oyunlar[key].id} - ${oyunlar[key].name} - ${oyunlar[key].type}`);
    }
    interaction.reply({ content: `${games.join("\n")}`, ephemeral: true }).catch(console.error);
  },
};