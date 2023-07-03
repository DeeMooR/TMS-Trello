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

//карточка текущих дел
let listAddContent = document.querySelector('.list-add')
let addContentBtn = document.querySelector('.add-btn')
let editBtn = document.querySelector('.edit-btn')
let deleteBtn = document.querySelector('.delete-btn')
let applyBtn = document.querySelector('.card-item__btn-apply')
//модальное окно "Description!"
let windowDescription = document.querySelector('.window-description') 
let cancelDescriptionBtn = document.querySelector('.description-cancel-btn')
let confirmDescriptionBtn = document.querySelector('.description-confirm-btn')
//карточка завершенных дел
let listDone = document.querySelector('.list-done')
let deleteAllBtn = document.querySelector('.delete-all-btn')
//модальное окно "Warning!"
let windowWarning = document.querySelector('.window-warning') 
let cancelWarningBtn = document.querySelector('.warning-cancel-btn')
let confirmWarningBtn = document.querySelector('.warning-confirm-btn')
let warningText = document.querySelector('.warning__text')
//затемнение фона
let backdrop = document.querySelector('.backdrop')
function backdropOn() {
    backdrop.style.left = '0'
    backdrop.style.opacity = '1'
}
function backdropOff() {
    backdrop.style.left = '-100%'
    backdrop.style.opacity = '0'
}
// события по клику в карточке текущих  дел
listAddContent.addEventListener('click', ({target}) => {
    if (target == addContentBtn) {
        windowDescription.style.display = 'flex'
        backdropOn()
    }
    if (target == editBtn) {
        windowDescription.style.display = 'flex'
        backdropOn()
    }
    if (target == applyBtn) {
        warningText.innerHTML = 'Изменить статус карточки на "In progress"?'
        windowWarning.style.display = 'flex'
        backdropOn() 
    }
})
// события по клику в карточке заверщенных дел
listDone.addEventListener('click', ({target}) => {
    if (target == deleteAllBtn) {
        warningText.innerHTML = 'Вы уверены, что хотите удалить все карточки?'
        windowWarning.style.display = 'flex'
        backdropOn() 
    }
})
// клик в модальном окне Warning
document.addEventListener('click', ({target}) => {
    if (target == cancelWarningBtn) {
        windowWarning.style.display = 'none'
        backdropOff()
    }
    if (target == confirmWarningBtn) {
        //удаление всех карточек
    }
})
// клик в модальном окне Description
document.addEventListener('click', ({target}) => {
    if (target == cancelDescriptionBtn) {
        windowDescription.style.display = 'none'
        backdropOff()
    }
    if (target == confirmDescriptionBtn) {
        //подтвердить добавление карточки
    }
})