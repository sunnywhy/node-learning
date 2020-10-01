/**
 * Promise state changing and use "then" to get content
 */
const promise = new Promise((resolve, reject) => {
    setTimeout(function (){
        resolve(3);
        //reject(new Error("4"));
    },500);
});

console.log(promise);

promise
    .then(function (result) {
        console.log(result);
    }).catch(function(err) {
        console.log(err.message);
    });

setTimeout(() => {
    console.log(promise);
}, 800);
