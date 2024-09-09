<template>
  <div class="home">
    <h1>Add New Todos</h1>
    <form action="" @submit.prevent="addTodo">
      <input
        type="text"
        v-model="todoObject.text"
        name=""
        id=""
        placeholder=" enter your task "
        required
      />
      <br />
      <input
        type="date"
        v-model="todoObject.from"
        placeholder="from"
        style="margin-top: 2%"
        required
      />
      <input
        type="date"
        placeholder="to"
        v-model="todoObject.to"
        style="margin-left: 2%; margin-bottom: 2%"
        required
      />
      <br />

      <input type="submit" value="Add" />
    </form>
  </div>
</template>

<script setup>
import todoMixin from "@/mixins/todo";
import { ref } from "vue";

const { todoList, addToLocalSt } = todoMixin();
//Data
const todoObject = ref({
  id: "",
  text: "",
  from: "",
  to: "",
  createdAt: "",
  isCompleted: false,
});
//Functions
const addTodo = () => {
  if (
    todoObject.value.text.trim() === "" ||
    todoObject.value.from === "" ||
    todoObject.value.to === ""
  ) {
    return;
  }
  todoObject.value.id = todoList.value.length + 1;
  todoObject.value.createdAt = new Date();
  todoList.value.push(todoObject.value);

  addToLocalSt();
  alert("Todo Was Added Successfully");
  todoObject.value = {
    id: "",
    text: "",
    from: "",
    to: "",
    createdAt: "",
    isCompleted: false,
  };
};
</script>
<style scoped lang="scss">
form {
  input[type="text"] {
    width: 50%;
    padding: 10px;
    font-size: 20px;
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
}
</style>
