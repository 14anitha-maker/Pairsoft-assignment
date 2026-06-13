import { Page } from '@playwright/test';

export type Credentials = {
  username: string;
  password: string;
};

export async function resolveCredentials(page: Page): Promise<Credentials> {
  if (process.env.ORANGEHRM_USERNAME && process.env.ORANGEHRM_PASSWORD) {
    return {
      username: process.env.ORANGEHRM_USERNAME,
      password: process.env.ORANGEHRM_PASSWORD,
    };
  }

  const credentialText = await page
    .locator('p')
    .filter({ hasText: /Username\s*:|Password\s*:/i })
    .allTextContents();
  const fullText = credentialText.join(' ');

  const username = fullText.match(/Username\s*:\s*(\S+)/i)?.[1];
  const password = fullText.match(/Password\s*:\s*(\S+)/i)?.[1];

  if (!username || !password) {
    throw new Error('Unable to resolve credentials from env variables or login page');
  }

  return { username, password };
}
