import { test } from '../fixtures/baseFixture';

test.describe('OrangeHRM Assignment', () => {

    test('Delete second admin user and verify', async ({
        loginPage,
        dashboardPage,
        adminPage
    }) => {

        await loginPage.navigate();

        await loginPage.loginWithDynamicCredentials();

        await dashboardPage.verifyDashboardLoaded();

        await dashboardPage.navigateToAdmin();

        const deletedUsername =
            await adminPage.deleteSecondRecord();

        if (!deletedUsername) {
            test.skip(
                true,
                'Only Admin user exists. No second user available for deletion.'
            );
        }

        await adminPage.verifyUserDeleted(
            deletedUsername!
        );
    });

});