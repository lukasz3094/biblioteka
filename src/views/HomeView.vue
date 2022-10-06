<template>
	<div class="container w-75 p-1">

		<h1 class="text-center m-1">Hi {{ username }}</h1>

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
				<tr v-for="book in books" :key="book.id_ksiazki">
					<th scope="row">{{ book.id_ksiazki }}</th>
					<td>{{ book.tytul }}</td>
					<td>{{ book.imie }} {{ book.nazwisko }}</td>
					<td>{{ book.nazwa }}</td>
					<td>{{ book.rok_wydania }}</td>
					<td>{{ book.isbn }}</td>
				</tr>
			</tbody>
		</table>

		<div class="row justify-content-center">
			<div class="col-2">
				<button class="btn btn-info p-2 text-uppercase" @click="logout" >
					Wyloguj
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import AuthService from "@/services/AuthService"
// import { mapState } from "vuex"

export default {
	data () {
		return {
			username: "",
			books: null
		}
	},
	// computed: {
	// 	...mapState({ user: "user" })
	// },
	methods: {
		logout() {
			this.$store.dispatch("logout")
			this.$router.push("/login")
		}
	},
	async created() {
		if (!this.$store.getters.isLoggedIn) {
			this.$router.push("/login")
		}
		this.username = this.$store.getters.getUser.username
		this.books = await AuthService.getBooksFromDb()
		console.log(this.books)
	}
}
</script>
