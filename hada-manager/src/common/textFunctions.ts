const EngToHeDict: Record<string, string> = {
  a: "ש",
  b: "נ",
  c: "ב",
  d: "ג",
  e: "ק",
  f: "כ",
  g: "ע",
  h: "י",
  i: "ן",
  j: "ח",
  k: "ל",
  l: "ך",
  m: "צ",
  n: "מ",
  o: "ם",
  p: "פ",
  q: "/",
  r: "ר",
  s: "ד",
  t: "א",
  u: "ו",
  v: "ה",
  w: "'",
  x: "ס",
  y: "ט",
  z: "ז",
}

const HeToEngDict: Record<string, string> = flipDictionary(EngToHeDict) as Record<string, string>

export function flipDictionary(
  dict: Record<PropertyKey, PropertyKey>
): Record<PropertyKey, PropertyKey> {
  return Object.entries(dict).reduce<Record<PropertyKey, PropertyKey>>(
    (acc, [key, val]) => {
      if (!acc[val]) {
        acc[val] = key
      }
      return acc
    },
    {} as Record<PropertyKey, PropertyKey>
  )
}

export function convertHebrewAndEnglish(text: string): string {
  let splitText = text.split("")

  //text in Hebrew
  if (splitText.find((_) => Object.keys(HeToEngDict).includes(_))) {
    return splitText.map((char) => HeToEngDict[char] ?? char).join("")
  }

  return splitText.map((char) => EngToHeDict[char] ?? char).join("")
}
