const EngToHeDict: Record<string, string> = {
    a: 'ש',
    b: 'נ',
    c: 'ב',
    d: 'ג',
    e: 'ק',
    f: 'כ',
    g: 'ע',
    h: 'י',
    i: 'ן',
    j: 'ח',
    k: 'ל',
    l: 'ך',
    m: 'צ',
    n: 'מ',
    o: 'ם',
    p: 'פ',
    q: '/',
    r: 'ר',
    s: 'ד',
    t: 'א',
    u: 'ו',
    v: 'ה',
    w: '\'',
    x: 'ס',
    y: 'ט',
    z: 'ז',
    A: 'ש',
    B: 'נ',
    C: 'ב',
    D: 'ג',
    E: 'ק',
    F: 'כ',
    G: 'ע',
    H: 'י',
    I: 'ן',
    J: 'ח',
    K: 'ל',
    L: 'ך',
    M: 'צ',
    N: 'מ',
    O: 'ם',
    P: 'פ',
    Q: '/',
    R: 'ר',
    S: 'ד',
    T: 'א',
    U: 'ו',
    V: 'ה',
    W: '\'',
    X: 'ס',
    Y: 'ט',
    Z: 'ז'
};

const HeToEngDict: Record<string, string> = {
    'ש': 'a',
    'נ': 'b',
    'ב': 'c',
    'ג': 'd',
    'ק': 'e',
    'כ': 'f',
    'ע': 'g',
    'י': 'h',
    'ן': 'i',
    'ח': 'j',
    'ל': 'k',
    'ך': 'l',
    'צ': 'm',
    'מ': 'n',
    'ם': 'o',
    'פ': 'p',
    '/': 'q',
    'ר': 'r',
    'ד': 's',
    'א': 't',
    'ו': 'u',
    'ה': 'v',
    '\'': 'w',
    'ס': 'x',
    'ט': 'y',
    'ז': 'z'
}

export function ShortenText(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + "... " : text;
}

export function ConvertHebrewAndEnglish(text: string): string {

    //text in Hebrew
    if (text.split('').find(_ => Object.keys(HeToEngDict).includes(_))) {
        return text.split('').map(char => HeToEngDict[char] ?? char).join('');
    }

    return text.split('').map(char => EngToHeDict[char] ?? char).join('');
}