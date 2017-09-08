var express = require('express');
var recipeData = require('./adMongo.js');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get("/recipes", function(request, response) {
    recipeData.getAllRecipes().then(function(recipes) {
        response.json(recipes);
    });
});

app.get("/recipes/:id", function(request, response) {
    recipeData.getRecipe(request.params.id).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.post("/recipes", function(request, response) {
    recipeData.createRecipe(request.body.title).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.put("/recipes/:id", function(request, response) {
    recipeData.updateTitle(request.params.id, request.body.title).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});
app.put("/recipes/:id", function(request, response) {
    recipeData.updateIngredients(request.params.id, request.body.ingredientName, request.body.ingredientAmount).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.put("/recipes/:id", function(request, response) {
    recipeData.updateSteps(request.params.id, request.body.NewSteps).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.delete("/recipes/:id", function(request, response) {
    recipeData.deleteRecipe(request.params.id).then(function(status) {
        response.json({ success: status });
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.get("/comments/recipe/:id", function(request, response) {
    recipeData.getComments(request.params.id).then(function(commentsList) {
        response.json(commentsList);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.get("/comments/:commentId", function(request, response){
  recipeData.getCommentsById(request.params.commentId).then(function(comments){
    response.json(comments);
  }, function(errorMessage){
    response.status(500).json({error: errorMessage});
  });
});

app.post("/comments/:recipeId", function(request, response){
  recipeData.addAComment(request.params.recipeId,request.body.poster, request.body.comment).then(function(comments){
   response.json(comments); 
  }, function(err){
    response.status(500).json({error: err});
  });
});

app.put("/comments/:recipeId/:commentId",  function(request, response){
  recipeData.updateAComment(request.params.recipeId, request.params.commentId, request.body.comment).then(function(updateComments){
    response.json(updateComments);
  },  function(err){
    response.status(500).json({error:err});
  });
});

app.delete("/comments/:id", function(request, response){
  recipeData.deleteComment(request.params.id).then(function(comment){
    response.json({ success: status });
  }, function(err){
    response.status(500).json({error:err});
  });
});

app.listen(3000, function() {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});