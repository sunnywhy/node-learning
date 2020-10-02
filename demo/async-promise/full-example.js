/**
 *
 * 3 rounds of interviews, if all passed then ask family members option
 * if any round fail or any family member disagree, then interview failed
 */
interview(1)
    .then(() => {
        return interview(2);
    })
    .then(() => {
        return interview(3);
    })
    .then(() => {
        return Promise.all([
            family('father').catch(() => {/* ignore father's opinion */}),
            family('mother'),
            family('wife')
        ]).catch(e => {
            e.round = 'family';
            throw e;
        })
    })
    .then(() => {
        console.log('success');
    })
    .catch((err) => {
        console.log('cry at ' + err.round);
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

function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random() < 0.2) {
                const  error = new Error('failed');
                error.round = round;
                reject(error);
            }else{
                resolve('success');
            }
        }, 500);
    });
}