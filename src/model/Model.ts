/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
})

export const List = mongoose.model('List', listSchema)