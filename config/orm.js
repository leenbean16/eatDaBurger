const connection = require("../config/connection.js");

var orm = {
    selectAll: function(tableInput, cb) {
        var string = "SELECT * FROM " + tableInput + ";";
        connection.query(string, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var string = "INSERT INTO ?? (??) VALUES (" + qMark(vals.length) + ");";

        console.log(string);

        connection.query(string, [table, cols, vals], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    updateOne: function(table, objColVals, condition, cb) {
        var string = "UPDATE ?? SET " + sendInfo(objColVals) + " WHERE id=?;";

        console.log(string);
        connection.query(string, [table, condition], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    remove: function(table, condition, cb) {

        let query = "DELETE FROM ?? WHERE id=?";
        connection.query(query, [table, condition], function(err, result) {
            if (err) throw err;
            if (cb) {
                cb(result);
            }
        });
    }
};


function qMark(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function sendInfo(ob) {
    var arr = [];

    for (var key in ob) {
        if (Object.hasOwnProperty.call(ob, key)) {
            arr.push(key + "=" + ob[key]);
        }
    }

    return arr.toString();
}

module.exports = orm;