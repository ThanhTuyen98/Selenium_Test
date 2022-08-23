import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../utils/config';
import { buildDriver } from '../../utils/browser';
import { doAuthentication } from '../../supports/login';

describe('bookMeetingRoom/bookWithoutPayment', () => {
    let driver;

    before(async () => {
        driver = await buildDriver();
        await driver.manage().window().maximize();
        await doAuthentication(driver);
    });

    after(async () => {
        await driver.quit();
    });

    context('Without payment', async () => {
        it('Redirect to create payment successfully', async () => {
            await driver.get(`${baseUrl}/users_panel/bookings`);
            await driver.findElement(By.css('.column-booking')).click();
            await driver.sleep(1000);
            await driver.findElement(By.css('.confirm-detail .btn-default.btn-confirm-booking')).click();
            await driver.sleep(1000);
            await driver.findElement(By.css('.confirm-modal .confirm-form .preloader-button')).click();
            await driver.sleep(1000);
            //create your card to process the payment.
            await driver.findElement(By.css('#payment_card_name')).sendKeys('Card name');
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
            await driver.findElement(By.css('form .button-confirm')).click();
            await driver.sleep(1000);
            const addCard = await driver.findElement(By.css('#flash_notice')).getText();
            expect(addCard).to.equal('Card info was added');
        });
    });
});