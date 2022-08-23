import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../utils/config';
import { buildDriver } from '../../utils/browser';
import { doAuthentication } from '../../supports/login';

describe('payment/addPayment', () => {
    let driver;

    before(async () => {
        driver = await buildDriver();
        await driver.manage().window().maximize();
        await doAuthentication(driver);
    });

    after(async () => {
        await driver.quit();
    });

    context('With valid data', async () => {
        let newCardName = 'Credit card testing';
        it('add new payment success', async () => {
            await driver.get(`${baseUrl}/users_panel/payments`);
            await driver.findElement(By.css('#btn_new_credit')).click();
            await driver.findElement(By.css('#payment_card_name')).sendKeys(newCardName);
            await driver.findElement(By.css('#payment_card_number')).sendKeys('4111');
            await driver.findElement(By.css('#payment_card_number')).sendKeys('1111');
            await driver.findElement(By.css('#payment_card_number')).sendKeys('1111');
            await driver.findElement(By.css('#payment_card_number')).sendKeys('1111');
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('12');
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('2022');
            await driver.findElement(By.css('#payment_card_cvc')).sendKeys('123');
            //billing address
            await driver.findElement(By.css('#user_billing_full_name')).sendKeys('testing 1');
            await driver.findElement(By.css('#user_billing_state')).sendKeys('state');
            await driver.findElement(By.css('#user_billing_address')).sendKeys('address');
            await driver.findElement(By.css('#user_billing_zip')).sendKeys('123');
            await driver.findElement(By.css('#user_billing_phone')).sendKeys('911109827');
            await driver.findElement(By.css('#user_billing_country')).sendKeys('Hong kong');
            await driver.findElement(By.css('#user_billing_city')).sendKeys('Hong kong');
            await driver.sleep(700);
            await driver.findElement(By.css('form .button-confirm')).click();
            await driver.sleep(3000);
            const addCard = await driver.findElement(By.css('#flash_notice')).getText();
            expect(addCard).to.equal('Card info was added');
            let addedName = await driver.findElement(By.css('.card-info')).getText();
            expect(addedName).to.contain(newCardName);
        });
    });
    context('With invalid card payment', async () => {
        let newCardName = 'Credit card testing';
        it('show error', async () => {
            await driver.get(`${baseUrl}/users_panel/payments`);
            await driver.findElement(By.css('#btn_new_credit')).click();
            await driver.findElement(By.css('#payment_card_name')).sendKeys(newCardName);
            await driver.findElement(By.css('#payment_card_number')).sendKeys('4111');
            await driver.findElement(By.css('#payment_card_number')).sendKeys('1111');
            await driver.findElement(By.css('#payment_card_number')).sendKeys('1111');
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('12');
            await driver.findElement(By.css('#payment_card_expiry_date')).sendKeys('2022');
            await driver.findElement(By.css('#payment_card_cvc')).sendKeys('123');
            await driver.findElement(By.css('#user_billing_full_name')).sendKeys('testing 1');
            await driver.findElement(By.css('#user_billing_state')).sendKeys('state');
            await driver.findElement(By.css('#user_billing_address')).sendKeys('address');
            await driver.findElement(By.css('#user_billing_zip')).sendKeys('123');
            await driver.findElement(By.css('#user_billing_phone')).sendKeys('911109827');
            await driver.findElement(By.css('#user_billing_country')).sendKeys('Hong kong');
            await driver.findElement(By.css('#user_billing_city')).sendKeys('Hong kong');
            await driver.sleep(700);
            await driver.findElement(By.css('form .button-confirm')).click();
            await driver.sleep(3000);
            const addCard = await driver.findElement(By.css('#error-explanation')).getText();
            expect(addCard).to.equal('Your card number is incorrect.');
        });
    });
});