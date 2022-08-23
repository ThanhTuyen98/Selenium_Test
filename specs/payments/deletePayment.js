import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../utils/config';
import { buildDriver } from '../../utils/browser';
import { doAuthentication } from '../../supports/login';

describe('payments/deletePayment', () => {
    let driver;

    before(async () => {
        driver = await buildDriver();
        await doAuthentication(driver);
    });

    after(async () => {
        await driver.quit();
    });
    context('Cancel Delete payment', async () => {
        it('Payment still exist', async () => {
            await driver.get(`${baseUrl}/users_panel/payments`);
            await driver.findElement(By.css('.btn-delete')).click();
            await driver.findElement(By.css('.cancel-delete')).click();
            const paymentType = await driver.findElement(By.css('.payment-type')).getText();
            expect(paymentType).to.equal('VISA');
        });
    });
    context('Delete payment', async () => {
        it('Successfully', async () => {
            await driver.get(`${baseUrl}/users_panel/payments`);
            await driver.findElement(By.css('.btn-delete')).click();
            await driver.findElement(By.css('.button-confirm')).click();
            const deleteCard = await driver.findElement(By.css('#flash_notice')).getText();
            expect(deleteCard).to.equal('User card was successfully deleted');
        });
    });
});