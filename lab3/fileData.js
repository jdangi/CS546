const fs = require('fs');


exports.getFileAsString = function(path) {
    if (!path || typeof path !== 'string') {
        console.log('no path is provided')
    }
    else {
        fs.readFile(path,"utf-8",(error,data) => {
            return new Promise((fulfill, reject) => {
                    if (error) reject("Something was error");
                    var asObject = data;
                    console.log(asObject);
                });
        });
    }
}

exports.getFileAsJSON = function(path) {
    if (!path || typeof path !== 'string') {
        console.log('no path is provided')
    }
    else {
        fs.readFile(path,"utf-8",(error,data) => {
            return new Promise((fulfill, reject) => {
                    if (error) reject("Something was error");
                    var asObject = JSON.parse(data);
                    console.log(asObject);
                });
        });
    }
}

exports.saveStringToFile = function(path,text) {
    return new Promise((fulfill, reject) => {
                if(!path||!text) reject("no path or text is provided");
                fs.writeFile(path, text,  function(err) {
                    if (err) reject(`Some error, can't save the file. Error: ${err}`);
                    console.log(`save string to ${path} successfully!`);
    });
});
}

exports.saveJSONToFile = function(path,obj) {
    return new Promise((fulfill, reject) => {
                if(!path||!obj) reject("no path or text is provided");
                fs.writeFile(path,JSON.stringify(obj,null,4),  function(err) {
                    if (err) reject(`Some error, can't save the file. Error: ${err}`);
                    fulfill(console.log(`save JSON to ${path} successfully!`));
    });
            });

}