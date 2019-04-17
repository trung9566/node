const fs = require('fs');
const path = require ('path');
const jsonwebtoken = require('jsonwebtoken');
const data = 'hello node js';
const writingPath = path.resolve('../NODE03/bai2');
const { generatesSignature } = require ('./jwt-helper.js');

function myWriteFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile(writingPath + '/message.txt', data, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve('..'); 
        });
    });
};

//async function asyncWritingFile(){
//   try {
//        const returningData = await myWriteFile();
//   } catch(e) {
//        console.error(e);
//    }
//}

//asyncWritingFile();
async function generate(){
    try{
        const data = await generatesSignature();
        console.log(data);
    } catch(e) {
        console.log(e);
    }
}
generate();