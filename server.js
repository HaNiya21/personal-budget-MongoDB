const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Add this line to import the path module
const Budget = require('./models/Budget'); // Adjust the path to your Budget model as necessary

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// Serve static files from the "public" directory
app.use("/", express.static("public"));

// MongoDB connection
const url = 'mongodb://127.0.0.1:27017/myDataB'; 
mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((connectionError) => {
        console.error("Error while connecting to the db", connectionError);
    });

// Route to serve the main index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to fetch budget data from MongoDB
app.get('/budget', async (req, res) => {
    try {
        const budgets = await Budget.find(); // Fetch all budget documents
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching budget data' });
    }
});

// Endpoint to add new budget data
app.post('/budget', async (req, res) => {
    const { title, budget, color } = req.body;

    // Check if all fields are provided
    if (!title || !budget || !color) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new budget document and save it to MongoDB
        const newBudget = new Budget({ title, budget, color });
        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (err) {
        res.status(500).json({ message: 'Error saving budget data' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
