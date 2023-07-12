let clockTime = document.querySelector('.clock')

class Clock {
    constructor({ template }) {
        this.template = template;
    }
  
    render() {
        let date = new Date();

        let hours = date.getHours();
        let mins = date.getMinutes();
        if (hours < 10) hours = '0' + hours;
        if (mins < 10) mins = '0' + mins;
  
        let output = this.template
        .replace('h', hours)
        .replace('m', mins)
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