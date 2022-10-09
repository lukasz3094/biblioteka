const express = require("express")
const router = express.Router()
const userMiddleware = require("../middleware/users.js")
const db = require("../db/connection")

require("./userAuthRoutes")(router)

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
		VALUES ('${ data.bookId }', '${ data.userId }')`,
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
				'${ data.bookId }' )`,
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
				return res.send(null)
			} else {
				return res.send(result)
			}
		}
	)
})

// return book
router.get("/return-book", userMiddleware.isLoggedIn, (req, res, next) => {
	data = req.query
	db.query(
		`DELETE FROM termin WHERE id_egzemplarza = ${ data.copyId }`,
		(err) => {
			if (err) {
				throw err
				return res.status(400).send({
					msg: err
				})
			}
			db.query(
				`DELETE FROM wypozyczenia 
				WHERE id_egzemplarza = ${ data.copyId }`,
				(err, result) => {
					if (err) {
						throw err
						return res.status(400).send({
							msg: err
						})
					}
					return res.status(201).send({
						msg: "Pomyślnie zwrócono."
					})
				}
			)
		}
	)
})

module.exports = router