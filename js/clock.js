var moment = require('moment');


function Clock() {
  this.alarm;
}

Clock.prototype.setAlarm = function (time) {
  var newAlarm = moment(time, "hh:mm a").format("LT");
  this.alarm = newAlarm;
};

Clock.prototype.setSnooze = function () {
  return this.alarm = moment(moment(this.alarm, "hh:mm a").add(9, 'm')).format("LT");

}


exports.Clock = Clock;
