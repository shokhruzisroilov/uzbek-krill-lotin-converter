const cyrillicToLatinMap: Record<string, string> = {
  // Uppercase
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Ғ: "G'",
  Д: "D",
  Е: "E",
  Ё: "Yo",
  Ж: "Zh",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Қ: "Q",
  Л: "L",
  М: "M",
  Н: "N",
  Ң: "Ng",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ў: "O'",
  Ф: "F",
  Х: "X",
  Ц: "Ts",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Shch",
  Ъ: "'",
  Ы: "I",
  Ь: "'",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
  // Lowercase
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  ғ: "g'",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  қ: "q",
  л: "l",
  м: "m",
  н: "n",
  ң: "ng",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ў: "o'",
  ф: "f",
  х: "x",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "'",
  ы: "i",
  ь: "'",
  э: "e",
  ю: "yu",
  я: "ya",
};

const latinToCyrillicMap: Record<string, string> = {
  // Uppercase
  A: "А",
  B: "Б",
  V: "В",
  "G'": "Ғ",
  G: "Г",
  D: "Д",
  E: "Е",
  F: "Ф",
  X: "Х",
  I: "И",
  Y: "Й",
  K: "К",
  Q: "Қ",
  L: "Л",
  M: "М",
  N: "Н",
  Ng: "Ң",
  O: "О",
  "O'": "Ў",
  P: "П",
  R: "Р",
  S: "С",
  T: "Т",
  U: "У",
  "U'": "Ў",
  Yo: "Ё",
  Zh: "Ж",
  Z: "З",
  Ts: "Ц",
  Ch: "Ч",
  Sh: "Ш",
  Yu: "Ю",
  Ya: "Я",
  // Lowercase
  a: "а",
  b: "б",
  v: "в",
  "g'": "ғ",
  g: "г",
  d: "д",
  e: "е",
  f: "ф",
  x: "х",
  i: "и",
  y: "й",
  k: "к",
  q: "қ",
  l: "л",
  m: "м",
  n: "н",
  ng: "ң",
  o: "о",
  "o'": "ў",
  p: "п",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  "u'": "ў",
  yo: "ё",
  zh: "ж",
  z: "з",
  ts: "ц",
  ch: "ч",
  sh: "ш",
  yu: "ю",
  ya: "я",
};

/**
 * Detects if text contains Cyrillic characters
 */
export function isCyrillic(text: string): boolean {
  const cyrillicRegex = /[\u0400-\u04FF]/;
  return cyrillicRegex.test(text);
}

/**
 * Detects if text contains Latin characters
 */
export function isLatin(text: string): boolean {
  const latinRegex = /[a-zA-Z]/;
  return latinRegex.test(text);
}

/**
 * Converts Cyrillic Uzbek text to Latin
 */
export function cyrillicToLatin(text: string): string {
  let result = "";
  let i = 0;

  while (i < text.length) {
    // Try two-character combinations first
    const twoChar = text.substring(i, i + 2);
    if (cyrillicToLatinMap[twoChar]) {
      result += cyrillicToLatinMap[twoChar];
      i += 2;
      continue;
    }

    // Then try single character
    const char = text[i];
    if (cyrillicToLatinMap[char]) {
      result += cyrillicToLatinMap[char];
    } else {
      result += char;
    }
    i++;
  }

  return result;
}

/**
 * Converts Latin text to Cyrillic Uzbek
 * Handles multi-character sequences like "sh", "ch", "ng", "ts", "zh", "yo", "yu", "ya"
 */
export function latinToCyrillic(text: string): string {
  let result = "";
  let i = 0;

  const lowerText = text.toLowerCase();

  while (i < text.length) {
    let found = false;

    // Try multi-character combinations (4 chars) first, then single chars
    for (let len = 4; len >= 1; len--) {
      const substring = lowerText.substring(i, i + len);

      // For multi-char sequences (len > 1), preserve the first character's case
      let mappedValue = latinToCyrillicMap[substring];
      if (!mappedValue && len > 1) {
        // Try with first character capitalized
        const capitalizedSubstring =
          substring.charAt(0).toUpperCase() + substring.slice(1);
        mappedValue = latinToCyrillicMap[capitalizedSubstring];
      }

      // For single characters, use the lowercase mapping (which handles both cases)
      if (mappedValue) {
        result += mappedValue;
        i += len;
        found = true;
        break;
      }
    }

    if (!found) {
      result += text[i];
      i++;
    }
  }

  return result;
}

/**
 * Auto-detects text direction and converts
 */
export function autoConvert(text: string): string {
  const hasCyrillic = isCyrillic(text);
  const hasLatin = isLatin(text);

  if (hasCyrillic && !hasLatin) {
    return cyrillicToLatin(text);
  } else if (hasLatin && !hasCyrillic) {
    return latinToCyrillic(text);
  } else {
    // Mixed or unclear - try to detect based on proportion
    const cyrillicCount = (text.match(/[\u0400-\u04FF]/g) || []).length;
    const latinCount = (text.match(/[a-zA-Z]/g) || []).length;

    return cyrillicCount > latinCount
      ? cyrillicToLatin(text)
      : latinToCyrillic(text);
  }
}

/**
 * Get character count (excluding whitespace)
 */
export function getCharacterCount(text: string): number {
  return text.replace(/\s/g, "").length;
}
