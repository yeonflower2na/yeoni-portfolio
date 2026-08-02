import { test, expect } from '@playwright/test';
import path from 'path';

test('uiux page project_texts track position stability after client-side navigation', async ({ page }) => {
  const tempDir = 'C:\\Users\\Samitech\\AppData\\Local\\Temp';

  // Step 1: Go to /main and wait for full load
  await page.goto('http://localhost:3000/main', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Step 2: Click the UI/UX nav link to navigate client-side to /uiux
  // Try multiple possible selectors for the nav link
  const uiuxLink = page.locator('a[href="/uiux"], a[href*="uiux"], nav a').filter({ hasText: /ui\/?ux/i }).first();

  let navigationDone = false;

  // Check if the link exists
  const linkCount = await page.locator('a').filter({ hasText: /ui\/?ux/i }).count();
  console.log(`Found ${linkCount} UI/UX links`);

  if (linkCount > 0) {
    // Click the link and wait for navigation
    await Promise.all([
      page.waitForURL('**/uiux', { timeout: 10000 }).catch(() => console.log('URL did not change to /uiux')),
      page.locator('a').filter({ hasText: /ui\/?ux/i }).first().click(),
    ]);
    navigationDone = true;
  } else {
    // Fallback: navigate directly
    console.log('No UI/UX nav link found, navigating directly');
    await page.goto('http://localhost:3000/uiux', { waitUntil: 'networkidle' });
    navigationDone = true;
  }

  console.log('Current URL after navigation:', page.url());

  // Helper to get .project_texts transform
  async function getTransform(): Promise<string> {
    return page.evaluate(() => {
      const el = document.querySelector('.project_texts') as HTMLElement | null;
      if (!el) return 'element not found';
      return window.getComputedStyle(el).transform;
    });
  }

  // Step 3: Take screenshot at 0ms and record transform
  const t0 = await getTransform();
  console.log('Transform at 0ms:', t0);
  await page.screenshot({ path: path.join(tempDir, 'uiux-final-0ms.png') });

  // 100ms
  await page.waitForTimeout(100);
  const t100 = await getTransform();
  console.log('Transform at 100ms:', t100);

  // 200ms
  await page.waitForTimeout(100);
  const t200 = await getTransform();
  console.log('Transform at 200ms:', t200);

  // 300ms
  await page.waitForTimeout(100);
  const t300 = await getTransform();
  console.log('Transform at 300ms:', t300);

  // 500ms
  await page.waitForTimeout(200);
  const t500 = await getTransform();
  console.log('Transform at 500ms:', t500);
  await page.screenshot({ path: path.join(tempDir, 'uiux-final-500ms.png') });

  // 1000ms
  await page.waitForTimeout(500);
  const t1000 = await getTransform();
  console.log('Transform at 1000ms:', t1000);

  // 1500ms
  await page.waitForTimeout(500);
  const t1500 = await getTransform();
  console.log('Transform at 1500ms:', t1500);
  await page.screenshot({ path: path.join(tempDir, 'uiux-final-1500ms.png') });

  // Report summary
  const transforms = { t0, t100, t200, t300, t500, t1000, t1500 };
  console.log('\n=== TRANSFORM SUMMARY ===');
  for (const [key, val] of Object.entries(transforms)) {
    console.log(`  ${key}: ${val}`);
  }

  // Extract translateX from matrix if possible
  function extractTranslateX(transform: string): number | null {
    // matrix(a, b, c, d, tx, ty)
    const m = transform.match(/matrix\([^)]+\)/);
    if (!m) return null;
    const parts = m[0].replace('matrix(', '').replace(')', '').split(',').map(Number);
    return parts[4] ?? null;
  }

  const translateXValues = Object.entries(transforms).map(([key, val]) => ({
    key,
    tx: extractTranslateX(val),
    raw: val,
  }));
  console.log('\n=== TRANSLATE-X VALUES ===');
  for (const { key, tx, raw } of translateXValues) {
    console.log(`  ${key}: translateX=${tx !== null ? tx + 'px' : 'n/a'} (${raw})`);
  }

  // Check if element was found at all
  const elementExists = await page.locator('.project_texts').count();
  console.log(`\n.project_texts elements found: ${elementExists}`);

  // Also log all transforms on the element and its children for context
  const allInfo = await page.evaluate(() => {
    const el = document.querySelector('.project_texts') as HTMLElement | null;
    if (!el) return null;
    return {
      transform: window.getComputedStyle(el).transform,
      marginLeft: window.getComputedStyle(el).marginLeft,
      left: window.getComputedStyle(el).left,
      position: window.getComputedStyle(el).position,
      width: window.getComputedStyle(el).width,
      offsetLeft: el.offsetLeft,
    };
  });
  console.log('\n=== ELEMENT COMPUTED STYLES ===');
  console.log(JSON.stringify(allInfo, null, 2));

  // Test always passes — this is an observation test
  expect(true).toBe(true);
});
