const btn = document.getElementById('btn');

var actionsObject = {
    commands: [ 'открыть забрало', 'закрыть забрало', 'открыть глаза', 'закрыть глаза' ],
    actions: {
        '0': openMask,
        '1': closeMask,
        '2': openEyes,
        '3': closeEyes
    }
};

if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();

    recognition.onresult = (event) => {
        for (let i = 0; i < event.results.length; i++) {
            const result = event.results[i];
            const resultsAlternative = result[0];
            console.log(resultsAlternative.transcript);
            findCommand.call(actionsObject, resultsAlternative.transcript);
        }
    };

    recognition.lang = 'ru-RU';
    addGrammar.call(actionsObject, recognition);

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

function addGrammar(recognition) {
    const grammar = `
    #JSGF v1.0;
    grammar actions;
    public <actions> = ${this.commands.join(' | ')} ;
    `;
    var speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.interimResults = false;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    // recognition.lang = 'en-US';
    recognition.grammars = speechRecognitionList;
}

function findCommand(text) {
    $select('.finded-command', el => {
        el.innerHTML = text;
    })

    const command = this.commands.find((v) => {
        return text.indexOf(v) > -1;
    });

    if (command) {
        const action = this.actions[this.commands.indexOf(command)];
        action();
    } else {
        tell('Я тебя не понимаю, попробуй еще раз');
    }
}

function tell(text) {
    const synthesis = window.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance(text);
    textToSpeech.lang = 'ru-RU';
    synthesis.speak(textToSpeech);
}

function openMask() {
    tell('Давай представим, как будто маска открывается');
}

function closeMask() {
    tell('Давай представим, как будто маска закрывается');
}

function openEyes() {
    tell('Открываю глаза');
    $select('.container', (el) => {
        el.classList.add('open-eyes');
    });
}

function closeEyes() {
    tell('Закрываю глаза');
    $select('.container', (el) => {
        el.classList.remove('open-eyes');
    });
}

function $select(selectors, callback) {
    if (!Array.isArray(selectors)) {
        selectors = [ selectors ];
    }
    selectors
        .map((cl) => document.querySelector(cl)) ///
        .map((el) => {
            if (el) {
                callback(el);
            } else {
                console.error('Не нашли элемента');
            }
        });
}


// Список команд на экране
$select('.commands', (el) => {
    el.innerHTML = actionsObject.commands.join('\n');
});
