<template>
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
				<tr>
					<th scope="row">{{ book.id_ksiazki }}</th>
					<td>{{ book.tytul }}</td>
					<td>{{ book.imie }} {{ book.nazwisko }}</td>
					<td>{{ book.nazwa }}</td>
					<td class="col">{{ book.rok_wydania }}</td>
					<td>{{ book.isbn }}</td>
				</tr>
			</tbody>
            <tfoot>
                <tr>
                    <td colspan="2"></td>
                    <td>
                        <button @click="borrowBook({ 'bookId': book.id_ksiazki,
                                'userId': userId })"
                                class="btn btn-primary text-uppercase">
                            Wypożycz
                        </button> 
                    </td>
                    <td>
                        <button @click="clearChoosen" 
                                class="btn btn-secondary text-uppercase">
                            Wróć
                        </button>
                    </td>
                </tr>
            </tfoot>
		</table>
</template>
<script>
import { mapActions } from "vuex"
export default {
    data () {
        return {
            userId: ''
        }
    },
    props: {
        book: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapActions({ borrowBook: "borrowBook" })
    },
    created () {
        this.userId = this.$store.getters.getUser.id.id_login
    }
}
</script>
