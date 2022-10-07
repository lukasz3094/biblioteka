<template>
	<div class="container w-75 p-1">

		<nav class="navbar navbar-light bg-light mt-1">
			<hr class="hr">
			<div class="container-fluid">
				<div class="button-group mt-1">
					<router-link class="btn p-2" to="/all-books"
							exact-active-class="btn-primary">
						Wszystkie
					</router-link>

					<router-link class="btn p-2" to="/to-borrow-books"
							exact-active-class="btn-primary">
						Dostępne
					</router-link>

					<router-link class="btn p-2" to="/user-books" 
							exact-active-class="btn-primary">
						Twoje książki
					</router-link>
				</div>

				<div class="ms-auto h4">{{ username }}</div>

				<div class="vr ms-3"></div>

				<button class="btn p-2 text-uppercase ms-2" 
						@click="logout" >
					Wyloguj
				</button>
			</div>
		</nav>

		<router-view ></router-view>

	</div>
</template>

<script>
export default {
	data () {
		return {
			username: "",
		}
	},
	methods: {
		logout() {
			this.$store.dispatch("logout")
			this.$router.push("/login")
		},	
	},
	async created() {
		if (!this.$store.getters.isLoggedIn) {
			this.$router.push("/login")
		}
		this.username = this.$store.getters.getUser.username
	}
}
</script>
