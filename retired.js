/*

retired.js

Functions that are no longer used, or have been replaced.
These were originally in unity.js

*/

/* ----------------------------------------------------------- */
/* Process the ajax request to get spreadsheet data            */
/*    04/10/2021 - initial                                     */
/* ----------------------------------------------------------- */

function get_spreadsheet(theurl) {
  var result = "";
  $.ajax({
      url: theurl,
      dataType: 'text',
      async: false,
      success: function(data) {
          i = data.indexOf('(');
          j = data.lastIndexOf(')');
          data = data.substr(i + 1, j - 1 - i);

          var data = JSON.parse(data);
          result = data;
      }
  });
  return result;
}


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

/* ----------------------------------------------------------- */
/* Check to see if this browser supports flexbox gap propert   */
/* See: https://ishadeed.com/article/flexbox-gap/              */
/*    09/04/2021 - initial                                     */
/* ----------------------------------------------------------- */

function checkFlexGap() {
  // create flex container with row-gap set
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  // create two, elements inside it
  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  // append to the DOM (needed to obtain scrollHeight)
  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1; // flex container should be 1px high from the row-gap
  flex.parentNode.removeChild(flex);

  return isSupported;
}

$(document).ready(function() {
  if (checkFlexGap()) {$('body').addClass('flex-gap');}
})

/* ----------------------------------------------------------- */
/* Show Announcements.                                         */
/* Don't think this is used anywhere, retired 3/1/22           */
/* ----------------------------------------------------------- */


function showAnnouncements(
  museum = null,
  file_id = '1oFRM_HEIcPjLWlyC3QuL_QN67L8kTVujfdG4S3-14X0', 
  sheet = 'Announce') {

  museum = museum.toLowerCase();
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=' + sheet + 
    '&headers=1&tq=' + escape('SELECT * Where upper(E) != "YES" ORDER BY A, B');

  var addlist = get_spreadsheet(url);
  console.log(addlist);
  var adds = addlist.table.rows;
  var out = '<p>No data found</p>'; 
  var temp = '<div class="slickButtons">\n' +
        '<button class="prev slick-arrow"> < </button>\n' +
        '<button class="next slick-arrow"> > </button>\n' +
        '</div>\n' +
        '<div class="theCarousel">';
  $('#announceContainer').html(temp);
  for (i = 0; i < adds.length; i++) {
    console.log(adds[i]);
    
    var item = adds[i];  
    var namd = item.c[0].v;
    
    var titlehref = "#";
    var readhref = "#";
    var read = "Read more";
    var categories = (item.c[6] != null) ? item.c[6].v : '';
    var startdate = (item.c[2] != null) ? item.c[2].v : '1950-01-01'; // default start
    var enddate = (item.c[3] != null) ? item.c[3].v : '2099-01-01'; // default end
    var title = (item.c[1] != null) ? item.c[1].v : 'unknown';
    var excerpt = (item.c[7] != null) ? item.c[7].v : 'unknown';
    var link = (item.c[8] != null) ? item.c[8].v : 'unknown';
    var src = (item.c[9] != null) ? item.c[9].v + "?format=300w" : 'unknown';

    // valid formats are original, 1500w, 1000w, 750w, 500w, 300w, 100w

    if (src.indexOf('images.squarespace-cdn.com')) {
      var temp = src.split('?');
      var src = temp[0] + '?format=300w';
    }
  
    var today = new Date();
    var startcompare = new Date(startdate);
    var endcompare = new Date(enddate);
    
    if (today > startcompare && today < endcompare ) {
      var temp = '<div class="item">\n' + 
      '<img src="' + src + '">\n' +
      '<div class="title"><a href="' + link + '">' + title + '</a></div>\n' +
      '<div class="classcontent">' + excerpt + '</div>\n' + 
      '<div class="readmore"><a href="' + link + '">' + read + '</a></div>\n' +
      '</div>';
      $(temp).appendTo('#announceContainer .theCarousel'); 
    }
       
}
  
$('.theCarousel').slick({
    dots: true,
    adaptiveHeight: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  prevArrow: $('#announceContainer' + ' .prev'),
  nextArrow: $('#announceContainer' + ' .next'),
    
    responsive: [{
        breakpoint: 500,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }},
        {
        breakpoint: 800,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
        }
    }]
});

}