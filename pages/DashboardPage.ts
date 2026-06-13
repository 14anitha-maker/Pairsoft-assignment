import { Page, expect } from '@playwright/test';

export class DashboardPage {

    constructor(private page: Page) {}

    private dashboardHeader = () =>
        this.page.getByRole('heading', { name: 'Dashboard' });

    private adminMenu = () =>
        this.page.getByRole('link', { name: 'Admin' });

    async verifyDashboardLoaded() {
        await expect(this.dashboardHeader()).toBeVisible();
    }

    async navigateToAdmin() {
        await this.adminMenu().click();
        await expect(this.page).toHaveURL(/admin\/viewSystemUsers/);
    }
}
