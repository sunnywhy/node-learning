//3 round of interviews
interview(function (err, res){
    if(err) {
        console.log('cry at round 1');
        return;
    }
    interview(function (err, res){
        if(err) {
            console.log('cry at round 2');
            return;
        }
        interview(function (err, res){
            if(err){
                console.log('cry at round 3');
                return;
            }
            console.log('smile');
        })
    })
})


function interview(callback) {
    setTimeout(() => {
        if(Math.random() > 0.3) {
            callback(null, 'success');
        }else{
            callback(new Error('fail'));
        }
    }, 500);
}