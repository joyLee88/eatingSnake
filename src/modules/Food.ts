class Food {
    element: any;

    constructor() {
        this.element = document.querySelector('#food');
    }
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    change() {
        // 0-290
        // 蛇移动一格就是10，所以必须是10的倍数
        this.element.style.left = Math.round(Math.random() * 29) * 10 + 'px';
        this.element.style.top = Math.round(Math.random() * 29) * 10 + 'px';
    }
}
export default Food;