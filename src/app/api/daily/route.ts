import axios from 'axios';

interface CalendarItem {
    title: {
        en: string;
        he: string;
    };
    displayValue: {
        en: string;
        he: string;
    };
    url: string;
    ref: string;
    heRef: string;
    description?: {
        en: string;
        he: string;
    };
}

interface TextContent {
    title: string;
    text: string;
    location: string; // הוספתי שדה location לתיאור המקום
}

const SEFARIA_BASE_URL = 'https://www.sefaria.org.il/api/v3/texts';
const CALENDAR_API_URL = 'https://www.sefaria.org/api/calendars';

const fetchDailyContent = async (): Promise<TextContent[]> => {
    try {
        const { data } = await axios.get(CALENDAR_API_URL, {
            headers: { Accept: 'application/json' },
        });

        const calendarItems: CalendarItem[] = data.calendar_items;

        const contentPromises = calendarItems.map(async (item) => {
            const contentUrl = `${SEFARIA_BASE_URL}/${item.ref}`;

            try {
                const { data: textData } = await axios.get(contentUrl);

                const hebrewVersion = textData.versions.find((version: { language: string; }) => version.language === 'he');

                const text = (hebrewVersion.text && hebrewVersion.text) ? hebrewVersion.text : 'טקסט לא נמצא';

                // הוספת תיאור המקום בעברית
                return {
                    title: item.title.he,
                    text,
                    location: item.displayValue.he, // הוספת המידע של תיאור המקום
                };
            } catch (err) {
                console.error(`Error fetching content for ${item.title.he}:`, err);
                return {
                    title: item.title.he,
                    text: 'שגיאה בטעינת הטקסט',
                    location: item.displayValue.he, // הוספתי גם במקרה של שגיאה
                };
            }
        });

        return await Promise.all(contentPromises);
    } catch (err) {
        console.error('Error fetching calendar data:', err);
        throw new Error('Failed to fetch daily content.');
    }
};

export async function GET() {
    try {
        const content = await fetchDailyContent();
        return new Response(JSON.stringify(content), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to fetch daily content.' }), { status: 500 });
    }
}
