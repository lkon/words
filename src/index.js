// @flow

import getWord from './get-word.js';

const
    parentBlock: HTMLElement = document.querySelectorAll('section')[0],

    wordsBtns = document.querySelectorAll('.js-words'),
    startBtn = document.querySelectorAll('.js-start')[0],
    playBtn = document.querySelectorAll('.js-play')[0],
    stopBtn = document.querySelectorAll('.js-stop')[0],
    clearBtn = document.querySelectorAll('.js-clear')[0],
    allWords = [];

let collection, index = 0;

interface ISectionItem {
    [key: string]: string
}

wordsBtns.forEach(btn => btn.onclick = (ev) => {

    import(`../lib/lesson2/${ev.target.title}.js`)

        .then((module) => {
            const sections = module.default;

            sections.forEach((section: [], i: number) => {

                section.forEach((item: ISectionItem, y: number) => {

                    Object.entries(item)
                        .map(([w, d]) => getWord(ev.target.title, w, d)
                            .then(function ({ link, translation }) {

                                parentBlock.appendChild(link);

                                if (typeof d === 'string' && !d.length) {
                                    item[w] = translation;
                                }

                                allWords[allWords.length] = link;
                            })
                        );
                });
            });

            console.dir(JSON.stringify(sections));
        });
});

startBtn.onclick = () => {
    collection = allWords.length;

    const intervalID = setInterval(function () {
        if (index === collection) clearInterval(intervalID);
        const current = allWords[index];
        current && current.click();
        index++;
    }, 1500);
};


playBtn.onclick = () => {
    Object.entries(collection).forEach(([w, d]) => window.responsiveVoice.speak(w, 'Greek Female'));
};


stopBtn.onclick = () => {
    index = collection;
    window.responsiveVoice.cancel();
};
clearBtn.onclick = () => {
    allWords.forEach(w => w.style.cssText = '');
    document.querySelectorAll('.tip').forEach(tip => tip.remove());
};


