const express = require('express');
const patient = express.Router();
const patientModel = require('./patientModel');
const authenticateToken = require('./auth');


patient.get('/', authenticateToken, async (req, res) => {
    try {
        const patients = await patientModel.find({ doctor: req.user.id });
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
});


patient.post('/', authenticateToken, async (req, res) => {
    const { name, disease, wardNumber, admittedOn } = req.body;
    try {
        const newPatient = new patientModel({ name, disease, wardNumber, admittedOn, doctor: req.user.id });
        await newPatient.save();
        res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add patient' });
    }
});


patient.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, disease, wardNumber, admittedOn } = req.body;
    try {
        const patient = await patientModel.findOneAndUpdate(
            { _id: id, doctor: req.user.id },
            { name, disease, wardNumber, admittedOn },
            { new: true }
        );
        if (!patient) return res.status(404).json({ error: 'Patient not found or not authorized' });
        res.status(200).json({ message: 'Patient updated successfully', patient });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update patient' });
    }
});


patient.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await patientModel.findOneAndDelete({ _id: id, doctor: req.user.id });
        if (!patient) return res.status(404).json({ error: 'Patient not found or not authorized' });
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete patient' });
    }
});

module.exports = patient;
