'use strict'

let mySwiper;

function initSwiper() {
    let listContainer = document.querySelector('.list-container');
    let dListAdd = document.querySelector('.list-add');
    let dListProgress = document.querySelector('.list-progress');
    let dListDone = document.querySelector('.list-done');

    let htmlListAdd = dListAdd.outerHTML;
    let htmlListProgress = dListProgress.outerHTML;
    let htmlListDone = dListDone.outerHTML;

    listContainer.classList.add('swiper-container');

    listContainer.innerHTML = '';

    let swiperWrapper = document.createElement('div');
    swiperWrapper.classList = "swiper-wrapper";
    listContainer.append(swiperWrapper);

    let swiperPagination = document.createElement('div');
    swiperPagination.classList = "swiper-pagination";
    listContainer.append(swiperPagination);

    let swiperSlideAdd = document.createElement('div');
    swiperSlideAdd.classList = "swiper-slide";
    swiperSlideAdd.innerHTML = htmlListAdd;
    swiperWrapper.append(swiperSlideAdd);

    let swiperSlideProgress = document.createElement('div');
    swiperSlideProgress.classList = "swiper-slide";
    swiperSlideProgress.innerHTML = htmlListProgress;
    swiperWrapper.append(swiperSlideProgress);

    let swiperSlideDone = document.createElement('div');
    swiperSlideDone.classList = "swiper-slide";
    swiperSlideDone.innerHTML = htmlListDone;
    swiperWrapper.append(swiperSlideDone);

    mySwiper = new Swiper('.swiper-container', {
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
}

function destroySwiper() {
    if (mySwiper) {
        mySwiper.destroy();
        mySwiper = null;
    }
}

function checkWindowSize() {
    if (document.documentElement.clientWidth < 768) {
        if (!mySwiper) {
            initSwiper();
        }
    } else {
        destroySwiper();
    }
}

checkWindowSize();//проверяем размер при загрузке страницы

window.addEventListener('resize', checkWindowSize);//проверка размера при изменении ширины страницы

let listAddCounter = document.querySelector('.list-add__header-number');
let listProgressCounter = document.querySelector('.list-progress__header-number');
let listDoneCounter = document.querySelector('.list-done__header-number');

listAddCounter.innerHTML = 0;
listProgressCounter.innerHTML = 0;
listDoneCounter.innerHTML = 0;

let todos = []

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
    divDate.innerHTML = document.querySelector('.clock').innerHTML

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
            // так применяется ко всем сразу            
                // spanTitle.innerHTML = descriptionTitle.value
                // spanDescription.innerHTML = descriptionText.value

            // а так не работае кнопка edit
                card.spanTitle = descriptionTitle.value
                card.spanDescription = descriptionText.value

            flag = true
        }        
        if (target == applyBtn) {

            if (listProgressCounter.innerHTML < 6) {
                listAddCounter.innerHTML = --listAddCounter.innerHTML;
                listProgressCounter.innerHTML = ++listProgressCounter.innerHTML;
              
                todo.status = 'In progress'
                setName()   
              
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
            if (deleteBtn.closest('.list-add')) {
                listAddCounter.innerHTML = --listAddCounter.innerHTML;
            }
            if (deleteBtn.closest('.list-done')) {
                listDoneCounter.innerHTML = --listDoneCounter.innerHTML;
            }
            card.remove()
            todos.splice(todos.indexOf(todo), 1)
            setName()
        }
        if (target == backBtn) {
            listProgressCounter.innerHTML = --listProgressCounter.innerHTML;
            listAddCounter.innerHTML = ++listAddCounter.innerHTML;
            card.style.backgroundColor = 'rgb(152, 223, 138)'
            divButtons.append(editBtn, deleteBtn)
            cardItemDescription.append(applyBtn)
            backBtn.remove()
            comleteBtn.remove()
            listContent.append(card)

            todo.status = 'Task'
            setName()
        }
        if (target == comleteBtn) {
            listProgressCounter.innerHTML = --listProgressCounter.innerHTML;
            listDoneCounter.innerHTML = ++listDoneCounter.innerHTML;
            card.style.backgroundColor = 'rgb(135, 206, 250)'            
            backBtn.remove()
            comleteBtn.remove()
            divButtons.append(deleteBtn)
            listDoneContent.append(card)

            todo.status = 'Done'
            setName()
        }
    })

    let backBtn = document.createElement('button')
    backBtn.classList.add('card-item__btn', 'back-btn')
    backBtn.innerHTML = 'BACK'
        
    let comleteBtn = document.createElement('button')
    comleteBtn.classList.add('card-item__btn', 'comlete-btn')
    comleteBtn.innerHTML = 'COMPLETE'

    const todo = {}
    todo.id = userName.indexOf(user.value)
    todo.user = spanUser.innerHTML
    todo.title = spanTitle.innerHTML
    todo.text = spanDescription.innerHTML
    todo.time = divDate.innerHTML
    todo.status = 'Task'

    todos.push(todo)
    setName()
}

