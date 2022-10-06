<template>
	<div class="w75 container">

		<div class="text-center">
			<h1>Login</h1>
		</div>

		<div class="mb-3">
			<label class="form-label">Login</label>
			<input class="form-control" type="text" placeholder="Login" v-model="username" />
		</div>
			
		<div class="mb-3">
			<label class="form-label">Hasło</label>
			<input class="form-control" type="password" placeholder="Hasło" v-model="password" />
		</div>

		<div class="mb-3" v-if="msg">
			<p class="text-danger p-2 m-1 text-center h2">{{ msg }}</p>
		</div>

		<div class="mb-3 text-center">
			<button class="btn btn-primary p-2 m-1 text-uppercase" @click="login">
				Zaloguj
			</button>
		</div>

	</div>
</template>
<script>
import AuthService from "@/services/AuthService"
export default {
	data () {
		return {
			username: "",
			password: "",
			msg: ""
		}
	},
	methods: {
		async login() {
			try {
				const credentials = {
					username: this.username,
					password: this.password
				}
				const response = await AuthService.login(credentials)
				this.msg = response.msg
				const token = response.token
				const user = response.user
				this.$store.dispatch("login", { token, user })
				this.$router.push("/")
			} catch (error) {
				this.msg = error.response.data.msg
			}
		}
	}
}
</script>