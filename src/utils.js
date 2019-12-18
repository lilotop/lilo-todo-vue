export function getShortDateTime(isoDate) {
    // moment.js would be easier, but I said no ui frameworks, so it's kind of one.
    let date = new Date(isoDate);
    let day = date.getDate();
    let month = 1 + date.getMonth();
    let year = date.getFullYear().toString().substring(2);
    let hour = date.getHours();
    let min = date.getMinutes();
    return `${day}/${month}/${year} ${hour}:${min}`
}
