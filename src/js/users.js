import { userName } from "./index.js";

export async function getUserName () {
    const responce = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await responce.json();
    for(let i = 0; i < 5; i++) {
        userName.push(users[i].name.split(' ')[0]);
    }
}