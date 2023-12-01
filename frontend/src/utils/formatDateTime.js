export default function formatDateTime(dateObject) {
    let timeString = dateObject.toLocaleTimeString('en-US', { hour12: false });
    let dateString = dateObject.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
    let [month, day, year] = dateString.split('.');
    let formattedDate = `${day}.${month}.${year} ${timeString}`;
    return formattedDate;
}
