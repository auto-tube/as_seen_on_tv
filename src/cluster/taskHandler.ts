import { simulateCTVBehavior } from '../behavior/ctvSim';
import { applyGeoOverride } from '../behavior/locationDrift';
import { getScheduleBucket, getBehaviorBySchedule } from '../behavior/scheduleSim';
import { spoofFingerprint } from '../spoof/fingerprint';
import { rotateProxy } from '../spoof/proxy';
import { generateIFA } from '../spoof/ifa';
import { rotateSchain } from '../spoof/schain';
import { getSessionHistory, saveSessionActivity } from '../behavior/sessionMemory';

export async function taskHandler({ page, data }: any) {
  const { identity } = data;

  try {
    // 🎭 Rotate & apply proxy
    const proxy = await rotateProxy();
    if (proxy) {
      // Proxy is applied at cluster level if needed
      console.log(`[Proxy] ${proxy.host}`);
    }

    // 🧬 Spoof fingerprint
    await spoofFingerprint(page, identity);

    // 🌐 Spoof geolocation
    if (identity.geo) {
      await applyGeoOverride(page, identity.geo);
    }

    // 🕒 Determine behavior based on schedule
    const schedule = getScheduleBucket();
    const behaviorProfile = getBehaviorBySchedule(schedule);
    identity.clickCTA = behaviorProfile.clickCTA;

    // 🔁 Rotate IFA and schain
    identity.ifa = generateIFA();
    identity.schain = rotateSchain();

    // 🖥️ Simulate CTV interaction
    await simulateCTVBehavior(page, identity);

    // 🧠 Log session data
    const sessionData = getSessionHistory(identity.ifa);
    saveSessionActivity(identity.ifa, {
      schedule,
      behaviorProfile,
      time: new Date().toISOString(),
    });

    console.log(`[Session Complete] IFA: ${identity.ifa} | Time: ${schedule}`);

  } catch (err) {
    console.error(`[Task Error]`, err);
  }
}
