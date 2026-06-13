import { Page, expect } from '@playwright/test';

export class AdminPage {

    constructor(private page: Page) {}

    async deleteSecondRecord(): Promise<string | null> {

        const rows = this.page.locator('.oxd-table-card');

        await expect(rows.first()).toBeVisible();

        const rowCount = await rows.count();
        console.log(`Rows before deletion: ${rowCount}`);

        // Only Admin user exists
        if (rowCount < 2) {
            console.log(
                'Only Admin user exists. No second record available for deletion.'
            );
            return null;
        }

        const secondRow = rows.nth(1);

        const deletedUsername = (
            await secondRow
                .locator('.oxd-table-cell')
                .nth(1)
                .innerText()
        ).trim();

        console.log(`Deleting user: ${deletedUsername}`);

        // Click delete button
        await secondRow.locator('button').first().click();

        // Confirm deletion
        await this.page
            .getByRole('button', { name: 'Yes, Delete' })
            .click();

        // Verify success toast
        await expect(
            this.page.locator('.oxd-toast')
        ).toContainText('Successfully Deleted');

        // Wait for table refresh
        await expect(rows).toHaveCount(rowCount - 1);

        return deletedUsername;
    }

    async verifyUserDeleted(username: string): Promise<void> {

        await expect(
            this.page.locator('.oxd-table-body')
        ).not.toContainText(username);

        console.log(`Verified user deleted: ${username}`);
    }
}