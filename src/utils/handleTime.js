export default {
    //将日期转换为YYYY-MM-DD格式
    formatDateStr  (date) {
        let MM = '', DD = ''
        if (date.getMonth() > 8) { MM = (date.getMonth() + 1).toString() } else { MM = '0' + (date.getMonth() + 1).toString() }
        if (date.getDate() > 9) { DD = date.getDate().toString() } else { DD = '0' + date.getDate().toString() }
        return date.getFullYear() + '-' + MM + '-' + DD
    },
    //将毫秒转换为日期
    formatDuring (mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        /* var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); */
        /* var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)); */
        /* var seconds = Math.floor((mss % (1000 * 60)) / 1000); */
        return `${days + 1}天 ` /* + hours + " 小时 " */ /* + minutes + " 分钟 " */ /* + seconds + " 秒 " */;
    },
    formatBefore (mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((mss % (1000 * 60)) / 1000);
        if(days > 0) {
            return `${days}天 `
        } else if (hours > 0) {
            return `${hours}小时 `
        } else if (minutes > 0) {
            return `${minutes}分钟 `
        } else {
            return `${seconds}秒 `
        }
        /* + hours + " 小时 " */ /* + minutes + " 分钟 " */ /* + seconds + " 秒 " */;
    },
    countDown (mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((mss % (1000 * 60)) / 1000);
        return `${days}天${hours}小时${minutes}分钟${seconds}秒`
    }
}
