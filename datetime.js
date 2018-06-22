/**
 * unix时间戳转换为日期字符串
 */
const timeStamp2DateString = ts => {
  let date = new Date(ts * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '.';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  let D = date.getDate();
  // h = date.getHours() + ':';
  // m = date.getMinutes() + ':';
  // s = date.getSeconds();
  // return Y + M + D + h + m + s;
  return Y + M + D;
}

/**
 * 获取当前日期的字符串，格式为YYYY-MM-DD，例如2018-05-12
 */
const getCurrentDateString = () => {
  let currDate = new Date()
  //  + '-' + ( + '-' + currDate.getDate()
  let Y = currDate.getFullYear()
  let M = currDate.getMonth() + 1 < 10 ? '0' + (currDate.getMonth() + 1) : currDate.getMonth() + 1
  let D = currDate.getDate()
  return Y + '-' + M + '-' + D
}

/**
 * 将时间字符串转换为UNIX时间戳
 * datestring必须满足YYYY-MM-DD hh:mm:ss的格式，例如2018-05-20 12:00:00
 */
const datetimeString2UnixTimeStamp = (dateString) => {
  let dateTimeParts = dateString.split(' ')
  let timeParts = dateTimeParts[1].split(':')
  let dateParts = dateTimeParts[0].split('-')

  let date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);

  return date.getTime() / 1000
}

module.exports = {
  timeStamp2DateString: timeStamp2DateString,
  getCurrentDateString: getCurrentDateString,
  datetimeString2UnixTimeStamp: datetimeString2UnixTimeStamp
}