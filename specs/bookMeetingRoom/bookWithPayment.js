import { By } from 'selenium-webdriver';
import { expect } from 'chai';

import { baseUrl } from '../../utils/config';
import { buildDriver } from '../../utils/browser';
import { doAuthentication } from '../../supports/login';

describe('bookMeetingRoom/bookWithPayment', () => {
    let driver;

    before(async () => {
        driver = await buildDriver();
        await driver.manage().window().maximize();
        await doAuthentication(driver);
    });

    after(async () => {
        // await driver.quit();
    });

    context('With payment', async () => {
        it('Notify booking success', async () => {
            await driver.get(`${baseUrl}/users_panel/bookings`);
            await driver.findElement(By.css('.booking-body .column-booking.col-active')).click();
            await driver.sleep(1000);
            await driver.findElement(By.css('.confirm-detail .btn-default.btn-confirm-booking')).click();
            await driver.sleep(1000);
            await driver.findElement(By.css('.confirm-modal .confirm-form .preloader-button')).click();
            await driver.sleep(3000);
            await driver.findElement(By.css('.confirm-modal .confirm-form .cancel-button')).click();
            await driver.sleep(1000);
            const bookingAlert = await driver.findElement(By.css('#flash_alert')).getText();
            expect(bookingAlert).to.equal('Booking success.');
        });
    });
});