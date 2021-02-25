
function init() {
    console.log("in function init")
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    w = 500
    h = 500
    cs =250/15
    snake = {
        init_length: 8,
        color: "blue",
        direction: "right",
        cells:[],
        createSnake: function() {
            for(var i=this.init_length;i>=1;i--) {
                this.cells.push({x:i,y:0})
            }
        },
        drawSnake: function() {
            
            pen.fillStyle = "#f0a500";
            if(this.direction == "right" || this.direction == "left") {
                this.cells.forEach((data,index) => {
                    pen.fillRect((this.cells[index].x * cs),(this.cells[index].y * cs),cs,cs)
                })
            }else{
                this.cells.forEach((data,index) => {
                    pen.fillRect((this.cells[index].x * cs),(this.cells[index].y * cs),cs,cs)
                })
            }
            
            
        },
        updateSnake : function() {
            cut = false;
            var X = this.cells[0].x     
            var Y = this.cells[0].y

            if((this.cells[0].x == food.x) &&
                (this.cells[0].y == food.y)) {
                    getRandomFood(); 
            } else {
                this.cells.pop()
            }   
            var nX,nY;

            if(this.direction == 'right') { 
                nX = X + 1;
                nY = Y;
            }
            else if(this.direction == 'down'){
                nX = X;
                nY = Y + 1;
            }
            else if(this.direction == 'left'){
                nX = X - 1;
                nY = Y; 
            }
            else if(this.direction == 'up'){  
                nX = X;
                nY = Y-1;
            }

            this.cells.forEach((data,index) => {
                if(data.x == nX && data.y == nY)
                    clearInterval(f)
                
            })

            this.cells.unshift({x:nX,y:nY}) 


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
    
    document.addEventListener("swiped-left",()=> {
        snake.direction = "left"
    })
    document.addEventListener("swiped-right",() => {
        snake.direction = "right"
    })
    document.addEventListener("swiped-down",() => {
        snake.direction = "down"
    })
    document.addEventListener("swiped-up",()=> {
        snake.direction = "up"
    })
}


function draw() {
    pen.clearRect(0,0,w,h)
    snake.drawSnake();
    
    food_image = new Image();
    food_image.src = './resources/food2.jpg';
    pen.drawImage(food_image,(food.x)*cs,(food.y)*cs)
}

function update() {
    snake.updateSnake();
    
}

function getRandomFood() {
    var foodX = Math.floor((Math.random()*(w-cs)/cs))
    var foodY = Math.floor((Math.random()*(w-cs)/cs))

    food = {
        x:foodX,
        y:foodY,
    }
    return food
}

function gameloop() {
    cellx = snake.cells[0].x
    celly = snake.cells[0].y
    
    if( ((cellx)*(cs) > 500) || (((cellx+0)*cs) < 0)
        ||(((celly)*cs) > 500) || ((celly)*(cs) < 0) )
        clearInterval(f)
    
    
    draw();
    update();
}
init();


var f = setInterval(gameloop, 100);