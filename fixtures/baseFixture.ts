import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';

type Pages = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    adminPage: AdminPage;
};

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    adminPage: async ({ page }, use) => {
        await use(new AdminPage(page));
    }
});

export { expect } from '@playwright/test';