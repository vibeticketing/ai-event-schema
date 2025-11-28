/**
 * Event Parser
 * 
 * Parses natural language prompts into structured event data using OpenAI.
 */

import OpenAI from 'openai';
import { EventData, ParseEventResult } from './schema';
import { EVENT_EXTRACTION_PROMPT } from './prompts';

export interface ParseEventOptions {
  apiKey: string;
  model?: 'gpt-4' | 'gpt-3.5-turbo' | 'gpt-4-turbo';
  temperature?: number;
  maxTokens?: number;
}

/**
 * Parse a natural language event description into structured event data
 * 
 * @param prompt - Natural language description of the event
 * @param options - Configuration options including OpenAI API key
 * @returns Parsed event data or error
 * 
 * @example
 * ```typescript
 * const result = await parseEventPrompt(
 *   "Jazz concert in Sydney on December 20th at 8pm, tickets $50",
 *   { apiKey: process.env.OPENAI_API_KEY! }
 * );
 * 
 * if (result.success) {
 *   console.log(result.data?.title); // "Jazz Concert"
 *   console.log(result.data?.start_date); // "2024-12-20 20:00:00"
 * }
 * ```
 */
export async function parseEventPrompt(
  prompt: string,
  options: ParseEventOptions
): Promise<ParseEventResult> {
  const {
    apiKey,
    model = 'gpt-4',
    temperature = 0.3,
    maxTokens = 2000,
  } = options;

  if (!apiKey) {
    return {
      success: false,
      error: 'OpenAI API key is required',
    };
  }

  if (!prompt || prompt.trim().length === 0) {
    return {
      success: false,
      error: 'Prompt cannot be empty',
    };
  }

  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: EVENT_EXTRACTION_PROMPT },
        { role: 'user', content: prompt },
      ],
      max_tokens: maxTokens,
      temperature,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return {
        success: false,
        error: 'No response from OpenAI',
      };
    }

    // Parse JSON response
    let parsedData: EventData;
    try {
      const jsonResponse = JSON.parse(content);
      parsedData = jsonResponse as EventData;
    } catch (parseError) {
      return {
        success: false,
        error: `Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
        rawResponse: content,
      };
    }

    // Validate required fields
    if (!parsedData.title || !parsedData.start_date || !parsedData.description) {
      return {
        success: false,
        error: 'Missing required fields: title, start_date, or description',
        rawResponse: content,
      };
    }

    return {
      success: true,
      data: parsedData,
      rawResponse: content,
    };
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      let errorMessage = 'OpenAI API error';
      
      if (error.status === 401) {
        errorMessage = 'Invalid OpenAI API key';
      } else if (error.status === 429) {
        errorMessage = 'OpenAI rate limit exceeded. Please try again later.';
      } else if (error.status === 503) {
        errorMessage = 'OpenAI service temporarily unavailable';
      } else {
        errorMessage = error.message || 'Unknown OpenAI API error';
      }

      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

