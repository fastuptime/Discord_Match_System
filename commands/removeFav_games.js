module.exports = {
  name: "artık_oynamıyorum",
  usage: "/artık_oynamıyorum",
  options: [
    {
      name: "fps",
      description: "FPS oyunları",
      type: 3,
      required: false,
      choices: [
        {
          name: "VALORANT",
          value: "VALORANT",
        },
        {
          name: "Counter-Strike: Global Offensive",
          value: "Counter-Strike: Global Offensive",
        },
        {
            name: "Call of Juarez: Gunslinger",
            value: "Call of Juarez: Gunslinger",
        },
        {
            name: "DOOM Eternal",
            value: "DOOM Eternal",
        },
        {
            name: "Wolfenstein: The New Order",
            value: "Wolfenstein: The New Order",
        },
        {
            name: "Deathloop",
            value: "Deathloop",
        },
        {
            name: "Call of Duty Modern Warfare 2",
            value: "Call of Duty Modern Warfare 2",
        },
        {
            name: "Destiny 2",
            value: "Destiny 2",
        },
        {
            name: "DOOM",
            value: "DOOM",
        },
        {
            name: "PUBG Mobile",
            value: "PUBG Mobile",
        },
        {
            name: "Apex Legends Mobile",
            value: "Apex Legends Mobile",
        },
        {
            name: "Call of Duty Mobile",
            value: "Call of Duty Mobile",
        },
        {
            name: "Standoff 2",
            value: "Standoff 2",
        },
        {
            name: "Modern Combat 5: mobile FPS",
            value: "Modern Combat 5: mobile FPS",
        },
        {
            name: "Shadowgun Legends",
            value: "Shadowgun Legends",
        },
      ],
    },
    {
      name: "moba",
      description: "MOBA oyunları",
      type: 3,
      required: false,
      choices: [
          {
              name: "League of Legends",
              value: "League of Legends",
          },
          {
              name: "Dota 2",
              value: "Dota 2",
          },
          {
              name: "Smite",
              value: "Smite",
          },
          {
              name: "Battlerite",
              value: "Battlerite",
          },
          {
              name: "Paladins",
              value: "Paladins",
          },
          {
              name: "AirMech",
              value: "AirMech",
          },
          {
              name: "Awesomenauts",
              value: "Awesomenauts",
          },
          {
              name: "Heroes of the Storm",
              value: "Heroes of the Storm",
          },
          {
              name: "Wild Rift",
              value: "Wild Rift",
          },
          {
              name: "Mobile Legends",
              value: "Mobile Legends",
          },
          {
              name: "Onmyoji Arena",
              value: "Onmyoji Arena",
          },
          {
              name: "Legendary Heroes",
              value: "Legendary Heroes",
          },
          {
              name: "Heroes Arena",
              value: "Heroes Arena",
          },
          {
              name: "Planet of Heroes",
              value: "Planet of Heroes",
          },
          {
              name: "Mobile Legends: Adventure",
              value: "Mobile Legends: Adventure",
          },
          {
              name: "Heroes of Order & Chaos",
              value: "Heroes of Order & Chaos",
          },
          {
              name: "Vainglory",
              value: "Vainglory",
          },
          {
              name: "Legend of Ace",
              value: "Legend of Ace",
          },
          {
              name: "Arena of Valor: 5v5 Arena Oyunu",
              value: "Arena of Valor: 5v5 Arena Oyunu",
          }
      ],
    },
    {
      name: "mmorpg",
      description: "MMORPG oyunları",
      type: 3,
      required: false,
      choices: [
          {
              name: 'Rise Online',
              value: 'Rise Online',
          },
          {
              name: 'Knight Online',
              value: 'Knight Online',
          },
          {
              name: 'Metin 2',
              value: 'Metin 2',
          },
          {
              name: 'Silkroad',
              value: 'Silkroad',
          },
          {
              name: 'World of Warcraft',
              value: 'World of Warcraft',
          },
          {
              name: 'Guild Wars 2',
              value: 'Guild Wars 2',
          },
          {
              name: 'Skyforge',
              value: 'Skyforge',
          },
          {
              name: 'Trove',
              value: 'Trove',
          },
          {
              name: 'Neverwinter',
              value: 'Neverwinter',
          },
          {
              name: 'Eve Online',
              value: 'Eve Online',
          },
          {
              name: 'Blade & Soul',
              value: 'Blade & Soul',
          },
          {
              name: 'Lord of the Rings Online',
              value: 'Lord of the Rings Online',
          },
          {
              name: 'Black Desert Online',
              value: 'Black Desert Online',
          },
          {
              name: 'Tera',
              value: 'Tera',
          },
          {
              name: 'World of Warcraft',
              value: 'World of Warcraft',
          },
          {
              name: 'Star Wars the Old Republic',
              value: 'Star Wars the Old Republic',
          },
          {
              name: 'Albion',
              value: 'Albion',
          },
      ]
    },
  ],
  category: "Bot",
  description: "Profilinizde ekli olan ama artık oynamadığınız oyunu kaldırırsınız.",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(console.error);
    let fps = interaction.options.getString("fps");
    let moba = interaction.options.getString("moba");
    let mmorpg = interaction.options.getString("mmorpg");
    if (!fps && !moba && !mmorpg) {
      return interaction.followUp({
        content: "Lütfen bir oyun seçiniz.",
      });
    }
    if (fps && moba && mmorpg) {
      return interaction.followUp({
        content: "Lütfen sadece bir oyun seçiniz.",
      });
    }
    if (fps && moba) {
      return interaction.followUp({
        content: "Lütfen sadece bir oyun seçiniz.",
      });
    }
    if (fps && mmorpg) {
      return interaction.followUp({
        content: "Lütfen sadece bir oyun seçiniz.",
      });
    }
    if (moba && mmorpg) {
      return interaction.followUp({
        content: "Lütfen sadece bir oyun seçiniz.",
      });
    }
    let oyun = fps || moba || mmorpg;
    let user = await userModel.findOne({ userID: interaction.user.id });
    if (!user) return system.replyError(interaction, "Hesabınız bulunamadı.");
    let check = user.favorite_games.find((x) => x.name === oyun);
    if(!check) return system.replyError(interaction, `${oyun} oyunu favorilerinizde bulunmuyor.`);
    user.favorite_games = user.favorite_games.filter((x) => x.name !== oyun);
    user.save();
    return system.replySuccess(interaction, `${oyun} oyunu favorilerinizden kaldırıldı.`);
  },
};