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
    footerQuote: '"Whoever saves one life, it is as if he saves an entire world"',
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
  zh: {
    emergencyCall: '紧急? 立即拨打',
    rescueOrg: '联合救援:',
    shareApp: '分享应用',
    mainTitle: '急救指南',
    mainSubtitle: '专业、快速、易用的急救指南',
    importantNote: '重要提示',
    importantNoteDesc: '仅供教育参考，紧急情况请拨打当地救援电话',
    tabProcedures: '治疗指南',
    tabNumbers: '紧急号码',
    searchPlaceholder: '搜索医疗状况...',
    searchNumbersPlaceholder: '搜索紧急号码...',
    noResults: '未找到结果。',
    clearSearch: '清除搜索',
    stepsTitle: '处理步骤:',
    tipsTitle: '专业提示:',
    shareGuide: '分享指南',
    closeGuide: '关闭指南',
    warningTitle: '重要警告:',
    footerQuote: '"救人一命，如救苍生"',
    footerRights: '(C) Noam Gold AI 2026',
    feedback: '发送反馈',
    copiedToast: '已复制链接!',
    scrollToTop: '回到顶部',
    fontSize: '字体大小',
    speak: '朗读',
    themeToggle: '切换主题',
    all: '全部',
    urgent: '紧急',
    injury: '受伤',
    general: '常规'
  },
  hi: {
    emergencyCall: 'आपातकाल? तुरंत कॉल करें',
    rescueOrg: 'यूनाइटेड हत्ज़ला:',
    shareApp: 'ऐप साझा करें',
    mainTitle: 'जीवन रक्षक प्राथमिक चिकित्सा',
    mainSubtitle: 'सुलभ, तेज़ और पेशेवर मार्गदर्शन',
    importantNote: 'महत्वपूर्ण सूचना',
    importantNoteDesc: 'केवल शैक्षिक उद्देश्यों के लिए। आपातकाल में 101 पर कॉल करें',
    tabProcedures: 'उपचार मार्गदर्शिका',
    tabNumbers: 'आपातकालीन नंबर',
    searchPlaceholder: 'खोजें...',
    searchNumbersPlaceholder: 'नंबर खोजें...',
    noResults: 'कोई परिणाम नहीं मिला।',
    clearSearch: 'साफ़ करें',
    stepsTitle: 'चरण-दर-चरण उपचार:',
    tipsTitle: 'पेशेवर सुझाव:',
    shareGuide: 'साझा करें',
    closeGuide: 'बंद करें',
    warningTitle: 'महत्वपूर्ण चेतावनी:',
    footerQuote: '"एक जीवन बचाना पूरी दुनिया बचाने के समान है"',
    footerRights: '(C) Noam Gold AI 2026',
    feedback: 'प्रतिक्रिया भेजें',
    copiedToast: 'कॉपी किया गया!',
    scrollToTop: 'ऊपर स्क्रॉल करें',
    fontSize: 'फ़ॉन्ट आकार',
    speak: 'बोलें',
    themeToggle: 'थीम बदलें',
    all: 'सभी',
    urgent: 'अत्यावश्यक',
    injury: 'चोट',
    general: 'सामान्य'
  },
  de: {
    emergencyCall: 'Notfall? Sofort anrufen',
    rescueOrg: 'United Hatzalah:',
    shareApp: 'App teilen',
    mainTitle: 'Lebensrettende Erste Hilfe',
    mainSubtitle: 'Professioneller Guide für Notfälle',
    importantNote: 'Wichtig zu merken',
    importantNoteDesc: 'Nur zu Bildungszwecken. Im Notfall 101 anrufen',
    tabProcedures: 'Behandlungsanleitungen',
    tabNumbers: 'Notrufnummern',
    searchPlaceholder: 'Suche...',
    searchNumbersPlaceholder: 'Suche Nummern...',
    noResults: 'Keine Ergebnisse gefunden.',
    clearSearch: 'Suche löschen',
    stepsTitle: 'Schritt-für-Schritt:',
    tipsTitle: 'Profi-Tipps:',
    shareGuide: 'Anleitung teilen',
    closeGuide: 'Schließen',
    warningTitle: 'Wichtige Warnung:',
    footerQuote: '"Wer ein Leben rettet, rettet die ganze Welt"',
    footerRights: '(C) Noam Gold AI 2026',
    feedback: 'Feedback geben',
    copiedToast: 'Link kopiert!',
    scrollToTop: 'Nach oben',
    fontSize: 'Schriftgröße',
    speak: 'Vorlesen',
    themeToggle: 'Design ändern',
    all: 'Alle',
    urgent: 'Dringend',
    injury: 'Verletzung',
    general: 'Allgemein'
  },
  es: {
    emergencyCall: '¿Emergencia? Llame ahora',
    rescueOrg: 'Hatzalah Unida:',
    shareApp: 'Compartir aplicación',
    mainTitle: 'Primeros Auxilios',
    mainSubtitle: 'Guía profesional rápida para salvar vidas',
    importantNote: 'Importante recordar',
    importantNoteDesc: 'Solo fines educativos. En emergencias llame al 101',
    tabProcedures: 'Guías de tratamiento',
    tabNumbers: 'Números de emergencia',
    searchPlaceholder: 'Buscar...',
    searchNumbersPlaceholder: 'Buscar números...',
    noResults: 'No se encontraron resultados.',
    clearSearch: 'Limpiar búsqueda',
    stepsTitle: 'Pasos de tratamiento:',
    tipsTitle: 'Consejos profesionales:',
    shareGuide: 'Compartir guía',
    closeGuide: 'Cerrar',
    warningTitle: 'Aviso importante:',
    footerQuote: '"Quien salva una vida salva al mundo entero"',
    footerRights: '(C) Noam Gold AI 2026',
    feedback: 'Enviar comentarios',
    copiedToast: '¡Enlace copiado!',
    scrollToTop: 'Subir',
    fontSize: 'Tamaño de fuente',
    speak: 'Leer',
    themeToggle: 'Cambiar tema',
    all: 'Todo',
    urgent: 'Urgente',
    injury: 'Lesión',
    general: 'General'
  },
  fr: {
    emergencyCall: 'Urgence ? Appelez vite',
    rescueOrg: 'Hatzalah Unie:',
    shareApp: 'Partager l\'appli',
    mainTitle: 'Premiers Secours',
    mainSubtitle: 'Guide professionnel pour sauver des vies',
    importantNote: 'À retenir',
    importantNoteDesc: 'Usage éducatif uniquement. En cas d\'urgence, appelez le 101',
    tabProcedures: 'Guides de soins',
    tabNumbers: 'Numéros d\'urgence',
    searchPlaceholder: 'Rechercher...',
    searchNumbersPlaceholder: 'Rechercher numéros...',
    noResults: 'Aucun résultat.',
    clearSearch: 'Effacer',
    stepsTitle: 'Étapes à suivre :',
    tipsTitle: 'Conseils pros :',
    shareGuide: 'Partager le guide',
    closeGuide: 'Fermer',
    warningTitle: 'Alerte importante :',
    footerQuote: '"Sauver une vie, c\'est sauver le monde"',
    footerRights: '(C) Noam Gold AI 2026',
    feedback: 'Envoyer avis',
    copiedToast: 'Lien copié !',
    scrollToTop: 'Haut de page',
    fontSize: 'Police',
    speak: 'Écouter',
    themeToggle: 'Changer thème',
    all: 'Tout',
    urgent: 'Urgent',
    injury: 'Blessure',
    general: 'Général'
  }
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
  }
];

