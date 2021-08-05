var date = document.querySelector("#date");
var checkButton = document.querySelector("#checkButton");
var output = document.querySelector(".result");
var form = document.querySelector("form");
var gif = document.querySelector("#timerGif");
var error = document.querySelector("#error");
const lastDateArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

checkButton.addEventListener("click", (e) => {
  e.preventDefault();
  error.style.display = "none";
  if (date.value != "") {
    gif.style.display = "block";
    setTimeout(() => {
      start();
      gif.style.display = "none";
      output.style.display = "block";
    }, 3000);
  } else {
    error.style.display = "block";
  }
});

function start() {
  var dateArray = date.value.split("-");
  console.log(dateArray);
  var year = dateArray[0];
  var month = dateArray[1];
  var day = dateArray[2];
  var setResult = checkCombination(year, month, day);
  if (setResult)
    output.innerHTML = `<h2 style="color:#3B82F6; font-weight:bold;">Nice!! your birthdate is palindrome with seqence of 
  <span style="color:black">${setResult}</span></h2>`;
  else {
    let [palindromeDate, days] = farDate(day, month, year);
    output.innerHTML = `<p style="margin:0" >Sorry you were left with <span style="color:#EF4444;font-weight:bold"> ${days} </span>
    days and nearest birthdate is <span style="color:#3B82F6;font-weight:bold">
     ${palindromeDate} </span> </p>`;
  }
}

function checkCombination(yyyy, mm, dd) {
  var df1 = yyyy + mm + dd;
  var df2 = dd + mm + yyyy;
  var df3 = mm + dd + yyyy.substring(2);
  var df4 = Number(mm) + dd + yyyy;
  if (isPalindrome(df1)) return `${yyyy}-${mm}-${dd}`;
  else if (isPalindrome(df2)) return `${dd}-${mm}-${yyyy}`;
  else if (isPalindrome(df3)) return `${mm}-${dd}-${yyyy.substring(2)}`;
  else if (isPalindrome(df4)) return `${Number(mm)}-${dd}-${yyyy}`;
  else return null;
}

function isPalindrome(dateString) {
  for (var i = 0; i < Math.floor(dateString.length / 2); i++) {
    if (dateString[i] != dateString[dateString.length - 1 - i]) return false;
  }
  return true;
}

function farDate(day, month, year) {
  let df = Number(day);
  let mf = Number(month);
  let yf = Number(year);
  let db = Number(day);
  let mb = Number(month);
  let yb = Number(year);

  for (var j = 1; j > 0; j++) {
    df = df + 1;
    if (df > Number(lastDateArray[mf - 1])) {
      df = 1;
      mf += 1;
      if (mf > 12) {
        mf = 1;
        yf += 1;
      }
    }
    var dString = df.toString();
    var mString = mf.toString();
    var yString = yf.toString();
    if (dString.length == 1) dString = `0${dString}`;
    if (mString.length == 1) mString = `0 ${mString}`;
    var returnedDate = checkCombination(yString, mString, dString);
    console.log(returnedDate);
    if (returnedDate) return [`${returnedDate}`, j];

    if (yb > 1) {
      db -= 1;
      if (db < 1) {
        mb -= 1;
        if (mb < 1) {
          mb = 12;
          yb -= 1;
          if (yb < 1) break;
        }
        db = lastDateArray[mb - 1];
      }
    }
    var dString = db.toString();
    var mString = mb.toString();
    var yString = yb.toString();
    if (dString.length == 1) dString = `0${dString}`;
    if (mString.length == 1) mString = `0${mString}`;
    var returnedDate = checkCombination(yString, mString, dString);
    if (returnedDate) return [`${returnedDate}`, j];
  }
}
