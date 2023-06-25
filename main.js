const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5

//Create Classes
class Player{
    constructor(){
        this.position = {
            x : 100,
            y : 100
        }
        this.velocity = {
            x : 0,
            y : 0
        }
        this.width = 30
        this.height = 30
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }
        else{
            this.velocity.y = 0
        }
        
    }
}

class Platform{
    constructor({x, y}){
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20
    }

    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//Create Elements
const player = new Player()

const platforms = [new Platform({x: 200, y: 300}), new Platform({x: 500, y: 400})]

const keys = {
    right : {
        pressed : false
    },
    left : {
        pressed : false
    }
}

//win scenario
let scrollOffset = 0

animate = () =>{
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })

    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }
    else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    }
    else{
        player.velocity.x = 0

        if(keys.right.pressed){
            scrollOffset += 5
            console.log(scrollOffset)
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        }
        else if(keys.left.pressed){
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }
    
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y && player.position.y + player.  height + player.velocity.y >= platform.position.y && player.position.x + player.width >=  platform.position.x && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0
    }
    })

    if(scrollOffset > 3713){
        console.log("You Win")
    }
}

animate()

addEventListener('keydown', ({keyCode}) => {

    switch(keyCode){
        case 68 :
            keys.right.pressed = true
            break
        
        case 81 :
            keys.left.pressed = true
            break
        
        case 83 :
            player.position.y += 2
            break
        
        case 90 :
            player.velocity.y -= 17
            break
        
    }
})

addEventListener('keyup', ({keyCode}) => {

    switch(keyCode){
        case 68 :
            keys.right.pressed = false
            break
        
        case 81 :
            keys.left.pressed = false
            break
        
        case 83 :
            player.position.y += 7
            break
        
        case 90 :
            player.velocity.y -= 2
            break
        
    }
})