let mysql = require("mysql")

let con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "biblioteka"
})

module.exports = con
// con.connect(function(err) {
// 	if (err) throw err
// 	con.query("SELECT * FROM autorzy", function (err, result, fields) {
// 		if (err) throw err
// 		console.log(result)
// 	})
// })
