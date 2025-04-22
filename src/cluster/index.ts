import { Cluster } from 'puppeteer-cluster';
import { executablePath } from 'puppeteer';
import { taskHandler } from './taskHandler';
import { getRandomIdentity } from '../spoof/identity';
import { clusterConfig } from '../config/cluster.config';
import { loadENV } from '../config/env';
import { logger } from '../utils/logger';

(async () => {
  // Load environment variables
  loadENV();

  logger.info('Launching CTV Puppeteer Cluster...');

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: clusterConfig.maxConcurrency,
    puppeteerOptions: {
      headless: clusterConfig.headless,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--no-default-browser-check',
        '--mute-audio',
        `--proxy-bypass-list=*`,
      ],
      executablePath: executablePath(),
    },
    timeout: clusterConfig.timeout,
    retryLimit: clusterConfig.retryLimit,
    monitor: clusterConfig.monitor,
  });

  // Define task logic
  await cluster.task(taskHandler);

  // Feed tasks into cluster
  for (let i = 0; i < clusterConfig.totalTasks; i++) {
    const identity = getRandomIdentity(); // your fake CTV device config
    await cluster.queue({ identity });
  }

  logger.info(`Queued ${clusterConfig.totalTasks} spoofed CTV tasks.`);

  await cluster.idle();
  await cluster.close();

  logger.info('Cluster shut down cleanly.');
})();
