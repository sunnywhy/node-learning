interview(function (err, res) {
    if(err) {
        console.log('cry');
        return;
    }
    console.log('smile');
});

function interview(callback) {
    setTimeout(() => {
        if(Math.random() > 0.2) {
            callback(null, 'success');
        }else {
            //throw new Error('fail') // this error cannot "try..catch..", since it's on the bottom of the calling stack
            callback(new Error('fail'))
        }
    });
}