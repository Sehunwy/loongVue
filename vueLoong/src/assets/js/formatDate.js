function formatDate(timeStamp, type) {
  let d = new Date(parseInt(timeStamp));
  let Y = d.getFullYear();
  let M = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  let hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  let minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  let second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  if (type == '年月日' || type == 1) {
    return Y + "年" + M + "月" + date + "日";
  }
  if (type == 'Y-M-D' || type == 2) {
    return Y + "-" + M + "-" + date;
  }
  if (type == 'Y.M.D' || type == 3) {
    return Y + "." + M + "." + date;
  }
  if (type == 'Y/M/D' || type == 4) {
    return Y + "/" + M + "/" + date;
  }
  if (type == '年月日 时分秒' || type == 5) {
    return Y + "年" + M + "月" + date + "日 " + hour + ":" + minute + ":" + second;
  }
  if (type == 'Y-M-D h:m:s' || type == 6) {
    return Y + "-" + M + "-" + date + " " + hour + ":" + minute + ":" + second;
  }
  if (type == 'Y.M.D h:m:s' || type == 7) {
    return Y + "." + M + "." + date + " " + hour + ":" + minute + ":" + second;
  }
  if (type == 'Y/M/D h:m:s' || type == 8) {
    return Y + "/" + M + "/" + date + " " + hour + ":" + minute + ":" + second;
  }
  if (type == '年月日 时分' || type == 9) {
    return Y + "年" + M + "月" + date + "日 " + hour + ":" + minute;
  }
  if (type == 'Y-M-D h:m' || type == 10) {
    return Y + "-" + M + "-" + date + " " + hour + ":" + minute;
  }
  if (type == 'Y.M.D h:m' || type == 11) {
    return Y + "." + M + "." + date + " " + hour + ":" + minute;
  }
  if (type == 'Y/M/D h:m' || type == 12) {
    return Y + "/" + M + "/" + date + " " + hour + ":" + minute;
  }
  return value;
}

export {
  formatDate
}
