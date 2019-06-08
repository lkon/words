import createWord from './create-word.js';
import data from '../lib/page_11.js';

const
    section = document.querySelector('section'),
    startBtn = document.querySelector('#start'),
    playBtn = document.querySelector('#play'),
    stopBtn = document.querySelector('#stop'),
    clearBtn = document.querySelector('#clear');

const
    allWords = Object.entries(data).map(([w, d]) => createWord(w, d, section)),
    collection = allWords.length;

let index = 0;

startBtn.onclick = () => {
    const intervalID = setInterval(function () {
        if (index === collection) clearInterval(intervalID);
        const current = allWords[index];
        current && current.click();
        index++;
    }, 1000);
};

playBtn.onclick = () => {
    Object.entries(data).forEach(([w, d]) => window.responsiveVoice.speak(w, 'Greek Female'));
};
stopBtn.onclick = () => {
    index = collection;
    window.responsiveVoice.cancel();
};
clearBtn.onclick = () => {
    allWords.forEach(w => w.style.cssText = '');
    document.querySelectorAll('.tip').forEach(tip => tip.remove());
};







