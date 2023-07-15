
//Canvas setup ***************************************************************************************************************
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//we make a 16/9 aspect ratio
canvas.width = 1024;
canvas.height = 700;

//Global variables & functions *********************************************************************************************
const gravity = 0.6
let scrollOffset = 0

//keyboard events **************************************************************************************************
const keys = {
    right : {
        pressed : false
    },
    left : {
        pressed : false
    }
}

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
            player.velocity.y -= 10
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

//Create Classes ***********************************************************************************************
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
        //Here, I deleted the instruction to create a hole(gravity is not active)
        // else{
        //     this.velocity.y = 0
        // }
        
    }
}

class Platform{
    constructor({x, y, image}){
        this.position = {
            x,
            y
        }

        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class GenericObject{
    constructor({x, y, image}){
        this.position = {
            x,
            y
        }

        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}



//Create game Elements *************************************************************************************************

let player = new Player()
    
    let platform = new Image();
    let hills = new Image();
    let background = new Image();
    
    platform.src = './images/platform.png'
    hills.src = './images/hills.png'
    background.src = './images/background.png'
    
    let platforms = [
        new Platform({x: -1, y: 580, image:platform}), 
        new Platform({x: platform.width - 2, y: 580, image:platform}),
        new Platform({x: platform.width * 2 + 137, y: 580, image:platform}),
    ]
    
    let genericObjects = [
        new GenericObject({x: -1, y: -1, image: background}),
        new GenericObject({x: -1, y: -1, image: hills}),
    ]

let init = () =>{
    player = new Player()
    
    platform = new Image();
    hills = new Image();
    background = new Image();
    
    platform.src = './images/platform.png'
    hills.src = './images/hills.png'
    background.src = './images/background.png'
    
    platforms = [
        new Platform({x: -1, y: 580, image:platform}), 
        new Platform({x: platform.width - 2, y: 580, image:platform}),
        new Platform({x: platform.width * 2 + 137, y: 580, image:platform}),
    ]
    
    genericObjects = [
        new GenericObject({x: -1, y: -1, image: background}),
        new GenericObject({x: -1, y: -1, image: hills}),
    ]
}


//animate function ***********************************************************************************************
animate = () =>{
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    //background
    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })
    //platform
    platforms.forEach(platform => {
        platform.draw()
    })

    player.update()

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
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= 3
            })
        }
        else if(keys.left.pressed){
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x += 3
            })
        }
    }
    
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >=  platform.position.x && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0
        }
    })

    //win scenario
    if(scrollOffset > 3713){
        console.log("You Win")
    }

    //lose condition
    if(player.position.y > canvas.height){
        init();
    }
}

animate()