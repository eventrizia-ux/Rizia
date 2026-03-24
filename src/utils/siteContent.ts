export interface SiteDateItem {
  label: string;
  value: string;
}

export interface SiteContent {
  awards: string[];
  importantDates: SiteDateItem[];
  rulebookUrl: string;
}

const STORAGE_KEY = 'rizia-site-content';

export const defaultSiteContent: SiteContent = {
  awards: [
    'Category-wise prizes',
    'Certificates for all participants',
    'Special recognition for outstanding creativity',
    'Selected works may be showcased at diocesan events or platforms',
  ],
  importantDates: [
    { label: 'Registration Deadline', value: 'To be announced' },
    { label: 'Preliminary Rounds', value: 'To be announced' },
    { label: 'Grand Finale', value: 'To be announced' },
    { label: 'Venue', value: 'To be announced' },
  ],
  rulebookUrl: '/rulebook.pdf',
};

export function getSiteContent(): SiteContent {
  if (typeof window === 'undefined') {
    return defaultSiteContent;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultSiteContent;
    }

    const parsed = JSON.parse(raw);

    return {
      awards: Array.isArray(parsed.awards) ? parsed.awards.filter(Boolean) : defaultSiteContent.awards,
      importantDates: Array.isArray(parsed.importantDates)
        ? parsed.importantDates.filter((item: SiteDateItem) => item?.label || item?.value)
        : defaultSiteContent.importantDates,
      rulebookUrl:
        typeof parsed.rulebookUrl === 'string' && parsed.rulebookUrl.trim()
          ? parsed.rulebookUrl
          : defaultSiteContent.rulebookUrl,
    };
  } catch (error) {
    console.error('Error reading site content:', error);
    return defaultSiteContent;
  }
}

export function saveSiteContent(content: SiteContent) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function datesToMultiline(dates: SiteDateItem[]) {
  return dates.map((item) => `${item.label} | ${item.value}`).join('\n');
}

export function multilineToDates(value: string): SiteDateItem[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split('|');
      return {
        label: label?.trim() || 'Untitled',
        value: rest.join('|').trim() || 'To be announced',
      };
    });
}
