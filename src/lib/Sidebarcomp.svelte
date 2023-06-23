<script>
  import {
    Sidebar,
    SidebarWrapper,
    SidebarGroup,
    SidebarItem,
  } from "flowbite-svelte";

  import {
    theme,
    upcomingClicked,
    todayClicked,
    overdueClicked,
    completedClicked,
    createFormModal,
    aboutClicked,
  } from "../stores";
</script>

<Sidebar asideClass="w-60">
  <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
    <SidebarGroup>
      <SidebarItem
        href="/"
        label="Create Todo"
        on:click={() => {
          createFormModal.set(true);
        }}
      >
        <svelte:fragment slot="icon">
          <svg
            width="24px"
            height="24px"
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
        </svelte:fragment>
      </SidebarItem>
      <!-- <SidebarItem label="Today" {spanClass} active={$loggedIn}> -->
      <SidebarItem
        href="/"
        label="Today"
        active={$todayClicked}
        on:click={() => {
          $todayClicked = true;
          $upcomingClicked = false;
          $overdueClicked = false;
          aboutClicked.set(false);
          $completedClicked = false;
        }}
      >
        <svelte:fragment slot="icon">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            /><g id="SVGRepo_iconCarrier"
              ><rect
                fill="none"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-linejoin="round"
                stroke-width="32"
                x="48"
                y="80"
                width="416"
                height="384"
                rx="48"
              /><line
                fill="none"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-linejoin="round"
                stroke-width="32"
                stroke-linecap="round"
                x1="128"
                y1="48"
                x2="128"
                y2="80"
              /><line
                fill="none"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-linejoin="round"
                stroke-width="32"
                stroke-linecap="round"
                x1="384"
                y1="48"
                x2="384"
                y2="80"
              /><rect
                fill="none"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-linejoin="round"
                stroke-width="32"
                stroke-linecap="round"
                x="112"
                y="224"
                width="96"
                height="96"
                rx="13"
              /><line
                fill="none"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-linejoin="round"
                stroke-width="32"
                stroke-linecap="round"
                x1="464"
                y1="160"
                x2="48"
                y2="160"
              /></g
            ></svg
          >
        </svelte:fragment>
      </SidebarItem>
      <!-- <SidebarItem label="Upcoming" {spanClass}> -->
      <SidebarItem
        href="/"
        label="Upcoming"
        on:click={() => {
          upcomingClicked.set(true);
          todayClicked.set(false);
          overdueClicked.set(false);
          aboutClicked.set(false);
          completedClicked.set(false);
        }}
        active={$upcomingClicked}
      >
        <svelte:fragment slot="icon">
          <svg
            width="24px"
            height="24px"
            viewBox="-5.4 0 98.4 98.4"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            /><g id="SVGRepo_iconCarrier">
              <g
                id="Group_4"
                data-name="Group 4"
                transform="translate(-822.7 -241.5)"
              >
                <path
                  id="Path_52"
                  data-name="Path 52"
                  d="M899.4,254.3H833.6a8.92,8.92,0,0,0-8.9,8.9V329a8.92,8.92,0,0,0,8.9,8.9h65.8a8.92,8.92,0,0,0,8.9-8.9V263.2A8.92,8.92,0,0,0,899.4,254.3Z"
                  fill="none"
                  stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="5.904"
                />
                <line
                  id="Line_25"
                  data-name="Line 25"
                  x2="21.2"
                  transform="translate(842.6 283.7)"
                  fill="none"
                  stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="5.904"
                />
                <line
                  id="Line_26"
                  data-name="Line 26"
                  x2="45.9"
                  transform="translate(842.6 302)"
                  fill="none"
                  stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="5.904"
                />
                <line
                  id="Line_27"
                  data-name="Line 27"
                  y2="19.6"
                  transform="translate(853.6 243.5)"
                  fill="none"
                  stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="5.904"
                />
                <line
                  id="Line_28"
                  data-name="Line 28"
                  y2="19.6"
                  transform="translate(879.4 243.5)"
                  fill="none"
                  stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="5.904"
                />
              </g>
            </g></svg
          >
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem
        href="/"
        label="Overdue"
        on:click={() => {
          upcomingClicked.set(false);
          todayClicked.set(false);
          overdueClicked.set(true);
          completedClicked.set(false);
          aboutClicked.set(false);
        }}
        active={$overdueClicked}
      >
        <svelte:fragment slot="icon">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke={$theme === "dark" ? "#ffffff" : "#000000"}
              stroke-width="0.032"
            />

            <g id="SVGRepo_iconCarrier">
              <g fill={$theme === "dark" ? "#ffffff" : "#000000"}>
                <path
                  d="M1.5 8a6.5 6.5 0 016.744-6.496.75.75 0 10.055-1.499 8 8 0 107.036 11.193.75.75 0 00-1.375-.6 6.722 6.722 0 01-.22.453A6.5 6.5 0 011.5 8zM10.726 1.238a.75.75 0 011.013-.312c.177.094.35.194.518.3a.75.75 0 01-.799 1.27 6.512 6.512 0 00-.42-.244.75.75 0 01-.312-1.014zM13.74 3.508a.75.75 0 011.034.235c.106.168.206.34.3.518a.75.75 0 11-1.326.702 6.452 6.452 0 00-.243-.421.75.75 0 01.235-1.034zM15.217 6.979a.75.75 0 01.777.722 8.034 8.034 0 01.002.552.75.75 0 01-1.5-.047 6.713 6.713 0 000-.45.75.75 0 01.721-.777z"
                />
                <path
                  d="M7.75 3a.75.75 0 01.75.75v3.786l2.085 1.043a.75.75 0 11-.67 1.342l-2.5-1.25A.75.75 0 017 8V3.75A.75.75 0 017.75 3z"
                />
              </g>
            </g>
          </svg>
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem
        href="/"
        label="Completed"
        on:click={() => {
          upcomingClicked.set(false);
          todayClicked.set(false);
          overdueClicked.set(false);
          completedClicked.set(true);
          aboutClicked.set(false);
        }}
        active={$completedClicked}
      >
        <svelte:fragment slot="icon">
          <svg
            width="23px"
            height="23px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M9 10L12.2581 12.4436C12.6766 12.7574 13.2662 12.6957 13.6107 12.3021L20 5"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M21 12C21 13.8805 20.411 15.7137 19.3156 17.2423C18.2203 18.7709 16.6736 19.9179 14.893 20.5224C13.1123 21.1268 11.187 21.1583 9.38744 20.6125C7.58792 20.0666 6.00459 18.9707 4.85982 17.4789C3.71505 15.987 3.06635 14.174 3.00482 12.2945C2.94329 10.415 3.47203 8.56344 4.51677 6.99987C5.56152 5.4363 7.06979 4.23925 8.82975 3.57685C10.5897 2.91444 12.513 2.81996 14.3294 3.30667"
                stroke={$theme === "dark" ? "#ffffff" : "#000000"}
                stroke-width="2"
                stroke-linecap="round"
              />
            </g>
          </svg>
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem
        label="About"
        href="/about"
        on:click={() => {
          upcomingClicked.set(false);
          todayClicked.set(false);
          overdueClicked.set(false);
          completedClicked.set(false);
          aboutClicked.set(true);
        }}
        active={$aboutClicked}
      >
        <svelte:fragment slot="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke={$theme === "dark" ? "#ffffff" : "#000000"}
            class="w-6 h-6"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            /></svg
          >
        </svelte:fragment>
      </SidebarItem>
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
