import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView"
import SignupView from "../vies/SignupView"
import LoginView from "../vies/LoginView"

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView
	},
	{
		path: "/sign-up",
		name: "sign-up",
		component: SignupView
	},
	{
		path: "/login",
		name: "login",
		component: LoginView
	},
	{
		path: "/:catchAll(.*)",
		name: "NotFound",
		component: HomeView,
	}
	// {
	// 	path: "/about",
	// 	name: "about",
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
	// }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
