const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 8000;

require('dotenv').config();
// config() allow us to call enviroment variables right inside node app

app.use(cors());
// middleware: cors() allow us to access the server from different domain (cross-origin resource sharing)
app.use(express.json());
// middleware: express.json() allow us to pass JSON payloads from client to server
app.use(express.urlencoded());
// middleware: express.urlencoded() allow us to pass URL encoded payloads from client to server

//* ROUTES
app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/auth', authRoutes);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
