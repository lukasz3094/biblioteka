<template>
	<div class="w-75 container">
		
		<div class="text-center">
			<h1 class="p1 m-1">Zarejestruj się</h1>
		</div>
		
		<div class="mb-3">
			<label class="form-label">Login</label>
			<input class="form-control" type="text" placeholder="Login" 
				v-model="username" />
		</div>
		
		<div class="mb-3">
			<label class="form-label">Hasło</label>
			<input class="form-control" type="password" placeholder="Hasło" 
				v-model="password" />
		</div>

		<div class="mb-3">
			<label class="form-label">Powtórz Hasło</label>
			<input
				class="form-control" type="password"
				placeholder="Powtórz hasło" v-model="password_repeat"
			/>
		</div>
		
		<div class="mb-3" v-if="msg">
			<p class="text-danger p-2 m-1 text-center h2">{{ msg }}</p>
		</div>
		
		<div class="mb-3 text-center">
			<button @click="signUp" class="btn btn-primary p-2 m-1 text-uppercase" >
				Zarejestruj
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
			password_repeat: "",
			msg: ""
		}
	},
	methods: {
		async signUp() {
			try {
				const credentials = {
					username: this.username,
					password: this.password,
					password_repeat: this.password_repeat
				}
				const response = await AuthService.signUp(credentials)
				this.msg = response.msg
				} catch (error) {
					this.msg = error.response.data.msg
			}
		}
	}
}
</script>
