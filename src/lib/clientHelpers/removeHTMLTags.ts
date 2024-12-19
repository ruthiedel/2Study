
export const removeHtmlTags = (text: string) => {
    let parser = new DOMParser().parseFromString(text, 'text/html');
    parser.body.querySelectorAll('br, li, div, h1, h2, h3').forEach(c => c.after(parser.createTextNode(' ')));
    return parser.body.textContent;
};