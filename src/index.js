import getWord from './get-word.js';

const
    section = document.querySelector('section'),

    wordsBtns = document.querySelectorAll('.js-words'),
    startBtn = document.querySelector('.js-start'),
    playBtn = document.querySelector('.js-play'),
    stopBtn = document.querySelector('.js-stop'),
    clearBtn = document.querySelector('.js-clear'),
    allWords =  [];

let collection, index = 0;
if(responsiveVoice.voiceSupport()) {
    responsiveVoice.speak("hello world");
}

wordsBtns.forEach(btn => btn.onclick = (ev) => {

    import(`../lib/11/${ev.target.title}.js`)

        .then((module) => {
            const data = module.default;

            Object.entries(data)
                .map(([w, d]) =>
                    getWord(w, d, section)
                        .then(function ({link, translation}) {
                            if (!d.length) {
                                data[w] = translation;
                                console.log(data);
                            }
                            allWords[allWords.length] = link;
                        })
                );
        });
})

startBtn.onclick = () => {
    collection = allWords.length;

    const intervalID = setInterval(function () {
        if (index === collection) clearInterval(intervalID);
        const current = allWords[index];
        current && current.click();
        index++;
    }, 1000);
};


playBtn.onclick = () => {
    Object.entries(data).forEach(([w, d]) => window.responsiveVoice.speak(w, 'Greek Female'));
}


stopBtn.onclick = () => {
    index = collection;
    window.responsiveVoice.cancel();
};
clearBtn.onclick = () => {
    allWords.forEach(w => w.style.cssText = '');
    document.querySelectorAll('.tip').forEach(tip => tip.remove());
};







