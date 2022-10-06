const db = require("../db/connection")
const bcrypt = require("bcryptjs")

const signUp = db.query(
	`SELECT * FROM user_login WHERE LOWER(username) = LOWER(${db.escape(
		req.body.username
	)})`,
	(err, result) => {
		if (result.length) {
			return res.status(409).send({
				msg: "Ten uzytkownik juz istnieje!"
			})
		} else {
			// username is available
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					return res.status(500).send({
						msg: err
					})
				} else {
					// has hashed pw => add to database
					db.query(
					`INSERT INTO user_login (username, password) VALUES (
					${db.escape(req.body.username)}, ${db.escape(hash)})`,
						(err, result) => {
							if (err) {
								throw err
								return res.status(400).send({
									msg: err
								})
							}
							return res.status(201).send({
								msg: "Zarejestrowano!"
							})
						}
					)
				}
			})
		}
	}
)

exports.default = signUp
