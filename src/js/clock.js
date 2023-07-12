let clockTime = document.querySelector('.clock')

// export function getTimeForClock() {
//     let time = new Date();
//     let hh = time.getHours();
//     let mm = time.getMinutes();
//     let ss = time.getSeconds(); //нужны ли секунды в часах?
//     if (hh < 10) {
//         hh = '0' + hh;
//     }
//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     let timeClock = hh + ':' + mm;
//     clock.innerHTML = timeClock;
//     setTimeout(getTimeForClock, 1000);
// }

class Clock {
    constructor({ template }) {
        this.template = template;
    }
  
    render() {
        let date = new Date();

        let hours = date.getHours();
        let mins = date.getMinutes();
        // let secs = date.getSeconds();
        if (hours < 10) hours = '0' + hours;
        if (mins < 10) mins = '0' + mins;
        // if (secs < 10) secs = '0' + secs;
  
        let output = this.template
        .replace('h', hours)
        .replace('m', mins)
        // .replace('s', secs);
  
        console.log(output);
        clockTime.innerHTML = output
    }
  
    stop() {
        clearInterval(this.timer);
    }
  
    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}
  
export let clock = new Clock({template: 'h:m'});
clock.start();