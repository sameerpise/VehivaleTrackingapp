const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/vehical', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the location data
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: String,
});

const Location = mongoose.model('Loc', locationSchema);
app.get("/",function(req,res){
   res.send("wellcome")
})
// Define a route to fetch the location data
app.get('/api/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations' });
  }
});

app.listen(6000)
