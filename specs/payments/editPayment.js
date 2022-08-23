import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../utils/config';
import { buildDriver } from '../../utils/browser';
import { doAuthentication } from '../../supports/login';

describe('payments/editPayment', () => {
    let driver;

    before(async () => {
        driver = await buildDriver();
        await doAuthentication(driver);
    });

    after(async () => {
        await driver.quit();
    });
    context('With valid data', async () => {
        it('edit payment success', async () => {
            await driver.get(`${baseUrl}/users_panel/payments`);
            await driver.findElement(By.css('#edit_stripe_customer')).click();
            //information
            await driver.findElement(By.css('#payment_card_name')).clear();
            await driver.findElement(By.css('#payment_card_name')).sendKeys('Credit card testing edit');
            await driver.findElement(By.css('#payment_card_expiry_date')).clear();
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('10');
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('2022');
            await driver.sleep(700);
            //billing address
            await driver.findElement(By.css('#user_billing_full_name')).clear();
            await driver.findElement(By.css('#user_billing_full_name')).sendKeys('testing 1 edit');
            await driver.findElement(By.css('#user_billing_state')).clear();
            await driver.findElement(By.css('#user_billing_state')).sendKeys('state edit');
            await driver.findElement(By.css('form .button-confirm')).click();
            const editCard = await driver.findElement(By.css('#flash_alert')).getText();
            expect(editCard).to.equal('Your payment info was outdated. You need to remove and update new card info.');
        });
    });
    context('With invalid expiration date', async () => {
        it('show error', async () => {
            await driver.get(`${baseUrl}/users_panel/payments`);
            await driver.findElement(By.css('#edit_stripe_customer')).click();
            //information
            await driver.findElement(By.css('#payment_card_name')).clear();
            await driver.findElement(By.css('#payment_card_name')).sendKeys('Credit card testing edit');
            await driver.findElement(By.css('#payment_card_expiry_date')).clear();
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('10');
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('223');
            await driver.sleep(700);
            //billing address
            await driver.findElement(By.css('#user_billing_full_name')).clear();
            await driver.findElement(By.css('#user_billing_full_name')).sendKeys('testing 1 edit');
            await driver.findElement(By.css('#user_billing_state')).clear();
            await driver.findElement(By.css('#user_billing_state')).sendKeys('state edit');
            await driver.findElement(By.css('form .button-confirm')).click();
            const editCard = await driver.findElement(By.css('#error-explanation')).getText();
            expect(editCard).to.equal('Card was expired');
        });
    });
    context('Cancel', async () => {
        it('payment not change', async () => {
            await driver.get(`${baseUrl}/users_panel/payments`);
            await driver.findElement(By.css('#edit_stripe_customer')).click();
            await driver.sleep(1000);
            //information
            await driver.findElement(By.css('#payment_card_name')).clear();
            await driver.findElement(By.css('#payment_card_name')).sendKeys('Credit card testing edit');
            let editName = await driver.findElement(By.css('#payment_card_name')).getText();
            await driver.findElement(By.css('#payment_card_expiry_date')).clear();
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('10');
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('2023');
            await driver.sleep(700);
            //billing address
            await driver.findElement(By.css('#user_billing_full_name')).clear();
            await driver.findElement(By.css('#user_billing_full_name')).sendKeys('testing 1 edit');
            await driver.findElement(By.css('#user_billing_state')).clear();
            await driver.findElement(By.css('#user_billing_state')).sendKeys('state edit');
            await driver.sleep(700);
            await driver.findElement(By.css('#cancel_edit_stripe_customer')).click();
            const cardName = await driver.findElement(By.css('.card-info')).getText();
            expect(cardName).to.contain(editName);
        });
    });
});
