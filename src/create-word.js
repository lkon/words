const tip = (text, {clientX, clientY}) => {
    const html = document.createElement('div');
    html.textContent = text;
    html.classList.add('tip');
    html.style.cssText += `left:${clientX}px;top:${clientY}px;`;
    document.body.append(html);

    const timer = setTimeout(function () {
        html.remove();
        clearTimeout(timer);
    }, 1000);
};

const createWord = (word, translation, parent) => {
    const link = document.createElement('a');
    link.setAttribute('title', translation);
    link.textContent = word;
    link.onclick = () => {
        window.responsiveVoice.speak(word, 'Greek Female');
        link.style.cssText += 'border-color: red;';
    };
    link.ondblclick = (ev) => tip(translation, {clientX: ev.clientX, clientY: ev.clientY});
    parent.append(link);

    return link;
};

export default createWord;
