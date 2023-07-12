/*
divButtons  cardItemDescription
backBtn  comleteBtn  applyBtn  editBtn  deleteBtn
listProgress  listContent  listDoneContent  index  todoNew
*/

import { listDoneContent, listContent, listProgress} from "./index.js"
import { divButtons, cardItemDescription, backBtn, comleteBtn, applyBtn, editBtn, deleteBtn } from "./localstorage.js"

export function dragDrop(index, todoNew) {
    const dragEl = document.getElementById(`draggable-${index}`)

    dragEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('id', e.target.id)
    })

    listProgress.addEventListener('dragover', (e) => {
        e.preventDefault();                
    })
    listContent.addEventListener('dragover', (e) => {
        e.preventDefault();                
    })
    listDoneContent.addEventListener('dragover', (e) => {
        e.preventDefault();                
    })

    listContent.addEventListener('drop', (e) => {
        let itemId = e.dataTransfer.getData('id')
        let itemCard = document.getElementById(itemId)
        itemCard.style.backgroundColor = 'rgb(152, 223, 138)'
        document.querySelectorAll(`.bc-${index}`).forEach( e => e.remove() )
        divButtons.append(editBtn, deleteBtn)
        cardItemDescription.append(applyBtn)
        listContent.prepend(itemCard)
        todoNew.status = 'Task'
        // setName()
    })
    listProgress.addEventListener('drop', (e) => {
        let itemId = e.dataTransfer.getData('id')
        let itemCard = document.getElementById(itemId)
        itemCard.style.backgroundColor = 'rgb(240, 240, 255)'
        document.querySelectorAll(`.eda-${index}`).forEach( e => e.remove() )
        divButtons.append(backBtn, comleteBtn)
        listProgress.prepend(itemCard)
        todoNew.status = 'In progress'
        // setName()
    })
    listDoneContent.addEventListener('drop', (e) => {
        let itemId = e.dataTransfer.getData('id')
        let itemCard = document.getElementById(itemId)
        itemCard.style.backgroundColor = 'rgb(135, 206, 250)'            
        // backBtn.remove()
        // comleteBtn.remove()
        // divButtons.append(deleteBtn)
        listDoneContent.append(itemCard)    
        todoNew.status = 'Done'
        // setName()
        // dragEl.draggable = false
        for (const child of listDoneContent.children) {
            child.draggable = false
        }

    })
    for (const child of listDoneContent.children) {
        child.draggable = false
    }
}