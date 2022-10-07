<template>
    <div>
        <div class="text-center m-2 p-2" v-if="reqResponse">
            <p class="p1 h2">{{ reqResponse }}</p>
            <button @click="handleReturn()" class="btn btn-primary text-uppercase">
                OK
            </button>
        </div>

        <table v-if="userBooks.data" 
                class="table table-striped table-hover table-bordered">
			<thead>
				<tr class="text-center">
					<th scope="col">#</th>
					<th scope="col">Tytuł</th>
					<th scope="col">Autor</th>
					<th scope="col">Kategoria</th>
					<th scope="col">Rok Wydania</th>
					<th scope="col">ISBN</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="book in userBooks.data" :key="book.id_egzemplarza">
					<th scope="row">{{ book.id_egzemplarza }}</th>
					<td>{{ book.tytul }}</td>
					<td>{{ book.imie }} {{ book.nazwisko }}</td>
					<td>{{ book.nazwa }}</td>
					<td class="col-2">{{ book.rok_wydania }}</td>
					<td>{{ book.isbn }}</td>
					<td><button @click="returnBook(book.id_egzemplarza)" 
							class="btn btn-secondary">
						Zwróć
					</button></td>
				</tr>
			</tbody>
		</table>

        <div v-else class="text-center m-2 p-2">
            <p class="p1 h2">Nie posiadasz wypożycznych książek.</p>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            userId: ""
        }
    },
    computed: {
        ...mapGetters({
            userBooks: "getUserBooks",
            reqResponse: "getReqResponse"
        })
    },
    methods: {
        ...mapActions({
            findUserBooks: "findUserBooks",
            returnUserBook: "returnBook",
            unsetReqResponse: "unsetReqResponse" 
        }),
        returnBook (copyId) {
            this.returnUserBook(copyId).then(() => {
                this.findUserBooks({ "userId": this.userId })
            })
        },
        handleReturn () {
            this.unsetReqResponse()
        }
    },
    async created() {
        this.unsetReqResponse()
        this.userId = this.$store.getters.getUser.id
        this.findUserBooks({ "userId": this.userId })
    }
}
</script>
