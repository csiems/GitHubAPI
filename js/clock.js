var moment = require('moment');


function Clock() {
  this.alarm;
}

Clock.prototype.setAlarm = function (time) {
  var newAlarm = moment(time, "hh:mm").format("LT");
  this.alarm = newAlarm;
};

Clock.prototype.setSnooze = function () {
  this.alarm = moment(moment(this.alarm, "hh:mm").add(9, 'm')).format("LT");

}


exports.Clock = Clock;
