import { FireEventsPage } from './app.po';

describe('fire-events App', () => {
  let page: FireEventsPage;

  beforeEach(() => {
    page = new FireEventsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
