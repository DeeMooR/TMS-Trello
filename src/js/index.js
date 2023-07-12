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

// let htmlListAdd = dListAdd.outerHTML;
// let htmlListProgress = dListProgress.outerHTML;
// let htmlListDone = dListDone.outerHTML;

checkWindowSize();//проверяем размер при загрузке страницы

window.addEventListener('resize', checkWindowSize);//проверка размера при изменении ширины страницы

//карточка "Task"
let listAddContent = document.querySelector('.list-add')
export let listContent = document.querySelector('.list-add__content')
let addContentBtn = document.querySelector('.add-btn')

//карточка "In progress"
export let listProgress = document.querySelector('.list-progress__content')

//карточка "Done"
let listDone = document.querySelector('.list-done')
export let listDoneContent = document.querySelector('.list-done__content')
let deleteAllBtn = document.querySelector('.delete-all-btn')

//модальное окно "Description!"
export let windowDescription = document.querySelector('.window-description') 
export let descriptionTitle = document.querySelector('.description__title')
export let descriptionText = document.querySelector('.description__text')
export let cancelDescriptionBtn = document.querySelector('.description-cancel-btn')
export let confirmDescriptionBtn = document.querySelector('.description-confirm-btn')
export let user = document.querySelector('select')
export let flag = {key:true};

//модальное окно "Warning!"
export let windowWarning = document.querySelector('.window-warning') 
export let cancelWarningBtn = document.querySelector('.warning-cancel-btn')
export let confirmWarningBtn = document.querySelector('.warning-confirm-btn')
export let warningText = document.querySelector('.warning__text')

//затемнение фона
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
    // добавление новой карточки
    if (target == addContentBtn) {
        confirmDescriptionBtn.classList.add('description-confirm-btn')
        windowDescription.style.display = 'flex'
        backdropOn()
        // descriptionTitle.value = ''
        // descriptionText.value = ''
    }
    // удаление всех выполненных карточек
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
    // закрыть модальное окно Description
    if (target == cancelDescriptionBtn) {
        windowDescription.style.display = 'none'
        backdropOff()
        flag.key = true
    }
    // подтвердить добавление новой карточки в Description
    if (target == confirmDescriptionBtn 
        && descriptionTitle.value.trim() !== '' 
        && descriptionText.value.trim() !== '' 
        && user.value !== '') {

        windowDescription.style.display = 'none'
        backdropOff()
        if (flag.key == true) {
            listAddCounter.innerHTML = ++listAddCounter.innerHTML;
            createCard()
        }
    }
    // закрыть модальное окно Warning
    if (target == cancelWarningBtn) {
        windowWarning.style.display = 'none'
        warningText.innerHTML = ''
        backdropOff()
        confirmWarningBtn.hidden = false
    }
    // подтвердить удаление всех карточек в листе "Done"
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

// getTimeForClock();

export let userName = [];

await getUserName();

for (let i = 0; i < userName.length; i++) {//добваление имен из масива userName в select
    let newOption = document.createElement('option');
    newOption.classList.add(`user__${[i]}`);
    newOption.innerHTML = userName[i];
    user.appendChild(newOption);
}

if (localStorage.getItem('todos')) getName()

function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
}
function onDragOver(event) {
    event.preventDefault();
}
function onDrop(event) {
    const id = event
        .dataTransfer
        .getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);

    event
    .dataTransfer
    .clearData();
}