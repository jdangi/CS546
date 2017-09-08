var MongoClient = require('mongodb').MongoClient,
    runStartup = require("./adStart.js"),
    settings = require('./config.js'),
    uuid = require("node-uuid");

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

runStartup().then(function(allRecipes) {
    console.log("After the advanced document setup has been complete, we have the following recipes:");
    console.log(allRecipes);
});

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var recipesCollection = db.collection("recipes");

        exports.getAllRecipes = function() {
            return recipesCollection.find({}, {"title":1}).toArray();
        };

        exports.getRecipe = function(id) {
            if (id === undefined) return Promise.reject("You must provide an ID");

            return recipesCollection.find({ _id: id }).limit(1).toArray().then(function(listOfRecipes) {
                if (listOfRecipes.length === 0) throw "Could not find recipe with id of " + id;
                return listOfRecipes[0];
            });
        };

        exports.getComments = function(id) {
            if (id === undefined) return Promise.reject("You must provide an ID");

            return recipesCollection.find({ _id: id }).toArray().then(function(listOfComments) {
                if (listOfRecipes.length === 0) throw "Could not find comments for id " + id;
                return listOfComments;
            });
        };

        exports.getCommentsById = function(id){
            if(id === undefined) return Promise.reject("You must provide an ID");

            return recipesCollection.find({"comments.commentID":id},{comments:{$elemMatch: {commentID:id}}},{"title":1}).toArray();
        };

        exports.addAComment= function(id,posterName,Newcomment){
            if(id ===undefined) return Promise.reject("No input provided");

            return recipesCollection.update({"_id":id},{$push:{"comments":{"commentID":uuid.v4(), "poster":posterName, "comment": Newcomment}}} );
        };

        exports.updateAComment = function(Recipeid,commentorID,Newcomment){
            if(Recipeid === undefined) return Promise.reject("No Id Provided");
            if(commentorID === undefined) return Promise.reject("No Commentor id provided");
            if(!Newcomment) return Promise.reject("No new Comment Provided");

            return recipesCollection.update({"_id":Recipeid, "comments.commentID":commentorID},{"$set": {"comments.$.comment": Newcomment}}).then(function(change){
                return exports.getRecipe(Recipeid);
            });
        };

        exports.deleteComment = function(id){
            if(id ===  undefined)return Promise.reject("No Id Provided");

            return recipesCollection.update({"comments.commentID":id}, {$pull: {"comments":{commentID:id}}});
        };


        exports.createRecipe = function(title){
            if(!title) return Promise.reject("No title Provided");

            return recipesCollection.insertOne({_id:uuid.v4(), title:title, ingredients:[],steps:[],comments:[]}).then(function(newRecipe){
                return newRecipe.insertedId;
            }).then(function(newId){
                return exports.getRecipe(newId);
            });
        };

        exports.updateTitle = function(id, newTitle) {
            if (id === undefined) return Promise.reject("No id provided");
            if (!newTitle) return Promise.reject("No title provided");

            return recipesCollection.update({ _id: id }, { $set: { "title": newTitle } }).then(function() {
                return exports.getRecipe(id);
            });
        };
        
        exports.deleteRecipe = function(id){
        	if (id === undefined) return Promise.reject("You must provide an ID");

            return recipesCollection.deleteOne({ _id: id }).then(function(deletionInfo) {
                if (deletionInfo.deletedCount === 0) throw "Could not find the document with this id to delete";

                return true;
            });
        };
    });