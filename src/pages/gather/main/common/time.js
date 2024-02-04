//获取当前时间，其格式为：2021-12-22 10:42:29
export function getNowTime(){
  var date = new Date();
  var month = date.getMonth() + 1;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  var strDate = date.getDate();
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var strHours = date.getHours();
  if (strHours >= 0 && strHours <= 9) {
    strHours = "0" + strHours;
  }
  var strMinutes = date.getMinutes();
  if (strMinutes >= 0 && strMinutes <= 9) {
    strMinutes = "0" + strMinutes;
  }
  var strSeconds = date.getSeconds();
  if (strSeconds >= 0 && strSeconds <= 9) {
    strSeconds = "0" + strSeconds;
  }
  var currentDate = date.getFullYear() + "-" + month + "-" + strDate
    + " " + strHours + ":" + strMinutes + ":" + strSeconds;
  return currentDate;
}
