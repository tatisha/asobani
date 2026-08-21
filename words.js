/** @typedef {{ id: string, word: string, label: string, svg: string }} WordItem */

const LETTERS = [..."აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ"];

/** @type {WordItem[]} */
export const WORDS = [
  {
    id: "mze",
    word: "მზე",
    label: "მზე",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="100" cy="80" r="42" fill="#ffd45a"/>
      <g stroke="#f0a820" stroke-width="8" stroke-linecap="round">
        <line x1="100" y1="14" x2="100" y2="30"/><line x1="100" y1="130" x2="100" y2="146"/>
        <line x1="34" y1="80" x2="50" y2="80"/><line x1="150" y1="80" x2="166" y2="80"/>
        <line x1="52" y1="32" x2="64" y2="44"/><line x1="136" y1="116" x2="148" y2="128"/>
        <line x1="148" y1="32" x2="136" y2="44"/><line x1="64" y1="116" x2="52" y2="128"/>
      </g>
      <circle cx="86" cy="74" r="4" fill="#8a5a10"/><circle cx="114" cy="74" r="4" fill="#8a5a10"/>
      <path d="M86 94c8 10 20 10 28 0" fill="none" stroke="#8a5a10" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "khe",
    word: "ხე",
    label: "ხე",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="90" y="88" width="20" height="48" rx="6" fill="#8b5a2b"/>
      <circle cx="100" cy="70" r="44" fill="#3f9e57"/>
      <circle cx="72" cy="78" r="28" fill="#4fb56a"/>
      <circle cx="128" cy="78" r="28" fill="#4fb56a"/>
      <circle cx="100" cy="48" r="24" fill="#62c57a"/>
    </svg>`,
  },
  {
    id: "kata",
    word: "კატა",
    label: "კატა",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="108" cy="108" rx="48" ry="28" fill="#f4b86a"/>
      <circle cx="86" cy="72" r="34" fill="#f4b86a"/>
      <polygon points="62,52 68,20 84,48" fill="#f4b86a"/>
      <polygon points="108,48 124,20 130,52" fill="#f4b86a"/>
      <circle cx="76" cy="70" r="4" fill="#2a2a2a"/><circle cx="98" cy="70" r="4" fill="#2a2a2a"/>
      <ellipse cx="87" cy="82" rx="6" ry="4" fill="#e8896a"/>
      <path d="M150 100c18-8 30 6 28 18" fill="none" stroke="#f4b86a" stroke-width="10" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "puri",
    word: "პური",
    label: "პური",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="96" rx="62" ry="28" fill="#e2a65a"/>
      <ellipse cx="100" cy="84" rx="58" ry="26" fill="#f0c27a"/>
      <path d="M55 84c20-18 70-18 90 0" fill="none" stroke="#d18a3a" stroke-width="4" stroke-linecap="round"/>
      <path d="M62 96c18-10 58-10 76 0" fill="none" stroke="#d18a3a" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "vashli",
    word: "ვაშლი",
    label: "ვაშლი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="100" cy="92" r="46" fill="#e4574c"/>
      <ellipse cx="78" cy="74" rx="10" ry="16" fill="#ff8d7c" opacity=".55"/>
      <rect x="96" y="36" width="8" height="22" rx="4" fill="#6b4226"/>
      <ellipse cx="118" cy="42" rx="18" ry="10" fill="#4fb56a" transform="rotate(20 118 42)"/>
    </svg>`,
  },
  {
    id: "burti",
    word: "ბურთი",
    label: "ბურთი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="100" cy="84" r="48" fill="#f3f6fa"/>
      <path d="M100 36c-18 18-18 78 0 96M100 36c18 18 18 78 0 96M52 84h96M62 58h76M62 110h76" fill="none" stroke="#2a2a2a" stroke-width="4"/>
      <circle cx="100" cy="84" r="48" fill="none" stroke="#2a2a2a" stroke-width="4"/>
    </svg>`,
  },
  {
    id: "tevzi",
    word: "თევზი",
    label: "თევზი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="96" cy="84" rx="50" ry="28" fill="#4aa7d8"/>
      <polygon points="146,84 178,58 178,110" fill="#3b8eb8"/>
      <polygon points="84,56 104,56 94,40" fill="#3b8eb8"/>
      <circle cx="72" cy="78" r="5" fill="#16324a"/>
      <path d="M88 96c10 8 24 8 34 0" fill="none" stroke="#16324a" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "sakhli",
    word: "სახლი",
    label: "სახლი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="100,28 36,78 164,78" fill="#e25b4a"/>
      <rect x="54" y="78" width="92" height="58" fill="#f7e7c7"/>
      <rect x="88" y="100" width="24" height="36" fill="#8b5a2b"/>
      <rect x="64" y="92" width="18" height="18" fill="#7ad0ff"/>
      <rect x="118" y="92" width="18" height="18" fill="#7ad0ff"/>
    </svg>`,
  },
  {
    id: "rdze",
    word: "რძე",
    label: "რძე",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M70 48h60l10 20v62a16 16 0 0 1-16 16H76a16 16 0 0 1-16-16V68z" fill="#f7fbff" stroke="#c5d4e2" stroke-width="4"/>
      <path d="M74 88h52v42H74z" fill="#eef6ff"/>
      <ellipse cx="100" cy="48" rx="30" ry="10" fill="#dfeaf5"/>
      <path d="M84 34c0-10 32-10 32 0v14H84z" fill="#c5d4e2"/>
    </svg>`,
  },
  {
    id: "kari",
    word: "კარი",
    label: "კარი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="58" y="28" width="84" height="112" rx="8" fill="#b57a45"/>
      <rect x="68" y="38" width="64" height="92" rx="4" fill="#8b5a2b"/>
      <circle cx="118" cy="86" r="5" fill="#ffd45a"/>
    </svg>`,
  },
  {
    id: "chiti",
    word: "ჩიტი",
    label: "ჩიტი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="104" cy="90" rx="42" ry="28" fill="#7ad0ff"/>
      <circle cx="78" cy="74" r="22" fill="#9fe0ff"/>
      <polygon points="56,74 40,68 56,82" fill="#f0a820"/>
      <circle cx="72" cy="70" r="4" fill="#16324a"/>
      <path d="M110 86c18-22 40-10 46 8" fill="#4aa7d8"/>
      <line x1="96" y1="116" x2="90" y2="132" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>
      <line x1="112" y1="116" x2="120" y2="132" stroke="#8b5a2b" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "mtvare",
    word: "მთვარე",
    label: "მთვარე",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="200" height="160" fill="#2a4a78"/>
      <circle cx="118" cy="78" r="40" fill="#f4efc8"/>
      <circle cx="138" cy="68" r="36" fill="#2a4a78"/>
      <circle cx="40" cy="36" r="2" fill="#fff"/><circle cx="60" cy="54" r="2" fill="#fff"/>
      <circle cx="160" cy="40" r="2" fill="#fff"/><circle cx="48" cy="110" r="2" fill="#fff"/>
    </svg>`,
  },
  {
    id: "dzaghli",
    word: "ძაღლი",
    label: "ძაღლი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="110" cy="108" rx="46" ry="26" fill="#c48a4a"/>
      <circle cx="84" cy="74" r="30" fill="#d4a06a"/>
      <ellipse cx="62" cy="78" rx="10" ry="16" fill="#b5773b"/>
      <ellipse cx="104" cy="78" rx="10" ry="16" fill="#b5773b"/>
      <circle cx="76" cy="72" r="4" fill="#2a2a2a"/><circle cx="94" cy="72" r="4" fill="#2a2a2a"/>
      <ellipse cx="85" cy="84" rx="7" ry="5" fill="#3b2a1a"/>
      <path d="M150 104c20-4 28 14 18 24" fill="none" stroke="#c48a4a" stroke-width="10" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "qvavili",
    word: "ყვავილი",
    label: "ყვავილი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="100" y1="78" x2="100" y2="140" stroke="#3f9e57" stroke-width="8" stroke-linecap="round"/>
      <circle cx="100" cy="64" r="16" fill="#ffd45a"/>
      <circle cx="100" cy="34" r="16" fill="#ff7aa2"/>
      <circle cx="72" cy="52" r="16" fill="#ff7aa2"/>
      <circle cx="128" cy="52" r="16" fill="#ff7aa2"/>
      <circle cx="80" cy="80" r="16" fill="#ff7aa2"/>
      <circle cx="120" cy="80" r="16" fill="#ff7aa2"/>
    </svg>`,
  },
  {
    id: "tsigni",
    word: "წიგნი",
    label: "წიგნი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M42 40h54v92H50a8 8 0 0 1-8-8V40z" fill="#4aa7d8"/>
      <path d="M158 40H104v92h46a8 8 0 0 0 8-8V40z" fill="#3b8eb8"/>
      <rect x="96" y="40" width="8" height="92" fill="#ffd45a"/>
      <path d="M54 58h30M54 74h26M54 90h28" stroke="#dff3ff" stroke-width="4" stroke-linecap="round"/>
      <path d="M116 58h30M116 74h26M116 90h28" stroke="#dff3ff" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "tvali",
    word: "თვალი",
    label: "თვალი",
    svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="80" rx="62" ry="36" fill="#fffdf7" stroke="#214833" stroke-width="6"/>
      <circle cx="100" cy="80" r="22" fill="#4aa7d8"/>
      <circle cx="100" cy="80" r="10" fill="#16324a"/>
      <circle cx="92" cy="72" r="4" fill="#fff"/>
    </svg>`,
  },
];

export { LETTERS };

// Bump when regenerating audio so browsers/phones don't keep old short clips.
const AUDIO_VERSION = "v2-melodic";

export function audioLetterPath(letter) {
  return `./audio/letters/${letter.codePointAt(0).toString(16)}.mp3?${AUDIO_VERSION}`;
}

export function audioWordPath(word) {
  const slug = [...word].map((c) => c.codePointAt(0).toString(16)).join("-");
  return `./audio/words/${slug}.mp3?${AUDIO_VERSION}`;
}