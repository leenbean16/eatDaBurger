// Import MySQL connection.
const connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        if (Object.hasOwnProperty.call(ob, key)) {
            arr.push(key + "=" + ob[key]);
        }
    }

    return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO ?? (??) VALUES (" + printQuestionMarks(vals.length) + ");";

        console.log(queryString);

        connection.query(queryString, [table, cols, vals], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE ?? SET " + objToSql(objColVals) + " WHERE id=?;";

        console.log(queryString);
        connection.query(queryString, [table, condition], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // REMOVE
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

// Export the orm object for the model (burger.js).
module.exports = orm;