export function parseCustomTimestamp(timestamp: string | Date): Date {
    if (timestamp instanceof Date) {
      return timestamp;
    }
    const [datePart, timePart] = timestamp.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds, microseconds] = timePart.split(':').map(Number);

    const milliseconds = Math.floor(microseconds / 1000);
    
    const date = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
    return date;
}