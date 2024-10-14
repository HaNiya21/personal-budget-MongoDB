const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    budget: {  // Make sure this matches with what you're using in server.js
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-F]{6}$/i // Enforce 6-digit hex color
    }
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
