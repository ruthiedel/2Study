export const addLineBreaks = (text: string | string[] | string[][]): string => {
    text = normalizeTextStructure(text);
    let count = 0;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        result += text[i];

        if (text[i] === ':') {
            count++;

            if (count % 5 === 0) {
                result += '<br /><br />';
            }
        }
    }

    return result;
};


export const normalizeTextStructure = (input: string | string[] | string[][]): string => {
    let result = '';

    if (typeof input === 'string') {
        result = input;
    }
    else if (Array.isArray(input) && typeof input[0] === 'string') {
        result = input.join(' ');
    }
    else if (Array.isArray(input) && Array.isArray(input[0])) {
        (input as string[][]).forEach((arr: string[]) => {
            arr.forEach((item: string, index: number) => {
                result += item;
                if ((index + 1) % 5 === 0) {
                    result += '<br /><br />';
                } else {
                    result += ' ';
                }
            });
        });
    }

    return result;
};
