import { Procedure, EmergencyNumber, UIStrings, Language } from './types';

export const UI_TRANSLATIONS: Record<Language, UIStrings> = {
  he: {
    emergencyCall: 'מצב חירום? התקשר מיד',
    rescueOrg: 'איחוד הצלה:',
    shareApp: 'שתף אפליקציה מצילת חיים',
    mainTitle: 'עזרה ראשונה מצילת חיים',
    mainSubtitle: 'מדריך נגיש, מהיר ומקצועי. הידע שלך יכול להיות ההבדל בין חיים למוות.',
    importantNote: 'חשוב לזכור',
    importantNoteDesc: 'המידע באתר זה הינו לימודי בלבד ואינו מחליף הכשרה מקצועית. בכל אירוע רפואי חריג, יש לפעול לפי הנחיות המוקדן הטלפוני במוקד החירום (101).',
    tabProcedures: 'מדריכי טיפול',
    tabNumbers: 'מספרי חירום',
    searchPlaceholder: 'חפש מצב רפואי...',
    searchNumbersPlaceholder: 'חפש מספר חירום...',
    noResults: 'לא נמצאו תוצאות.',
    clearSearch: 'נקה חיפוש',
    stepsTitle: 'שלבי הטיפול צעד אחר צעד:',
    tipsTitle: 'דגשים וטיפים מקצועיים:',
    shareGuide: 'שתף מדריך',
    closeGuide: 'סגור מדריך',
    warningTitle: 'אזהרה חשובה:',
    footerQuote: '"כל המקיים נפש אחת, מעלים עליו כאילו קיים עולם מלא"',
    footerRights: '(C) Noam Gold AI 2026',
    feedback: 'שלח משוב',
    copiedToast: 'הקישור הועתק!',
    scrollToTop: 'גלול למעלה',
    fontSize: 'גודל גופן',
    speak: 'הקרא',
    themeToggle: 'החלף מצב תצוגה',
    all: 'הכל',
    urgent: 'דחוף',
    injury: 'פציעה',
    general: 'כללי'
  },
  en: {
    emergencyCall: 'Emergency? Call immediately',
    rescueOrg: 'United Hatzalah:',
    shareApp: 'Share life-saving app',
    mainTitle: 'Life-Saving First Aid',
    mainSubtitle: 'Accessible, fast, and professional guide.',
    importantNote: 'Important to Remember',
    importantNoteDesc: 'Educational purposes only. In any medical emergency, call 101.',
    tabProcedures: 'Treatment Guides',
    tabNumbers: 'Emergency Numbers',
    searchPlaceholder: 'Search medical condition...',
    searchNumbersPlaceholder: 'Search emergency number...',
    noResults: 'No results found.',
    clearSearch: 'Clear search',
    stepsTitle: 'Step-by-step treatment:',
    tipsTitle: 'Professional tips:',
    shareGuide: 'Share guide',
    closeGuide: 'Close guide',
    warningTitle: 'Important Warning:',
    footerQuote: '"Whoever saves one life, it is as if he saved an entire world"',
    footerRights: '(C) Noam Gold AI 2026',
    feedback: 'Send Feedback',
    copiedToast: 'Link copied!',
    scrollToTop: 'Scroll to top',
    fontSize: 'Font Size',
    speak: 'Speak',
    themeToggle: 'Toggle Theme',
    all: 'All',
    urgent: 'Urgent',
    injury: 'Injury',
    general: 'General'
  },
  zh: { emergencyCall: '紧急', rescueOrg: '联合救援', shareApp: '分享', mainTitle: '急救指南', mainSubtitle: '专业知识', importantNote: '注意', importantNoteDesc: '仅供教育', tabProcedures: '指南', tabNumbers: '号码', searchPlaceholder: '搜索...', searchNumbersPlaceholder: '搜索号码...', noResults: '无结果', clearSearch: '清除', stepsTitle: '步骤:', tipsTitle: '提示:', shareGuide: '分享', closeGuide: '关闭', warningTitle: '警告:', footerQuote: '救人一命胜造七级浮屠', footerRights: '(C) Noam Gold AI 2026', feedback: '反馈', copiedToast: '已复制', scrollToTop: '顶部', fontSize: '字体', speak: '朗读', themeToggle: '主题', all: '全部', urgent: '紧急', injury: '受伤', general: '常规' },
  hi: { emergencyCall: 'आपातकाल', rescueOrg: 'यूनाइटेड हत्ज़ला', shareApp: 'साझा', mainTitle: 'प्राथमिक उपचार', mainSubtitle: 'पेशेवर मार्गदर्शन', importantNote: 'नोट', importantNoteDesc: 'केवल शैक्षिक', tabProcedures: 'गाइड', tabNumbers: 'नंबर', searchPlaceholder: 'खोजें...', searchNumbersPlaceholder: 'नंबर खोजें...', noResults: 'कोई परिणाम नहीं', clearSearch: 'साफ़', stepsTitle: 'चरण:', tipsTitle: 'सुझाव:', shareGuide: 'साझा', closeGuide: 'बंद', warningTitle: 'चेतावनी:', footerQuote: 'एक जीवन बचाना पूरी दुनिया बचाने जैसा है', footerRights: '(C) Noam Gold AI 2026', feedback: 'प्रतिक्रिया', copiedToast: 'कॉपी', scrollToTop: 'ऊपर', fontSize: 'फ़ॉन्ट', speak: 'बोलें', themeToggle: 'थीם', all: 'सब', urgent: 'अत्यावश्यक', injury: 'चוט', general: 'सामान्य' },
  de: { emergencyCall: 'Notruf', rescueOrg: 'Hatzalah', shareApp: 'Teilen', mainTitle: 'Erste Hilfe', mainSubtitle: 'Profi-Guide', importantNote: 'Wichtig', importantNoteDesc: 'Nur Bildung', tabProcedures: 'Anleitungen', tabNumbers: 'Nummern', searchPlaceholder: 'Suchen...', searchNumbersPlaceholder: 'Suchen...', noResults: 'Keine Ergebnisse', clearSearch: 'Löschen', stepsTitle: 'Schritte:', tipsTitle: 'Tipps:', shareGuide: 'Teilen', closeGuide: 'Schließen', warningTitle: 'Warnung:', footerQuote: 'Wer ein Leben rettet, rettet die Welt', footerRights: '(C) Noam Gold AI 2026', feedback: 'Feedback', copiedToast: 'Kopiert', scrollToTop: 'Oben', fontSize: 'Schrift', speak: 'Lesen', themeToggle: 'Thema', all: 'Alle', urgent: 'Dringend', injury: 'Verletzung', general: 'Allgemein' },
  es: { emergencyCall: 'Emergencia', rescueOrg: 'Hatzalah', shareApp: 'Compartir', mainTitle: 'Primeros Auxilios', mainSubtitle: 'Guía profesional', importantNote: 'Nota', importantNoteDesc: 'Solo educación', tabProcedures: 'Guías', tabNumbers: 'Números', searchPlaceholder: 'Buscar...', searchNumbersPlaceholder: 'Buscar...', noResults: 'Sin resultados', clearSearch: 'Limpiar', stepsTitle: 'Pasos:', tipsTitle: 'Consejos:', shareGuide: 'Compartir', closeGuide: 'Cerrar', warningTitle: 'Aviso:', footerQuote: 'Quien salva una vida salva al mundo', footerRights: '(C) Noam Gold AI 2026', feedback: 'Feedback', copiedToast: 'Copiado', scrollToTop: 'Subir', fontSize: 'Fuente', speak: 'Leer', themeToggle: 'Tema', all: 'Todo', urgent: 'Urgente', injury: 'Lesión', general: 'General' },
  fr: { emergencyCall: 'Urgence', rescueOrg: 'Hatzalah', shareApp: 'Partager', mainTitle: 'Premiers Secours', mainSubtitle: 'Guide pro', importantNote: 'Note', importantNoteDesc: 'Éducation seulement', tabProcedures: 'Guides', tabNumbers: 'Numéros', searchPlaceholder: 'Chercher...', searchNumbersPlaceholder: 'Chercher...', noResults: 'Aucun résultat', clearSearch: 'Effacer', stepsTitle: 'Étapes:', tipsTitle: 'Conseils:', shareGuide: 'Partager', closeGuide: 'Fermer', warningTitle: 'Alerte:', footerQuote: 'Sauver une vie, c\'est sauver le monde', footerRights: '(C) Noam Gold AI 2026', feedback: 'Feedback', copiedToast: 'Copié', scrollToTop: 'Haut', fontSize: 'Police', speak: 'Lire', themeToggle: 'Thème', all: 'Tout', urgent: 'Urgent', injury: 'Blessure', general: 'Général' }
};

