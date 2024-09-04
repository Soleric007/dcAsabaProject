const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const uri = 'mongodb+srv://chinazaokuefuna4:chinexsoleric007@dcasaba.tqr79.mongodb.net/?retryWrites=true&w=majority&appName=DCASABA'

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define a schema and model for the registration data
const registrationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    gender: String,
    address: String,
    areaCode: String,
    attending: Boolean,
});

const Registration = mongoose.model('Registration', registrationSchema);

// POST route to handle form submission
app.post('/register', async (req, res) => {
    try {
        const newRegistration = new Registration(req.body);
        await newRegistration.save(); // Save the document and wait for the promise to resolve
        return res.status(200).json({ message: 'Registration successful' });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to register', error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});