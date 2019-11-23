const mongoose = require('mongoose');
const schema = mongoose.Schema;

var soccerSchema = new schema({
    name: {
        type: String,
        requiered: true,
        unique: true
    },
    country: String,
    director: String,
    captain: String,
    league: {
        type: String,
        required: true
    },
    login_count: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('soccer',soccerSchema);