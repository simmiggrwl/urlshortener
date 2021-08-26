const mongoose = require('mongoose')
const shortId= require('shortid')

const shortUrlSchema= new mongoose.Schema({
    full: {
        type:String,
        required:true
    },
    short: {
        type:String,
        required: true,
        default: shortId.generate,
        unique: true
    },
    asiaclicks: {
        type: Number,
        required: true,
        default:0
    },
    europeclicks: {
        type: Number,
        required: true,
        default:0
    },
    africaclicks: {
        type: Number,
        required: true,
        default:0
    },
    northamericaclicks: {
        type: Number,
        required: true,
        default:0
    },
    southamericaclicks: {
        type: Number,
        required: true,
        default:0
    },
    australiaclicks: {
        type: Number,
        required: true,
        default:0
    },
    antarcticaclicks: {
        type: Number,
        required: true,
        default:0
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '262801m' },
    },
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)