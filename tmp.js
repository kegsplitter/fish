const fs = require('fs');

let l = fs.readdirSync(__dirname + '/samples/');

l = l.map(o => [o, ''])
console.log(l)
