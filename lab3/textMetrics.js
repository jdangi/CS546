const fs = require('fs');
function createMetrics(text) {
    if (!text || typeof text !== 'string') {
        console.log('no text is provided')
    }
    else {
        console.log(totalSentences(text));

        console.log(`totalLetters: ${clearString(text).length},`);
        findWords(text);
    }
}

function clearString(s){ 
    var pattern = new RegExp("[`':;',‘”“'.!? ]") 
    var rs = ""; 
    for (var i = 0; i < s.length; i++) { 
        rs = rs+s.substr(i, 1).replace(pattern,''); 
    } 
    return rs;  
}

function findWords(s){ 
    var pattern = new RegExp("[`':;',‘”“'.!?]") 
    var rs = ""; 
    for (var i = 0; i < s.length; i++) { 
        rs = rs+s.substr(i, 1).replace(pattern,''); 
    } 
    rs = rs.toLowerCase();
    var str = rs.split(' ');
    var numOfWords = new Map();
    for(var i =0;i<str.length;i++){
        numOfWords.set(str[i],0);
    }

    var uniqueWords = 0;
    var longWords = 0;
    var totalLength = 0;
    for(var i =0;i<str.length;i++){
        numOfWords.set(str[i],numOfWords.get(str[i])+1);
        if(numOfWords.get(str[i])<=1){
            uniqueWords++;
            totalLength += str[i].length;
            if(str[i].length>=6){
                longWords++;
            }

            
        }
    }

    console.log(`totalWords: ${str.length},`);
    console.log(`uniqueWords: ${uniqueWords},`);
    console.log(`longWords: ${longWords},`);
    console.log(`averageWordLength: ${totalLength/uniqueWords},`);
    console.log(`textComplexity: ${uniqueWords/totalSentences(s) + (longWords)*100/uniqueWords}`);
    console.log(`wordOccurrences:`);
    console.log(numOfWords);
    console.log(`}`);



    return str;  
}


exports.readFile = function(path) {
    fs.readFile(path,"utf-8",(error,data) => {
        return new Promise((fulfill, reject) => {
                if (error) reject("Something was error");
                var asObject = data;
                createMetrics(asObject);
            });
        // console.log("hahaha");
    });
}

function totalSentences(s){
    var regexp = /[^\.!\?]+[\.!\?]+/g; // add punctuation here
    sentences = s.match(regexp);
    return sentences.length;
}
