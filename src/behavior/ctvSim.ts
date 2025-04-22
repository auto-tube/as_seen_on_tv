import { simulateScroll, randomWait } from './humanSim';
import { saveSessionActivity } from './sessionMemory';

export async function simulateCTVBehavior(page: any, identity: any) {
  try {
    await page.goto(identity.landingURL, { waitUntil: 'networkidle2' });

    await randomWait(2000, 4000); // simulate idle TV app boot
    await simulateScroll(page);

    if (identity.clickCTA && identity.ctaSelector) {
      await randomWait(1000, 3000);
      const exists = await page.$(identity.ctaSelector);
      if (exists) {
        await page.click(identity.ctaSelector);
        await randomWait(3000, 6000);
      }
    }

    saveSessionActivity(identity.ifa, {
      visited: identity.landingURL,
      clickedCTA: identity.clickCTA,
      timestamp: Date.now(),
    });

  } catch (err) {
    console.error(`[CTV SIM ERROR]`, err);
  }
}
