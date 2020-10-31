// Dépendences nécessaires pour l'app' 
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// Affiche le dossier public 
app.use(express.static("public"));

// Ajout des tâches
var task = ["Acheter des pommes", "Pratiquer Nodejs", " Apprendre et pratiquer le code", "Regarder walking dead sur Netfixe"];
//Tâches accomplis
var complete = ["Finir mon Ebook", "Sortir le chien"];

//post route ajout de nouvelle tâche 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    // Ajout instantané de tâche 
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    // Le programme envoi dans la partie tâche accomplie 
    if (typeof completeTask === "string") {
        complete.push(completeTask);
    // Vérifie si la tâche est complétée et le retire automatiquement de la tâche à faire
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

// Affiche le template 
app.get("/", function(req, res) {
    res.render("todo", { task: task, complete: complete });
});

// Port et serveur
app.listen(3000, function() {
    console.log("server is running on port 3000");
});