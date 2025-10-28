const express = require('express');
const docter = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const docterModel = require('./docterModel');

docter.route('/signup').post(async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDocter = new docterModel({ name, email, password: hashedPassword });
    await newDocter.save();
    res.status(201).send('Docter signed up successfully');
});
docter.route('/signin').post(async (req, res) => {
    const { email, password } = req.body;
    const docter = await docterModel.findOne({ email });
    if (docter && await bcrypt.compare(password, docter.password)) {
        const token = jwt.sign({ id: docter._id, email: docter.email }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'Docter signed in successfully', token });
    } else {
        res.status(401).send('Invalid email or password');
    }
});
module.exports=docter;
