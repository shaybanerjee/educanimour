import { CatalogPage } from './app.po';

describe('catalog App', () => {
  let page: CatalogPage;

  beforeEach(() => {
    page = new CatalogPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
