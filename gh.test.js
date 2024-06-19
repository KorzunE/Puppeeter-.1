let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 5000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 5000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 5000);
});

describe("Second task", () => {

  test("Git code-review", async () => {
    await page.goto("https://github.com/features/code-review");
    const actual = await page.$eval(".h1-mktg.mb-4", link => link.textContent);
    expect(actual).toContain("Write better code");
  }, 5000);

  test("Git features", async () => {
    await page.goto("https://github.com/features");
    const title = "div.application-main main div.p-responsive.container-xl.text-center.mt-12.mb-6 h1";
    const actual = await page.$eval(title, link => link.textContent);
    expect(actual).toContain("The tools you need to build what you want.");
  }, 5000);
  
  test("Package button", async () => {
    await page.goto("https://github.com/features/packages");
    await page.click("a[class='btn-mktg mx-1 mb-3 btn-large-mktg'] svg");
    const actual = await page.title();
    expect(actual).toEqual("Документация по GitHub Packages - Документация по GitHub")
  }, 5000);
});