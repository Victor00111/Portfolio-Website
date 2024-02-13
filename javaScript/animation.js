const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/90) * (canvas.width/160)
}

window.addEventListener('mousemove', 
    function(event) {
        var container = document.getElementById("canvas1");
        var containerRect = container.getBoundingClientRect();
        mouse.x = event.clientX - containerRect.left;
        mouse.y = event.clientY - containerRect.top;
    }
);

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // method to draw particles
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fillStyle = '#E0E0E0';
        ctx.fill();
    }

    // check particle position, check mouse position, move the particle, draw the particle
    update() {
        // make sure that the particle is within the boundary
        if (this.x > canvas.width*9/8 || this.x < -canvas.width/8) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height*9/8 || this.y < -canvas.height/8) {
            this.directionY = -this.directionY;
        }

        // check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 3;
            }
            if (mouse.x > this.x && this.y > this.size * 10) {
                this.x -= 3;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 3;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 3;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function drawText() {
    var fontSize = 30;
    ctx.font = fontSize + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var text = "Welcome to my Portfolio Website!";
    ctx.fillText(text, canvas.width/2, canvas.height/2);
}

// create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random()*4 + 3;
        let region = Math.random();
        let x = -Math.random()*canvas.width/8;
        let y = -Math.random()*canvas.height/8;
        if (region <= 0.5) {
            x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            if (region <= 0.25) y = Math.random()*canvas.height/8 + canvas.height - size * 2;
        }
        else {
            y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            if (region <= 0.75) x = Math.random()*canvas.width/8 + canvas.width - size * 2;
        }
        
        let directionX = (Math.random()/5) + 0.1;
        if (Math.random() <= 0.5) directionX = -directionX;
        let directionY = (Math.random()/5) + 0.1;
        if (Math.random() <= 0.5) directionY = -directionY;
        let color = '#FFFFFF';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// check if particles are close enough to draw a line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * 
            (particlesArray[a].x - particlesArray[b].x)) +
            ((particlesArray[a].y - particlesArray[b].y) * 
            (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/4) * (canvas.height/4)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle='rgba(224,224,224,' + opacityValue + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();

    var fontSize = 10 + canvas.width * 0.03;
    ctx.font = "bold " + fontSize + "px Segoe UI";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fontWeight = "bold";
    var text = "Welcome to my Portfolio Website!";
    ctx.fillText(text, canvas.width/2, canvas.height/2);
}

// resize event
window.addEventListener('resize', 
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        canvas.radius = (canvas.height/80) * (canvas.height/80);
        init();
    }
);

// mouse out event
window.addEventListener('mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init();
animate();