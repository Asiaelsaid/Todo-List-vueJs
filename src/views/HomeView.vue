<template>
  <div class="home">
    <h1>Add New Todos</h1>
    <form action="" @submit.prevent="addTodo">
      <div class="form-group">
        <label for="task">Task:</label>
        <input
          type="text"
          v-model="todoObject.text"
          id="task"
          placeholder="Enter your task"
          required
        />
      </div>

      <div class="form-group">
        <label for="user">Select Your Name:</label>
        <select id="user" v-model="todoObject.user" required>
          <option value="" disabled>Select your name</option>
          <option v-for="user in users" :key="user" :value="user">
            {{ user }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="from">From:</label>
        <input
          type="datetime-local"
          v-model="todoObject.from"
          id="from"
          required
        />
      </div>

      <div class="form-group">
        <label for="to">To:</label>
        <input type="datetime-local" v-model="todoObject.to" id="to" required />
      </div>

      <input type="submit" value="Add" />
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTodoStore } from "@/store/todoStore";

const todoStore = useTodoStore();
const { users } = todoStore;
const formatDateTime = (date) => {
  const pad = (num) => num.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const now = new Date();
const currentDateTime = formatDateTime(now);
const todoObject = ref({
  id: "",
  text: "",
  user: "",
  from: currentDateTime,
  to: currentDateTime,
  createdAt: "",
  isCompleted: false,
});

const addTodo = () => {
  if (
    todoObject.value.text.trim() === "" ||
    todoObject.value.user === "" ||
    todoObject.value.from === "" ||
    todoObject.value.to === ""
  ) {
    return;
  }
  todoObject.value.id = todoStore.todoList.length + 1;
  todoObject.value.createdAt = new Date();
  todoStore.addTodo(todoObject.value);

  alert("Todo Was Added Successfully");
  todoObject.value = {
    id: "",
    text: "",
    user: "",
    from: "",
    to: "",
    createdAt: "",
    isCompleted: false,
  };
};
onMounted(() => {
  todoStore.updateTodoList();
});
</script>
<style scoped lang="scss">
form {
  input[type="text"] {
    width: 50%;
    padding: 10px;
    font-size: 20px;
  }
  .form-group {
    margin-bottom: 15px;
    label {
      display: block;
      font-size: 18px;
      padding: 0 100px;
      margin-bottom: 5px;
      text-align: left;
    }
  }
  input[type="submit"] {
    padding: 10px 20px;
    font-size: 20px;
    background-color: rgb(8, 100, 71);
    color: #fff;
    border: 1px solid rgb(8, 100, 71);
    border-radius: 7px;
    margin-left: 20px;
    cursor: pointer;
  }
  input[type="datetime-local"],
  select {
    width: 50%;
    padding: 15px;
    font-size: 20px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
  }
  input[type="datetime-local"]:focus,
  select:focus {
    border-color: rgb(8, 100, 71);
    background-color: #fff;
    box-shadow: 0 0 5px rgba(8, 100, 71, 0.5);
    outline: none;
  }

  select {
    width: 52% !important;
    appearance: none;
    cursor: pointer;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;
    padding-right: 30px;
  }
}
</style>