const baseProcedures: Procedure[] = [
  {
    id: 'cpr',
    title: 'דום לב והחייאה (CPR)',
    icon: '❤️',
    category: 'urgent',
    shortDesc: 'החייאת לב-ריאה בסיסית להצלת חיים במקרה של דום לב פתאומי.',
    steps: [
      'בטיחות: ודא שהסביבה בטוחה לך ולמטופל.',
      'בדיקת הכרה: קרא למטופל וצבוט בשריר הטרפז.',
      'קריאה לעזרה: התקשר ל-101 והבא דפיברילטור (מפעם).',
      'בדיקת נשימה: הטיית ראש לאחור ובדיקה אם בית החזה עולה.',
      'עיסויי חזה: 100-120 עיסויים בדקה במרכז החזה.',
      'דפיברילטור: חבר והפעל לפי הנחיות המכשיר.'
    ],
    tips: ['קצב: Stayin Alive.', 'עומק: 5 ס"מ.'],
    warning: 'אל תפסיק עיסויים עד הגעת צוות רפואי.',
    visuals: {
      type: 'icon-list',
      title: 'דגשי החייאה',
      items: [
        { label: 'קצב 100-120 בדקה', icon: '⏱️' },
        { label: 'עומק 5-6 ס"מ', icon: '📏' },
        { label: 'שימוש במפעם (AED)', icon: '⚡' }
      ]
    }
  },
  {
    id: 'choking',
    title: 'חנק מגוף זר',
    icon: '🥨',
    category: 'urgent',
    shortDesc: 'סיוע לאדם שנחנק מאוכל או מחפץ.',
    steps: [
      'עידוד שיעול: אם הנפגע משתעל, עודד אותו להמשיך.',
      'היימליך: בצע לחיצות בטן פנימה ולמעלה (באדם בהכרה).',
      'תינוקות: 5 טפיחות גב ו-5 לחיצות חזה לסירוגין.',
      'חוסר הכרה: אם הנפגע מאבד הכרה, התחל החייאה מיד.'
    ],
    tips: ['אל תכניס אצבעות לפה אם לא רואים את החפץ.'],
    visuals: {
      type: 'diagram',
      title: 'מיקום לחיצת היימליך',
      items: [
        { label: 'מעל הטבור, מתחת לצלעות', color: '#ef4444', icon: '📍' },
        { label: 'לחיצה חזקה פנימה ולמעלה', color: '#3b82f6', icon: '⤴️' }
      ]
    }
  },
  {
    id: 'bleeding',
    title: 'עצירת דימום',
    icon: '🩹',
    category: 'urgent',
    shortDesc: 'טיפול בדימומים פעילים למניעת אובדן דם והלם.',
    steps: [
      'לחץ ישיר: הנח תחבושת או בד נקי ולחץ חזק מאוד על הפצע.',
      'הגבהה: הרם את האיבר המדמם מעל גובה הלב.',
      'חבישה לוחצת: חבוש את המקום בצורה הדוקה.',
      'חסם עורקים: רק בדימום פורץ מגפיים שלא נעצר בלחץ ישיר.'
    ],
    tips: ['אל תסיר תחבושת ספוגה בדם, הנח חדשה מעליה.'],
    visuals: {
      type: 'icon-list',
      title: 'דרכי עצירה',
      items: [
        { label: 'לחץ ישיר חזק', icon: '🖐️' },
        { label: 'חסם עורקים (טורניקה)', icon: '➰' },
        { label: 'חבישה לוחצת (תחבושת אישית)', icon: '🤕' }
      ]
    }
  },
  {
    id: 'animal_bite',
    title: 'נשיכת בעל חיים',
    icon: '🐕',
    category: 'urgent',
    shortDesc: 'טיפול בנשיכות כלבים, חתולים או חיות בר.',
    steps: [
      'שטיפה: שטוף במים וסבון למשך 15 דקות לפחות.',
      'חיטוי: חטא את האזור בתמיסת חיטוי.',
      'חבישה: כסה בתחבושת נקייה.',
      'פינוי: פנה למרפאה לבדיקת טטנוס וכלבת.'
    ],
    tips: ['נסה לתעד את פרטי בעלי החיים.'],
    visuals: {
      type: 'diagram',
      title: 'שלבי טיפול ראשוני בנשיכה',
      items: [
        { label: 'ניקוי יסודי במים וסבון', icon: '🚿', color: '#3b82f6' },
        { label: 'עצירת דימום בלחץ ישיר', icon: '🩹', color: '#ef4444' },
        { label: 'פנייה דחופה לטיפול רפואי', icon: '🏥', color: '#10b981' }
      ]
    }
  },
  {
    id: 'allergic_reaction',
    title: 'תגובה אלרגית (אנפילקסיס)',
    icon: '🥜',
    category: 'urgent',
    shortDesc: 'תגובה חריפה של הגוף לחשיפה לאלרגן (מזון, עקיצה, תרופה).',
    steps: [
      'זיהוי: קוצר נשימה, נפיחות בפנים, פריחה או חולשה.',
      'קריאה ל-101: הזעק עזרה מיד.',
      'אפיפן: אם קיים מזרק, השתמש בו מייד בירך החיצונית.',
      'ניטור: השאר את הנפגע בישיבה/שכיבה ונטר נשימה.',
      'מזרק שני: אם אין שיפור תוך 5 דקות, השתמש במזרק נוסף.'
    ],
    tips: ['הזרקה למשך 10 שניות לתוך השריר.', 'אל תמתין להגעת אמבולנס לפני הזרקה.'],
    visuals: {
      type: 'diagram',
      title: 'מיקום הזרקת אפיפן',
      items: [
        { label: 'ירך חיצונית (מרכז השריר)', color: '#3b82f6', icon: '💉' },
        { label: 'אחיזה בטיחותית', color: '#10b981', icon: '✊' }
      ]
    }
  },
  {
    id: 'burns',
    title: 'טיפול בכוויות',
    icon: '🔥',
    category: 'injury',
    shortDesc: 'טיפול בכוויות חום, נוזל רותח או כימיקלים.',
    steps: [
      'קירור: שטוף במים פושרים 20 דקות.',
      'הסרה: תכשיטים ובגדים (רק אם לא דבוקים).',
      'כיסוי: תחבושת לא דביקה או ניילון נצמד נקי.',
      'פינוי: במקרה של כוויה נרחבת או עמוקה.'
    ],
    tips: ['אל תמרח משחת שיניים, שמן או חמאה.', 'אל תפוצץ שלפוחיות.'],
    visuals: {
      type: 'diagram',
      title: 'דרגות כוויה ופירוט',
      items: [
        { label: 'דרגה 1: אודם, כאב שטחי (דומה לכוויית שמש)', color: '#fca5a5', icon: '🔴' },
        { label: 'דרגה 2: שלפוחיות, כאב עז (נזק לשכבת הדרמיס)', color: '#ef4444', icon: '🫧' },
        { label: 'דרגה 3: עור שרוף/לבן, הרס עצבים (לרוב ללא כאב)', color: '#b91c1c', icon: '💀' }
      ]
    }
  },
  {
    id: 'sprain',
    title: 'נקע',
    icon: '🦵',
    category: 'injury',
    shortDesc: 'מתיחה או קרע של רצועות במפרק.',
    steps: [
      'מנוחה (Rest): אל תדרוך על האיבר הפגוע.',
      'קירור (Ice): הנח קרח עטוף במגבת ל-20 דקות.',
      'חבישה (Compression): חבוש בתחבושת אלסטית.',
      'הגבהה (Elevation): הרם את האיבר מעל גובה הלב.'
    ],
    tips: ['זכור את ראשי התיבות R.I.C.E.', 'אל תשתמש במים חמים ב-48 שעות הראשונות.'],
    visuals: {
      type: 'diagram',
      title: 'פרוטוקול R.I.C.E',
      items: [
        { label: 'Rest - מנוחה מלאה', color: '#94a3b8', icon: '🛌' },
        { label: 'Ice - קירור (20 דק\')', color: '#60a5fa', icon: '🧊' },
        { label: 'Comp - חבישה אלסטית', color: '#3b82f6', icon: '🩹' },
        { label: 'Elev - הגבהת האיבר', color: '#2563eb', icon: '🔼' }
      ]
    }
  },
  {
    id: 'bruise',
    title: 'חבורה (סימן כחול)',
    icon: '🤕',
    category: 'injury',
    shortDesc: 'דימום תת-עורי כתוצאה ממכה יבשה.',
    steps: [
      'קירור: הנח קומפרס קר מייד לאחר המכה.',
      'הגבהה: הרם את האיבר להפחתת הנפיחות.',
      'מנוחה: מנע מאמץ מהאזור הפגוע.'
    ],
    tips: ['הקרח עוזר לכיווץ כלי דם ולצמצום שטף הדם.'],
    visuals: {
      type: 'icon-list',
      title: 'טיפול בחבורה',
      items: [
        { label: 'קומפרס קר מהיר', icon: '❄️' },
        { label: 'הגבהת האזור', icon: '🛋️' }
      ]
    }
  },
  {
    id: 'poisoning',
    title: 'הרעלה',
    icon: '🧪',
    category: 'urgent',
    shortDesc: 'בליעה או שאיפה של חומרים רעילים.',
    steps: [
      'זיהוי החומר: נסה להבין מה הנפגע בלע/שאף.',
      'קריאה ל-101: דווח על סוג החומר וכמותו.',
      'איסור הקאה: אל תנסה לגרום לנפגע להקיא.',
      'שטיפה: אם החומר על העור, שטוף במים זורמים.'
    ],
    tips: ['קח את אריזת החומר לבית החולים.', 'התקשר למרכז ההרעלות לקבלת הנחיות.'],
    visuals: {
      type: 'icon-list',
      title: 'דגשי בטיחות בהרעלה',
      items: [
        { label: 'אל תגרום להקאה', icon: '🚫' },
        { label: 'שמור את האריזה', icon: '📦' },
        { label: 'אוורור המקום', icon: '🌬️' }
      ]
    }
  },
  {
    id: 'electric_shock',
    title: 'התחשמלות',
    icon: '⚡',
    category: 'urgent',
    shortDesc: 'פגיעה מזרם חשמלי.',
    steps: [
      'בטיחות: אל תיגע בנפגע כל עוד הוא מחובר לחשמל.',
      'ניתוק: נתק את זרם החשמל הראשי (פיוז).',
      'הרחקה: השתמש בחפץ מבודד (עץ/פלסטיק) להרחקת הנפגע.',
      'החייאה: אם הנפגע ללא דופק/נשימה, התחל CPR מייד.'
    ],
    tips: ['פנה לבדיקת לב גם אם הנפגע מרגיש טוב.', 'חשד לנזק פנימי.'],
    visuals: {
      type: 'icon-list',
      title: 'סדר פעולות',
      items: [
        { label: 'ניתוק זרם ראשי', icon: '🔌' },
        { label: 'חפץ מבודד להרחקה', icon: '🪵' },
        { label: 'בדיקת הכרה ונשימה', icon: '❤️' }
      ]
    }
  },
  {
    id: 'jellyfish_sting',
    title: 'צריבת מדוזה',
    icon: '🪼',
    category: 'injury',
    shortDesc: 'טיפול בצריבה ממדוזה בים.',
    steps: [
      'הסרה: הסר שאריות זרועות בעזרת חפץ פלסטיק (כרטיס).',
      'מי ים: שטוף את המקום במי ים בלבד.',
      'מים חמים: טבול במים חמים (45 מעלות) לשיכוך כאב.',
      'מניעת שפשוף: אל תשפשף את האזור.'
    ],
    tips: ['מים מתוקים מפוצצים את תאי הארס - הימנע מהם!', 'חומץ עוזר רק במינים מסוימים.'],
    visuals: {
      type: 'icon-list',
      title: 'עשה ואל תעשה',
      items: [
        { label: 'רק מי ים לשטיפה', icon: '🌊' },
        { label: 'מים חמים לכאב', icon: '🔥' },
        { label: 'לא מים מתוקים', icon: '🚫' }
      ]
    }
  },
  {
    id: 'spider_scorpion',
    title: 'עקיצת עכביש או עקרב',
    icon: '🦂',
    category: 'urgent',
    shortDesc: 'טיפול בחשד לעקיצת עקרב או עכביש ארסי.',
    steps: [
      'מנוחה: השכב את הנפגע ומנע תזוזה.',
      'קיבוע: קבע את האיבר הפגוע.',
      'קירור: הנח קומפרס קר להקלת הכאב.',
      'פינוי: פנה מייד לבית חולים.'
    ],
    tips: ['אל תמצוץ ארס.', 'אל תבצע חתכים.', 'עקרב צהוב נחשב למסוכן ביותר בישראל.'],
    visuals: {
      type: 'icon-list',
      title: 'דגשי עקיצה',
      items: [
        { label: 'מנוחה מוחלטת', icon: '🛌' },
        { label: 'קירור המקום', icon: '🧊' },
        { label: 'פינוי דחוף', icon: '🚑' }
      ]
    }
  },
  {
    id: 'fainting',
    title: 'עילפון',
    icon: '🧘',
    category: 'general',
    shortDesc: 'טיפול באדם שאיבד הכרה לזמן קצר.',
    steps: [
      'השכבה: על הגב במקום מוצל ומאוורר.',
      'הגבהה: רגליים למעלה (כ-30 ס"מ).',
      'אוורור: שחרר בגדים לוחצים (עניבה, חגורה).',
      'מנוחה: תן לנפגע להתאושש לאט.'
    ],
    tips: ['אל תשפוך מים על הפנים.', 'בדוק אם יש פציעות נפילה.'],
    visuals: {
      type: 'icon-list',
      title: 'שלבי התאוששות',
      items: [
        { label: 'הגבהת רגליים', icon: '🦶' },
        { label: 'שחרור בגדים לוחצים', icon: '👔' },
        { label: 'מנוחה סטטית', icon: '🛋️' }
      ]
    }
  }
];

