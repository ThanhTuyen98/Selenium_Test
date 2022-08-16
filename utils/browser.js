import chrome from 'selenium-webdriver/chrome';
import { Builder, Browser} from 'selenium-webdriver';
import { isHeadless } from './config';

export const buildDriver = () => {
  const builder = new Builder().forBrowser(Browser.CHROME);

  if (isHeadless) {
    builder.setChromeOptions(new chrome.Options().headless());
  }

  return builder.build();
}
