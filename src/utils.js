import { todayTodos, upcomingTodos, overdueTodos, completedTodos, allTodos } from './stores.js';

const API_URL = 'https://prabhukirankonda-fastapi-postgres-todo-api.hf.space/api';


// user login
export async function getToken(email, password) {
    const url = `${API_URL}/token/`;
    const data = new URLSearchParams();
    data.append('username', email);
    data.append('password', password);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error:', error.message);
        fetchError.set(true);
        throw error;
    }
};


export async function createUser(userData) {
    const url = `${API_URL}/users/`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function updateTodo(token, todoId, updatedTodo) {
    const url = `${API_URL}/users/todo/${todoId}`;
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify(updatedTodo);

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteTodoById(token, todoId) {
    const url = `${API_URL}/users/todo/${todoId}`;
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getTodayTodos(bearerToken) {
    const url = `${API_URL}/users/todo/today`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function createTodo(token, data) {
    const url = `${API_URL}/users/todo`;
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify(data);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error('Request failed with status' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function getUpcomingTodos(bearerToken) {
    const url = `${API_URL}/users/todo/upcoming`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function getOverdueTodos(bearerToken) {
    const url = `${API_URL}/users/todo/overdue`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function getCompletedTodos(bearerToken) {
    const url = `${API_URL}/users/todo/completed`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function getAllTodos(bearerToken) {
    const url = `${API_URL}/users/todo`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export function downloadTodos(bearerToken, whichTodo) {

    if (whichTodo === 'todayTodos') {

        getTodayTodos(bearerToken)
            .then((data) => {
                console.log(data); // Handle the todo list data
                todayTodos.set(data);
            })
            .catch((error) => {
                console.error(error); // Handle any errors that occurred during the request
            });
    } else if (whichTodo === 'upcomingTodos') {
        getUpcomingTodos(bearerToken)
            .then((data) => {
                console.log("upcoming todos fetching")
                console.log(data); // Handle the todo list data
                upcomingTodos.set(data);
            }).catch((error) => {
                console.log(error)

            });
    } else if (whichTodo === 'overdueTodos') {
        getOverdueTodos(bearerToken)
            .then((data) => {
                console.log(data); // Handle the todo list data
                overdueTodos.set(data);
            }).catch((error) => {
                console.log(error)
            });
    } else if (whichTodo === 'completedTodos') {
        getCompletedTodos(bearerToken)
            .then((data) => {
                console.log(data); // Handle the todo list data
                completedTodos.set(data);
            }).catch((error) => {
                console.log(error)
            });
    } else if (whichTodo === 'allTodos') {
        getAllTodos(bearerToken)
            .then((data) => {
                console.log(data); // Handle the todo list data
                allTodos.set(data);
            }).catch((error) => {
                console.log(error)
            })
    }
}


export function compareDates(givenDate) {
    const currentDate = new Date();
    const inputDate = new Date(givenDate);

    // Extract year, month, and day from the inputDate
    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth();
    const inputDay = inputDate.getDate();

    // Extract year, month, and day from the currentDate
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    if (inputYear < currentYear) {
        return "past";
    } else if (inputYear === currentYear && inputMonth < currentMonth) {
        return "past";
    } else if (
        inputYear === currentYear &&
        inputMonth === currentMonth &&
        inputDay < currentDay
    ) {
        return "past";
    } else if (
        inputYear === currentYear &&
        inputMonth === currentMonth &&
        inputDay === currentDay
    ) {
        return "today";
    } else {
        return "upcoming";
    }
}