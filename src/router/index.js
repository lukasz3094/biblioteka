import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView"
import SignupView from "../views/SignUpView"
import LoginView from "../views/LoginView"

import AllBooks from "../views/home/AllBooks"
import ToBorrowBooks from "../views/home/ToBorrowBooks"
import BookById from "../views/home/BookById"

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		children: [
			{
				path: "all-books",
				name: "allBooks",
				component: AllBooks
			},
			{
				path: "to-borrow-books",
				name: "toBorrowBooks",
				component: ToBorrowBooks
			},
			{
				path: "book-by-id",
				name: "bookById",
				component: BookById
			},
			{
				path: "",
				name: "allBooksStandard",
				component: AllBooks
			}
		]
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
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