function setName() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getName() {
    let array = JSON.parse(localStorage.getItem('todos'))

    for (let i = 0; i < array.length; i++) {
        let cardNew = document.createElement('div')
        cardNew.classList.add('list-add__card', 'card')
        cardNew[i]
    
        let cardItemTitle = document.createElement('div')
        cardItemTitle.setAttribute('class', 'card__item')
    
        let cardItemDescription = document.createElement('div')
        cardItemDescription.setAttribute('class', 'card__item')
    
        let cardItemUser = document.createElement('div')
        cardItemUser.setAttribute('class', 'card__item')
    
        let spanTitle = document.createElement('span')
        spanTitle.innerHTML = array[i].title
    
        let divButtons = document.createElement('div')
    
        let editBtn = document.createElement('button')
        editBtn.setAttribute('type', 'button')
        editBtn.classList.add('card-item__btn', 'edit-btn')
        editBtn.innerHTML = 'EDIT'
    
        let deleteBtn = document.createElement('button')
        deleteBtn.classList.add('card-item__btn', 'delete-btn')
        deleteBtn.innerHTML = 'DELETE'
    
        let spanDescription = document.createElement('span')
        spanDescription.innerHTML = array[i].text
    
        let applyBtn = document.createElement('button')
        applyBtn.classList.add('card-item__btn', 'card-item__btn-apply')
        applyBtn.innerHTML = '>'
    
        let spanUser = document.createElement('span')
        spanUser.innerHTML = array[i].user
    
        let divDate = document.createElement('div')
        divDate.setAttribute('class', 'date')
        divDate.innerHTML = array[i].time
    
        let backBtn = document.createElement('button')
        backBtn.classList.add('card-item__btn', 'back-btn')
        backBtn.innerHTML = 'BACK'
            
        let comleteBtn = document.createElement('button')
        comleteBtn.classList.add('card-item__btn', 'comlete-btn')
        comleteBtn.innerHTML = 'COMPLETE'
    
        divButtons.append(editBtn, deleteBtn)
        cardItemTitle.append(spanTitle, divButtons)
        cardItemDescription.append(spanDescription, applyBtn)
        cardItemUser.append(spanUser, divDate)
    
        cardNew.append(cardItemTitle, cardItemDescription, cardItemUser)

        if (array[i].status === 'Task') listContent.append(cardNew)
        if (array[i].status === 'In progress') {
            cardNew.style.backgroundColor = 'rgb(240, 240, 255)'
            applyBtn.remove()
            editBtn.remove()
            deleteBtn.remove()
            divButtons.append(backBtn, comleteBtn)
            listProgress.append(cardNew)
        }
        if (array[i].status === 'Done') {
            cardNew.style.backgroundColor = 'rgb(135, 206, 250)'            
            backBtn.remove()
            comleteBtn.remove()
            editBtn.remove()
            applyBtn.remove()
            divButtons.append(deleteBtn)
            listDoneContent.append(cardNew)
        }

        if(listContent.childElementCount) {
            listAddCounter.innerHTML = listContent.childElementCount;
        } 

        if(listProgress.childElementCount) {
            listProgressCounter.innerHTML = listProgress.childElementCount;
        } 

        if(listDoneContent.childElementCount) {
            listDoneCounter.innerHTML = listDoneContent.childElementCount;
        } 
    
        const todoNew = {}
        todoNew.id = array[i].id
        todoNew.user = array[i].user
        todoNew.title = array[i].title
        todoNew.text = array[i].text
        todoNew.time = array[i].time
        todoNew.status = array[i].status

        todos.push(todoNew)

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
                // так применяется ко всем сразу            
                    // spanTitle.innerHTML = descriptionTitle.value
                    // spanDescription.innerHTML = descriptionText.value
    
                // а так не работае кнопка edit
                    cardNew.spanTitle = descriptionTitle.value
                    cardNew.spanDescription = descriptionText.value
    
                flag = true
            }        
            if (target == applyBtn) {

                if (listProgressCounter.innerHTML < 6) {
                    listAddCounter.innerHTML = --listAddCounter.innerHTML;
                    listProgressCounter.innerHTML = ++listProgressCounter.innerHTML;
                  
                    todoNew.status = 'In progress'
                    setName()   
                  
                    cardNew.style.backgroundColor = 'rgb(240, 240, 255)'
                    applyBtn.remove()
                    editBtn.remove()
                    deleteBtn.remove()
                    divButtons.append(backBtn, comleteBtn)
                    listProgress.append(cardNew) 
                } else {
                    windowWarning.style.display = 'flex'
                    warningText.innerHTML = 'Сначала нужно выполнить текущие дела'
                    confirmWarningBtn.remove()
                    backdropOn()
                }
            }
            if (target == deleteBtn) {
                if (deleteBtn.closest('.list-add')) {
                    listAddCounter.innerHTML = --listAddCounter.innerHTML;
                }
                if (deleteBtn.closest('.list-done')) {
                    listDoneCounter.innerHTML = --listDoneCounter.innerHTML;
                }
                cardNew.remove()
                todos.splice(todos.indexOf(todoNew), 1)
                setName()
            }
            if (target == backBtn) {
                listProgressCounter.innerHTML = --listProgressCounter.innerHTML;
                listAddCounter.innerHTML = ++listAddCounter.innerHTML;
                cardNew.style.backgroundColor = 'rgb(152, 223, 138)'
                divButtons.append(editBtn, deleteBtn)
                cardItemDescription.append(applyBtn)
                backBtn.remove()
                comleteBtn.remove()
                listContent.append(cardNew)
    
                todoNew.status = 'Task'
                setName()
            }
            if (target == comleteBtn) {
                listProgressCounter.innerHTML = --listProgressCounter.innerHTML;
                listDoneCounter.innerHTML = ++listDoneCounter.innerHTML;
                cardNew.style.backgroundColor = 'rgb(135, 206, 250)'            
                backBtn.remove()
                comleteBtn.remove()
                divButtons.append(deleteBtn)
                listDoneContent.append(cardNew)
    
                todoNew.status = 'Done'
                setName()
            }
        })    
    }
}

//карточка "Task"
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
        warningText.innerHTML = 'Вы уверены, что хотите удалить все выполненные карточки?'
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
    if (target == confirmDescriptionBtn && descriptionTitle.value.trim() !== '' && descriptionText.value.trim() !== '' && user.value !== '') {
        windowDescription.style.display = 'none'
        backdropOff()
        if (flag == true) {
            listAddCounter.innerHTML = ++listAddCounter.innerHTML;
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
        listDoneContent.innerHTML = ''
        listDoneCounter.innerHTML = 0;

        let array = todos.filter(value => value.status !== 'Done')
        todos = array
        setName()

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

let userName = [];
async function getUserName () {
    const responce = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await responce.json();
    for(let i = 0; i < 5; i++) {
        userName.push(users[i].name.split(' ')[0]);
    }
}
await getUserName();

for (let i = 0; i < userName.length; i++) {//добваление имен из масива userName в select
    let newOption = document.createElement('option');
    newOption.classList.add(`user__${[i]}`);
    newOption.innerHTML = userName[i];
    user.appendChild(newOption);
}

if (localStorage.getItem('todos')) getName()