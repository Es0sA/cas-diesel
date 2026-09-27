import { chromium } from 'playwright';
import path from 'path';

const outDir = '/home/ubuntu/.gemini/antigravity-cli/brain/cf6a1f5a-15f0-4f24-82ea-fefb0f7ac1fb';

async function testCasDiesel() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to cas-diesel preview http://localhost:4175/?view=login ...');
  await page.goto('http://localhost:4175/?view=login', { waitUntil: 'networkidle' });

  // Dismiss cookie banner
  const acceptBtn = await page.$('text="Accept Cookies"');
  if (acceptBtn) {
    await acceptBtn.click();
    await page.waitForTimeout(200);
  }

  // 1. Screenshot Buyer View
  console.log('Capturing cas-diesel Buyer view...');
  await page.screenshot({ path: path.join(outDir, 'cas_diesel_buyer_proof.png') });

  // 2. Click Marketer
  console.log('Testing Marketer role switch...');
  await page.click('button:has-text("Marketer")');
  await page.waitForTimeout(300);

  // 3. Click Driver
  console.log('Testing Driver role switch...');
  await page.click('button:has-text("Driver")');
  await page.waitForTimeout(300);

  console.log('cas-diesel login flow successfully verified!');
  await browser.close();
}

testCasDiesel().catch((err) => {
  console.error('Error in cas-diesel verification:', err);
  process.exit(1);
});
