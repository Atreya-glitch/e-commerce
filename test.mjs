import { POST } from './app/api/ai-search/route.js';
import { config } from 'dotenv';
config({ path: '.env' });

async function run() {
  const req = {
    json: async () => ({ query: "footwear" })
  };
  try {
    const res = await POST(req);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Test failed:", err);
  }
}
run();
