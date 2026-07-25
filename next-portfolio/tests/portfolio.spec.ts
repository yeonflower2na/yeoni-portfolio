import { test, expect, Page } from '@playwright/test';

const ORIGINAL = 'http://localhost:5504';
const NEXT = 'http://localhost:3000';

const PAGES = [
  { name: 'intro', originalPath: '/index.html', nextPath: '/', waitFor: '.intro-container' },
  { name: 'main', originalPath: '/main.html', nextPath: '/main', waitFor: '.prologue-container' },
  { name: 'about', originalPath: '/about.html', nextPath: '/about', waitFor: '.about-page' },
  { name: 'project', originalPath: '/project.html', nextPath: '/project', waitFor: '.project' },
  { name: 'design', originalPath: '/design.html', nextPath: '/design', waitFor: '.design-section' },
  { name: 'detail01', originalPath: '/detailPage01.html', nextPath: '/detail/01', waitFor: '.detail-main' },
  { name: 'detail02', originalPath: '/detailPage02.html', nextPath: '/detail/02', waitFor: '.detail-main' },
  { name: 'detail03', originalPath: '/detailPage03.html', nextPath: '/detail/03', waitFor: '.detail-main' },
];

async function waitForPageReady(page: Page, waitFor: string) {
  await page.waitForSelector(waitFor, { timeout: 10000 });
  await page.waitForTimeout(1500); // Let animations settle
}

test.describe('Navigation - Header exists on all pages', () => {
  for (const p of PAGES) {
    test(`Next.js /${p.name} has navigation header`, async ({ page }) => {
      await page.goto(`${NEXT}${p.nextPath}`);
      await waitForPageReady(page, p.waitFor);
      const nav = page.locator('header nav, nav.nav');
      await expect(nav).toBeVisible();
    });
  }
});

test.describe('Navigation links', () => {
  test('Header contains all 4 nav items', async ({ page }) => {
    await page.goto(`${NEXT}/main`);
    await page.waitForSelector('.prologue-container', { timeout: 10000 });
    await expect(page.locator('.navigation li')).toHaveCount(4);
    await expect(page.locator('.navigation a[href="/about"]')).toContainText('ABOUT ME');
    await expect(page.locator('.navigation a[href="/project"]')).toContainText('PROJECT');
    await expect(page.locator('.navigation a[href="/design"]')).toContainText('DESIGN');
  });

  test('Active nav item is highlighted', async ({ page }) => {
    await page.goto(`${NEXT}/about`);
    await waitForPageReady(page, '.about-page');
    const activeItem = page.locator('.navigation a.active');
    await expect(activeItem).toBeVisible();
    await expect(activeItem).toHaveAttribute('href', '/about');
  });
});

test.describe('Intro page', () => {
  test('Shows "From ... to ..." text', async ({ page }) => {
    await page.goto(`${NEXT}/`);
    await waitForPageReady(page, '.intro-container');
    await expect(page.locator('.static-text').first()).toContainText('From');
    await expect(page.locator('.intro-text')).toBeVisible();
  });

  test('Has loading bar', async ({ page }) => {
    await page.goto(`${NEXT}/`);
    await waitForPageReady(page, '.loading-bar');
    await expect(page.locator('.loading-bar')).toBeVisible();
    await expect(page.locator('.progress')).toBeVisible();
  });
});

test.describe('Main page', () => {
  test('Has 4 slides', async ({ page }) => {
    await page.goto(`${NEXT}/main`);
    await waitForPageReady(page, '.prologue-container');
    await expect(page.locator('.slide')).toHaveCount(4);
  });

  test('Slide 1 has "From Designer" SVG text', async ({ page }) => {
    await page.goto(`${NEXT}/main`);
    await waitForPageReady(page, '#slide1');
    await expect(page.locator('#slide1')).toBeVisible();
    const svgText = page.locator('#slide1 svg text').first();
    await expect(svgText).toContainText('From Designer');
  });

  test('Has preview section with 6 cards', async ({ page }) => {
    await page.goto(`${NEXT}/main`);
    await waitForPageReady(page, '#slide4');
    await expect(page.locator('.preview-card')).toHaveCount(6);
  });

  test('Has contact button', async ({ page }) => {
    await page.goto(`${NEXT}/main`);
    await waitForPageReady(page, '.prologue-container');
    await expect(page.locator('button.contact')).toBeVisible();
  });
});

test.describe('About page', () => {
  test('Has Education section', async ({ page }) => {
    await page.goto(`${NEXT}/about`);
    await waitForPageReady(page, '.about-page');
    await expect(page.locator('.serif-text').filter({ hasText: 'Education' })).toBeVisible();
  });

  test('Has Experience section', async ({ page }) => {
    await page.goto(`${NEXT}/about`);
    await waitForPageReady(page, '.about-page');
    await expect(page.locator('.serif-text').filter({ hasText: 'Experience' })).toBeVisible();
  });

  test('Has profile image', async ({ page }) => {
    await page.goto(`${NEXT}/about`);
    await waitForPageReady(page, '.left-fixed');
    await expect(page.locator('.left-fixed img')).toBeVisible();
  });

  test('Has skills carousel with 11 cards', async ({ page }) => {
    await page.goto(`${NEXT}/about`);
    await waitForPageReady(page, '.skills-wrapper');
    await expect(page.locator('.skills-card')).toHaveCount(11);
  });

  test('Has Certification section', async ({ page }) => {
    await page.goto(`${NEXT}/about`);
    await waitForPageReady(page, '.about-page');
    await expect(page.locator('.serif-text').filter({ hasText: 'Certification' })).toBeVisible();
  });
});

