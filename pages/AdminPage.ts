import { Page, expect } from '@playwright/test';

export class AdminPage {

    constructor(private page: Page) {}

    private rows = this.page.locator('.oxd-table-card');

    async deleteSecondRecord(): Promise<string> {

        // Wait for table data to load
        await expect(this.rows.first()).toBeVisible();

        const rowsBefore = await this.rows.count();
        console.log(`Rows before deletion: ${rowsBefore}`);

        if (rowsBefore < 2) {
            throw new Error('Less than 2 records found');
        }

        const secondRow = this.rows.nth(1);

        // Username column
        const deletedUsername = (
            await secondRow.locator('.oxd-table-cell').nth(1).innerText()
        ).trim();

        console.log(`Deleting user: ${deletedUsername}`);

        // Delete icon
        await secondRow.locator('button').first().click();

        // Confirmation popup
        await this.page.getByRole('button', { name: 'Yes, Delete' }).click();

        // Success message
        await expect(
            this.page.locator('.oxd-toast')
        ).toContainText('Successfully Deleted');

        // Verify count reduced
        await expect(this.rows).toHaveCount(rowsBefore - 1);

        return deletedUsername;
    }

    async verifyUserDeleted(username: string): Promise<void> {

        await expect(this.page.locator('.oxd-table-body'))
            .not.toContainText(username);

        console.log(`Verified user deleted: ${username}`);
    }
}