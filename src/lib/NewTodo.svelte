<script>
  // @ts-nocheck

  import {
    Modal,
    Label,
    Textarea,
    Select,
    Button,
    Input,
  } from "flowbite-svelte";
  import { createFormModal, token, allTodos } from "../stores";
  import { createTodo, getAllTodos } from "../utils";

  function todaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  function handleCreateTodo(e) {
    let formdata = new FormData(e.target);
    let data = Object.fromEntries(formdata.entries());
    data["status"] = false;

    createTodo($token, data)
      .then((data) => {
        getAllTodos($token)
          .then((data) => {
            $allTodos = data;
          })
          .catch((error) => {
          });
      })
      .catch((error) => {
      });
  }
</script>

<Modal bind:open={$createFormModal} size="xs" autoclose={false} class="w-full">
  <form
    class="flex flex-col space-y-6"
    method="post"
    on:submit|preventDefault={handleCreateTodo}
  >
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">
      Create New Todo
    </h3>

    <Label class="space-y-2">
      <span>Todo Name</span>
      <Input type="text" name="task_name" required placeholder="Todo Name" />
    </Label>

    <Label class="space-y-2">
      <span>Todo Description</span>
      <Textarea
        rows="2"
        name="task_description"
        placeholder="Description of the Todo"
      />
    </Label>

    <div class="flex gap-4 items-center">
      <Label class="flex-1 space-y-2">
        <span>Due Date</span>
        <Input
          type="date"
          name="due_date"
          size="sm"
          required
          min={todaysDate()}
          value={todaysDate()}
          placeholder={todaysDate()}
        />
      </Label>
      <Label class="flex-1 space-y-2">
        <span>Priority</span>
        <Select
          name="priority"
          required
          items={[
            { value: 3, name: "Low" },
            { value: 2, name: "Medium" },
            { value: 1, name: "High" },
          ]}
        />
      </Label>
    </div>
    <Label class="space-y-2">
      <span>Category</span>
      <Input
        type="text"
        name="category"
        required
        maxlength="10"
        placeholder="category"
      />
    </Label>
    <Button type="submit" class="w-full">Add Todo</Button>
  </form>
</Modal>