test.describe('Project page', () => {
  test('Has 5 project frames', async ({ page }) => {
    await page.goto(`${NEXT}/project`);
    await waitForPageReady(page, '.project');
    await expect(page.locator('.project_frame')).toHaveCount(5);
  });

  test('Has project text items', async ({ page }) => {
    await page.goto(`${NEXT}/project`);
    await waitForPageReady(page, '.project');
    await expect(page.locator('.project_text')).toHaveCount(6); // 5 projects + other
  });

  test('Has Korea Consumer Agency text', async ({ page }) => {
    await page.goto(`${NEXT}/project`);
    await waitForPageReady(page, '.project_texts');
    await expect(page.locator('.project_text').first()).toContainText('Korea Consumer Agency');
  });
});

test.describe('Design page', () => {
  test('Has tab buttons', async ({ page }) => {
    await page.goto(`${NEXT}/design`);
    await waitForPageReady(page, '.design-section');
    await expect(page.locator('.tab-btn')).toHaveCount(4);
    await expect(page.locator('.tab-btn[data-cat="all"]')).toContainText('ALL');
  });

  test('Loads design items from JSON', async ({ page }) => {
    await page.goto(`${NEXT}/design`);
    await waitForPageReady(page, '.design-section');
    await page.waitForTimeout(2000); // Wait for fetch
    const rows = page.locator('.row');
    await expect(rows).toHaveCount(await rows.count());
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('Tab filtering works', async ({ page }) => {
    await page.goto(`${NEXT}/design`);
    await waitForPageReady(page, '.design-section');
    await page.waitForTimeout(2000);
    const allCount = await page.locator('.row').count();
    await page.locator('.tab-btn[data-cat="poster"]').click();
    await page.waitForTimeout(500);
    const posterCount = await page.locator('.row').count();
    expect(posterCount).toBeLessThan(allCount);
  });
});

test.describe('Detail pages', () => {
  test('Detail 01 has 한국소비자원 content', async ({ page }) => {
    await page.goto(`${NEXT}/detail/01`);
    await waitForPageReady(page, '.detail-main');
    await expect(page.locator('.detail-subtitle').first()).toContainText('한국소비자원');
  });

  test('Detail 02 has 인터파크 content', async ({ page }) => {
    await page.goto(`${NEXT}/detail/02`);
    await waitForPageReady(page, '.detail-main');
    await expect(page.locator('.detail-subtitle').first()).toContainText('인터파크');
  });

  test('Back button navigates to project page', async ({ page }) => {
    await page.goto(`${NEXT}/detail/01`);
    await waitForPageReady(page, '.detail-main');
    await page.locator('.detail-button').click();
    await expect(page).toHaveURL(`${NEXT}/project`);
  });
});

test.describe('Contact modal', () => {
  test('Contact button exists on all main pages', async ({ page }) => {
    for (const path of ['/main', '/about', '/project', '/design']) {
      await page.goto(`${NEXT}${path}`);
      await page.waitForTimeout(1500);
      await expect(page.locator('button.contact')).toBeVisible();
    }
  });

  test('Contact modal opens on button click', async ({ page }) => {
    await page.goto(`${NEXT}/main`);
    await waitForPageReady(page, '.prologue-container');
    await page.locator('button.contact').click();
    await expect(page.locator('.holo-container')).toHaveClass(/active/);
  });
});

test.describe('Footer', () => {
  test('Footer contains contact info', async ({ page }) => {
    await page.goto(`${NEXT}/design`);
    await waitForPageReady(page, '.design-section');
    // Scroll to bottom to reveal footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('yeonpireo@naver.com');
  });
});

test.describe('Visual screenshots', () => {
  test('Intro page screenshot', async ({ page }) => {
    await page.goto(`${NEXT}/`);
    await waitForPageReady(page, '.intro-container');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/next-intro.png', fullPage: false });
  });

  test('Main page screenshot', async ({ page }) => {
    await page.goto(`${NEXT}/main`);
    await waitForPageReady(page, '.prologue-container');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/next-main.png', fullPage: false });
  });

  test('About page screenshot', async ({ page }) => {
    await page.goto(`${NEXT}/about`);
    await waitForPageReady(page, '.about-page');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/next-about.png', fullPage: false });
  });

  test('Project page screenshot', async ({ page }) => {
    await page.goto(`${NEXT}/project`);
    await waitForPageReady(page, '.project');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/next-project.png', fullPage: false });
  });

  test('Design page screenshot', async ({ page }) => {
    await page.goto(`${NEXT}/design`);
    await waitForPageReady(page, '.design-section');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-results/next-design.png', fullPage: false });
  });
});
