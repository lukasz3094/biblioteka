import Axios from "axios"

const url = "http://localhost:3500/"

export default {
	async getBooksFromDb () {
		const response = await Axios.get(url + "all-books/")
		return response.data
	},
	async getToBorrowBooksFromDb () {
		const response = await Axios.get(url + "to-borrow-books/")
		return response.data
	},
	async borrowBook ({ bookId, userId }) {
		const response = await Axios.get(`${url}book-by-id/`, 
				{ params: { "bookId": bookId, "userId": userId }})	
		return response
	}
}