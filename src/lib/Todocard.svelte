<script>
  // @ts-nocheck
  import {
    Modal,
    Badge,
    Button,
    Input,
    Label,
    Textarea,
    Select,
    Span,
    Spinner,
    Heading,
  } from "flowbite-svelte";
  import {
    theme,
    token,
    updateFormModal,
    updateInfo,
    allTodos,
  } from "../stores";
  import { updateTodo, getAllTodos, deleteTodoById } from "../utils";

  export let task_name;
  export let task_description;
  export let due_date;
  export let priority;
  export let status;
  export let category;
  export let todo_id;

  let updateWaiting = false;
  let deleteWaiting = false;
  let taskAction = false;

  function parsePriority(priority_value) {
    switch (priority_value) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Low";
    }
  }

  function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  function openFormModal() {
    // don't make any changes to this function
    let updateInformation = {
      task_name: task_name,
      task_description: task_description,
      due_date: due_date,
      priority: priority,
      status: status,
      category: category,
      todo_id: todo_id,
    };
    updateInfo.set(updateInformation);
    updateFormModal.set(true);
  }

  async function handleUpdateTodo(e) {
    updateWaiting = true;
    let formdata = new FormData(e.target);
    let data = Object.fromEntries(formdata.entries());
    data["status"] = false;

    updateTodo($token, $updateInfo.todo_id, data)
      .then((data) => {
        console.log(data);
        getAllTodos($token)
          .then((data) => {
            $allTodos = data;
            updateWaiting = false;
          })
          .catch((error) => {
          });
        updateFormModal.set(false);
      })
      .catch((error) => {
      });
  }

  async function deleteTodo(id) {
    deleteWaiting = true;
    deleteTodoById($token, id)
      .then((data) => {
        getAllTodos($token)
          .then((data) => {
            $allTodos = data;
            deleteWaiting = false;
          })
          .catch((error) => {
          });
        taskAction = false;
      })
      .catch((error) => {
      });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
  on:click={() => {
    taskAction = true;
  }}
  class="relative w-full max-w-sm mx-auto hover:bg-pink-50 bg-white dark:bg-slate-700 hover:dark:bg-slate-600 rounded-lg shadow-md p-4 mb-2 flex flex-col justify-between hover:cursor-pointer"
>
  <div>
    <div class="flex items-center justify-between mb-4">
      <Span class="text-xs font-semibold text-gray-600 dark:text-gray-400"
        >{due_date}</Span
      >
      <Badge
        border
        color={parsePriority(priority) === "High"
          ? "red"
          : parsePriority(priority) === "Medium"
          ? "yellow"
          : "green"}>{parsePriority(priority)}</Badge
      >
    </div>
    <h2
      class="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex-wrap-reverse"
    >
      {task_name}
    </h2>
    <p class="text-gray-600 dark:text-gray-300 mb-4">{task_description}</p>
  </div>
  <div class="mt-auto flex justify-between -mb-2">
    <span class="text-sm font-semibold text-gray-600 dark:text-gray-400"
      ><Badge color="purple">
        <div class="pr-1 pl-0">
          <svg
            width="13px"
            height="13px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            /><g id="SVGRepo_iconCarrier">
              <path
                d="M4.40476 15.5264L8.93476 20.0564C10.7948 21.9164 13.8148 21.9164 15.6848 20.0564L20.0748 15.6664C21.9348 13.8064 21.9348 10.7864 20.0748 8.91637L15.5348 4.39637C14.5848 3.44637 13.2748 2.93637 11.9348 3.00637L6.93476 3.24637C4.93476 3.33637 3.34476 4.92637 3.24476 6.91637L3.00476 11.9164C2.94476 13.2664 3.45476 14.5764 4.40476 15.5264Z"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.73486 12.2263C11.1156 12.2263 12.2349 11.107 12.2349 9.72632C12.2349 8.34561 11.1156 7.22632 9.73486 7.22632C8.35415 7.22632 7.23486 8.34561 7.23486 9.72632C7.23486 11.107 8.35415 12.2263 9.73486 12.2263Z"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M13.2349 17.2263L17.2349 13.2263"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g></svg
          >
        </div>
        {category}</Badge
      ></span
    >
    <span class="text-sm font-semibold text-gray-600 dark:text-gray-400">
      {#if status}<Badge color="green" class="text-black text-sm">
          <svg
            aria-hidden="true"
            class="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            /></svg
          >

          <span class="mx-2">Completed</span></Badge
        >
      {:else}<Badge rounded>
          <svg
            aria-hidden="true"
            class="w-3 h-3 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            /></svg
          >
          Pending
        </Badge>
      {/if}
    </span>
  </div>
</div>

<Modal bind:open={$updateFormModal} size="xs" autoclose={false} class="w-full">
  <form
    class="flex flex-col space-y-6"
    method="post"
    on:submit|preventDefault={handleUpdateTodo}
  >
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">
      Update Todo
    </h3>

    <Label class="space-y-2">
      <span>Todo Name</span>
      <Input
        type="text"
        name="task_name"
        placeholder={$updateInfo.task_name}
        required
        value={$updateInfo.task_name}
      />
    </Label>

    <Label class="space-y-2">
      <span>Todo Description</span>
      <Textarea
        placeholder={$updateInfo.task_description}
        value={$updateInfo.task_description}
        rows="2"
        name="task_description"
      />
    </Label>

    <div class="flex gap-4 items-center">
      <Label class="flex-1 space-y-2">
        <span>Due Date</span>
        <Input
          type="date"
          name="due_date"
          placeholder={getCurrentDate()}
          value={getCurrentDate()}
          min={getCurrentDate()}
          size="sm"
          required
        />
      </Label>
      <Label class="flex-1 space-y-2">
        <span>Priority</span>
        <Select
          value={$updateInfo.priority}
          required
          name="priority"
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
        placeholder={$updateInfo.category}
        required
        value={$updateInfo.category}
        maxlength="10"
      />
    </Label>
    <Button type="submit" class="w-full1"
      >{#if updateWaiting}
        <Spinner class="mr-3" size="4" color="white" />
        Updating..
      {:else}
        Register
      {/if}</Button
    >
  </form>
</Modal>

<Modal bind:open={taskAction} size="xs" autoclose>
  <div class="text-center">
    <div class="mt-4">
      <Heading tag="h5">{task_name}</Heading>
    </div>
    <div class="m-3">
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Select an action
      </h3>
    </div>
    <div class="flex flex-row justify-evenly">
      <Button
        color="green"
        class="mr-2"
        on:click={() => {
          let tId = todo_id;
          let da = {
            task_name: task_name,
            task_description: task_description,
            due_date: due_date,
            priority: priority,
            status: true,
            category: category,
          };
          console.log(da);
          updateTodo($token, tId, da)
            .then((data) => {
              console.log(data);
              getAllTodos($token)
                .then((data) => {
                  console.log(data); // Handle the todo list data
                  $allTodos = data;
                  updateWaiting = false;
                })
                .catch((error) => {
                  console.error(error);
                });
              taskAction = false;
            })
            .catch((error) => {
              console.error(error);
            });
        }}>Completed</Button
      >
      <Button color="yellow" class="mr-2" on:click={openFormModal}
        >Update</Button
      >
      <Button color="red" class="mr-2" on:click={deleteTodo(todo_id)}
        >{#if deleteWaiting}
          <Spinner class="mr-3" size="3" color="white" />
          Deleting..
        {:else}
          Delete
        {/if}</Button
      >
    </div>
  </div>
</Modal>
