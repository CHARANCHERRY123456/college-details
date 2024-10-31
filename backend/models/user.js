// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ID: { type: String, required: false },
    NAME: { type: String, required: false },
    GENDER: { type: String, required: false },
    "CET HT NO.": { type: String, required: false },
    STREAM: { type: String, required: false },
    "CLASS(P1)": { type: String, required: false },
    CASTE: { type: String, required: false },
    "CLASS(P2)": { type: String, required: false },
    DOB: { type: String, required: false },
    FATHER: { type: String, required: false },
    MANDAL: { type: String, required: false },
    DISTRICT: { type: String, required: false },
    SCHOOL: { type: String, required: false },
    PHONE2: { type: String, required: false },
    SSC: { type: Number, required: false },
    "SSC BOARD": { type: String, required: false },
    PHONE: { type: String, required: false },
    MOTHER: { type: String, required: false },
    "BLOOD GROUP": { type: String, required: false },
    PARENT: { type: String, required: false },
    ADDRESS: { type: String, required: false },
    E1SEM1: { type: Number, required: false },
    E1SEM2: { type: Number, required: false },
    E2SEM1: { type: Number, required: false },
    E2SEM2: { type: Number, required: false },
    BRANCH: { type: String, required: false },
    CGPA: { type: Number, required: false },
    IMAGE: { type: String, required: false }, 
    RANK: { type: Number, required: false },
    EMAIL: { type: String, required: false },
    SECTION: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);

