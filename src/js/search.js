import { listContent } from "./index.js";
import { listProgress } from "./index.js";
import { listDoneContent } from "./index.js";

export let inputSearch = document.querySelector('.search-todo')

export function search() {
    let filter = inputSearch.value.toUpperCase();

    if (filter.length > 0) {
        for (let i = 0; i < listContent.children.length; i++) {
            let title = listContent.children[i].querySelector(".title");
            let text = listContent.children[i].querySelector(".text");
            let name = listContent.children[i].querySelector(".name");

            if (title.innerHTML.toUpperCase().indexOf(filter) > -1
                || text.innerHTML.toUpperCase().indexOf(filter) > -1
                || name.innerHTML.toUpperCase().indexOf(filter) > -1) {

                listContent.children[i].style.display = "";
            } else {
                listContent.children[i].style.display = "none";
            }
        }
        for (let i = 0; i < listProgress.children.length; i++) {
            let title = listProgress.children[i].querySelector(".title");
            let text = listProgress.children[i].querySelector(".text");
            let name = listProgress.children[i].querySelector(".name");

            if (title.innerHTML.toUpperCase().indexOf(filter) > -1
                || text.innerHTML.toUpperCase().indexOf(filter) > -1
                || name.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    
                listProgress.children[i].style.display = "";
            } else {
                listProgress.children[i].style.display = "none";
            }
        }
        for (let i = 0; i < listDoneContent.children.length; i++) {
            let title = listDoneContent.children[i].querySelector(".title");
            let text = listDoneContent.children[i].querySelector(".text");
            let name = listDoneContent.children[i].querySelector(".name");

            if (title.innerHTML.toUpperCase().indexOf(filter) > -1
                || text.innerHTML.toUpperCase().indexOf(filter) > -1
                || name.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    
                listDoneContent.children[i].style.display = "";
            } else {
                listDoneContent.children[i].style.display = "none";
            }
        }

    } else if (filter.length === 0) {        
        for (let child of listContent.children) {
            child.style.display = 'flex'
        }
        for (let child of listProgress.children) {
            child.style.display = 'flex'
        }
        for (let child of listDoneContent.children) {
            child.style.display = 'flex'
        }
    }
}