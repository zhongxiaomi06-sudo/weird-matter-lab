import { expect, test } from '@playwright/test';
import { expectHealthyEntrance, watchPageFailures } from '../../../../tests/e2e/support';

test('enters the lab through the current cover', async ({ page }) => {
  const failures = watchPageFailures(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: /Make matter misbehave/ })).toBeVisible();
  await page.getByRole('button', { name: /Enter the Lab/ }).click();
  await expect(page.getByRole('navigation', { name: 'Main views' })).toBeVisible();
  await expect(page.getByRole('button', { name: /sound effects/ })).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/[\u3400-\u9fff]/);
  await expectHealthyEntrance(page, failures);
});
