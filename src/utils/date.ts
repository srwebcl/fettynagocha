export interface CalendarDay {
  id: string; // YYYY-MM-DD
  dayName: string; // Ej: 'Lun'
  dayNumber: string; // Ej: '15'
  monthName: string; // Ej: 'Nov'
  isSaturday: boolean;
}

export function getUpcomingAvailableDays(daysCount: number = 14): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();
  
  // Nombres en español
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  // Empezar desde mañana
  const currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() + 1);

  while (days.length < daysCount) {
    const dayOfWeek = currentDate.getDay();
    
    // 0 es Domingo, lo saltamos
    if (dayOfWeek !== 0) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dateNum = String(currentDate.getDate()).padStart(2, '0');
      
      days.push({
        id: `${year}-${month}-${dateNum}`,
        dayName: dayNames[dayOfWeek],
        dayNumber: String(currentDate.getDate()),
        monthName: monthNames[currentDate.getMonth()],
        isSaturday: dayOfWeek === 6,
      });
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}
