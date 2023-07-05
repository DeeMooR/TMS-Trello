// console.log ("JS работает");

// import Swiper from '../../node_modules/swiper/swiper';
// import '../../node_modules/swiper/swiper.css';

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

function getUserName () {
    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(responce => responce.json())
    .then(users => {
        let userName = []
        for(let i in users) {
            userName.push(users[i].name)
        }
        console.log(userName);
    })
}

getUserName()




   


    





