const glob = require('glob');

console.time('sync')
const path = __dirname + '/../../**/*';
const result = glob.sync(path)
console.timeEnd('sync')
console.log(result.length)

console.time('async');
const result2 = glob(path, function (err, result){
    console.log(result.length);
});
console.timeEnd('async')
console.log('still can do another stuff');