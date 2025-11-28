# AI Event Schema

[![npm version](https://img.shields.io/npm/v/ai-event-schema)](https://www.npmjs.com/package/ai-event-schema)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

The open standard for AI-generated event data. Parse natural language into structured event objects using OpenAI.

## 🎯 What is this?

A TypeScript library that converts natural language event descriptions into structured, validated event data. Perfect for building event creation tools, chatbots, or any application that needs to understand event information from user input.

## ✨ Features

- 🤖 **AI-Powered Parsing** - Uses OpenAI GPT-4 to extract event details from natural language
- 📋 **Structured Output** - Returns validated TypeScript interfaces
- 🌍 **Location Intelligence** - Extracts venue, address, city, country automatically
- 💰 **Price Detection** - Identifies ticket prices and currency
- 📅 **Date Parsing** - Converts natural dates to ISO 8601 format
- 🏷️ **Category Classification** - Automatically categorizes events
- 🔍 **Image Search Queries** - Generates search terms for event banners

## 📦 Installation

```bash
npm install ai-event-schema
```

## 🚀 Quick Start

```typescript
import { parseEventPrompt } from 'ai-event-schema';

const result = await parseEventPrompt(
  "Jazz concert in Sydney on December 20th at 8pm, tickets $50",
  {
    apiKey: process.env.OPENAI_API_KEY!
  }
);

if (result.success) {
  console.log(result.data);
  // {
  //   title: "Jazz Concert",
  //   start_date: "2024-12-20 20:00:00",
  //   location: "Sydney, AU",
  //   location_details: {
  //     city: "Sydney",
  //     country: "AU"
  //   },
  //   ticket_price: 50,
  //   currency: "USD",
  //   category: "MUSIC",
  //   description: "An evening of smooth jazz...",
  //   timezone: "Australia/Sydney",
  //   tags: ["jazz", "music", "concert"],
  //   image_search_query: "jazz concert stage"
  // }
} else {
  console.error('Error:', result.error);
}
```

## 📖 API Reference

### `parseEventPrompt(prompt, options)`

Parses a natural language event description into structured event data.

**Parameters:**
- `prompt` (string) - Natural language description of the event
- `options` (object):
  - `apiKey` (string, required) - Your OpenAI API key
  - `model` (string, optional) - OpenAI model to use (`'gpt-4'` | `'gpt-3.5-turbo'` | `'gpt-4-turbo'`). Default: `'gpt-4'`
  - `temperature` (number, optional) - Sampling temperature (0-1). Default: `0.3`
  - `maxTokens` (number, optional) - Maximum tokens in response. Default: `2000`

**Returns:**
```typescript
{
  success: boolean;
  data?: EventData;
  error?: string;
  rawResponse?: string;
}
```

### `EventData` Interface

```typescript
interface EventData {
  title: string;
  start_date: string; // ISO 8601 format
  end_date?: string;
  location?: string | null;
  location_details?: EventLocation | null;
  ticket_price?: number | null;
  currency?: string | null;
  category?: string; // MUSIC|SPORTS|BUSINESS|EDUCATION|FOOD|ARTS|FESTIVAL|CONFERENCE|WORKSHOP|OTHER
  description: string;
  timezone?: string | null;
  tags?: string[];
  image_search_query?: string;
}
```

## 📝 Examples

### Basic Usage

```typescript
import { parseEventPrompt } from 'ai-event-schema';

const result = await parseEventPrompt(
  "Create a yoga workshop in New York on January 15th, $30 per person",
  { apiKey: process.env.OPENAI_API_KEY! }
);
```

### With Custom Model

```typescript
const result = await parseEventPrompt(
  "Music festival in Austin, Texas on March 20th",
  {
    apiKey: process.env.OPENAI_API_KEY!,
    model: 'gpt-3.5-turbo', // Faster, cheaper
    temperature: 0.2 // More deterministic
  }
);
```

### Error Handling

```typescript
const result = await parseEventPrompt(prompt, { apiKey });

if (!result.success) {
  if (result.error?.includes('rate limit')) {
    // Handle rate limiting
  } else if (result.error?.includes('API key')) {
    // Handle authentication error
  } else {
    // Handle other errors
    console.error('Parsing failed:', result.error);
  }
} else {
  // Use result.data
  const event = result.data!;
  console.log(`Event: ${event.title} on ${event.start_date}`);
}
```

## 🏗️ Built by vibeticketing

This library powers [vibeticketing.com](https://vibeticketing.com) - create events by describing them.

We open-sourced this to help developers build better event creation tools. If you find it useful, please ⭐ star this repo!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/YOUR_USERNAME/ai-event-schema)
- [npm Package](https://www.npmjs.com/package/ai-event-schema)
- [vibeticketing.com](https://vibeticketing.com)
- [Documentation](https://github.com/YOUR_USERNAME/ai-event-schema#readme)

## 💡 Use Cases

- **Event Creation Tools** - Build UIs that let users describe events naturally
- **Chatbots** - Enable conversational event creation
- **Form Auto-fill** - Pre-populate event forms from user descriptions
- **Event Aggregators** - Parse event descriptions from various sources
- **Voice Assistants** - Convert voice commands into event data

## ⚠️ Requirements

- Node.js 18+ or TypeScript 5.0+
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com))
- Valid OpenAI account with API access

## 🐛 Known Issues

- Date parsing may fail for ambiguous formats
- Location extraction works best with city/country combinations
- Requires valid OpenAI API key and credits

## 📊 Roadmap

- [ ] Support for multiple languages
- [ ] Custom prompt templates
- [ ] Batch processing
- [ ] Validation schemas (Zod)
- [ ] Timezone auto-detection improvements
- [ ] Support for recurring events

---

Made with ❤️ by the vibeticketing team

