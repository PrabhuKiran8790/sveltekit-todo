<script>
  // @ts-nocheck
  import { Heading, P } from "flowbite-svelte";
  import {
    theme,
    todayTodos,
    loggedIn,
    token,
    updateFormModal,
    upcomingTodos,
    todayClicked,
    upcomingClicked,
    overdueClicked,
    overdueTodos,
    allTodos,
    completedClicked,
    createFormModal,
  } from "../stores";
  import Todocard from "../lib/Todocard.svelte";
  import { getAllTodos, compareDates } from "../utils";
  import { onMount } from "svelte";
  import NewTodo from "./NewTodo.svelte";

  function getFormattedDate() {
    const currentDate = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  function separateTasksByDueDateAndStatus(tasks) {
    const currentTasks = [];
    const overdueTasks = [];
    const upcomingTasks = [];
    const completedTasks = [];

    tasks.forEach((task) => {
      if (compareDates(task.due_date) === "today" && task.status !== true) {
        currentTasks.push(task);
      } else if (
        compareDates(task.due_date) === "past" &&
        task.status !== true
      ) {
        overdueTasks.push(task);
      } else if (
        compareDates(task.due_date) === "upcoming" &&
        task.status !== true
      ) {
        console.log("task status: ", task.status);
        upcomingTasks.push(task);
      } else if (task.status === true) {
        completedTasks.push(task);
      }
    });

    return {
      currentTasks,
      overdueTasks,
      upcomingTasks,
      completedTasks,
    };
  }

  $: ({ currentTasks, overdueTasks, upcomingTasks, completedTasks } =
    separateTasksByDueDateAndStatus($allTodos));

  onMount(() => {
    if ($loggedIn) {
      getAllTodos($token)
        .then((data) => {
          console.log(data); // Handle the todo list data
          allTodos.set(data);
          const separatedTasks = separateTasksByDueDateAndStatus($allTodos);
          todayTodos.set(separatedTasks.currentTasks);
          upcomingTodos.set(separatedTasks.upcomingTasks);
          overdueTodos.set(separatedTasks.overdueTasks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
</script>

<div>
  <div
    class="flex flex-row justify-between rounded-md shadow-md mx-auto my-auto mb-4 content-center items-center bg-teal-50 dark:bg-gray-700 p-2"
  >
    {#if $todayClicked}
      <P class="font-bold">Today</P>
      <P tag="h6">{getFormattedDate()}</P>
    {/if}
    {#if $upcomingClicked}
      <P class="font-bold">Upcoming Todos</P>
    {/if}
    {#if $overdueClicked}
      <P class="font-bold">Overdue Todos</P>
    {/if}
    {#if $completedClicked}
      <P class="font-bold">Completed Todos</P>
    {/if}
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    {#if $todayClicked}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => {
          createFormModal.set(true);
        }}
        class="relative w-full text-center hover:cursor-pointer max-w-sm mx-auto hover:bg-pink-50 bg-white dark:bg-slate-700 hover:dark:bg-slate-600 rounded-lg shadow-md p-4 mb-2 flex flex-col justify-center items-center"
      >
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          /><g id="SVGRepo_iconCarrier">
            <path
              d="M9 12H15"
              stroke={$theme === "dark" ? "#ffffff" : "#000000"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 9L12 15"
              stroke={$theme === "dark" ? "#ffffff" : "#000000"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
              stroke={$theme === "dark" ? "#ffffff" : "#000000"}
              stroke-width="2"
            />
          </g></svg
        >
        <Heading tag="h4">Add a New Todo</Heading>
      </div>
    {/if}

    {#if $todayClicked}
      {#each currentTasks as item (item.todo_id)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <Todocard
          task_name={item.task_name}
          task_description={item.task_description}
          due_date={item.due_date}
          priority={item.priority}
          category={item.category}
          status={item.status}
          todo_id={item.todo_id}
        />
      {/each}
    {/if}

    {#if $upcomingClicked}
      {#each upcomingTasks as item (item.todo_id)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <Todocard
          task_name={item.task_name}
          task_description={item.task_description}
          due_date={item.due_date}
          priority={item.priority}
          category={item.category}
          status={item.status}
          todo_id={item.todo_id}
        />
      {/each}
    {/if}

    {#if $overdueClicked}
      {#each overdueTasks as item (item.todo_id)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <Todocard
          task_name={item.task_name}
          task_description={item.task_description}
          due_date={item.due_date}
          priority={item.priority}
          category={item.category}
          status={item.status}
          todo_id={item.todo_id}
        />
      {/each}
    {/if}

    {#if $completedClicked}
      {#each completedTasks as item (item.todo_id)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <Todocard
          task_name={item.task_name}
          task_description={item.task_description}
          due_date={item.due_date}
          priority={item.priority}
          category={item.category}
          status={item.status}
          todo_id={item.todo_id}
        />
      {/each}
    {/if}

    <NewTodo />
  </div>
</div>
