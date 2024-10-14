const express = require('express');
const mongoose = require('mongoose');
const Budget = require('./models/Budget'); // Adjust the path as necessary
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal_budget' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Endpoint to fetch budget data
app.get('/budget', async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json({ myBudget: budgets });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to add new budget entries
app.post('/budget', async (req, res) => {
    const { title, budget, color } = req.body;
    const newBudget = new Budget({ title, budget, color });
    try {
        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
