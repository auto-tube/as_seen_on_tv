const sessionStore: Record<string, any[]> = {};

export function saveSessionActivity(ifa: string, activity: any) {
  if (!sessionStore[ifa]) sessionStore[ifa] = [];
  sessionStore[ifa].push(activity);
}

export function getSessionHistory(ifa: string) {
  return sessionStore[ifa] || [];
}
