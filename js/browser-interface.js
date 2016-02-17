var Clock = require('./../js/clock.js').Clock;
var timeZone = require('./../js/weather-interface.js').timeZone;
var moment = require('moment');
var clock = new Clock();

$(function() {
  displayTime();
  setInterval(function() {
    displayTime();
    wakeUp(clock);
    if (clock.alarm !== undefined) {
      $(".alarm-time").text("Your alarm time is: " + clock.alarm);
    }
    console.log(timeZone);
  }, 1000);



  $('#alarm-set').submit(function(event){
    event.preventDefault();
    clock.setAlarm($("#time").val());
    alert("You set alarm on:" + clock.alarm);
  });

  $('#snooze').click(function() {
    clock.setSnooze();
  });


});

function displayTime() {
  $(".time-display").text(moment().format('LTS'));
  // console.log(zone);
  // console.log(moment().format('LTS'));
  // console.log(moment.tz("2013-11-18 11:55", "America/Toronto"););
  // $(".time-display").text(moment.tz(moment().format('LTS'), "America\/Los_Angeles"));
}

function wakeUp(clock) {
  // debugger;
  if (moment().format('LT') === clock.alarm) {
    $(".snooze").show();

  } else {
    $('.snooze').hide();
  }
}
