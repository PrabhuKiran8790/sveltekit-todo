import { persisted } from 'svelte-local-storage-store';
import { writable } from 'svelte/store'

export const theme = writable("")
export const userLoginRegisterFormModal = writable(false)
export const updateInfo = writable({})
export const weakPassword = writable(false)
export const updateFormModal = writable(false)
export const todayClicked = writable(true)
export const upcomingClicked = writable(false)
export const overdueClicked = writable(false)
export const completedClicked = writable(false)
export const aboutClicked = writable(false)
export const createFormModal = writable(false)
export const loggedIn = persisted('loggedIn', false);
export const token = persisted('token', '');
export const todayTodos = writable('todayTodos', []);
export const upcomingTodos = writable('upcomingTodos', []);
export const overdueTodos = writable('overdueTodos', []);
export const completedTodos = writable('completedTodos', []);
export const allTodos = persisted('allTodos', []);

