import AuthService from "@/services/AuthService"

export default {
    state: {
        allBooks: null,
        ableToBorrowBooks: null,
    },
    getters: {
        getAllBooks: state => {
            return state.allBooks
        },
        getAbleToBorrowBooks: state => {
            return state.ableToBorrowBooks
        },

    },
    mutations: {
        SET_ALL_BOOKS: (state, data) => {
            state.allBooks = data
        },
        SET_ABLE_TO_BORROW_BOOKS: (state, data) => {
            state.ableToBorrowBooks = data
        },
    },
    actions: {
        async findAllBooks ({ commit }) {
            let response = await AuthService.getBooksFromDb()
            commit("SET_ALL_BOOKS", response)
        },
        async findAbleToBorrowBooks ({ commit }) {
            let response = await AuthService.getToBorrowBooksFromDb()
            commit("SET_ABLE_TO_BORROW_BOOKS", response)
        },
        async borrowBook (state, { bookId, userId }) {
            let response = await AuthService.borrowBook({ bookId, userId })
            console.log(response)
            return response
        }
    }
}