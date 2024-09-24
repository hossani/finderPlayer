export function filterByDate(dateFilter: string) {
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0)); // Début de la journée actuelle (minuit)
  const endOfToday = new Date(today.setHours(23, 59, 59, 999)); // Fin de la journée actuelle

  switch (dateFilter) {
    case 'today':
      return { gte: startOfToday, lte: endOfToday }; // Filtre entre minuit et 23h59 aujourd'hui
    case 'threeDays':
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(today.getDate() - 3);
      return { gte: threeDaysAgo };
    case 'oneWeek':
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      return { gte: oneWeekAgo };
    case 'oneMonth':
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);
      return { gte: oneMonthAgo };
    default:
      return undefined;
  }
}
