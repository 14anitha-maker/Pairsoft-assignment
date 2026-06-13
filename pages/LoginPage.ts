import { Page, expect } from '@playwright/test';
import { resolveCredentials } from '../utils/credentials';

export class LoginPage {

    constructor(private page: Page) {}

    private usernameInput = () =>
        this.page.locator("input[name='username']");

    private passwordInput = () =>
        this.page.locator("input[type='password']");

    private loginBtn = () =>
        this.page.getByRole('button', { name: 'Login' });

    async navigate() {
        await this.page.goto('/web/index.php/auth/login', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
        await expect(this.loginBtn()).toBeVisible({ timeout: 60000 });
    }

    async loginWithDynamicCredentials() {
        const { username, password } = await resolveCredentials(this.page);

        await this.usernameInput().fill(username);
        await this.passwordInput().fill(password);

        await this.loginBtn().click();
        await expect(this.page).toHaveURL(/dashboard/);
    }
}
