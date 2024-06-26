export function formatDuration(seconds: number): string {
  let formattedDuration;

  if (seconds >= 60) {
    const totalMinutes = Math.round(seconds / 60);
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      formattedDuration = `${hours} ${
        hours === 1 ? 'hora' : 'horas'
      } e ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else {
      formattedDuration = `${totalMinutes} minutos`;
    }
  } else {
    formattedDuration = `${seconds} segundos`;
  }

  return formattedDuration;
}
