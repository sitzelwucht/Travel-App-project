const projectData = {
    data: []
  };

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const apiKeys = require('./APIkeys.js')

const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.static('dist'))
app.use(express.json());

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

app.get('/api', (req, res) => {
    res.send(apiKeys);
})

app.get('/data', (req, res) => {
    res.send(projectData);
})

app.post('/data', (req, res) => {
    projectData.data.push(req.body)
})


module.exports = app
