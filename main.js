const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5

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

const player = new Player()

const keys = {
    right : {
        pressed : false
    },
    left : {
        pressed : false
    }
}

animate = () =>{
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    if(keys.right.pressed){
        player.velocity.x = 5
    }
    else if(keys.left.pressed){
        player.velocity.x = -5
    }
    else{
        player.velocity.x = 0
    }
}

animate()

addEventListener('keydown', ({keyCode}) => {
    console.log(keyCode)

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
    console.log(keyCode)

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