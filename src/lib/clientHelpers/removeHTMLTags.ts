

export const removeHtmlTags = (text: string) => {
    const parser = new DOMParser();
    const parsedText = parser.parseFromString(text, 'text/html').body.textContent || '';
    return parsedText;
  };