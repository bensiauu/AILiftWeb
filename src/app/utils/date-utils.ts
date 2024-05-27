export function parseCustomTimestamp(timestamp: string | Date): Date {
    if (timestamp instanceof Date) {
      return timestamp;
    }
    const [datePart, timePart] = timestamp.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds, microseconds] = timePart.split(':').map(Number);

    const milliseconds = Math.floor(microseconds / 1000);
    
    const date = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
    console.log(date.getTime());
    return date;
}

function pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

export function parseAndFormatCustomTimestamp(timestamp: string | Date): string {
    if (timestamp instanceof Date) {
      return timestamp.toString();
    }
    const [datePart, timePart] = timestamp.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds, microseconds] = timePart.split(':').map(Number);

    const milliseconds = Math.floor(microseconds / 1000);
    
    const date = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
    console.log(date.getHours());
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
