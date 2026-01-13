
export interface ProcedureVisual {
  type: 'diagram' | 'icon-list';
  title: string;
  items: { label: string; color?: string; icon?: string }[];
}

export interface Procedure {
  id: string;
  title: string;
  icon: string;
  category: 'urgent' | 'injury' | 'general';
  shortDesc: string;
  steps: string[];
  tips: string[];
  warning?: string;
  visuals?: ProcedureVisual;
}

export interface EmergencyNumber {
  name: string;
  number: string;
  description: string;
}

export type Language = 'he' | 'en' | 'zh' | 'hi' | 'de' | 'es' | 'fr';

export interface UIStrings {
  emergencyCall: string;
  rescueOrg: string;
  shareApp: string;
  mainTitle: string;
  mainSubtitle: string;
  importantNote: string;
  importantNoteDesc: string;
  tabProcedures: string;
  tabNumbers: string;
  searchPlaceholder: string;
  searchNumbersPlaceholder: string;
  noResults: string;
  clearSearch: string;
  stepsTitle: string;
  tipsTitle: string;
  shareGuide: string;
  closeGuide: string;
  warningTitle: string;
  footerQuote: string;
  footerRights: string;
  copiedToast: string;
  scrollToTop: string;
  feedback: string;
  fontSize: string;
  speak: string;
  themeToggle: string;
  all: string;
  urgent: string;
  injury: string;
  general: string;
}
