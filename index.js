const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const message = require('./routes/message')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 8080;

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/message', message);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});//connect server to index page of angular

app.listen(port, () => {
    console.log('listenting to port ' + port);
});