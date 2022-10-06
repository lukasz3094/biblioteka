const db = require("../db/connection")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = db.query(
	`SELECT * FROM user_login WHERE username = ${db.escape(req.body.username)}`,
	(err, result) => {
		// user does not exists
		if (err) {
			throw err
			return res.status(400).send({
				msg: err
			})
		}
		if (!result.length) {
			return res.status(401).send({
				msg: "Login lub hasło są nieprawidłowe!"
			})
		}
		// check password
		bcrypt.compare(
			req.body.password,
			result[0]["password"],
			(bErr, bResult) => {
				// wrong password
				if (bErr) {
					throw bErr
					return res.status(401).send({
						msg: "Login lub hasło są nieprawidłowe!"
					})
				}
				if (bResult) {
					const token = jwt.sign({
						username: result[0].username,
						userId: result[0].id_login
						},
						"SECRETKEY", {
							expiresIn: "7d"
						}
					)
					db.query(
						`UPDATE user_login SET last_login = now() WHERE id = "${result[0].id}"`
					)
					return res.status(200).send({
						msg: "Zalogowano!",
						token,
						user: result[0]
					})
				}
				return res.status(401).send({
					msg: "Login lub hasło są nieprawidłowe!"
				})
			}
		)
	}
)

exports.default = login
