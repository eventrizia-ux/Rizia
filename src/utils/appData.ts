export function parseStoredJson<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Error parsing stored JSON:', error);
    return fallback;
  }
}

export function getUserDisplayName(user?: Record<string, any> | null) {
  const name = user?.name || user?.full_name || user?.email?.split('@')?.[0];
  return name || 'Participant';
}

export function getUserInitial(user?: Record<string, any> | null) {
  return getUserDisplayName(user).charAt(0).toUpperCase();
}

export function getEventDateLabel(event?: Record<string, any> | null) {
  return event?.registration_dead || event?.registration_deadline || event?.event_date || event?.date || 'To be announced';
}

export function getEventTimeLabel(event?: Record<string, any> | null) {
  return event?.event_time || event?.time || 'TBA';
}

export function getEventImage(event?: Record<string, any> | null) {
  return event?.image_url || event?.image || '';
}

export function getEventVenueAddress(event?: Record<string, any> | null) {
  return event?.venue_address || event?.venue || 'Venue to be announced';
}

export function getEventLanguage(event?: Record<string, any> | null) {
  if (Array.isArray(event?.language_options) && event.language_options.length > 0) {
    return event.language_options.join(', ');
  }

  if (typeof event?.language_options === 'string' && event.language_options.trim()) {
    return event.language_options;
  }

  return event?.language || 'To be announced';
}

export function getEventAgeRestriction(event?: Record<string, any> | null) {
  return event?.age_group || event?.age_restriction || 'Open to all';
}

export function normalizeStringList(value?: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function getBookingStatus(booking?: Record<string, any> | null) {
  const rawStatus = booking?.booking_status || booking?.status;
  return typeof rawStatus === 'string' && rawStatus.trim() ? rawStatus.toLowerCase() : 'confirmed';
}

export function getBookingTicketQuantity(booking?: Record<string, any> | null) {
  return booking?.ticket_quantity ?? booking?.ticket_count ?? 1;
}

export function parseDisplayDate(value?: string | null) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatDate(value?: string | null, fallback = 'TBA') {
  const parsed = parseDisplayDate(value);
  return parsed ? parsed.toLocaleDateString() : fallback;
}

export function formatCurrency(value?: string | number | null) {
  const numericValue =
    typeof value === 'number' ? value : Number.parseFloat(String(value ?? '').replace(/[^0-9.-]/g, ''));

  if (Number.isNaN(numericValue)) {
    return 'Rs 0';
  }

  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  }).format(numericValue);
}
