
function init() {
    console.log("in function init")
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    w = 500
    h = 500
    cs =33
    snake = {
        init_length: 5,
        headX:0,
        headY:0,
        tailX:5,
        tailY:0,
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
            pen.fillStyle = "#4a47a3";
            this.cells.forEach((data,index) => {
                pen.fillRect(cs*(data.x),cs*(data.y),cs-1,cs-1)
            })
            
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
    document.addEventListener("keydown",keyPressed)
}


function draw() {
    pen.clearRect(0,0,w,h)
    snake.drawSnake();
}

function update() {
    snake.updateSnake();
    
}

function gameloop() {
    draw();
    update();
}
init();


var f = setInterval(gameloop, 100);