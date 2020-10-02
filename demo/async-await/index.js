(async function (){
    await findJob();
    console.log('trip');
})();

async function findJob() {
    try{
        await interview(1);
        await interview(2);
        await interview(3);
        try{
            await Promise.all([
                family('father').catch(()=>{/* ignore what father said */}),
                family('mother'),
                family('wife')
            ])
        }catch (e){
            e.round = 'family';
            throw e;
        }
        console.log('smile');
    }catch (e){
        console.log('cry at round ' + e.round);
    }
}

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