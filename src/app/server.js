require('dotenv').config();
const mongoose = require('mongoose');
const { google } = require('googleapis');
const { v4: uuidv4 } = require('uuid');
const { Timestamp } = require('mongodb');

const express = require('express');
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Failed to connect MongoDB:\n', err));

// Define Mongoose schemas and models
const participantSchema = new mongoose.Schema({
    name: String,
    calendarId: String,
    busyTimes: [{start: Timestamp, end: Timestamp}]
});

const Participant = mongoose.model('Participant', participantSchema);

const planSchema = new mongoose.Schema({
    id: String,
    participants: [participantSchema],
});

const Plan = mongoose.model('Plan', planSchema);

// API

// Create a new meetup plan
app.post('/create-plan', async (res) => {
    const uniqueId = uuidv4();
    const newPlan = new Plan({ uniqueId, participants: [] });
    await newPlan.save();
    console.log(newPlan);
    // Pass the response with the unique id
    res.send({ success: true, id: newPlan.id });
});

// Join a meetup plan
app.post('/join-plan', async (req, res) => {
    // Request should have the plan's unique id and participant name
    const { id, name } = req.body;
    const plan = await Plan.findOne({ id });
    // Respond with whether successful or not
    if (plan) {
        plan.participants.push({ name });
        await plan.save();
        res.json({ success: true});
    } else {
        res.status(404).json({ success: false, message: 'Meetup plan not found' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
