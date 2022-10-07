<template>
    <div>
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
				<tr v-for="book in userBooks.data" :key="book.id_egzemplarza">
					<th scope="row">{{ book.id_egzemplarza }}</th>
					<td>{{ book.tytul }}</td>
					<td>{{ book.imie }} {{ book.nazwisko }}</td>
					<td>{{ book.nazwa }}</td>
					<td class="col-2">{{ book.rok_wydania }}</td>
					<td>{{ book.isbn }}</td>
					<td><button @click="returnBook()" 
							class="btn btn-secondary">
						Zwróć
					</button></td>
				</tr>
			</tbody>
		</table>
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
            userBooks: "getUserBooks"
        })
    },
    methods: {
        ...mapActions({
            findUserBooks: "findUserBooks"
        })
    },
    async created() {
        this.userId = this.$store.getters.getUser.id
        this.findUserBooks({ "userId": this.userId })
    }
}
</script>
