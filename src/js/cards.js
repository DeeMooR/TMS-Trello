import { listDoneContent, listContent, listProgress, listAddCounter, listProgressCounter, listDoneCounter, todos, windowDescription, backdropOn, backdropOff, descriptionTitle, descriptionText, confirmDescriptionBtn, user, flag} from "./index.js"
import {setName} from "./localstorage.js";
import {windowWarning, confirmWarningBtn, warningText} from "./index.js"

export function createCard() {// создание новой карточки
    let card = document.createElement('div')
    card.classList.add('list-add__card', 'card')
    card.setAttribute('id', 'draggable')
    card.draggable = true
    //card.setAttribute('ondragstart', 'onDragStart(event);')

    let cardItemTitle = document.createElement('div')
    cardItemTitle.setAttribute('class', 'card__item')

    let cardItemDescription = document.createElement('div')
    cardItemDescription.setAttribute('class', 'card__item')

    let cardItemUser = document.createElement('div')
    cardItemUser.setAttribute('class', 'card__item')

    let spanTitle = document.createElement('span')
    spanTitle.classList.add('title')
    spanTitle.innerHTML = descriptionTitle.value

    let divButtons = document.createElement('div')
    divButtons.classList.add('divButtons')

    let editBtn = document.createElement('button')
    editBtn.setAttribute('type', 'button')
    editBtn.classList.add('card-item__btn', 'edit-btn')
    editBtn.innerHTML = 'EDIT'

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('card-item__btn', 'delete-btn')
    deleteBtn.innerHTML = 'DELETE'

    let spanDescription = document.createElement('span')
    spanDescription.classList.add('text')
    spanDescription.innerHTML = descriptionText.value

    let applyBtn = document.createElement('button')
    applyBtn.classList.add('card-item__btn', 'card-item__btn-apply')
    applyBtn.innerHTML = '>'

    let spanUser = document.createElement('span')
    spanUser.classList.add('name')
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

    let backBtn = document.createElement('button')
    backBtn.classList.add('card-item__btn', 'back-btn')
    backBtn.innerHTML = 'BACK'
        
    let comleteBtn = document.createElement('button')
    comleteBtn.classList.add('card-item__btn', 'comlete-btn')
    comleteBtn.innerHTML = 'COMPLETE'

    const todo = {}
    todo.id = Date.now()
    todo.user = spanUser.innerHTML
    todo.title = spanTitle.innerHTML
    todo.text = spanDescription.innerHTML
    todo.time = divDate.innerHTML
    todo.status = 'Task'
    todos.push(todo)

    function textlow (element) {
        var text = spanDescription.innerHTML;
        if (text.length > 100) {
        element.innerText = text.substring(0, 15) + "...";
        } else {
        element.innerText = text;
        }
    }

    textlow (spanDescription)

    document.addEventListener('click', (event) => {
        if (event.target == editBtn) {
            let todoCell = event.target.closest('.list-add__card');
            let index = Array.from(todoCell.parentElement.children).indexOf(todoCell);
            windowDescription.style.display = 'flex'
            backdropOn()
            descriptionText.value = spanDescription.innerHTML
            descriptionTitle.value = spanTitle.innerHTML
            user.value = spanUser.innerHTML
            flag.key = false
            let confirmDescriptionBtnEvent = (event) => {
                if (event.target === confirmDescriptionBtn && descriptionTitle.value.trim() !== '' && descriptionText.value.trim() !== '' && user.value !== '') {
                    if(todos[index].id) {
                        windowDescription.style.display = 'none';
                        backdropOff();
                        todos[index].title = descriptionTitle.value;
                        todos[index].text = descriptionText.value;
                        todos[index].user = user.value;
                        todo.title = todos[index].title;
                        todo.text = todos[index].text;
                        todo.user = todos[index].user;
                        setName();
                        spanTitle.innerHTML = descriptionTitle.value;
                        spanDescription.innerHTML = descriptionText.value;
                        spanUser.innerHTML = user.value;
                        flag.key = true;
                    }
                    document.removeEventListener('click', confirmDescriptionBtnEvent);
                }
            }
            document.addEventListener('click', confirmDescriptionBtnEvent);
        }

        if (event.target == applyBtn) {

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
                backdropOn()
                confirmWarningBtn.hidden = true
            }
        }
        if (event.target == deleteBtn) {
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
        if (event.target == backBtn) {
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
        if (event.target == comleteBtn) {
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
    
    setName()
}