var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hObject = {
            burgers: data
        };
        console.log(hObject);
        res.render("index", hObject);
    });
});

router.post("/", function(req, res) {
    console.log(req.body);
    burger.create(["burger_name"], [req.body.burger_name], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
    var condition = req.params.id;
    console.log("Devoured:", req.body.devoured);
    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/");
    });
});

router.delete("/:id", function(req, res) {
    let condition = req.params.id;
    burger.remove(condition, function() {
        console.log("Removed id: " + condition);
        res.redirect('/');
    })
});

module.exports = router;