import Axios from "axios"

const url = "http://localhost:3500/"

export default {
	async login (credentials) {
		const response = await Axios
			.post(url + "login/", credentials)
		return response.data
	},
	async signUp (credentials) {
		const response = await Axios
			.post(url + "sign-up/", credentials)
		return response.data
	},
	// async getSecretContent () {
	// 	const response = await Axios.get(url + "secret-route/")
	// 	return response.data
	// },
	async getBooksFromDb () {
		const response = await Axios.get(url + "all-books/")
		return response.data
	}
}