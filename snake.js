
function init() {
    console.log("in function init")
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    w = 500
    h = 500
    cs =500/15
    snake = {
        init_length: 4,
        color: "blue",
        direction: "right",
        cells:[],
        createSnake: function() {
            for(var i=1;i<=this.init_length;i++) {
                this.cells.push({x:i,y:0})
            }
        },
        drawSnake: function() {
            console.log("drawing",this.cells);
            pen.fillStyle = "#f0a500";
            this.cells.forEach((data,index) => {
                pen.fillRect(cs*(data.x),cs*(data.y),cs,cs)
            })
            
        },
        updateSnake : function() {
            
            if((this.cells[this.init_length - 1].x == food.x) &&
                (this.cells[this.init_length - 1].y == food.y)) {
                    getRandomFood();
                    
                }
            
            var X = this.cells[this.init_length - 1].x    
            var Y = this.cells[this.init_length - 1].y
            this.cells.shift()

            if(this.direction == 'right') { 
                X = X + 1;
            }
            else if(this.direction == 'down'){
                Y = Y + 1; 
            }
            else if(this.direction == 'left'){
                X = X - 1;  
            }
            else if(this.direction == 'up'){  
                Y = Y - 1;
            }

            this.cells.push({x:X,y:Y}) 


        },
    }

    function keyPressed(e) {
        if(e.keyCode == 37)
            snake.direction = "left"
        else if(e.keyCode == 38)
            snake.direction = "up"
        else if(e.keyCode == 39)
            snake.direction = "right"          
        else if(e.keyCode == 40)
            snake.direction = "down"
    }
    snake.createSnake();
    getRandomFood();
    document.addEventListener("keydown",keyPressed)
}


function draw() {
    pen.clearRect(0,0,w,h)
    snake.drawSnake();
    
    food_image = new Image();
    food_image.src = './resources/food.jpg';
    pen.drawImage(food_image,(food.x)*cs,(food.y)*cs)
}

function update() {
    snake.updateSnake();
    
}

function getRandomFood() {
    var foodX = Math.floor(Math.random()*(w-cs)/cs)
    var foodY = Math.floor(Math.random()*(w-cs)/cs)

    food = {
        x:foodX,
        y:foodY,
    }
    return food
}

function gameloop() {
    cellx = snake.cells[snake.init_length - 1].x
    celly = snake.cells[snake.init_length - 1].y
    
    if( ((cellx)*(cs) > 500) || (((cellx+0)*cs) < 0)
        ||(((celly)*cs) > 500) || ((celly)*(cs) < 0) )
        clearInterval(f)
    
    
    draw();
    update();
}
init();


var f = setInterval(gameloop, 100);