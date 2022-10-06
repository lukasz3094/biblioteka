<template>
    <div class="container-fluid">
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
				<tr v-for="book in allBooks" :key="book.id_ksiazki">
					<th scope="row">{{ book.id_ksiazki }}</th>
					<td>{{ book.tytul }}</td>
					<td>{{ book.imie }} {{ book.nazwisko }}</td>
					<td>{{ book.nazwa }}</td>
					<td class="col-2">{{ book.rok_wydania }}</td>
					<td>{{ book.isbn }}</td>
				</tr>
			</tbody>
		</table>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"

export default {
    computed: {
		...mapGetters({ 
			allBooks: "getAllBooks",  
		})
	},
    methods: {
        ...mapActions({
			findAllBooks: "findAllBooks",
		})
    },
    async created() {
        this.findAllBooks() 
    }
}
</script>
