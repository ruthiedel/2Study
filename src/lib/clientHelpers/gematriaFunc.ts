
export default function numberToGematria(num: number): string {
    const gematriaMap = [['א', 'ב', 'ג', 'ד','ה', 'ו', 'ז', 'ח', 'ט'],
     ['י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'], 
     ['ק', 'ר', 'ש', 'ת']
    ];

    let result = '';
    let index = 0;
    while (num > 0) {
        const digit = num % 10;
        if (digit !== 0) {
            result = gematriaMap[index][digit - 1] + result;
        }
        num = Math.floor(num / 10);
        index++;
    }
    if (result === 'יה') { result = 'טו'}
    if (result === 'יו') { result = 'טז'}

    return result;
}