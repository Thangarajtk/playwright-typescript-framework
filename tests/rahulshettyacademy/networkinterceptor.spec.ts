import { test } from '../fixtures';
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response: { token: any; orderId?: string; };

test.beforeAll(async ({ apiUtils }) => {
  response = await apiUtils.createOrder(orderPayLoad);
})

//create order is success
test('Place the order', async ({ page }) => {
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
    });
 
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
});
