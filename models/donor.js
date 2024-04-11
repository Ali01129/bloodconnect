const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        group: {
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true
        },
        phone1: {
            type: String,
            required: true
        },
        phone2: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;