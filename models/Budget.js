const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    budget: { type: Number, required: true },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^#[0-9A-Fa-f]{6}$/.test(v); // Regex for hex color
            },
            message: props => `${props.value} is not a valid hex color!`
        }
    }
}, { collection: 'Budget' }); // Explicitly setting the collection name

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
