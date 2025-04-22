export async function simulateScroll(page: any) {
    await page.evaluate(async () => {
      for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
        window.scrollBy(0, Math.random() * 200);
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
      }
    });
  }
  
  export async function randomWait(min = 1000, max = 3000) {
    const delay = Math.floor(Math.random() * (max - min) + min);
    return new Promise(resolve => setTimeout(resolve, delay));
  }
  