// In a real app we'd translate the content too. For this demo, we use baseProcedures but map labels.
export const PROCEDURES: Record<Language, Procedure[]> = {
  he: baseProcedures,
  en: baseProcedures,
  zh: baseProcedures,
  hi: baseProcedures,
  de: baseProcedures,
  es: baseProcedures,
  fr: baseProcedures
};

export const EMERGENCY_NUMBERS: Record<Language, EmergencyNumber[]> = {
  he: [
    { name: 'מד"א', number: '101', description: 'עזרה רפואית דחופה' },
    { name: 'משטרה', number: '100', description: 'דיווח על אירוע פלילי/תאונה' },
    { name: 'כבאות', number: '102', description: 'שריפות וחילוץ' },
    { name: 'איחוד הצלה', number: '1221', description: 'מתנדבי עזרה ראשונה' }
  ],
  en: [
    { name: 'MADA', number: '101', description: 'Medical Emergency' },
    { name: 'Police', number: '100', description: 'Police Dispatch' },
    { name: 'Fire', number: '102', description: 'Rescue & Fire' },
    { name: 'Rescue', number: '1221', description: 'First Aid Volunteers' }
  ],
  zh: [], hi: [], de: [], es: [], fr: []
};

// Fill empty number records
(Object.keys(EMERGENCY_NUMBERS) as Language[]).forEach(l => {
  if (EMERGENCY_NUMBERS[l].length === 0) EMERGENCY_NUMBERS[l] = EMERGENCY_NUMBERS['en'];
});