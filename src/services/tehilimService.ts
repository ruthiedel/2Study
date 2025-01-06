
import { HebrewDateFormatter, JewishDate } from 'kosher-zmanim';

type Dictionary = {
    [key: string]: { start: number; end: number };
};

const dictionary: Dictionary = {
    '1': { start: 1, end: 9 },
    '2': { start: 10, end: 17 },
    '3': { start: 18, end: 22 },
    '4': { start: 23, end: 28 },
    '5': { start: 29, end: 34 },
    '6': { start: 35, end: 38 },
    '7': { start: 39, end: 43 },
    '8': { start: 44, end: 48 },
    '9': { start: 49, end: 54 },
    '10': { start: 55, end: 59 },
    '11': { start: 60, end: 65 },
    '12': { start: 66, end: 68 },
    '13': { start: 69, end: 71 },
    '14': { start: 72, end: 76 },
    '15': { start: 77, end: 78 },
    '16': { start: 79, end: 82 },
    '17': { start: 83, end: 87 },
    '18': { start: 88, end: 89 },
    '19': { start: 90, end: 96 },
    '20': { start: 97, end: 103 },
    '21': { start: 104, end: 105 },
    '22': { start: 106, end: 107 },
    '23': { start: 108, end: 112 },
    '24': { start: 113, end: 118 },
    '25': { start: 119, end: 119 },
    '26': { start: 119, end: 119 },
    '27': { start: 120, end: 134 },
    '28': { start: 135, end: 139 },
    '29': { start: 140, end: 144 },
    '30': { start: 145, end: 150 }
};

const getHebrewDay = (): number => {
    const jewishDate = new JewishDate();
    return jewishDate.getJewishDayOfMonth();
};

async function fetchTehilimChapters(
    start: number,
    end: number
): Promise<Array<{ chapter: number; text: string }>> {
    try {
        const response = await fetch(`https://www.sefaria.org/api/v3/texts/Tehilim%20${start}-${end}`);
        const data = await response.json();

        if (!data.versions || !data.versions[0].text) {
            throw new Error("Text data is not available in the response");
        }

        const chapters = data.versions[0].text.map((chapterText: string[], index: number) => ({
            chapter: start + index,
            text: chapterText.join(' ')
        }));

        return chapters;
    } catch (error) {
        console.error("Error fetching Tehilim chapters:", error);
        return [];
    }
}

async function fetchChapter119(day: string): Promise<Array<{ chapter: number; text: string }>> {
    try {
        const response = await fetch(`https://www.sefaria.org/api/v3/texts/Tehilim%20119-119`);
        const data = await response.json();

        if (!data.versions || !data.versions[0].text) {
            throw new Error("Text data is not available in the response");
        }

        if (day === '25') {
            let text: string = '';
            for (let i = 0; i < 96; i++) {
                text += ' \n\n' + (data.versions[0].text[i] || ' ');
            }
            return [{ chapter: 119, text }];
        }
        else {
            let text: string = '';
            for (let i = 96; i < data.versions[0].text.length; i++) {
                text += ' \n\n' + (data.versions[0].text[i] || ' ');
            }
            return [{ chapter: 119, text }];
        }
    } catch (error) {
        console.error("Error fetching Tehilim chapters:", error);
        return [];
    }
}

export const getTehilimForToday = async () => {
     const dayInMonth = getHebrewDay().toString();

    if (!(dayInMonth in dictionary)) {
        console.error(`לא נמצא מידע עבור היום ${dayInMonth}`);
        return [];
    }

    const { start, end } = dictionary[dayInMonth];
    let tehilimChapters: Array<{
        chapter: number;
        text: string;
    }> = [];
    if (  dayInMonth === '25' ||dayInMonth === '26') {
        tehilimChapters = await fetchChapter119(dayInMonth);
    }
    else {
        tehilimChapters = await fetchTehilimChapters(start, end);
    }
    return tehilimChapters;
};
