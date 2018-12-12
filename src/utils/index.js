// 给一位数字前面加'0'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export async function sleep (time = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
export function formatTime (date, showHour = true) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return showHour ? `${t1} ${t2}` : t1
}
export function formatDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  // const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function isToday (date) {
  // 今天的时间
  let day = new Date()
  const yearOfToday = day.getFullYear()
  const monthOfToday = day.getMonth() + 1
  const dateOfToday = day.getDate()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const d = date.getDate()

  if (yearOfToday === year && monthOfToday === month && dateOfToday === d) {
    return true
  }
  return false
}
export function isYesterday (date) {
  // 昨天的时间
  let day = new Date()
  day.setDate(day.getDate() - 1)
  const yearOfYesterday = day.getFullYear()
  const monthOfYesterday = day.getMonth() + 1
  const dateOfYesterday = day.getDate()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const d = date.getDate()
  if (yearOfYesterday === year && monthOfYesterday === month && dateOfYesterday === d) {
    return true
  }
  return false
}

export function formatHour (date) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

export function timeGapFromNow (date1, date2 = new Date(), todayDetail = true) {
  let timeGap = date2.getTime() - date1.getTime()
  let m1 = timeGap % (24 * 3600 * 1000)
  let m2 = m1 % (3600 * 1000)
  let days = Math.floor(timeGap / (24 * 3600 * 1000))
  let hours = Math.floor(m1 / (3600 * 1000))
  let minutes = Math.floor(m2 / (60 * 1000))
  if (days === 0) {
    return todayDetail ? (hours === 0 ? `${minutes}分钟前` : `${hours}小时前`) : '今天'
  } else if (days === 1) {
    return '昨天'
  } else if (days === 2) {
    return '前天'
  } else if (days < 30) {
    return `${days}天前`
  } else if (days < 60) {
    return '一个月前'
  } else {
    return formatTime(date1)
  }
}
export function jiequ (str, tag) {
  let index = str.lastIndexOf(tag)
  console.log('index', index)
  return str.substring(index + 1, str.length)
}
