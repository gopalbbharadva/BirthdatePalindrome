var date = document.querySelector("#date");
var checkButton = document.querySelector("#checkButton");
var output = document.querySelector(".result");
var form = document.querySelector("form");

var result1 = `<h1>Not palindrome</h1>`;
var result2 = `<h1>Palindrome</h1>`;
const lastDateArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var dateArray = date.value.split("-");
  var year = dateArray[0];
  var month = dateArray[1];
  var day = dateArray[2];
  var setResult = isPalindrome(year, month, day);
  if (setResult) output.innerHTML = `<h1>${setResult}</h1>`;
  else {
    let [palindromeDate, days] = farDate(day, month, year);
    output.innerHTML = `<h1>Sorry you were left with ${days} 
    and nearest birthdate is ${palindromeDate} </h1>`;
  }
});

function isPalindrome(yyyy, mm, dd) {
  var df1 = yyyy + mm + dd;
  var df2 = mm + dd + yyyy;
  var df3 = mm + dd + yyyy.substring(2);
  if (checkPalindrome(df1)) return `${yyyy}-${mm}-${dd}`;
  else if (checkPalindrome(df2)) return `${mm}-${dd}-${yyyy}`;
  else if (checkPalindrome(df3)) return `${mm}-${dd}-${yyyy.substring(2)}`;
  else return null;
}

function checkPalindrome(dateString) {
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
      if (yf > 12) {
        mf = 1;
        yf += 1;
      }
    }
    var dString = df.toString();
    var mString = mf.toString();
    var yString = yf.toString();
    if (dString.length === 1) dString = `0+${dString}`;
    if (mString.lenght === 1) mString = `0+${mString}`;
    var returnedDate = isPalindrome(yString, mString, dString);
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
    if (dString.lenght === 1) dString = `0` + dString;
    if (mString.lenght === 1) mString = `0` + mString;
    var returnedDate = isPalindrome(yString, mString, dString);
    if (returnedDate) return [`${returnedDate}`, j];
  }
}
