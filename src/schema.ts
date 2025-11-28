/**
 * AI Event Schema
 * 
 * TypeScript interfaces for structured event data extracted from natural language.
 * This is the open standard for AI-generated event data.
 */

export interface EventLocation {
  venue_name?: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state_or_region?: string | null;
  country?: string | null;
  zip_or_postal_code?: string | null;
}

export interface EventData {
  title: string;
  start_date: string; // ISO 8601 format: "YYYY-MM-DD HH:MM:SS" or ISO string
  end_date?: string; // ISO 8601 format
  location?: string | null; // Simple location string
  location_details?: EventLocation | null;
  ticket_price?: number | null;
  currency?: string | null; // e.g., "USD", "AUD", "EUR"
  category?: string; // MUSIC|SPORTS|BUSINESS|EDUCATION|FOOD|ARTS|FESTIVAL|CONFERENCE|WORKSHOP|OTHER
  description: string;
  timezone?: string | null; // e.g., "America/New_York", "Australia/Sydney"
  tags?: string[];
  image_search_query?: string; // Query for finding event banner images
}

export interface ParseEventResult {
  success: boolean;
  data?: EventData;
  error?: string;
  rawResponse?: string;
}

