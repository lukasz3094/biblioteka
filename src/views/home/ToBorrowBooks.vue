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
				<tr v-for="book in toBorrowBooks" :key="book.id_ksiazki">
					<th scope="row">{{ book.id_ksiazki }}</th>
					<td>{{ book.tytul }}</td>
					<td>{{ book.imie }} {{ book.nazwisko }}</td>
					<td>{{ book.nazwa }}</td>
					<td class="col">{{ book.rok_wydania }}</td>
					<td>{{ book.isbn }}</td>
					<td><button @click="setChoosenBook(book)" 
							class="btn btn-secondary">
						Wypożycz
					</button></td>
				</tr>
			</tbody>
		</table>
		
	</div>

	<div v-else>
		<book-by-id :book="choosenBookId"></book-by-id>
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
			choosenBookId: null
		}
	},
	computed: {
		...mapGetters({ 
			toBorrowBooks: "getAbleToBorrowBooks"
		})
	},
	methods: {
		...mapActions({
			findToBorrowBooks: "findAbleToBorrowBooks"
		}),
		setChoosenBook (ksiazka) {
			this.choosen = true
			this.choosenBookId = ksiazka
		}
	},
	async created() {
		this.findToBorrowBooks()
	}
}
</script>
