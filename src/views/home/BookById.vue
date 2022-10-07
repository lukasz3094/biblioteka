<template>
    <table class="table table-striped table-hover table-bordered">
			<thead>
				<tr class="text-center">
					<th scope="col">#</th>
					<th scope="col">Tytuł</th>
					<th scope="col">Autor</th>
					<th scope="col">Kategoria</th>
					<th scope="col">Rok Wydania</th>
					<th scope="col">ISBN</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">{{ book.id_ksiazki }}</th>
					<td>{{ book.tytul }}</td>
					<td>{{ book.imie }} {{ book.nazwisko }}</td>
					<td>{{ book.nazwa }}</td>
					<td class="col-2">{{ book.rok_wydania }}</td>
					<td>{{ book.isbn }}</td>
				</tr>
			</tbody>
            <tfoot v-if="!reqResponse">
                <tr>
                    <td colspan="2"></td>
                    <td>
                        <button @click="borrowBook({ 'bookId': copyId,
                                'userId': userId })"
                                class="btn btn-primary text-uppercase">
                            Wypożycz
                        </button> 
                    </td>
                    <td>
                        <button @click="clearChoosen" 
                                class="btn btn-secondary text-uppercase">
                            Wróć
                        </button>
                    </td>
                </tr>
            </tfoot>
		</table>
        <div class="text-center" v-if="reqResponse">
            <p class="p1 h2">{{ reqResponse }}</p>
            <button @click="handleReturn()" class="btn btn-primary text-uppercase">
                Powrót
            </button>
        </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
export default {
    emits: ["clearChoosen"],
    data () {
        return {
            userId: ''
        }
    },
    computed: {
        ...mapGetters({
            reqResponse: "getReqResponse"
        })
    },
    props: {
        book: {
            type: Object,
            required: true
        },
        copyId: {
            type: Number,
            required: true
        }
    },
    methods: {
        ...mapActions({
            borrowBook: "borrowBook",
            unsetReqResponse: "unsetReqResponse" 
        }),
        borrowBookReq ({ bookId, userId }) {
            this.borrowBook({ bookId, userId })
        },
        handleReturn () {
            this.$emit("clearChoosen")
        }
    },
    created () {
        this.userId = this.$store.getters.getUser.id
        this.unsetReqResponse()
    }
}
</script>
