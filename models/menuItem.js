const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    taste: { type: String, required: true },
    is_drink: { type: Boolean, required: true },
    ingredients: { type: [String], required: true },
    num_sales: { type: Number, required: true }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;