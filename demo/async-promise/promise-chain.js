/**
 * Promise calling chain
 */
interview(1)
    .then(() => {
        return interview(2);
    })
    .then(() => {
        return interview(3);
    })
    .then(() => {
        if(Math.random() > 0.1) {
            const error = new Error('keyboard');
            error.round = 'keyboard';
            throw error;
        }else{
            console.log('smile');
        }
    })
    .catch((err) => {
        console.log('cry at round: ' + err.round);
    });

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