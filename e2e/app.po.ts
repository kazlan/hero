export class HeroPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hero-app h1')).getText();
  }
}
