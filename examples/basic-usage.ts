/**
 * Basic Usage Example
 * 
 * Run with: npx ts-node examples/basic-usage.ts
 * (Make sure to set OPENAI_API_KEY environment variable)
 */

import { parseEventPrompt } from '../src';

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('Please set OPENAI_API_KEY environment variable');
    process.exit(1);
  }

  console.log('🎪 Parsing event prompt...\n');

  const result = await parseEventPrompt(
    "Jazz concert in Sydney on December 20th at 8pm, tickets $50",
    { apiKey }
  );

  if (result.success && result.data) {
    console.log('✅ Successfully parsed event!\n');
    console.log('Event Data:');
    console.log(JSON.stringify(result.data, null, 2));
  } else {
    console.error('❌ Failed to parse event:');
    console.error(result.error);
  }
}

main().catch(console.error);