export const PROCEDURES: Record<Language, Procedure[]> = {
  he: baseProcedures,
  en: baseProcedures.map(p => ({ ...p, title: p.id.replace(/_/g, ' ').toUpperCase(), shortDesc: "Localized instructions for this procedure." })),
  zh: baseProcedures.map(p => ({ ...p, title: p.id, shortDesc: "ZH localization info" })),
  hi: baseProcedures.map(p => ({ ...p, title: p.id, shortDesc: "HI localization info" })),
  de: baseProcedures.map(p => ({ ...p, title: p.id, shortDesc: "DE localization info" })),
  es: baseProcedures.map(p => ({ ...p, title: p.id, shortDesc: "ES localization info" })),
  fr: baseProcedures.map(p => ({ ...p, title: p.id, shortDesc: "FR localization info" }))
};

export const EMERGENCY_NUMBERS: Record<Language, EmergencyNumber[]> = {
  he: [
    { name: 'מד"א', number: '101', description: 'עזרה רפואית דחופה' },
    { name: 'משטרה', number: '100', description: 'דיווח על אירוע פלילי/תאונה' },
    { name: 'כבאות', number: '102', description: 'שריפות וחילוץ' },
    { name: 'איחוד הצלה', number: '1221', description: 'מתנדבי עזרה ראשונה' },
    { name: 'ידידים', number: '1230', description: 'סיוע בדרכים' }
  ],
  en: [
    { name: 'MADA', number: '101', description: 'Medical Emergency' },
    { name: 'Police', number: '100', description: 'Emergency / Crime' },
    { name: 'Fire Dept', number: '102', description: 'Rescue' }
  ],
  zh: [], hi: [], de: [], es: [], fr: []
};

(Object.keys(EMERGENCY_NUMBERS) as Language[]).forEach(l => {
  if (EMERGENCY_NUMBERS[l].length === 0) EMERGENCY_NUMBERS[l] = EMERGENCY_NUMBERS['en'];
});