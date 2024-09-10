<template>
  <div>
    <h2>Show Todos</h2>
    <!-- User Filter Dropdown -->
    <div>
      <label for="userFilter">Select User:</label>
      <select v-model="selectedUser" id="userFilter">
        <option value="" disabled>Select your name</option>
        <option v-for="user in users" :key="user" :value="user">
          {{ user }}
        </option>
      </select>
    </div>

    <!-- Todos List or Message -->
    <div>
      <div v-if="filteredTodos.length">
        <table style="width: 100%">
          <thead>
            <tr>
              <th>Text</th>
              <th>From</th>
              <th>To</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(todo, index) in filteredTodos"
              :key="todo.id"
              :style="{
                backgroundColor: todo.isCompleted ? '#b8ecd0' : 'transparent',
              }"
            >
              <td>{{ todo.text }}</td>
              <td>{{ formatDateTime(todo.from) }}</td>
              <td>{{ formatDateTime(todo.to) }}</td>
              <td>{{ new Date(todo.createdAt).toLocaleDateString() }}</td>
              <td>
                <div>
                  <button
                    class="completed"
                    @click="markAsCompleted(todo)"
                    :disabled="todo.isCompleted"
                    :style="{ cursor: todo.isCompleted ? 'auto' : 'pointer' }"
                  >
                    {{ todo.isCompleted ? "InCompleted" : "Completed" }}
                  </button>
                  <button class="del" @click="deleteTodo(index)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- No Todos Message -->
      <h3 v-else style="line-height: 15">No Todos To Show</h3>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useTodoStore } from "@/store/todoStore";
import { onMounted } from "vue";

const todoStore = useTodoStore();
const { users } = todoStore;
const selectedUser = ref("");

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
};

const filteredTodos = computed(() => {
  if (selectedUser.value === "") {
    return [];
  }
  return todoStore.todoList.filter((todo) => todo.user === selectedUser.value);
});

const deleteTodo = (index) => {
  todoStore.deleteTodo(index);
};

const markAsCompleted = (todo) => {
  todoStore.markAsCompleted(todo);
};
onMounted(() => {
  todoStore.updateTodoList();
});
</script>

<style lang="scss" scoped>
table {
  tr,
  td,
  th {
    border: 1px solid;
    padding: 5px;
  }
  td {
    button {
      background-color: rgb(16, 110, 85);
      color: #fff;
      font-size: 17px;
      padding: 5px 10px;
      border: 1px solid rgb(16, 110, 85);
      border-radius: 7px;
      cursor: pointer;
      &.del {
        background-color: indianred;
        border: 1px solid indianred;
        margin-left: 10px;
      }
    }
  }
}
#userFilter {
  margin-bottom: 15px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
