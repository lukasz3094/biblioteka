const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../db/connection")
const userMiddleware = require("../middleware/users.js")

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

// get all book with no filters
router.get("/all-books", userMiddleware.isLoggedIn, (req, res, next) => {
	db.query(
		`SELECT id_ksiazki, tytul, rok_wydania, isbn, imie, nazwisko, nazwa 
		FROM ksiazka AS k INNER JOIN autorzy AS a 
		ON k.id_autora = a.id_autora INNER JOIN kategorie AS ka ON 
		k.id_kategorii = ka.id_kategorii`,
		(err, result) => {
			if (err) {
				throw err
				return res.status(400).send({
					msg: err
				})
			}
			if (!result.length) {
				return res.status(404).send({
					msg: "Nie znaleziono."
				})
			} else {
				return res.send(result)
			}
		}
	)
})

// books that are able to borrow
router.get("/to-borrow-books", userMiddleware.isLoggedIn, (req, res, next) => {
	db.query(
		`SELECT DISTINCT k.id_ksiazki, k.tytul, k.rok_wydania, k.isbn,
		a.imie, a.nazwisko, ka.nazwa, e.id_egzemplarza
		FROM egzemplarze AS e 
		LEFT JOIN termin AS t ON t.id_egzemplarza = e.id_egzemplarza
		INNER JOIN ksiazka AS k ON k.id_ksiazki = e.id_ksiazki 
		INNER JOIN autorzy AS a ON a.id_autora = k.id_autora
		INNER JOIN kategorie AS ka ON ka.id_kategorii = k.id_kategorii
		WHERE t.id_egzemplarza IS NULL`,
		(err, result) => {
			if (err) {
				throw err
				return res.status(400).send({
					msg: err
				})
			}
			if (!result.length) {
				return res.status(404).send({
					msg: "Nie znaleziono."
				})
			} else {
				return res.send(result)
			}
		}
	)
})

// borrow book
router.get("/book-by-id", userMiddleware.isLoggedIn, (req, res, next) => {
	data = req.query
	db.query(
		`INSERT INTO wypozyczenia (id_egzemplarza, id_login)
		VALUES ('${data.bookId}', '${data.userId}')`,
		(err, result) => {
			if (err) {
				throw err
				return res.status(400).send({
					msg: err
				})
			}
			db.query(
				`INSERT INTO termin (data_wypozyczenia, data_oddania, 
				id_egzemplarza) VALUES(now(), DATE_ADD(now(), INTERVAL 30 day),
				'${data.bookId}' )`,
				(err, result) => {
					if (err) {
						throw err
						return res.status(400).send({
							msg: err
						})
					}
					return res.status(201).send({
						msg: "Pomyślnie wypożyczono. Termin oddania minie za 30 dni."
					})
				}
			)
		}
	)
})

// user books
router.get("/user-books", userMiddleware.isLoggedIn, (req, res, next) => {
	data = req.query
	db.query(
		`SELECT k.tytul, k.rok_wydania, k.isbn,
		a.imie, a.nazwisko, ka.nazwa, e.id_egzemplarza
		FROM egzemplarze AS e 
		LEFT JOIN termin AS t ON t.id_egzemplarza = e.id_egzemplarza
		INNER JOIN ksiazka AS k ON k.id_ksiazki = e.id_ksiazki 
		INNER JOIN autorzy AS a ON a.id_autora = k.id_autora
		INNER JOIN kategorie AS ka ON ka.id_kategorii = k.id_kategorii
		INNER JOIN wypozyczenia AS w ON w.id_egzemplarza = e.id_egzemplarza
		INNER JOIN user_login AS u on u.id_login = w.id_login
		WHERE u.id_login = ${ data.userId }`, 
		(err, result) => {
			if (err) {
				throw err
				return res.status(400).send({
					msg: err
				})
			}
			if (!result.length) {
				return res.status(404).send({
					msg: "Nie znaleziono"
				})
			} else {
				return res.send(result)
			}
		}
	)
})

module.exports = router