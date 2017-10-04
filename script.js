let init = (function () {

    let playersPlayed = document.querySelector('.players');
    let startStopBtn = document.querySelector('#button')
    let timeCounter = document.querySelector('#time-counter')
    let totalTime = document.querySelector('#total-time')
    let time = document.querySelector('#time')
    let playground = document.querySelector('.field');
    let fullTime = time.setAttribute("max", parseInt(data.player_positions.length) - 1);
    let totalMinutes = Math.floor((parseInt(data.player_positions.length) - 1) / 600);
    let totalSeconds = Math.floor(((parseInt(data.player_positions.length) - 1) / 10) % 60);
    totalTime.textContent = `${totalMinutes}: ${totalSeconds}`;

    function startStopGame() {
        if (startStopBtn.classList.contains('paused')) {
            intervaled = setInterval(function () {
                if (time.value != time.getAttribute('max')) {
                    time.value = parseInt(time.value) + 1
                } else {
                    clearInterval(intervaled)
                }
                playersPosition();
            }, 100);
        } else if (!startStopBtn.classList.contains('paused')) {

            clearInterval(intervaled);
        }
        startStopBtn.classList.toggle('paused');
    }
    
    function playersPosition() {
        let timeVal = time.value;
        let currFrame = data.player_positions[timeVal];
        for (let i = 0; i < currFrame.length; i++) {
            let playerId = currFrame[i][0];
            if (!document.getElementById(`${playerId}`)) {
                let newPlayer = document.createElement('div');
                newPlayer.id = `${playerId}`;
                newPlayer.classList.add('player');
                newPlayer.innerHTML = playerId;
                playersPlayed.appendChild(newPlayer);
            }
            let currPlayer = document.getElementById(`${playerId}`);
            let positionX = (currFrame[i][1] * 100),
                positionY = (currFrame[i][2] * 100);
            currPlayer.style.cssText = `left: ${positionX}%; bottom: ${positionY}%;`;
        }
        let minutes = Math.floor(timeVal / 600);
        let seconds = Math.floor((timeVal / 10) % 60);

        function setTime() {
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            timeCounter.textContent = `${minutes} : ${seconds}`
        }
        setTime();
    }
    playersPosition();
    startStopBtn.addEventListener('click', startStopGame);
    time.addEventListener('input', playersPosition);
    time.addEventListener('click', function () {
        clearInterval(intervaled);
        if (!button.classList.contains('paused')) {
            button.classList.add('paused');
        }
    })
    
    return {
        startStopGame: startStopGame,
        playersPosition: playersPosition,
    }
    
})();
init.playersPosition();