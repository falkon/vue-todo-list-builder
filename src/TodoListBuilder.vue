<template>
    <div>
        <ul class="todo-list-builder">
            <li v-for="task in TasksCd">
                <label>
                    <input type="checkbox" v-model="task.value" @change="sendTask(task)" :disabled="disabled[task.id]">
                    {{ task.title }}
                </label>
            </li>
            <div v-if="addTask">
                <input type="text" placeholder="Add tasks" v-on:keyup.enter="sendNewTask" v-model="newTask">
            </div>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'todo-list',
        props: {
            tasks: {
                type: Array,
                default: function () { return [] }
            },
            url: {
                type: String,
                required: true
            },
            addTask: {
                type: Boolean,
                default: false
            },
            errThrottle: {
                type: String,
                default: ''
            },
            errOther: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                loading: false,
                newTask: '',
                disabled: [],
                inTasks: []
            }
        },
        mounted() {
            this.inTasks = this.tasks;
        },
        computed: {
            TasksCd() {
                return this.inTasks.map( item => {
                    item.value = item.value*1;
                    return item;
                });
            },
            //Fast check task by id
            ids() {
                let arr = [];
                this.inTasks.map( (item, i) => {
                    arr[item.id] = i;
                });
                return arr;
            }
        },
        methods: {
            //Server methods
            sendTask(task) {
                this.loading = true;
                this.$set(this.disabled, task.id, true);
                axios.post(this.url, task)
                    .then(response => {
                        if (this.isSet(response.data.success) && response.data.success === true && response.data.tasks) {
                            this.updateTasks(response.data.tasks);
                        }
                    })
                    .catch(error => {
                        if (error.response.status === 422) {
                            this.notify(error.response.data.error)
                        } else if (error.response.status === 429) {
                            this.notify(this.errThrottle);
                        } else {
                            this.notify(this.errOther);
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                        this.$set(this.disabled, task.id, false);
                    });
            },
            sendNewTask() {
                this.sendTask({
                    title: this.newTask,
                    value: false
                });
                this.newTask = '';
            },
            //Component Methods
            updateTasks(tasks) {
                if (tasks.length > 1) {
                    tasks.map(task => {
                        this.setTask(task);
                    });
                } else {
                    this.setTask(tasks);
                }
            },
            setTask(task) {
                (this.hasTask(task)) ? this.updateTask(task) : this.createTask(task);
            },
            updateTask(task) {
                let index = this.ids[task.id];
                this.inTasks[index]['value'] = task.value;
            },
            createTask(task) {
                this.inTasks.push(task);
            },
            hasTask(task) {
                return this.ids[task.id] !== undefined;
            },
            //Support methods
            isSet(val) {
                return ( typeof val !== "undefined" && val !== '' );
            },
            notify(msg) {
                alert(msg);
            }
        }
    }
</script>