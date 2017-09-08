var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    uuid = require("node-uuid");

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup() {
    return MongoClient.connect(fullMongoUrl)
        .then(function(db){
            return db.collection("recipes").drop().then(function() {
                return db;
            }, function() {
                return db;
            });
        }).then(function(db) {
            return db.createCollection("recipes");
        }).then(function(recipesCollection) {
            var docId = 0;

            var makeDoc = function(title) {
                return {
                    _id: uuid.v4(),
                    title: title,
                    ingredients:[],
                    steps: [],
                    comments: []
                }
            };

            var addComment = function(recipe, posterName, comment) {
                var newComment = {
                    commentID: uuid.v4(),
                    poster: posterName,
                    comment: comment
                };

                recipe.comments.push(newComment);
            };

            var addIngredients = function(recipe, ingredientName,ingredientAmount){
                var newIngredient = {
                    name: ingredientName,
                    amount: ingredientAmount
                };
                recipe.ingredients.push(newIngredient);
            };

            var listOfRecipe = [];

            var friedEggs = makeDoc("Fried Eggs");
            addIngredients(friedEggs, "Eggs", "10");
            addIngredients(friedEggs, "Olive Oil", "2 tbs");
            friedEggs.steps.push("1. Heat the pan", "2.Add Olive Oil", "3. Add Eggs", "4. Saute")
            addComment(friedEggs, "Ron Swanson","Wrong instructions, Got stuck in Toaster");
            addComment(friedEggs, "Tom Haverford","What are Eggs?");
            addComment(friedEggs, "Andy Dwyer","What came  firsst, Eggs or Chicken");

            var boiledEggs = makeDoc("Boiled Eggs");
            addIngredients(boiledEggs, "Eggs", "5");
            addIngredients(boiledEggs, "Water", "3 Cups");
            boiledEggs.steps.push("1.Boil the Water",  "2.Add Eggs","3. Keepit for 5 mins", "4. Let it Cool Down", "5. Peel off the shell");
            addComment(boiledEggs, "Ron Swanson","Wrong instructions, Got stuck in Oven");
            addComment(boiledEggs, "Leslie Knope","What are Eggs?");
            addComment(boiledEggs, "Andy Dwyer","Can I remove the shell first and then boil?");

            var brocolli  = makeDoc("Brocolli");
            addIngredients(brocolli, "Brocolli", "2");
            addIngredients(brocolli, "Onions", "2");
            addIngredients(brocolli, "Olive Oil", "2tbs");
            addIngredients(brocolli, "Salt", "2tbs")
            brocolli.steps.push("1.Put oil in the pan", "2. Add Chopped Onions", "3. Add Salt and  spices", "4. Add Brocolli", "5. Saute");
            addComment(brocolli,"Andy Dwyer", "Wrong instructions, I am a potato now!");
            addComment(brocolli,"Ben Wyatt" ,"Can I use chicken instead of brocolli?");
            addComment(brocolli, "Ron Swanson","Reported for abusive content");

            listOfRecipe.push(friedEggs, boiledEggs, brocolli);

            // we can use insertMany to insert an array of documents!
            return recipesCollection.insertMany(listOfRecipe).then(function() {
                return recipesCollection.find().toArray();
            });
        }).catch(err => {
            console.log(err);
        });
}

var exports = module.exports = runSetup;