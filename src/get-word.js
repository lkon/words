import translate from './translate.js'


const html = (text, className) => {
    const html = document.createElement('span');
    html.textContent = text;
    html.classList.add(className);
    return html;
};

const createHtml = (word, translation, parent) => {
    const link = document.createElement('a');
    link.title = translation;
    link.appendChild(html(word, 'word'))
    link.appendChild(html(translation, 'translation'))
    link.onclick = () => {
        window.responsiveVoice.speak(word, 'Greek Female', {rate: 0.8});
        link.style.cssText += 'border-color: red;';

        setTimeout(function () {
            link.classList.toggle('translate')
        }, 500)
    };

    link.ondblclick = () => {
        link.classList.toggle('translate')
    };
    parent.append(link);
    parent.dataset['size'] = +parent.dataset['size'] + 1;

    return {link, translation};
}

const getWord = (word, description, parent) => {

    if (description.length) {
        return Promise.resolve(createHtml(word, description, parent));

    } else {
        return translate(word)
            .then(function ({status, responseText}) {
                if (200 === status) {
                    const {code, text} = JSON.parse(responseText);
                    if (200 === code) {
                        let translation = text;
                        if (Array.isArray(text)) {
                            translation = text[0];
                        }
                        return createHtml(word, translation, parent)
                    }
                }
            })
            .catch(function () {
                console.error(arguments)
            })
    }
};

export default getWord;

