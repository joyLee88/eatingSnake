class Snake {
    element: HTMLElement;
    head: HTMLElement;
    bodies: HTMLCollection;

    constructor() {
        this.element = document.querySelector('#snake') as HTMLElement;
        // 断言为HTMLElement
        this.head = document.querySelector('#snake > div') as HTMLElement;
        // bodies是collection，querySelectorAll是nodelist，所以用其他; !判断是否有
        this.bodies = document.getElementById('snake')?.getElementsByTagName('div')!;
    }
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    set X(value: number) {
        if (this.X === value) {
            return;
        }
        // 整个身体都是水平方向或垂直方向，不能回头走，很诡异
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value) {
            // 如果是掉头，还是往反方向移动
            if (value > this.X) { // 向右走 改成向左走
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        if (value < 0 || value > 290) { // 抛出异常，自然游戏结束了
            throw new Error('蛇撞墙了！Game Over ~');
        }

        this.head.style.left = value + 'px';

        this.moveBody();
        this.checkBodyColide();
    }
    set Y(value: number) {
        if (this.Y === value) {
            return;
        }
        // 整个身体都是水平方向或垂直方向，不能回头走，很诡异
        if (this.bodies[2] && (this.bodies[2] as HTMLElement).offsetTop == value) {
            // 如果是掉头，还是往反方向移动
            if (value > this.Y) { // 向下走
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了！Game Over ~');
        }
        this.head.style.top = value + 'px';

        this.moveBody();
        this.checkBodyColide();
    }
    addBody() {
        const oDiv = document.createElement('div');
        oDiv.innerHTML = this.bodies.length + '';
        this.element.insertAdjacentElement('beforeend', oDiv);
    }
    moveBody() {
        // 下一节位置就是上一节走过的位置
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    checkBodyColide() {
        for (let i = 2; i < this.bodies.length; i++) {
            const obj = this.bodies[i] as HTMLElement;
            if (this.X === obj.offsetLeft && this.Y === obj.offsetTop) {
                throw new Error('蛇撞自己了！Game Over ~');
            }
        }
    }
}
export default Snake;