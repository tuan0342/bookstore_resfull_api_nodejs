const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connect db successfully!!');
    } catch (error) {
        console.log('Connect db failure!!');
    }
}

module.exports = { connect };