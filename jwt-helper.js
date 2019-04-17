const jwt = require('jsonwebtoken');

function generatesSignature(callback) {
    return new Promise((resolve, reject) => {
        jwt.sign({
            id :123123,
            name: 'trung'
        },'this is the key', function(err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

module.exports = {
    generatesSignature: generatesSignature
}