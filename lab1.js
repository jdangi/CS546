/////////// Problem 1//////////////

function sumofSquare(array) {
    if(array==undefined)
        throw ('intput is not valid');
  var sum = 0; 
      i = array.length;
  while (i--) 
   sum += Math.pow(array[i], 2);
  return sum;
}
let Ans = sumofSquare([5,3,10]);
console.log(Ans);






//////////////Problem 2//////////////
function sayHelloTo(firstName, lastName, title){

    
    if(typeof firstName!=="string"&&typeof lastName !=="string" &&typeof title !=="string" )    
        throw "intput type wrong";


    if(!firstName)throw "error";
    let ans=firstName;
    if(lastName&&!title){
        if(typeof lastName !=="string")
            throw "input type error";
        ans+=(" "+lastName+". I hope you are having a good day");
    
    }
       
    if(lastName&&title)
    {  
        if(typeof lastName !=="string"|typeof title !=="string")
            throw "input type error"; 
        ans=title+" "+ans+" "+lastName+"! Have a good evening";
    }
    ans = "Hello, "+ans+"!";
    console.log(ans);
}
sayHelloTo("Jay");

sayHelloTo("Jay", "Dangi"); 

sayHelloTo("Jay", "Dangi", "Mr.");  







////////////Problem 3/////////////
function cupsOfCoffee(howManyCups){


    if(howManyCups==undefined)
        throw "intput is not valid";
    if(typeof howManyCups!=="number")    
        throw "intput type wrong";
    if(howManyCups<=0)
        throw "Please input a positive number";
    while(howManyCups>0){
       console.log(howManyCups+" cups of coffee on the desk! "+(howManyCups--)+" cups of coffee!"); 
       if(howManyCups)console.log("Pick one up, drink the cup, "+howManyCups+" cups of coffee on the desk!\n");    
       else console.log("Pick it up, drink the cup, no more coffee left on the desk!");
    }

}
cupsOfCoffee(5);






/////////////////Problem 4//////////////
function occurrencesOfSubstring(fullString, substring){

    if(fullString==undefined||substring==undefined)
        throw ('intput is not valid');
    if(typeof fullString!=="string"||typeof substring !=="string" )
        throw "intput type wrong";  

    let len=substring.length;
    let size=fullString.length;
    let ans=0;
    for(let i=0;i<=size-len;i++)
        if(fullString.substr(i,len)==substring)ans++;
    return ans;
    
}

ans1=occurrencesOfSubstring("hello world", "o");
ans2=occurrencesOfSubstring("Helllllllo, class!", "ll");
console.log("\noccurrencesOfSubstring(\"hello world\"\", \"o\"): ",ans1);
console.log("\noccurrencesOfSubstring(\"Helllllllo, class!\", \"ll\"): ",ans2);







///////////////Problem 5/////////////////
function randomizeSentences(paragraph){
    if(paragraph==undefined)
        throw ('intput is not valid');
    if(typeof paragraph!=="string")
        throw "intput type wrong";  

    let j,i, x;
    let ans=paragraph.split(",");
    let len=ans.length;


    for (i = len; i; i--) {
        j = Math.floor(Math.random() * i);
        x = ans[i - 1];
        ans[i - 1] = ans[j];
        ans[j] = x;
    }
    let ret=""; 
    for(a in ans)
        ret+=ans[a];
    return ret;
}
var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
console.log('\n'+randomizeSentences(paragraph));
