const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const formatted = new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',   // gives Mon, Tue, etc.
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).format(new Date(dateStr));// e.g. "Mon, 07/10/25"
    
    const [weekdayPart, rest] = formatted.split(',', 2);
    if (!rest) return weekdayPart; // fallback
    const weekdayClean = weekdayPart.replace(/\.$/, ''); // avoid double dots
    return `${weekdayClean}. ${rest.trim()}`;
}

export default formatDate;