import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore("todoStore", () => {
  const todoList = ref([]);
  const users = ref(["Asia", "Eslam", "Kholod"]);

  const addToLocalSt = () => {
    localStorage.setItem("todos", JSON.stringify(todoList.value));
  };

  const updateTodoList = () => {
    if (localStorage.getItem("todos")) {
      todoList.value = JSON.parse(localStorage.getItem("todos"));
    }
  };

  const addTodo = (todo) => {
    todoList.value.push(todo);
    addToLocalSt();
  };

  const deleteTodo = (index) => {
    todoList.value.splice(index, 1);
    addToLocalSt();
  };

  const markAsCompleted = (todo) => {
    todo.isCompleted = !todo.isCompleted;
    addToLocalSt();
  };

  return {
    todoList,
    users,
    addToLocalSt,
    updateTodoList,
    addTodo,
    deleteTodo,
    markAsCompleted,
  };
});
