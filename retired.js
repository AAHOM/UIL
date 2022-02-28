/*

retired.js

Functions that are no longer used, or have been replaced.
These were originally in unity.js

*/

/*------------------------------------------------------------ */
/* GetCookie                                                   */
/*    Split cookie string and get all individual               */
/*    name=value pairs in an array                             */
/* ----------------------------------------------------------- */  

function getCookie(name) {
    
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
      }
  }
  // Return null if not found
  return null;
}

function getCachedSheet(name,url) {
  var useName = name + "Unity";
  var theCookie = getCookie(useName);
  var data = sessionStorage.getItem(useName)
  if (theCookie && data != null) { // cookie still alive
    var temp = JSON.parse(data); 
    return temp;
  }
  else {
    var retlist = get_spreadsheet(url);
    sessionStorage.setItem(useName,JSON.stringify(retlist));
    document.cookie = useName + "=cookieValue; max-age=" + 5*60 + "; path=/;";
    return retlist; 
  }
}