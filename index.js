const {
    Discord,
    Client,
    Intents,
    GatewayIntentBits ,
} = require('discord.js');
global.client = new Client({
    intents: [
        1 << 0,
	],
});
global.EmbedBuilder = require("discord.js").EmbedBuilder;
global.config = require('./config.js');
global.system = require('./functions/exports.js').system;
global.moment = require('moment');
global.mongoose = require('mongoose');
global.fs = require('fs');
global.oyunlar = require('./games.json');
global.iller = require('./cities.json');
////////////////////////
mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    system.log(`MongoDB'ye bağlanıldı!`, 'success');
}).catch((err) => {
    system.log(`MongoDB bağlantısı başarısız!`, 'error');
    process.exit(0);
});

global.userModel = require('./model/user.js');
////////////////////////

require('./functions/loadCommands.js')(client);

client.on('ready', () => {
    system.log(`Discord'a giriş yapıldı! (${client.user.tag})`, 'success');
});

client.login(config.token).catch((err) => {
    system.log(`Token geçersiz!`, 'error');
    process.exit(0);
});

if(config.fake_user) {
    const {faker} = require('@faker-js/faker');
    faker.locale = "tr";

    for (let i = 0; i < 100; i++) {
        let sayi = Math.floor(Math.random() * 10);
        let oyunlarx = [
        "Counter-Strike: Global Offensive",
        "League of Legends",
        "Fortnite",
        "Minecraft",
        "Grand Theft Auto V",
        "Apex Legends",
        "Call of Duty: Modern Warfare",
        "VALORANT",
        "Overwatch",
        "Dota 2",
        "PLAYERUNKNOWN'S BATTLEGROUNDS",
        "Tom Clancy's Rainbow Six Siege",
        "World of Warcraft",
        "Rocket League"
    ];
        if (sayi % 2 == 0) {
            //Erkek
            new userModel({
                userID: Math.floor(Math.random() * 100000000000000000),
                name: faker.name.firstName("male"),
                surname: faker.name.lastName(),
                age: Math.floor(Math.random() * 100),
                plateCode: iller[Math.floor(Math.random() * 81) + 1],
                about: faker.lorem.paragraph(),
                sex: "Erkek",
                favorite_games: [
                    {
                        name: oyunlarx[Math.floor(Math.random() * oyunlarx.length)],
                        date: moment().format("DD.MM.YYYY HH:mm:ss")
                    },
                    {
                        name: oyunlarx[Math.floor(Math.random() * oyunlarx.length)],
                        date: moment().format("DD.MM.YYYY HH:mm:ss")
                    },
                    {
                        name: oyunlarx[Math.floor(Math.random() * oyunlarx.length)],
                        date: moment().format("DD.MM.YYYY HH:mm:ss")
                    }
                ]
            }).save()
        } else {
            new userModel({
                userID: Math.floor(Math.random() * 100000000000000000),
                name: faker.name.firstName("female"),
                surname: faker.name.lastName(),
                age: Math.floor(Math.random() * 100),
                plateCode: iller[Math.floor(Math.random() * 81) + 1],
                about: faker.lorem.paragraph(),
                sex: "Erkek",
                favorite_games: [
                    {
                        name: oyunlarx[Math.floor(Math.random() * oyunlarx.length)],
                        date: moment().format("DD.MM.YYYY HH:mm:ss")
                    },
                    {
                        name: oyunlarx[Math.floor(Math.random() * oyunlarx.length)],
                        date: moment().format("DD.MM.YYYY HH:mm:ss")
                    },
                    {
                        name: oyunlarx[Math.floor(Math.random() * oyunlarx.length)],
                        date: moment().format("DD.MM.YYYY HH:mm:ss")
                    }
                ]
            }).save()
        }
    }
}