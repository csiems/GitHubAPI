var Clock = require('./../js/clock.js').Clock;

$(function() {
  displayTime();
  setInterval(function() {
    displayTime();
  }, 1000);

  $("#alarm-set").submit(function(event){
    event.preventDefault();
    var clock = new Clock();
    clock.setAlarm($("#time").val());
    alert("You set alarm on:" + clock.alarm);
  });

});

function displayTime() {
  $(".time-display").text(moment().format('LTS'));
}
