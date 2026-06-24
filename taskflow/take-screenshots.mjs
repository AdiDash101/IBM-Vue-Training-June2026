import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(5000);

  try {
    console.log('📸 Taking screenshots for verification...\n');

    // Screenshot 1: Tab 1 - Tasks
    console.log('1. Capturing Tab 1 (Tasks page with 3 tasks)...');
    await page.goto('http://localhost:5173/tabs/tab1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/tab1-tasks.png', fullPage: true });
    console.log('   ✓ Saved to /tmp/tab1-tasks.png\n');

    // Screenshot 2: Task Detail
    console.log('2. Capturing TaskDetailPage (task detail view)...');
    await page.goto('http://localhost:5173/tabs/tasks/1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/task-detail.png', fullPage: true });
    console.log('   ✓ Saved to /tmp/task-detail.png\n');

    // Screenshot 3: Tab 2 - Completed only
    console.log('3. Capturing Tab 2 (Completed tasks - only done=true)...');
    await page.goto('http://localhost:5173/tabs/tab2', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/tab2-completed.png', fullPage: true });
    console.log('   ✓ Saved to /tmp/tab2-completed.png\n');

    // Screenshot 4: Tab 3 - Settings
    console.log('4. Capturing Tab 3 (Settings)...');
    await page.goto('http://localhost:5173/tabs/tab3', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/tab3-settings.png', fullPage: true });
    console.log('   ✓ Saved to /tmp/tab3-settings.png\n');

    console.log('━'.repeat(50));
    console.log('✅ Screenshots captured successfully!\n');

    await browser.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    await browser.close();
    process.exit(1);
  }
})();
