export function getShortDate(isoDate) {
    // moment.js would be easier, but I said no ui frameworks, so it's kind of one.
    let date = new Date(isoDate);
    let day = date.getDate();
    let month = 1 + date.getMonth();
    let year = date.getFullYear().toString().substring(2);
    return `${day}/${month}/${year}`
}
export function getShortTime(isoDate) {
    let date = new Date(isoDate);
    let hour = date.getHours();
    let min = date.getMinutes();
    return `${hour}:${min}`


}
