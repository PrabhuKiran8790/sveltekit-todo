<script lang="ts">
  // @ts-ignore
  import "../app.postcss";
  import { onMount } from "svelte";
  import {
    DarkMode,
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Drawer,
    CloseButton,
    Button,
  } from "flowbite-svelte";
  import { sineIn } from "svelte/easing";
  import {
    theme,
    loggedIn,
    userLoginRegisterFormModal,
    token,
    allTodos,
    aboutClicked,
    todayClicked,
  } from "../stores";
  import Sidebarcomp from "../lib/Sidebarcomp.svelte";

  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  let breakPoint: number = 1024;
  let width: number;
  let backdrop: boolean = false;
  let activateClickOutside = true;
  let drawerHidden: boolean = false;
  $: if (width >= breakPoint) {
    drawerHidden = false;
    activateClickOutside = false;
  } else {
    drawerHidden = true;
    activateClickOutside = true;
  }
  onMount(() => {
    toggleTheme();
    if (width >= breakPoint) {
      drawerHidden = false;
      activateClickOutside = false;
    } else {
      drawerHidden = true;
      activateClickOutside = true;
    }
  });

  const toggleSide = () => {
    if (width < breakPoint) {
      drawerHidden = !drawerHidden;
    }
  };
  const toggleDrawer = () => {
    drawerHidden = false;
  };

  function toggleTheme() {
    theme.update(() => {
      if (localStorage.getItem("color-theme") === "dark") {
        return "dark";
      } else {
        return "light";
      }
    });
  }
</script>

<svelte:window bind:innerWidth={width} />
<Navbar let:hidden let:toggle class="bg-white dark:bg-gray-600 rounded-md">
  {#if $loggedIn}
    <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
  {/if}
  <NavBrand href="/" class={$loggedIn ? "-ml-14 lg:ml-64" : ""}>
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    >
      Todo App
    </span>
  </NavBrand>
  <div class="flex md:order-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={toggleTheme}>
      <DarkMode initialTheme="light" />
    </span>
    <Button
      size="sm"
      on:click={() => {
        if ($loggedIn) {
          // logged in so should display logout button
          loggedIn.set(false);
          token.set("");
          userLoginRegisterFormModal.set(false);
          allTodos.set([]);
        } else {
          userLoginRegisterFormModal.set(true);
        }
      }}>{$loggedIn ? "Logout" : "Login"}</Button
    >
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="order-1">
    <NavLi
      href="/"
      active={!$aboutClicked}
      on:click={() => {
        aboutClicked.set(false);
        todayClicked.set(true);
      }}>Home</NavLi
    >
    <NavLi
      href="/about"
      active={$aboutClicked}
      on:click={() => {
        aboutClicked.set(true);
        todayClicked.set(false);
      }}>About</NavLi
    >
  </NavUl>
</Navbar>

{#if $loggedIn}
  <Drawer
    transitionType="fly"
    {backdrop}
    {transitionParams}
    bind:hidden={drawerHidden}
    bind:activateClickOutside
    width="w-64"
    class="overflow-scroll pb-32"
    id="sidebar"
  >
    <div class="flex items-center">
      <CloseButton
        on:click={() => (drawerHidden = true)}
        class="mb-4 dark:text-white lg:hidden"
      />
    </div>
    <Sidebarcomp />
  </Drawer>
{/if}

{#if $loggedIn}
  <div class="overflow-hidden overflow-y-auto">
    <div class="flex p-4 mx-auto w-full custom-height">
      <main class="lg:ml-64 w-full mx-auto">
        <slot />
      </main>
    </div>
  </div>
{/if}

{#if !$loggedIn}
  <main>
    <slot />
  </main>
{/if}

<style>
  .custom-height {
    height: 92vh; /* Set height to 90% of viewport height */
  }
</style>
