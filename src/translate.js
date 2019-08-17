const url = (lang, word) => `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang}&key=trnsl.1.1.20190215T132151Z.3dd68c597161ae19.9ed2e29de608aa092a2e8f933881b2410f2530d3&text=${encodeURI(word)}`;
const withPromise = (fn, url) => new Promise((resolve, reject) => fn(url, resolve, reject));

const httpGet = (url, onload, onerror) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => onload(request);
    request.onerror = () => onerror(request);
    request.send();
};

export default function (lang, word) {
    return withPromise(httpGet, url(lang, word))
}
