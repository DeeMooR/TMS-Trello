'use strict'

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

let arrayCard = []

// создание новой карточки
function createCard() {   
    let card = document.createElement('div')
    card.classList.add('list-add__card', 'card')

    let cardItemTitle = document.createElement('div')
    cardItemTitle.setAttribute('class', 'card__item')

    let cardItemDescription = document.createElement('div')
    cardItemDescription.setAttribute('class', 'card__item')

    let cardItemUser = document.createElement('div')
    cardItemUser.setAttribute('class', 'card__item')

    let spanTitle = document.createElement('span')
    spanTitle.innerHTML = descriptionTitle.value

    let divButtons = document.createElement('div')

    let editBtn = document.createElement('button')
    editBtn.setAttribute('type', 'button')
    editBtn.classList.add('card-item__btn', 'edit-btn')
    editBtn.innerHTML = 'EDIT'

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('card-item__btn', 'delete-btn')
    deleteBtn.innerHTML = 'DELETE'

    let spanDescription = document.createElement('span')
    spanDescription.innerHTML = descriptionText.value

    let applyBtn = document.createElement('button')
    applyBtn.classList.add('card-item__btn', 'card-item__btn-apply')
    applyBtn.innerHTML = '>'

    let spanUser = document.createElement('span')
    spanUser.innerHTML = user.value

    let divDate = document.createElement('div')
    divDate.setAttribute('class', 'date')
    divDate.innerHTML = document.querySelector('.time').innerHTML

    divButtons.append(editBtn, deleteBtn)
    cardItemTitle.append(spanTitle, divButtons)
    cardItemDescription.append(spanDescription, applyBtn)
    cardItemUser.append(spanUser, divDate)

    card.append(cardItemTitle, cardItemDescription, cardItemUser)
    listContent.append(card)

    document.addEventListener('click', ({target}) => {
        if (target == editBtn) {
            windowDescription.style.display = 'flex'
            backdropOn()
            descriptionText.value = spanDescription.innerHTML
            descriptionTitle.value = spanTitle.innerHTML
            user.value = spanUser.innerHTML
            flag = false
        }

        if (target == confirmDescriptionBtn) {
            // применяется ко всем сразу ??
            spanTitle.innerHTML = descriptionTitle.value
            spanDescription.innerHTML = descriptionText.value
            flag = true
        }
        
        if (target == applyBtn) {
            arrayCard.push(descriptionTitle.value)

            if (arrayCard.length <= 6) {
                card.style.backgroundColor = 'rgb(240, 240, 255)'
                applyBtn.remove()
                editBtn.remove()
                deleteBtn.remove()
                divButtons.append(backBtn, comleteBtn)
                listProgress.append(card) 
            } else {
                windowWarning.style.display = 'flex'
                warningText.innerHTML = 'Сначала нужно выполнить текущие дела'
                confirmWarningBtn.remove()
                backdropOn()
            }
        }
        if (target == deleteBtn) {
            card.remove()
        }
        if (target == backBtn) {
            card.style.backgroundColor = 'rgb(152, 223, 138)'
            divButtons.append(editBtn, deleteBtn)
            cardItemDescription.append(applyBtn)
            backBtn.remove()
            comleteBtn.remove()
            listContent.append(card)
        }
        if (target == comleteBtn) {
            card.style.backgroundColor = 'rgb(135, 206, 250)'            
            backBtn.remove()
            comleteBtn.remove()
            divButtons.append(deleteBtn)
            listDoneContent.append(card)
        }
    })

    let backBtn = document.createElement('button')
    backBtn.classList.add('card-item__btn', 'back-btn')
    backBtn.innerHTML = 'BACK'
        
    let comleteBtn = document.createElement('button')
    comleteBtn.classList.add('card-item__btn', 'comlete-btn')
    comleteBtn.innerHTML = 'COMPLETE'
}

//карточка "Todo"
let listAddContent = document.querySelector('.list-add')
let listContent = document.querySelector('.list-add__content')
let addContentBtn = document.querySelector('.add-btn')

//карточка "In progress"
let listProgress = document.querySelector('.list-progress__content')

//карточка "Done"
let listDone = document.querySelector('.list-done')
let listDoneContent = document.querySelector('.list-done__content')
let deleteAllBtn = document.querySelector('.delete-all-btn')

//модальное окно "Description!"
let windowDescription = document.querySelector('.window-description') 
let descriptionTitle = document.querySelector('.description__title')
let descriptionText = document.querySelector('.description__text')
let cancelDescriptionBtn = document.querySelector('.description-cancel-btn')
let confirmDescriptionBtn = document.querySelector('.description-confirm-btn')
let user = document.querySelector('select')
let flag = true;

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

document.addEventListener('click', ({target}) => {
    // добавление новой карточки
    if (target == addContentBtn) {
        windowDescription.style.display = 'flex'
        backdropOn()
        descriptionTitle.value = '123'
        descriptionText.value = '123'
    }
    // удаление выполненных карточек
    if (target == deleteAllBtn) {
        warningText.innerHTML = 'Вы уверены, что хотите удалить все карточки?'
        windowWarning.style.display = 'flex'
        backdropOn() 
    }
})

// клик в модальном окне Description
document.addEventListener('click', ({target}) => {
    if (target == cancelDescriptionBtn) {
        windowDescription.style.display = 'none'
        backdropOff()
        flag = true
    }
    if (target == confirmDescriptionBtn && descriptionTitle.value.trim() !== '' && descriptionText.value.trim() !== '') {
        windowDescription.style.display = 'none'
        backdropOff()
        if (flag == true) {
            createCard()
        }
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
        windowWarning.style.display = 'none'
        backdropOff()
    }
})

let clock = document.querySelector('.clock')

function getTimeForClock() {
    let time = new Date();
    let hh = time.getHours();
    let mm = time.getMinutes();
    let ss = time.getSeconds(); //нужны ли секунды в часах?
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let timeClock = hh + ':' + mm;
    clock.innerHTML = timeClock;
    setTimeout(getTimeForClock, 1000);
}

getTimeForClock();