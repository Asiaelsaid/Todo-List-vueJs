<template>
  <div>
    <h2>Show Todos</h2>
    <div>
      <table style="width: 100%" v-if="todoList.length">
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
            v-for="(todo, index) in todoList"
            :key="todo.id"
            :style="`${
              todo.isCompleted ? 'background:#b8ecd0' : 'background:transparent'
            }`"
          >
            <td>{{ todo.text }}</td>
            <td>{{ todo.from }}</td>
            <td>{{ todo.to }}</td>
            <td>{{ new Date(todo.createdAt).toLocaleDateString() }}</td>
            <td>
              <div>
                <button class="completed" @click="markAsCompleted(todo)">
                  {{ todo.isCompleted ? "InCompleted" : "Completed" }}
                </button>
                <button class="del" @click="deleteTodo(index)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 v-else style="line-height: 15">No Todos To Show</h3>
    </div>
  </div>
</template>
<script setup>
import todoMixin from "@/mixins/todo";

const { todoList, addToLocalSt } = todoMixin();

const deleteTodo = (index) => {
  todoList.value.splice(index, 1);
  addToLocalSt();
};

const markAsCompleted = (todo) => {
  todo.isCompleted = !todo.isCompleted;
};
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
</style>
