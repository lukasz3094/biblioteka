import BookReqService from "@/services/BookReqService"

export default {
    state: {
        allBooks: null,
        ableToBorrowBooks: null,
        reqResponse: ""
    },
    getters: {
        getAllBooks: state => {
            return state.allBooks
        },
        getAbleToBorrowBooks: state => {
            return state.ableToBorrowBooks
        },
        getReqResponse: state => {
            return state.reqResponse
        }
    },
    mutations: {
        SET_ALL_BOOKS: (state, data) => {
            state.allBooks = data
        },
        SET_ABLE_TO_BORROW_BOOKS: (state, data) => {
            state.ableToBorrowBooks = data
        },
        SET_REQ_RESPONSE: (state, res) => {
            state.reqResponse = res.data.msg
        },
        UNSET_REQ_RESPONSE: (state) => {
            state.reqResponse = ""
        }
    },
    actions: {
        async findAllBooks ({ commit }) {
            let response = await BookReqService.getBooksFromDb()
            commit("SET_ALL_BOOKS", response)
        },
        async findAbleToBorrowBooks ({ commit }) {
            let response = await BookReqService.getToBorrowBooksFromDb()
            commit("SET_ABLE_TO_BORROW_BOOKS", response)
        },
        async borrowBook ({ commit }, { bookId, userId }) {
            let response = await BookReqService.borrowBook({ bookId, userId })
            commit("SET_REQ_RESPONSE", response)
        },
        unsetReqResponse ({ commit }) {
            commit("UNSET_REQ_RESPONSE")
        }
    }
}