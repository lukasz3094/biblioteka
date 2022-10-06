import { createStore } from "vuex"
import Axios from "axios"
import createPersistedState from "vuex-persistedstate"
// modules
import BooksModule from "./books"

const getDefaultState = () => {
	return {
		token: "",
		user: {}
	}
}

export default createStore({
	strict: true,
	modules: { books: BooksModule },
	plugins: [ createPersistedState() ],
	state: getDefaultState(),
	getters: {
		isLoggedIn: state => {
			return state.token
		},
		getUser: state => {
			return state.user
		}
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USER: (state, user) => { 
			state.user = { "id": user.id_login, "username": user.username }
		},
		RESET: state => {
			Object.assign(state, getDefaultState())
		}
	},
	actions: {
		login: ({ commit }, { token, user }) => {
			commit("SET_TOKEN", token)
			commit("SET_USER", user)
			// set auth header
			Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
		},
		logout: ({ commit }) => {
			commit("RESET", "")
		}
	},
})
