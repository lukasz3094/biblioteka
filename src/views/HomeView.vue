<template>
	<div class="container w-75 p-1">
		<h1 class="text-center m-1">Hi {{ username }}</h1>
		<p class="text-center">{{ secretMessage }}</p>
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

export default {
	data () {
		return {
			secretMessage: "",
			username: ""
		}
	},
	async created() {
		if (!this.$store.getters.isLoggedIn) {
			this.$router.push("/login")
		}
		this.username = this.$store.getters.getUser.username
		this.secretMessage = await AuthService.getSecretContent()
	},
	methods: {
		logout() {
			this.$store.dispatch("logout")
			this.$router.push("/login")
		}
	}
}
</script>
