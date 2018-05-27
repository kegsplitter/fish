const express = require('express');
const app = express();
const port = 9876;


app.get('/', (request, response)=> {
	response.sendFile(__dirname + '/other/index.html')
});

app.use('/other', express.static(__dirname + '/other/'));
app.use('/fish', express.static(__dirname + '/fish/'));
app.use('/audioWorklet', express.static(__dirname + '/audioWorklet/'));
app.use('/samples', express.static(__dirname + '/samples/'));
app.listen(port, () => console.log(`FISH on port ${port}`));