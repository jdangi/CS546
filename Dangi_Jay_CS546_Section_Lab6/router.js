var express = require('express');
var router = express.Router();

let aboutObject = {
    "name": "Jay Dangi",
    "biography": "This is Jay Dangi. Currently I am pursuing my graduate degree from Stevens institute of technology, Hoboken. I am Spring 2017 grade student of computer science department. My major area of focus is Big data and analytics. I enroll in cs546 class in this summer course.",
    "favoriteTargets": ["Game of thrones", "Silicon valley", "How I met your mother", "Big bang theory"],
    "hobbies": ["Drawing", "MMA", "Cricket", "Shooting", "Web Programming(Learning)"]
};

let storyObject = {
    "storyTitle": "How I transfer from a Judo Player to coder.",
    "story": "I am a National Level Judo player, but I am not the usual State champion, I have learned various innovative moves which is way batter than other Judo player."
};

let listOfEducations = [{
    "schoolName": "RPTP",
    "degree": "High School",
    "favoriteClass": "maths",
    "favoriteMemory": "First time I am able to use Maths as an real time appliaction."
}, {
    "schoolName": "Birla Vishwakarma Maha Vidhyalaya",
    "degree": "Bachelor's degree",
    "favoriteClass": "AI",
    "favoriteMemory": " I just learn different aspects of automation tool in computer."

}, {
    "schoolName": "Stevens Institute of Technology",
    "degree": "Master's degree",
    "favoriteClass": "CS-546",
    "favoriteMemory": "Learning Node.js!"

}];


router.get('/about', (req, res) => {
    res.send(aboutObject);
});
router.get('/story', (req, res) => {
    res.json(storyObject);
});
router.get('/education', (req, res) => {
    res.json(listOfEducations);
});
router.get('*', (req, res)=>{
    res.sendStatus(404);
});

module.exports = router;