import {clock} from "./clock.js";
import {checkWindowSize} from "./swiper.js";
import {inputSearch, search} from "./search.js";
import {getUserName} from "./users.js";
import {setName, getName} from "./localstorage.js";
import {createCard} from "./cards.js";

export let listAddCounter = document.querySelector('.list-add__header-number');
export let listProgressCounter = document.querySelector('.list-progress__header-number');
export let listDoneCounter = document.querySelector('.list-done__header-number');
listAddCounter.innerHTML = 0;
listProgressCounter.innerHTML = 0;
listDoneCounter.innerHTML = 0;

export let todos = [];

checkWindowSize();

window.addEventListener('resize', checkWindowSize);


let listAddContent = document.querySelector('.list-add')
export let listContent = document.querySelector('.list-add__content')
let addContentBtn = document.querySelector('.add-btn')

export let listProgress = document.querySelector('.list-progress__content')

let listDone = document.querySelector('.list-done')
export let listDoneContent = document.querySelector('.list-done__content')
let deleteAllBtn = document.querySelector('.delete-all-btn')

export let windowDescription = document.querySelector('.window-description') 
export let descriptionTitle = document.querySelector('.description__title')
export let descriptionText = document.querySelector('.description__text')
export let cancelDescriptionBtn = document.querySelector('.description-cancel-btn')
export let confirmDescriptionBtn = document.querySelector('.description-confirm-btn')
export let user = document.querySelector('select')
export let flag = {key:true};

export let windowWarning = document.querySelector('.window-warning') 
export let cancelWarningBtn = document.querySelector('.warning-cancel-btn')
export let confirmWarningBtn = document.querySelector('.warning-confirm-btn')
export let warningText = document.querySelector('.warning__text')

let backdrop = document.querySelector('.backdrop')
 export function backdropOn() {
    backdrop.style.left = '0'
    backdrop.style.opacity = '1'
}
export function backdropOff() {
    backdrop.style.left = '-100%'
    backdrop.style.opacity = '0'
}

document.addEventListener('click', ({target}) => {
    if (target == addContentBtn) {
        confirmDescriptionBtn.classList.add('description-confirm-btn')
        windowDescription.style.display = 'flex'
        backdropOn()
    }
    if (target == deleteAllBtn) {
        if (listDoneCounter.innerHTML > 0) {
            warningText.innerHTML = 'Вы уверены, что хотите удалить все выполненные карточки?'
        } else {
            warningText.innerHTML = 'Список пуст'
            confirmWarningBtn.hidden = true
        }
        windowWarning.style.display = 'flex'
        backdropOn()
    }
    if (target == cancelDescriptionBtn) {
        windowDescription.style.display = 'none'
        descriptionTitle.value = '';
        descriptionText.value = '';
        user.value = '';
        descriptionTitle.style.borderColor = 'black'
        descriptionText.style.borderColor = 'black'
        user.style.borderColor = 'black'
        backdropOff()
        flag.key = true
    }
    if (target == confirmDescriptionBtn 
        && descriptionTitle.value.trim() !== '' 
        && descriptionText.value.trim() !== '' 
        && user.value !== '') {

        windowDescription.style.display = 'none'
        backdropOff()
        if (flag.key == true) {
            listAddCounter.innerHTML = ++listAddCounter.innerHTML;
            createCard()
            descriptionTitle.value = '';
            descriptionText.value = '';
            user.value = '';
        }
    } else if (target == confirmDescriptionBtn) { 
        if (descriptionTitle.value.trim() == '') {
            descriptionTitle.style.borderColor = 'red'
        } else {
            descriptionTitle.style.borderColor = 'black'
        }
        if (descriptionText.value.trim() == '') {
            descriptionText.style.borderColor = 'red'
        } else {
            descriptionText.style.borderColor = 'black'
        }
        if (user.value == '') {
            user.style.borderColor = 'red'
        } else {
            user.style.borderColor = 'black'
        }
    }
    if (target == cancelWarningBtn) {
        windowWarning.style.display = 'none'
        warningText.innerHTML = ''
        backdropOff()
        confirmWarningBtn.hidden = false
    }
    if (target == confirmWarningBtn) {
        listDoneContent.innerHTML = ''
        listDoneCounter.innerHTML = 0;

        let array = todos.filter(value => value.status !== 'Done')
        todos = array
        setName()

        windowWarning.style.display = 'none'
        backdropOff()
    }
    if (target == inputSearch) {
        document.addEventListener('keyup', search);
    }
})

export let userName = [];

await getUserName();

for (let i = 0; i < userName.length; i++) {
    let newOption = document.createElement('option');
    newOption.classList.add(`user__${[i]}`);
    newOption.innerHTML = userName[i];
    user.appendChild(newOption);
}

if (localStorage.getItem('todos')) getName()
