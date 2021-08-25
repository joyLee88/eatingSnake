import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"

class GameControl {
    snake: Snake;
    food: Food;
    sp: ScorePanel;
    direction: string =  'Right';
    // 用于判定蛇over没有
    isLive = true;

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.sp = new ScorePanel()
        this.init();
    }

    // 初始化游戏，按下即开始游戏
    init() {
        document.addEventListener('keydown', this.keydownHandle.bind(this))
        this.run();
    }
    keydownHandle(event: any) {
        // 谷歌和IE出来的key不一样
        // if (event.key === '')
        this.direction = event.key;
    }
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch(this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }
        
        this.checkEat(X, Y);

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch(e) {
            alert(e.message);
            this.isLive = false;
        }
        // 蛇设定了方向是持续走的； 根据等级上升，加快速度
        const that = this;
        this.isLive && setTimeout(function() {
            that.run.bind(that)();
        }, 300 - (this.sp.level - 1) * 30)
        
    }
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();
            try {
                this.sp.addScore();
            } catch(e) {
                alert(e.message)
                this.isLive = false;
            }
            this.snake.addBody();
        }
    }
}
export default GameControl