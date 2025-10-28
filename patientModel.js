const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    disease: String,
    wardNumber: Number,
    admittedOn: Date,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
});

const patientModel = mongoose.model('Patient', patientSchema);
module.exports = patientModel;
File: app.js