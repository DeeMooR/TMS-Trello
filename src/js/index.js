'use strict'
console.log ("JS работает");

new Swiper('.swiper-container', {
    slidesPerView: 1, //кол-во слайдов на странице
    initialSlide: 0,// какой слайд показан
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            let wordList = ['TODO', 'IN PROGRESS', 'DONE'];
            return '<span class="' + className + '">' + wordList[index] + '</span>';
        },
    },
});

let listAddContent = document.querySelector('.list-add') //карточка текущих дел
let addContentBtn = document.querySelector('.add-btn') //кнопка "Add todo"

let windowDescription = document.querySelector('.window-description') //модальное окно "Description!"
let cancelDescriptionBtn = document.querySelector('.description-cancel-btn') //кнопка "Cancel description"
let confirmDescriptionBtn = document.querySelector('.description-confirm-btn') //кнопка "Confirm description"

let listDone = document.querySelector('.list-done') //карточка завершенных дел
let deleteAllBtn = document.querySelector('.delete-all-btn') //кнопка "Delete all"

let windowWarning = document.querySelector('.window-warning') //модальное окно "Warning!"
let cancelWarningBtn = document.querySelector('.warning-cancel-btn') //кнопка "Cancel Warning"
let confirmWarningBtn = document.querySelector('.warning-confirm-btn') //кнопка "Confirm Warning"

let backdrop = document.querySelector('.backdrop') //затемнение фона

// события по клику в карточке текущих  дел
listAddContent.addEventListener('click', ({target}) => {
    if (target == addContentBtn) {
        windowDescription.style.display = 'flex'
        backdrop.style.left = '0'
        backdrop.style.opacity = '1'
    }
})

// события по клику в карточке заверщенных дел
listDone.addEventListener('click', ({target}) => {
    if (target == deleteAllBtn) {
        windowWarning.style.display = 'flex'
        backdrop.style.left = '0'
        backdrop.style.opacity = '1'
    }
})

// клик в модальном окне Warning
document.addEventListener('click', ({target}) => {
    if (target == cancelWarningBtn) {
        windowWarning.style.display = 'none'
        backdrop.style.left = '-100%'
        backdrop.style.opacity = '0'
    }
    if (target == confirmWarningBtn) {
        //удаление всех карточек
    }
})

// клик в модальном окне Description
document.addEventListener('click', ({target}) => {
    if (target == cancelDescriptionBtn) {
        windowDescription.style.display = 'none'
        backdrop.style.left = '-100%'
        backdrop.style.opacity = '0'
    }
    if (target == confirmDescriptionBtn) {
        //подтвердить добавление карточки
    }
})