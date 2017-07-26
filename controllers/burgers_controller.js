var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// CREATE
router.post("/", function(req, res) {
    console.log(req.body);
    burger.create(["burger_name"], [req.body.burger_name], function() {
        res.redirect("/");
    });
});

// Eat burger (UPDATE)
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

// DELETE
router.delete("/:id", function(req, res) {
    let condition = req.params.id;
    burger.remove(condition, function() {
        console.log("Removed id: " + condition);
        res.redirect('/');
    })
});

// Export routes for server.js to use.
module.exports = router;