var expect = require('chai').expect;
var moment = require('moment');
var Clock = require('./../js/clock.js').Clock;

describe("Clock", function() {
  it("will instantiate with the correct variables", function() {
    var testClock = new Clock();
    expect(testClock.alarm).to.be.undefined;
  });

  it("sets alarm time", function() {
    var testClock = new Clock();
    testClock.setAlarm("6:30 AM");
    expect(testClock.alarm).to.equal(moment("6:30 AM", "hh:mm").format('LT'));
    expect(testClock.alarm).to.equal("6:30 AM");
  });

  it("uses snooze to set alarm 9 minutes in the future", function() {
    var testClock = new Clock();
    testClock.setAlarm("6:30");
    testClock.setSnooze();
    expect(testClock.alarm).to.equal("6:39 AM");
  });
});
