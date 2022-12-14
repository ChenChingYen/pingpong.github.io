const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE = .00001;

export default class Ball{
    constructor(ballElem){
        this.ballElem = ballElem;
        this.reset();
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value);
    }

    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value);
    }

    rect(){
        return this.ballElem.getBoundingClientRect();
    }

    reset(){
        this.x = 50;
        this.y = 50;
        this.direction = { y: 0};
        while(Math.abs(this.direction.y) <= .2 || Math.abs(this.direction.x) >= .9){
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { y: Math.cos(heading), x: Math.sin(heading) };
        }
        // console.log(this.direction);
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddleRects){
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;
        const rect = this.rect();
        if(rect.right >= window.innerWidth || rect.left <= 0){
            this.direction.x *= -1;
        }
        // if(rect.right >= window.innerWidth || rect.left <= 0){
        //     this.direction.x *= -1;
        // }
        if(paddleRects.some(paddleRect => isCollision(paddleRect, rect))){
            this.direction.y *= -1;
        }
    }
}

function randomNumberBetween(min, max){
    return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2){
    // console.log(rect2.right);
    // console.log(rect2.left);
    // console.log(rect1.top);
    // console.log(rect1.bottom);
    return rect1.left <= rect2.right
    && rect1.right >= rect2.left
    && rect1.top <= rect2.bottom
    && rect1.bottom >= rect2.top;
}