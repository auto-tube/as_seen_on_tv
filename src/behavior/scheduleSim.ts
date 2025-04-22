export function getScheduleBucket() {
    const hour = new Date().getHours();
  
    if (hour >= 6 && hour < 9) return 'morning_news';
    if (hour >= 12 && hour < 14) return 'lunch_break';
    if (hour >= 16 && hour < 19) return 'after_school';
    if (hour >= 20 && hour < 23) return 'prime_time';
    return 'off_hours';
  }
  
  export function getBehaviorBySchedule(scheduleBucket: string) {
    const map: Record<string, any> = {
      morning_news: { clickCTA: false },
      lunch_break: { clickCTA: true },
      after_school: { clickCTA: true },
      prime_time: { clickCTA: true },
      off_hours: { clickCTA: Math.random() > 0.7 },
    };
  
    return map[scheduleBucket] || { clickCTA: false };
  }
  