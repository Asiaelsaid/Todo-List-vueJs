import { onMounted, ref } from "vue";

const todoMixin = () => {
  const todoList = ref([]);
  const addToLocalSt = () => {
    localStorage.setItem("todos", JSON.stringify(todoList.value));
  };
  const updateTodoList = () => {
    if (localStorage.getItem("todos")) {
      todoList.value = JSON.parse(localStorage.getItem("todos"));
    }
  };
  onMounted(() => {
    updateTodoList();
  });
  return { todoList, addToLocalSt };
};
export default todoMixin;
