Promise.all([
    family('father').catch(() => {}),
    family('mother'),
    family('wife')
]).then(() => {
    console.log('family all agree');
}).catch((err) => {
    console.log(err.name + ' not agree');
})

function family(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random() < 0.2){
                const error = new Error('disagree');
                error.name = name;
                reject(error);
            }else{
                resolve('agree');
            }
        }, Math.random() * 400);
    });
}

