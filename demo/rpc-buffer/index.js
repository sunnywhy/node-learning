const fs = require('fs');
const protobuf = require('protocol-buffers');

//according to the protocol, compile a js object, include encode/decode functions
//this operation can be done when starting the thread
//if do it in the http processing period, it may affect the performance
const schemas = protobuf(fs.readFileSync(`${__dirname}/test.proto`));
const buffer = schemas.Course.encode({
    id: 4,
    name: 'hh',
    lesson: []
});
console.log(buffer); // <Buffer 0d 00 00 80 40 12 02 68 68>

console.log(schemas.Course.decode(buffer)); // { id: 4, name: 'hh', lesson: [] }
