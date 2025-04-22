export const clusterConfig = {
    maxConcurrency: 5,
    headless: true,
    timeout: 60 * 1000,
    retryLimit: 2,
    monitor: true,
    totalTasks: 10, // Number of spoofed sessions per run
  };
  