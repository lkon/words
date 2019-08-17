// @flow
import translate from './translate.js';

const html = (text: string, className: string): HTMLElement => {
    const html = document.createElement('span');
    html.textContent = text;
    html.classList.add(className);
    return html;
};

const createHtml = (word: string, translation: string) => {
    const link = document.createElement('a');
    link.title = translation;
    link.appendChild(html(word, 'word'));
    link.appendChild(html(translation, 'translation'));
    link.onclick = () => {
        window.responsiveVoice.speak(word, 'Greek Female', { rate: 0.8 });
        link.style.cssText += 'border-color: red;';

        setTimeout(function () {
            link.classList.toggle('translate');
        }, 500);
    };

    link.ondblclick = () => {
        link.classList.toggle('translate');
    };
    return { link, translation };
};

const getWord = (lang: string, word: string, description: string|mixed) => {

    if (typeof description === 'string' && description.length) {
        return Promise.resolve(createHtml(word, description));
    } else {
        return translate(lang, word)
            .then(function ({ status, responseText }) {
                if (200 === status) {
                    const { code, text } = JSON.parse(responseText);
                    if (200 === code) {
                        let translation = text;
                        if (Array.isArray(text)) {
                            translation = text[0];
                        }
                        return createHtml(word, translation);
                    }
                }
            })
            .catch(function () {
                console.error(arguments);
            });
    }
};

export default getWord;

