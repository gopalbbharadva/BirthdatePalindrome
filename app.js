var date = document.querySelector("#date");
var checkButton = document.querySelector("#checkButton");
var output = document.querySelector(".result");
var form = document.querySelector("form");
var gif = document.querySelector("#timerGif");
var error = document.querySelector("#error");
const lastDateArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function reverseDate(date) {
  var dateString = date.split("").reverse().join("");
  return dateString;
}

function isPalindrome(date) {
  var reversedString = reverseDate(date);
  return reversedString === date ? true : false;
}

function dateNumberTostring(date) {
  var dateObj = { day: "", month: "", year: "" };
  if (date.day < 10) dateObj.day = `0${date.day}`;
  else dateObj.day = date.day.toString();

  if (date.month < 10) dateObj.month = `0${date.month}`;
  else dateObj.month = date.month.toString();

  dateObj.year = date.year.toString();
  return dateObj;
}

function getAllDateFormats(date) {
  var stringDate = dateNumberTostring(date);
  var ddmmyyyy = `${stringDate.day}${stringDate.month}${stringDate.year}`;
  var mmddyyyy = `${stringDate.month}${stringDate.day}${stringDate.year}`;
  var yyyymmdd = `${stringDate.year}${stringDate.month}${stringDate.day}`;
  var ddmmyy = `${stringDate.day}${stringDate.month}${stringDate.year.slice(
    -2
  )}`;
  var mmddyy = `${stringDate.month}${stringDate.day}${stringDate.year.slice(
    -2
  )}`;
  var yymmdd = `${stringDate.year.slice(-2)}${stringDate.month}${
    stringDate.day
  }`;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkDateFormats(date) {
  var allDateFormats = getAllDateFormats(date);
  console.log(allDateFormats);
  var flag = false;
  for (var i = 0; i < allDateFormats.length; i++) {
    if (isPalindrome(allDateFormats[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMothsArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMothsArray[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMothsArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;
    if (month === 0) {
      year--;
      day = 31;
      month = 12;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMothsArray[month - 1];
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var previousDate = getPreviousDate(date);
  var counter = 0;
  var flag, flag2;
  while (1) {
    counter++;
    flag = checkDateFormats(nextDate);
    flag2 = checkDateFormats(previousDate);
    if (flag || flag2) break;
    nextDate = getNextDate(nextDate);
    previousDate = getPreviousDate(previousDate);
  }
  var finalDate = flag ? nextDate : previousDate;
  return [counter, finalDate];
}

function checkPalindrome() {
  var a = "day";
  var b = "days";
  var c = "?";
  var d = ":";
  var dateObj = {
    year: Number(date.value.split("-")[0]),
    month: Number(date.value.split("-")[1]),
    day: Number(date.value.split("-")[2]),
  };
  var isPalindrome = checkDateFormats(dateObj);
  if (isPalindrome) {
    output.style.display = "block";
    output.innerHTML = `<p style="margin:0;color:#059669">Nice!!! Your birthday is palindrome</p>`;
  } else {
    var [counter, nearestPalindromeDate] = getNextPalindromeDate(dateObj);
    output.innerHTML = `<p style="margin:0;color:#DC2626">Oops! You missed by ${counter}
    ${counter > 1 ? `days` : `day`} and nearest 
      palindrome birthday is  ${nearestPalindromeDate.month} -
      ${nearestPalindromeDate.day} - ${nearestPalindromeDate.year}</p>`;
  }
}

checkButton.addEventListener("click", () => {
  if (date.value !== "") {
    gif.style.display = "block";
    setTimeout(() => {
      checkPalindrome();
      gif.style.display = "none";
      output.style.display = "block";
    }, 3000);
  } else {
    alert("enter birthdate");
  }
});

// checkButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   error.style.display = "none";
//   if (date.value != "") {
//     gif.style.display = "block";
//     setTimeout(() => {
//       start();
//       gif.style.display = "none";
//       output.style.display = "block";
//     }, 3000);
//   } else {
//     error.style.display = "block";
//   }
// });

// function start() {
//   var dateArray = date.value.split("-");
//   console.log(dateArray);
//   var year = dateArray[0];
//   var month = dateArray[1];
//   var day = dateArray[2];
//   var setResult = checkCombination(year, month, day);
//   if (setResult)
//     output.innerHTML = `<h2 style="color:#3B82F6; font-weight:bold;">Nice!! your birthdate is palindrome with seqence of
//   <span style="color:black">${setResult}</span></h2>`;
//   else {
//     let [palindromeDate, days] = farDate(day, month, year);
//     output.innerHTML = `<p style="margin:0" >Sorry you were left with <span style="color:#EF4444;font-weight:bold"> ${days} </span>
//     days and nearest birthdate is <span style="color:#3B82F6;font-weight:bold">
//      ${palindromeDate} </span> </p>`;
//   }
// }

// function checkCombination(yyyy, mm, dd) {
//   var df1 = yyyy + mm + dd;
//   var df2 = dd + mm + yyyy;
//   var df3 = mm + dd + yyyy.substring(2);
//   var df4 = Number(mm) + dd + yyyy;
//   if (isPalindrome(df1)) return `${yyyy}-${mm}-${dd}`;
//   else if (isPalindrome(df2)) return `${dd}-${mm}-${yyyy}`;
//   else if (isPalindrome(df3)) return `${mm}-${dd}-${yyyy.substring(2)}`;
//   else if (isPalindrome(df4)) return `${Number(mm)}-${dd}-${yyyy}`;
//   else return null;
// }

// function isPalindrome(dateString) {
//   for (var i = 0; i < Math.floor(dateString.length / 2); i++) {
//     if (dateString[i] != dateString[dateString.length - 1 - i]) return false;
//   }
//   return true;
// }

// function farDate(day, month, year) {
//   let df = Number(day);
//   let mf = Number(month);
//   let yf = Number(year);
//   let db = Number(day);
//   let mb = Number(month);
//   let yb = Number(year);

//   for (var j = 1; j > 0; j++) {
//     df = df + 1;
//     if (df > Number(lastDateArray[mf - 1])) {
//       df = 1;
//       mf += 1;
//       if (mf > 12) {
//         mf = 1;
//         yf += 1;
//       }
//     }
//     var dString = df.toString();
//     var mString = mf.toString();
//     var yString = yf.toString();
//     if (dString.length == 1) dString = `0${dString}`;
//     if (mString.length == 1) mString = `0 ${mString}`;
//     var returnedDate = checkCombination(yString, mString, dString);
//     console.log(returnedDate);
//     if (returnedDate) return [`${returnedDate}`, j];

//     if (yb > 1) {
//       db -= 1;
//       if (db < 1) {
//         mb -= 1;
//         if (mb < 1) {
//           mb = 12;
//           yb -= 1;
//           if (yb < 1) break;
//         }
//         db = lastDateArray[mb - 1];
//       }
//     }
//     var dString = db.toString();
//     var mString = mb.toString();
//     var yString = yb.toString();
//     if (dString.length == 1) dString = `0${dString}`;
//     if (mString.length == 1) mString = `0${mString}`;
//     var returnedDate = checkCombination(yString, mString, dString);
//     if (returnedDate) return [`${returnedDate}`, j];
//   }
// }
