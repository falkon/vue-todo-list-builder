import TodoListBuilder from './TodoListBuilder.vue'

const Table = {
	install(Vue, params = {}) {
		if (this.installed) {
			return
		}

		this.installed = true
		this.params = params

		Vue.component('todo-list-builder', TodoListBuilder)
	}
}

export default Table
