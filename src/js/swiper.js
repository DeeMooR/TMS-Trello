let mySwiper;
let listContainer = document.querySelector('.list-container');
let dListAdd = document.querySelector('.list-add');
let dListProgress = document.querySelector('.list-progress');
let dListDone = document.querySelector('.list-done');

export function initSwiper() {
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
    swiperSlideAdd.append(dListAdd);
    swiperWrapper.append(swiperSlideAdd);

    let swiperSlideProgress = document.createElement('div');
    swiperSlideProgress.classList = "swiper-slide";
    swiperSlideProgress.append(dListProgress);
    swiperWrapper.append(swiperSlideProgress);

    let swiperSlideDone = document.createElement('div');
    swiperSlideDone.classList = "swiper-slide";
    swiperSlideDone.append(dListDone);
    swiperWrapper.append(swiperSlideDone);

    mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        initialSlide: 0,
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

export function destroySwiper() {
    if (mySwiper) {
        listContainer.innerHTML = '';
        listContainer.append(dListAdd,dListProgress,dListDone);
        mySwiper.destroy();
        mySwiper = null;
    }
}

export function checkWindowSize() {
    if (document.documentElement.clientWidth <= 768) {
        if (!mySwiper) {
            initSwiper();
        }
    } else {
        destroySwiper();
    }
}