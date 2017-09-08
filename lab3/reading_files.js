const fs = require('fs');

fs.readFile("package.json","utf-8",(error,data) => {
    if(error) throw error;

    var asObject = JSON.parse(data);
    console.log(asObject);
    
});