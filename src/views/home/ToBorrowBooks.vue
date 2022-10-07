<template>
	<div v-if="!choosen">
		<table class="table table-striped table-hover table-bordered">
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
				<tr v-for="book in noDuplicateBooks" :key="book.id_ksiazki">
					<th scope="row">{{ book.id_ksiazki }}</th>
					<td>{{ book.tytul }}</td>
					<td>{{ book.imie }} {{ book.nazwisko }}</td>
					<td>{{ book.nazwa }}</td>
					<td class="col-2">{{ book.rok_wydania }}</td>
					<td>{{ book.isbn }}</td>
					<td><button @click="setChoosenBook(book.isbn)" 
							class="btn btn-secondary">
						Wypożycz
					</button></td>
				</tr>
			</tbody>
		</table>
	</div>

	<div v-else>
		<book-by-id :book="choosenBook" :copyId="copyId" 
			@clearChoosen="clearChoosen">
		</book-by-id>
	</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import BookById from "./BookById"

export default {
	components: { BookById },
	data () {
		return {
			choosen: false,
			choosenBook: null,
			noDuplicateBooks: null,
			bookCopies: null,
			copyId: null
		}
	},
	computed: {
		...mapGetters({ 
			toBorrowBooks: "getAbleToBorrowBooks"
		}),
	},
	methods: {
		...mapActions({
			findToBorrowBooks: "findAbleToBorrowBooks"
		}),
		setChoosenBook (isbn) {
			this.choosen = true
			this.bookCopies = this.toBorrowBooks.filter(
				el => el.isbn === isbn
			)
			this.choosenBook = this.bookCopies[0]
			this.copyId = this.bookCopies[0].id_egzemplarza
		},
		noDuplicateBook () {
			this.noDuplicateBooks = 
				[...new Map(this.toBorrowBooks.map(
					v => [v.id_ksiazki, v])).values()]
		},
		clearChoosen () {
			this.choosen = false
			this.choosenBook = null
			this.bookCopies = null
			this.copyId = null
			this.findToBorrowBooks().then(() => this.noDuplicateBook())
		}
	},
	async created() {
		this.findToBorrowBooks().then(() => this.noDuplicateBook())
	}
}
</script>
