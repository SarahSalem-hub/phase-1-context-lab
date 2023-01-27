/* Your Code Here */
function createEmployeeRecord(empInfo) {
  return {
    firstName: empInfo[0],
    familyName: empInfo[1],
    title: empInfo[2],
    payPerHour: empInfo[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(empRecordss) {
  let empRecordsArray = [];
  empRecordss.forEach((emp) => {
    empRecordsArray.push(createEmployeeRecord(emp));
  });
  return empRecordsArray;
}
function createTimeInEvent(dateStamp) {
  let dateHour = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateHour[1]),
    date: dateHour[0],
  });

  return this;
}

function createTimeOutEvent(dateStamp) {
  let dateHour = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateHour[1]),
    date: dateHour[0],
  });

  return this;
}
function hoursWorkedOnDate(date) {
  let hours;
  let timeInEvents = this.timeInEvents;
  let timeOutEvents = this.timeOutEvents;

  timeInEvents.forEach((timeIn) => {
    timeOutEvents.forEach((timeOut) => {
      if (timeIn.date === date && timeOut.date === date) {
        hours = (timeOut.hour - timeIn.hour) / 100;
      }
    });
  });
  return hours;
}
function wagesEarnedOnDate(date) {
  let empHours = hoursWorkedOnDate.call(this, date);
  return empHours * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function allWagesFor() {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
  let nameFound;
  srcArray.forEach((emp) => {
    if (!nameFound) {
      if (emp.firstName === firstName) {
        nameFound = emp;
      }
    }
  });
  return nameFound;
}

function calculatePayroll(empRecordss) {
  let payOwd = 0;
  empRecordss.forEach((emp) => {
    payOwd += allWagesFor.call(emp);
  });
  return payOwd;
}
