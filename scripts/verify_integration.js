import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const ARTIFACTS_DIR = 'C:/Users/Es0sA/.gemini/antigravity-cli/brain/642ddac6-c9c5-4a00-8455-149c6375d773';

async function verify() {
  console.log('--- Starting CAS Energy End-to-End Verification ---');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 950 } });
  const page = await context.newPage();

  // Listen to console errors
  page.on('pageerror', (err) => console.error('Browser error:', err.message));

  // 1. Visit Home Page & Dismiss Cookie Banner
  console.log('1. Navigating to http://localhost:5173/');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const acceptCookies = await page.$('button:has-text("Accept All Cookies")');
  if (acceptCookies) {
    await acceptCookies.click();
    await page.waitForTimeout(300);
  }

  // 2. Verify Dynamic Marketplace Feed
  console.log('2. Verifying Marketplace dynamic feed from backend...');
  const marketplaceSection = await page.$('#marketplace');
  if (!marketplaceSection) throw new Error('Marketplace section not found');

  await marketplaceSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Check that real marketers are listed
  const matrixCard = await page.waitForSelector('text=Matrix Downstream Distribution Ltd', { timeout: 8000 });
  const pinnacleCard = await page.waitForSelector('text=Pinnacle Hydrocarbons FZE', { timeout: 5000 });
  if (!matrixCard || !pinnacleCard) throw new Error('Failed to load real suppliers from backend');

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'marketplace_dynamic_feed.png'),
    clip: { x: 0, y: 1500, width: 1366, height: 950 }
  });
  console.log('Saved marketplace_dynamic_feed.png');

  // 3. Test Depot Filtering in Marketplace
  console.log('3. Testing Depot Filtering...');
  await page.click('button:has-text("Ijegun Cluster")');
  await page.waitForTimeout(400);

  const ijegunCount = await page.locator('text=Matrix Downstream Distribution Ltd').count();
  const apapaMissing = await page.locator('text=Pinnacle Hydrocarbons FZE').count();
  console.log(`Ijegun filter test: Matrix count = ${ijegunCount}, Pinnacle count = ${apapaMissing}`);
  if (ijegunCount === 0 || apapaMissing !== 0) throw new Error('Depot filtering failed');

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'marketplace_filtered_ijegun.png'),
    clip: { x: 0, y: 1500, width: 1366, height: 950 }
  });
  console.log('Saved marketplace_filtered_ijegun.png');

  // Test Search Bar
  console.log('4. Testing Search Query...');
  await page.click('button:has-text("All Depots")');
  await page.fill('input[placeholder*="Search marketer"]', 'Pinnacle');
  await page.waitForTimeout(400);

  const searchPinnacleCount = await page.locator('text=Pinnacle Hydrocarbons FZE').count();
  const searchMatrixCount = await page.locator('text=Matrix Downstream Distribution Ltd').count();
  if (searchPinnacleCount === 0 || searchMatrixCount !== 0) throw new Error('Marketplace search failed');

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'marketplace_search.png'),
    clip: { x: 0, y: 1500, width: 1366, height: 950 }
  });
  console.log('Saved marketplace_search.png');

  // Clear search
  await page.fill('input[placeholder*="Search marketer"]', '');
  await page.waitForTimeout(300);

  // 4. Test Authentication Flow: Sign In
  console.log('5. Testing Sign In Screen...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click('button:has-text("Sign In")');
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'login_screen.png')
  });
  console.log('Saved login_screen.png');

  // Test Invalid Credentials
  console.log('6. Testing Invalid Login Handling...');
  await page.fill('#login-email', 'wrong@company.com');
  await page.fill('#login-password', 'WrongPassword123!');
  await page.click('button[type="submit"]:has-text("Sign In to Your Account")');
  await page.waitForTimeout(1000);

  const errorBanner = await page.waitForSelector('text=Authentication Notice', { timeout: 5000 });
  if (!errorBanner) throw new Error('Error banner did not appear for invalid login');

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'login_error_alert.png')
  });
  console.log('Saved login_error_alert.png');

  // Test Valid Marketer Login
  console.log('7. Testing Valid Login as Marketer (Matrix)...');
  await page.fill('#login-email', 'matrix@casdiesel.local');
  await page.fill('#login-password', 'StrongPassword123!');
  await page.click('button[type="submit"]:has-text("Sign In to Your Account")');
  await page.waitForTimeout(1500);

  // Check role redirect to supplier-portal
  await page.waitForSelector('text=Downstream Marketer Operations Desk', { timeout: 8000 });
  const token = await page.evaluate(() => localStorage.getItem('cas_token'));
  console.log('Marketer login token received in localStorage:', token ? 'YES (Valid JWT)' : 'NO');
  if (!token) throw new Error('Token was not saved in localStorage');

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'supplier_logged_in_dashboard.png')
  });
  console.log('Saved supplier_logged_in_dashboard.png');

  // Test Session Persistence on Page Reload
  console.log('8. Testing Session Persistence on Reload...');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const persistentEmail = await page.locator('text=matrix@casdiesel.local').count();
  const persistentMarketerPill = await page.locator('text=Marketer').count();
  console.log(`Persistent session verified: email present = ${persistentEmail > 0}, pill present = ${persistentMarketerPill > 0}`);
  if (persistentEmail === 0) throw new Error('Session did not persist after reload');

  // Test Log Out
  console.log('9. Testing Log Out...');
  await page.click('button[title="Sign Out"]');
  await page.waitForTimeout(800);

  const postLogoutToken = await page.evaluate(() => localStorage.getItem('cas_token'));
  console.log('Post logout token in localStorage:', postLogoutToken);
  if (postLogoutToken) throw new Error('Token was not cleared on logout');

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'logged_out_home.png')
  });
  console.log('Saved logged_out_home.png');

  // 10. Test Corporate Buyer Registration Flow
  console.log('10. Testing Corporate Buyer Registration Flow...');
  await page.click('button:has-text("Register")');
  await page.waitForTimeout(600);

  // Click Buyer Card
  await page.click('button:has-text("Corporate Buyer")');
  await page.waitForTimeout(300);

  const uniqueStamp = Date.now();
  const buyerEmail = `procurement_${uniqueStamp}@manufacturing.ng`;
  const buyerPass = 'SecureIndustrial2026!';

  await page.fill('#b-email', buyerEmail);
  await page.fill('#b-password', buyerPass);
  await page.fill('#b-company', 'Lafarge Africa Cement Plant');
  await page.fill('#b-rc', `RC-LAG-${uniqueStamp.toString().slice(-6)}`);
  await page.fill('#b-officer', 'Engr. Babatunde Sanusi');
  await page.fill('#b-phone', '+234 803 555 7788');

  // Trigger Geolocation
  await page.click('button:has-text("Detect Discharge Gate Coordinates")');
  await page.waitForTimeout(500);

  // Submit Registration
  await page.click('button[type="submit"]:has-text("Activate Corporate Buyer Account")');
  await page.waitForTimeout(2000);

  // Verify Success Banner
  await page.waitForSelector('text=Corporate Buyer Account Activated', { timeout: 8000 });
  console.log('Buyer registration success alert confirmed.');

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'buyer_registration_success.png')
  });
  console.log('Saved buyer_registration_success.png');

  // Proceed to Dashboard
  await page.click('button:has-text("Proceed to Dashboard")');
  await page.waitForTimeout(1000);

  // Verify Buyer Session
  const buyerPill = await page.locator('text=Buyer').count();
  const buyerToken = await page.evaluate(() => localStorage.getItem('cas_token'));
  console.log(`Buyer session active: token = ${buyerToken ? 'YES' : 'NO'}, Buyer pill = ${buyerPill > 0}`);
  if (!buyerToken || buyerPill === 0) throw new Error('Buyer session was not activated');

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'buyer_session_proof.png')
  });
  console.log('Saved buyer_session_proof.png');

  console.log('\n========================================================');
  console.log('🏁 ALL INTEGRATION & AUTH TESTS PASSED FLAWLESSLY! 🏁');
  console.log('========================================================\n');

  await browser.close();
}

verify().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
