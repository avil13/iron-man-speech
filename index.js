const btn = document.getElementById('btn');

if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();

    recognition.onresult = (event) => {
        for (let i = 0; i < event.results.length; i++) {
            const result = event.results[i];
            const resultsAlternative = result[0];
            console.log(resultsAlternative.transcript);
        }
    };

    recognition.lang = 'ru-RU';
    
    btn.addEventListener('click', (ev) => {
        ev.target.classList.add('active');

        recognition.start();

        setTimeout(() => {
            ev.target.classList.remove('active');
            recognition.stop();
        }, 3000);
    });
} else {
    console.warning('No speech');
}

