(function () {
    
        function palindrome(str) { 
            var str = str.toLowerCase().replace(/[^a-zA-Z0-9]+/g,'');
            var str = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`'"?~()]/g,"");
            var str = str.replace("[", "");
            var str = str.replace(/[\[\]']+/g,'');
            var str = str.replace(/[\n\r\t]+/g, ' ');
            var str = str.replace(/(\r\n|\n|\r)/g, " ");

            var count = 0;

            if(str==="") {  
                throw "Must Provide the correct Input";  
            } 
            
            if ((str.length) % 2 === 0) {  
                count = (str.length) / 2;  
            } else {
                if (str.length === 1) {  
                    return "Entry is a palindrome.";
                } else {
                    count = (str.length - 1) / 2;  
                }  
            }  
            
            for (var x = 0; x < count; x++) {  
                if (str[x] != str.slice(-1-x)[0]) {  
                    return "Entry is not a Palindrome";  
                } 
        }  
        return "Entry is Palindrome";     
    }

    var staticForm = document.getElementById("static-form");

    if (staticForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        var firstNumberElement = document.getElementById("number1");
        var ulist = document.getElementById("list");
      
        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", function (event) {
            event.preventDefault();

        try {
            // hide containers by default
            errorContainer.classList.add("hidden");
            resultContainer.classList.add("hidden");

            // Values come from inputs as strings, no matter what :(
            var firstNumberValue = firstNumberElement.value;
            var stringlist = firstNumberElement.value;

            var result = palindrome(firstNumberValue);
            var res = "Entry is Palindrome";
            if(result==res){
                resultTextElement.textContent =  ""+ result;
                resultContainer.classList.remove("hidden");
            } else {
                errorTextElement.textContent = ""+ result;
                errorContainer.classList.remove("hidden");
            }
            
            var entry = document.createElement('li');
            if(result==res){
                entry.setAttribute("class", "is-palindrome");
            } else {
                entry.setAttribute("class", "not-palindrome");}
                entry.appendChild(document.createTextNode(stringlist));
                ulist.appendChild(entry);
         }catch (e) {
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
        }
    });
    }
})();