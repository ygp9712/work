export default function (date) {
    // eslint-disable-next-line one-var
    let MM = '', DD = ''
    if (date.getMonth() > 8) { MM = (date.getMonth() + 1).toString() } else { MM = '0' + (date.getMonth() + 1).toString() }
    if (date.getDate() > 9) { DD = date.getDate().toString() } else { DD = '0' + date.getDate().toString() }
    return date.getFullYear() + '-' + MM + '-' + DD
}