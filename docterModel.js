const moongoose = require('mongoose');

const docterSchema = new moongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const docterModel = moongoose.model('Docter', docterSchema);
module.exports = docterModel;
