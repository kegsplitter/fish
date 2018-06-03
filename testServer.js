const express = require('express');
const app = express();
const port = 9877;

app.get('/', (request, response)=> response.sendFile(__dirname + '/other/testIndex.html'));
app.get('/mocha.js', (r, r2) => r2.sendFile(__dirname + '/node_modules/mocha/mocha.js'));
app.get('/mocha.css', (r, r2) => r2.sendFile(__dirname + '/node_modules/mocha/mocha.css'));
app.use('/tests/', express.static(__dirname + '/tests'));
app.use('/other/', express.static(__dirname + '/other/'));
app.use(express.static(__dirname + '/fish/'));

app.listen(port, ()=> console.log(`Test server listening on ${port}`));
