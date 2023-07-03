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