const user = new mongoose.Schema({
    userID: String,
    name: String,
    surname: String,
    age: Number,
    plateCode: String,
    about: String,
    verified: { type: Boolean, default: false },
    ban: {
        status: { type: Boolean, default: false },
        reason: { type: String, default: "Belirtilmemiş" },
        createdAt: { type: String, default: moment().format("DD.MM.YYYY HH:mm:ss") },
    },
    sex: { type: String, default: "Belirtilmemiş" },
    bushing: { type: String, default: "Belirtilmemiş" },
    favorite_games: { type: Array, default: [] },
    blocked_users: { type: Array, default: [] },
    createdAt: { type: String, default: moment().format("DD.MM.YYYY HH:mm:ss") },
    updatedAt: { type: String, default: moment().format("DD.MM.YYYY HH:mm:ss") }
});

module.exports = mongoose.model('user', user);