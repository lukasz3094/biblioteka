const userMiddleware = require("../middleware/users.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../db/connection")

module.exports = (router) => {
// sign up
router.post("/sign-up", userMiddleware.validateRegister, (req, res, next) => {
	db.query(
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
						`INSERT INTO user_login (username, password, last_login) VALUES (
						${db.escape(req.body.username)}, ${db.escape(hash)}, now())`,
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
})

// login
router.post("/login", (req, res, next) => {
	db.query(
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
							`UPDATE user_login SET last_login = now() WHERE id_login = "${result[0].id}"`
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
})
}
