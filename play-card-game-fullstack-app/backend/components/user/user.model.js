const mongoose = require('mongoose');
const objUserSchema = {
    id: { // id by api
        type: String,
        default: ''
    },
    login: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false,
        default: '123456'
    },
    name: {
        type: String,
        default: ''
    },
    skills: {
        type: Array,
        default: []
    },
    spade: {
        type: Array,
        default: []
    },
    diamond: {
        type: Array,
        default: []
    },
    clubs: {
        type: Array,
        default: []
    },
    hearts: {
        type: Array,
        default: []
    },
    is_avatar1_same: {
        type: Boolean,
        default: false
    },
    avatar_url1: {
        type: String,
        default: ''
    },
    avatar_url2: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
};
module.exports = mongoose.model('user', objUserSchema);