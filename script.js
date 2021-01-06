const dino = document.querySelector('.dino');
const background = document.querySelector(".background");
const soundUp = document.querySelector("#offline-sound-press");
let isJumping = false;
let position = 0;


function handlekeyUp (event) {
    if (event.keyCode === 38) {
        soundUp.play();
        if (!isJumping) {
         jump();
        }
    }
    if (event.keyCode === 13) {
        reloadThePage()
    }
}

function jump () {
   
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

        // Descendo
        let downInterval = setInterval(() => {
            if (position <= 0) {
                clearInterval(downInterval);
                isJumping = false;
            } else {
            position -= 20;
            dino.style.bottom = position + 'px';
            }
        }, 20);
        } else {
        // Subindo
        position += 20;
        dino.style.bottom = position + 'px';
        }
    }, 30);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval)
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game Over
            clearInterval(leftInterval)
            document.body.innerHTML = `<div class="game-over">
            <h1>Game Over<br>
            Aperte Enter ou clique em Restart para reiniciar o jogo.
            </h1>
            <button class="reload" onclick="reloadThePage()">Restart</button>
            </div> `;
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 25);
    setTimeout(createCactus, randomTime);
    
}
function reloadThePage() {
    window.location.reload();
}
function soundGameOver(){
    soundB.play();
}

createCactus();
document.addEventListener('keyup', handlekeyUp);