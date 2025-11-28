/**
 * AI Event Schema
 * 
 * The open standard for AI-generated event data.
 * Parse natural language into structured event objects using OpenAI.
 * 
 * @packageDocumentation
 */

export { EventData, EventLocation, ParseEventResult } from './schema';
export { parseEventPrompt, ParseEventOptions } from './parser';
export { EVENT_EXTRACTION_PROMPT } from './prompts';

