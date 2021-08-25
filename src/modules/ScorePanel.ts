class ScorePanel {
    score: number = 0;
    level: number = 1;
    scoreEle: any;
    levelEle: any;
    maxLevel: number;
    upScore: number;
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.querySelector('#score');
        this.levelEle = document.querySelector('#level');
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    addScore() {
        this.score++;
        this.scoreEle.innerHTML = this.score;
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }
    levelUp() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level;
        } else {
            throw new Error('wow wow wow! Congratulations! 你胜利了！');
        }
    }
}
export default ScorePanel;