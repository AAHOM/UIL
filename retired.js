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

/*-------------------------------------------------------------*/
/* Icon Bar                                                    */
/*    04/17/2021 - initial                                     */
/*-------------------------------------------------------------*/

// unity
// 'https://static1.squarespace.com/static/5f73ca8db43a982332ef42a7/60316dbd7dd52d12ad920e7f/605f48578926120327029e3f/1616857176069/uil.png',
// Challenger
// https://images.squarespace-cdn.com/content/v1/5f73ca8db43a982332ef42a7/1614786000565-L6LRAQGSOU2RCTJO0GMR/ke17ZwdGBToddI8pDm48kPxxGCBoMQSgw3nyp-BaIiZZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7baX_VdYN7eZTOScYEC6H_pLV4CKJoqyvEGc-h-owCr40lNeO9O4GGfQSgSHrTD7DA/Logo_mainHeader.png
var iconsFor = ['aahom','leslie','yankee','Challenger']; 
/* updated 6/3/21 with Ari's new image */
var icons = [
'https://images.squarespace-cdn.com/content/v1/5f73ca8db43a982332ef42a7/e7aeba34-467f-40cf-8056-3fba38fd490a/ke17ZwdGBToddI8pDm48kBkSiM__EzOQIDgmzlPq1lAUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcHu3Ya3GWyjn2T6Pyc7Qz5bVN2MLWeLldKxJgMp5MiZ5EAsHAx8kgg2xyUEBRqgnS/AAHOM+1200+x+480+Transparency.png?format=300w',
'https://images.squarespace-cdn.com/content/v1/5f73ca8db43a982332ef42a7/2c40ddd6-3359-4061-a531-43ff65632a6c/ke17ZwdGBToddI8pDm48kBkSiM__EzOQIDgmzlPq1lAUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcHu3Ya3GWyjn2T6Pyc7Qz5bVN2MLWeLldKxJgMp5MiZ5EAsHAx8kgg2xyUEBRqgnS/LSNC+1200+x+480+Transparency.png?format=300w',
'https://images.squarespace-cdn.com/content/v1/5f73ca8db43a982332ef42a7/20c32031-135c-435b-a9b0-4c45bc0acbf0/ke17ZwdGBToddI8pDm48kBkSiM__EzOQIDgmzlPq1lAUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcHu3Ya3GWyjn2T6Pyc7Qz5bVN2MLWeLldKxJgMp5MiZ5EAsHAx8kgg2xyUEBRqgnS/YAM+1200+x+480+Transparency.png?format=300w',
'https://images.squarespace-cdn.com/content/v1/5f73ca8db43a982332ef42a7/3419d464-2d84-4a93-bd05-d877700324df/ke17ZwdGBToddI8pDm48kBkSiM__EzOQIDgmzlPq1lAUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcHu3Ya3GWyjn2T6Pyc7Qz5bVN2MLWeLldKxJgMp5MiZ5EAsHAx8kgg2xyUEBRqgnS/Challenger+1200+x+480+Transparency.png?format=300w'
];
// 'Experience',
// 'https://images.squarespace-cdn.com/content/5f73ca8db43a982332ef42a7/3bace990-2ca4-4963-a409-06cb861b15b4/experience_logo.png',
function showIconBar(sticky = true, iconID = 'iconBar') {
  var temp = '<ul class="iconBarFlex">';
  icons.forEach(function(item,key) {
    temp += '<li class="flex-item ' + 'logo' + iconsFor[key] + '"><img src="' + item + '"></li>\n';
  })
  temp += '</ul>\n';
  $('#' + iconID).html(temp); 

  var isEditor = window.frameElement ? true : false;
  //  && isEditor === false
  // was if (sticky && isEditor === false) {
  if (sticky) {
    var s = $('article:first-of-type section:first-of-type div.content-wrapper div.content');
    var h = s.height();
    h = parseInt(h) + 100; 
    s.height(h + 'px'); 
    $('#' + iconID).addClass('sticky');
    $('#' + iconID).appendTo('#page article:first-of-type section:first-of-type div.section-background');
        $('div.mySlides div.slideCaption').css('bottom','100px');
  } 
}

/* 

Retired 3/14/22, replaced by AddIconBar function 

-- Usage Home page header , Advanced code injections

<script>
$( document ).ready(function() {
   showIconBar(true);
})
</script>

-- Usage All pages footer, Footer section code section 

<style>
#iconBar, #iconBarFoot {
    width: calc(100% - 6vw);
    margin: 0 auto;
}
</style>
<script>
$( document ).ready(function() {
   showIconBar(false, 'iconBarFoot');
  $('#iconBarFoot').prependTo('footer:first-of-type');
})
</script>
<div id=iconBarFoot></div>

*/

/*  more retired on 4/12/22 */

/* ----------------------------------------------------------- */
/* Get data from spreadsheet a build flipcards html            */
/*    Updated 03/02/2022                                       */
/* ----------------------------------------------------------- */

function build_flipcards(selectorID, boxNumber = '1') {

  file_id = '1wEfSb4Dnjz-eNEayaNiiws3ta1ZEueiQyG5-BTWSXag';
  sheet = 'Cards2';
  var where = 'SELECT * WHERE A=' + boxNumber + ' ORDER BY A, B';
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=' + sheet +
    '&headers=1&tq=' + escape(where);

  $(selectorID).addClass('flipBoxContainer');

  $(selectorID).html('<div class="flex-container"></div>');

  fetchGoogleDataAll([url]).then((dataArrayx) => {
    if (dataArrayx[1]) {  // if there was a status error of some kind
    jQuery('#classList .gallery-items')
      .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
    return;
    }
    var cards = dataArrayx[0][0].table.rows;

    var prevcard = '';
    cards.forEach(function(item, key) {
      var images = [];
      var cardnumber = '';
      var label = 'More Info';
      var message = 'See more info';
      var caption = 'VISIT';
      var link = '#';
      var background = 'rgb(102,102,102)';
      var color = 'white';

      if (item.c[1] != null) {cardnumber = item.c[1].v;}
      if (item.c[2] != null) {caption = item.c[2].v;}
      if (item.c[3] != null) {label = item.c[3].v;}
      if (item.c[4] != null) {link = item.c[4].v;}
      if (item.c[5] != null) {background = item.c[5].v;}
      if (item.c[6] != null) {color = item.c[6].v;}
      if (item.c[7] != null) {message = item.c[7].v;}
      for (i = 8; i < 15; i++) {
        if (item.c[i] != null) {
          var src = item.c[i].v;
          if (src.indexOf('images.squarespace-cdn.com')) {
            var temp = src.split('?');
            var src = temp[0] + '?format=300w';
          }
          images.push(src);
        }
      };
      process_card_info(selectorID, link,images, caption, label, message);
    })

    $('div.front.face img:first-child')
      .addClass("active");
      $('')
    //setTimeout(flip_carousel, 5000);
    setTimeout(function() {flip_carousel(selectorID)}, 5000);

    flipCardResize(selectorID);

    $( window ).resize(function() {
      flipCardResize(selectorID);
    });

  })
}

/*-------------------------------------------------------------*/
/* Address/Hours/Admissions flex boxes                         */
/*    04/10/2021 - initial                                     */
/*    Updated 03/03/2022                                       */
/*-------------------------------------------------------------*/

function showAddressInfo(selectorID, museum = 'aahom') {

    var file_id = '1eBU2TqbjAT0-PUkKVa0J9obsoyIBJ7ib_KJMQLNym8Y';
    var sheet = 'Hours';

    museum = museum.toLowerCase();
    var qry = "SELECT *  WHERE A = '" + museum + "' ORDER BY A, B";
    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=' + sheet +
    '&headers=1&tq=' + escape(qry);
    // alert(url);
    var colorClass = "museum" + museum.charAt(0).toUpperCase() + museum.slice(1);

    $(selectorID).addClass(colorClass).addClass('hoursContainer');

     // Fetch the spreadsheet data
    fetchGoogleDataAll([url]).then((dataArrayx) => {
        if (dataArrayx[1]) {  // if there was a status error of some kind
            jQuery('#classList .gallery-items')
            .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
            return;
        }
        var adds = dataArrayx[0][0].table.rows;
        var out = '<p>No data found</p>';
        for (i = 0; i < adds.length; i++) {
            if (adds[i] && adds[i].c[0] != null && adds[i].c[0].v == museum) {
              if (adds[0]) {
                var item = adds[0];
                var namd = item.c[0].v;

                var add1 = (item.c[1] != null) ? item.c[1].v : 'unknown';
                var text1 = (item.c[2] != null) ? item.c[2].v : 'unknown';
                var add2 = (item.c[3] != null) ? item.c[3].v : 'unknown';
                var text2 = (item.c[4] != null) ? item.c[4].v : 'unknown';
                var add3 = (item.c[5] != null) ? item.c[5].v : 'unknown';
                var text3 = (item.c[6] != null) ? item.c[6].v : 'unknown';
                out = '<div>\n<h3>' + add1 + '</h3>\n' + text1 + '</div>\n';
                out = out + '<div>\n<h3>' + add2 + '</h3>\n' + text2 + '</div>\n';
                out = out + '<div>\n<h3>' + add3 + '</h3>\n' + text3 + '</div>\n';
              }
              $(selectorID).html(out).css('display','flex');
            }
        }
        return;
    });
}




/* ----------------------------------------------------------- */
/* Show Team Members from Spreadsheet                          */
/*    02/25/2022 - Updated                                     */
/* ----------------------------------------------------------- */

function do_team_members(selectorID) {

    var firstCol = 0;
    var lastCol = 1;
    var orgCol = 2;
    var unusedCol = 3; // Extra unused column
    var titleCol = 4;
    var hideCol = 5;
    var imageCol = 6;
    var bioCol = 7;
    var linkCol = 8;

    var file_id = '1hiPd3cJMf_JOr3Z4RnR3XA6-Z927OSJhxJJgYXix448';
    var sheet = 'Members';

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?sheet=' + sheet + '&tqx=out:json&headers=1&tq=' + escape("SELECT A, B, C, D, E, F, G, H, I WHERE F = 'No' ORDER BY B, A");

    fetchGoogleDataAll([url]).then((dataArray) => {
        if (dataArray[1]) {
            // if there was a status error of some kind
            jQuery('div#loading').hide();
            jQuery('#classList .gallery-items')
            var errorMsg = `<div class="errorMessage">
                Error fetching spreadsheet, status=${dataArray[1]}
                try refreshing page</div>`
            .html(errorMsg);
            return;
        }

        var teamlist = dataArray[0][0];
        if (teamlist.length == 0) {
            $(selectorID).append('<br>Ooops.. unable to read spreadsheet</br>');
            return;
        }
        var out = '';
        var teams = teamlist.table.rows;
        var itemSrc = '';
        $('<div id="teamDetail"></div>').insertBefore(selectorID)
        teams.forEach(function(item, key) {
            if (item.c[imageCol] != null) {itemSrc = item.c[imageCol].v;}
            var teamName = '';
            var teamTitle = '';
            var itemName = '';
            var itemTitle = '';
            if (item.c[lastCol] != null && item.c[firstCol] != null) {
                teamName = '<div class="memberName">' +
                    item.c[firstCol].v + ' ' + item.c[lastCol].v + '</div>';
                itemName = teamName;
                if (item.c[titleCol] != null) {
                    teamTitle = '<div class="memberTitle">' +
                    item.c[titleCol].v + '</div>';
                    itemTitle = item.c[titleCol].v;
                }
            }
            var biotext = '<p>No bio</p>';
            if (item.c[bioCol] != null) {biotext = item.c[bioCol].v;}
            out = out +
            `<div class="item_box">
            <div class="item_front">
                <img class="item_img" src="${itemSrc}">
                <div class="item_name">
                    <div class="item_title">
                        <div class="memberName">${itemName}</div>
                        <div class="memberTitle">${itemTitle}</div>
                    </div>
                </div>
            </div>
            <div class="item_back">
                <div class="item_bio">${biotext}
                </div><button class="readMoreDetails">
                    <i class="arrow"></i></button>
            </div>
        </div>`;
        })
        $(selectorID).append(out);
        $(selectorID).addClass('team_container'); // for style statements
        teamCardResize();
        $(window).resize(function() {
            teamCardResize();
        });
        $('#teamDetail').hide();
        $(selectorID).show();
        teamCardResize();

        $('div.item_back').on('click', function() {
            var content = $(this).find('.item_bio').html();
            content = (content) ? content : '<p>No bio</p>'
            var front = $(this).parent();
            var img = front.find('img').attr('src');
            //var name = front.find('.item_name').clone().children().remove().end().text();
            var name = front.find('.item_title .memberName .memberName').text();
            var title = front.find('.item_title .memberTitle').text();
            var modalContent = `<!-- Modal content -->
            <div id="teamDetail" class="modal-content" style="display: block;">
            <div class="teamName">${name}</div>
            <div class="teamTitle">${title}</div>
            <div class="teamContent">
                <img class="item_img" src="${img}">${content}
            </div>
            <div style="clear:both;"></div>
            <div class="topClose close"><a href="#">X</a></div>
            <div class="bottomClose close"><a href="#">Close</div></a>
            </div>`;

            $('#myModal').html(modalContent);

            // When the user clicks on close buttons
            $('#myModal div.topClose, #myModal div.bottomClose')
                .on('click', function(e) {
                e.preventDefault();
                $('#myModal').css('display', 'none');
            })
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target.id == 'myModal') {
                    $('#myModal').css('display', 'none');
                }
            }
            $('#myModal').show();
            $('#myModal').scrollTop(0);
        });

        addMyModal();

    });

}

function do_donor_wall(selectorID) {

    var colMin = 0;
    var colDonor = 1;
    var colDonors = 2;
    var colEndowment = 3;
    var colRecent = 4;
    var footone = '';
    var foottwo = '';
    var notes = '';

    file_id = '1Euo2kWx3lMC60XIAE7oUgXjEjoXkktFU3cW3YpZKLKw';
    var sheet = 'DonorWall';

    var spreadSheetLink = 'https://docs.google.com/spreadsheets/d/' + file_id + '/edit';

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?sheet=' + sheet + '&tqx=out:json&headers=1&tq='
    + escape('SELECT A, B, C, D, E ORDER BY A DESC');

    fetchGoogleDataAll([url]).then((dataArrayx) => {
        if (dataArrayx[1]) {  // if there was a status error of some kind
        jQuery('#classList .gallery-items')
          .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
        return;
        }
        dataArray = dataArrayx[0][0].table.rows;

        dataRows = [];
        dataArray.forEach(function(item,key) {
            if (item.c[0] != null) {
              var ar = [];
              for (i = 0; i < 5; i++) {
                var val =  (item.c[i] != null) ? item.c[i].v : '';
                ar.push(val);
              }
              dataRows.push(ar);
            }
        });

        var donors = dataRows;

        var data = '';
        var foot = '';
        var donorcount = '';
        var donor = '';
        var heading = '';
        var prevMin = '';
        var maxval = ' & Above';
        donors.forEach(function(item, key) {
            if (item[colMin] && item[colDonor]) {
                var donorname = item[colDonor];
                var minval = item[colMin];
                if (prevMin != minval && minval) {
                  // new group
                  if (prevMin) {
                    maxval = ' - ' + formatter.format(prevMin - 1);
                  }
                  var heading = formatter.format(minval);
                  data = data + '<div class="heading">' + heading + maxval + '</div>\n';
                  prevMin = minval;
                }
                if (donorname == 'Anonymous') {
                  if (item[colDonors]) {
                    donorcount = '<span class="donorCount">(' + item[colDonors] + ')</span>';
                  }
                  else {
                    donorcount = '<span class="donorCount">(1)</span>';
                  }
                }
                else {
                  donorcount = '';
                }
                if (item[colEndowment] == 'Yes') {
                  foot = '<sup>E</sup>';
                  footone = '<div class="footnote"><sup>E</sup>&nbsp;Endowment contributor</div>\n';
                }
                else {
                  foot = '';
                }
                if (item[colMin]) {
                  data  = data + '<div class="donor">' + donorname + donorcount + foot + '</div>';
                }
                else {
                  notes  = notes + '<div class="note">' + donorname + '</div>';
                }

            }
        })
        var link = '<p><a href="' + spreadSheetLink + '" target="_blank">(Edit/View spreadsheet data)</a></p>';
        $(selectorID).addClass('donorWall');
        $(selectorID).append(footone).append(notes).append(data).append(link);
    })
}

/* ----------------------------------------------------------- */
/* Build a tabbed list of calendars from spreadsheet           */
/*    05/18/2021 - initial                                     */
/*    Updated to use fetch promise 02/16/22                    */
/*    Updated parameter list + other things 02/23/22           */
/* ----------------------------------------------------------- */

function build_calendars(
    theSelector = "#calendarDiv",
    active = 0,
    single = false,
    collapsable = true,
    collapsed = false) {

  // Point to calendars spreadsheet
  file_id = '1i5EjZCpxI4UnvXyMYXCLyLP9tSCNt0PZYemaU6f6XtU';
  sheet = 'Calendars';

  // Make sure null parameters are handled
  active = (active == null) ? 1 : active;
  single = (single == null) ? true : single;
  collapsable = (collapsable == null) ? true : collapsable;
  collapsed = (collapsed == null) ? false : collapsed;

  // check url paramaters to see if we need to
  // default to a particular calendar
  var tabparam = getSearchParams("tab");
    if (tabparam) {
      active = tabparam;
    }

  var where = "SELECT B, C, E, F, G WHERE D != 'Yes' AND B IS NOT NULL ORDER BY A, B";
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=&sheet=' + sheet +
    '&headers=1&tq=' + escape(where);

  // Fetch the spreadsheet data
  fetchGoogleDataAll([url]).then((dataArrayx) => {
    if (dataArrayx[1]) {  // if there was a status error of some kind
      jQuery('#classList .gallery-items')
        .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
      return;
    }
    dataArray = dataArrayx[0][0].table.rows;

    // Clean up the Google array data
    dataRows = [];
    dataArray.forEach(function(item,key) {
      if (item.c[0] != null) {
        var ar = [];
        for (i = 0; i < 5; i++) {
          var val =  (item.c[i] != null) ? item.c[i].v : '';
          ar.push(val);
        }
        dataRows.push(ar);
      }
    });

    var temp = '';
    if (collapsable == true) {
    temp = `
      <div class="toggle">
        <div class="openCloseList">
        <i class="arrow down"></i>
          <a href="">View Calendars</a>
        </div>
      </div>`;
    }
    temp = temp + `<div class="theCalendarContainer"></div>`;
    $(theSelector).html(temp);

    var tab = 1;
    var tabs = '';
    var tabsdata = '';
    var iframes = [];
    dataRows.forEach(function(item, key) {
      var museum = item[0];
      var name = item[1];
      var title = item[2];
      var large = item[3];
      var small = large.replace(/mode=MONTH/gi,'mode=AGENDA');
      var after = item[4];
      var colorClass = "color" + museum.charAt(0).toUpperCase() + museum.slice(1);
      var ar = [large,small];
      iframes.push(ar);
      if ((tab - 1) != active) {
        large = '';
        small = '';
      }

      var hideme = '';
      if (single == true && key != active) {
        hideme = 'hide';
      }

      tabs = tabs +
        '<li class="' + hideme + '"><a href="#tabs-' + tab + '" data-tab="' + tab + '" class="' + colorClass + '">' +
        name + '</a></li>\n';
        tabsdata = tabsdata +
        '<div id="tabs-' + tab + '">\n' +
        '<p><strong>' + title + '</strong>\n' +
        '<div class="calendarLarge">' + large + '</div>\n' +
        '<div class="calendarSmall">' + small + '</div>\n' +
        '</p>' +
        after +
        '</div>\n';
      tab = tab + 1;
    })
    tabs = '<div id="tabs"><ul>' + tabs + '</ul></div>\n';
    $(tabs).appendTo(theSelector + ' .theCalendarContainer');
    $(tabsdata).appendTo('#tabs');

    $(theSelector + ' .toggle div.openCloseList a')
          .click(function(e) {
          e.preventDefault();
          //$(this).toggleClass("open");
          $(theSelector + ' .theCalendarContainer')
          .slideToggle('slow');
          $(theSelector + ' .openCloseList i').toggleClass("down");
        });

    $(theSelector).addClass('faq_container tabListContainer');
    $( "#tabs" ).tabs({ active: active});
    if (single == true) {
      $(theSelector).find('li.hide').hide();
      $(theSelector + ' .theCalendarContainer').find('.ui-tabs-nav').hide();
    }
    if (collapsable == true && collapsed == true) {
      $(theSelector + ' .theCalendarContainer').hide();
      $(theSelector + ' .openCloseList i').removeClass("down");
    }
    $(theSelector + ' .theCalendarContainer iframe').width('100%');
    $('#tabs a').click(function() {
      var id = $(this).attr("href");
      var tab = id.substr(6) - 1;
      var x = $(id).find('.calendarLarge iframe').length;
      if (!x) {  // if no iframe found, then fill it in
        $(id).find('.calendarLarge').html(iframes[tab][0]);
        $(id).find('.calendarSmall').html(iframes[tab][1]);
        $(theSelector + ' .theCalendarContainer iframe').width('100%');
      }
    })
  }) // End of promis
}

/* ---------------------------------------------------------- */
/* Get the category groups and items from the spreadsheet     */
/* then build radio and/or checkboxes based on requested      */
/* groups                                                     */
/* ---------------------------------------------------------- */

function showFilterSelections(

groups='locations, groups', selector="#filterContainer",
file_id='1qrUPQu2qs8eOOi-yZwvzOuGseDFjkvj5_mSnoz0tJVc',
sheet='Categories') {

    var where = "SELECT A,B,C,D,E WHERE E != 'Yes' AND A IS NOT NULL ORDER BY A,B";
    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=' + sheet +
    '&headers=1&tq=' + escape(where);

    // hide the squarespace summary block, we are going to
    // build an entirly new flexbox list
    $(selector).parent().parent().next().find('div.summary-item-list')
      .css('display','none !important');

    // Fetch the spreadsheet data
    fetchGoogleDataAll([url]).then((dataArrayx) => {
        if (dataArrayx[1]) {
            // if there was a status error of some kind
            jQuery('#classList .gallery-items')
            .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
            return;
        }
        var cats = dataArrayx[0][0].table.rows;
        // This is for a quick check for abbreviated category names.
        // facilitates swapping out the abbreviation with the full name
        var catsAbbrev = [];
        var catsFull = [];
        cats.forEach(function(item, key) {
            var abbrev = item.c[2].v;
            var full = item.c[3].v;
            if (abbrev.toLowerCase() != full.toLowerCase()) {
                catsAbbrev.push(abbrev.toLowerCase());
                catsFull.push(full);
            }
        })
        allgroups = groups.split(',');

        // Get a list of the found categories and nested list of
        // the div index's that the categorie are found on
        // Needed later for AND/OR filtering
        var catsel = $(selector).parent().parent().next().css('display','none');
        $(catsel).find('div.summary-item').each(function(index, value) {
            $(this).find(catloc).filter(function(index2) {
                var t = this.href.indexOf('?category=');
                //var catref = this.href.toLowerCase().replaceAll(' ','+').replaceAll('%20','+');
                var cat = this.href.substr(t + 10).toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
                //var cat = catref.substr(t+10);
                //this.attr("href", catref);
                var x = catsAbbrev.indexOf(cat);
                if (x != -1) {
                    // Abbreviation found, swap it out with full name
                    $(this).prop("href", href.substr(0, t + 10) + catsFull[x]);
                    $(this).text(catsFull[x]);
                }
                var i = mycats.indexOf(cat);
                if (i == -1) {
                    mycats.push(cat);
                    mycatsids.push([index]);
                }
                else {
                    if (mycatsids[i].indexOf(index) == -1) {
                        mycatsids[i].push(index);
                    }
                }
            })
        });

        /* At this point we have several arrays

            cats = Raw data from categories spreadsheet

            mycats = A list of categories found in blog items which match categories
            from the spreadsheet. ie. ["3rd","4th","5th", ...]

            mycatsids = Nested array for each of "mycats" provides a list of blog items
            where that category is listed [0,[0,1,2],[1,[4,5,6]], ...
            says that category 0 ("3rd") was found in blog items 0,1 and 2

            catsAbbrev = Array of category abbreviations found in the spreadsheet.

            catsFull = Array of matching full name for each abbreviation found in catsAbbrev

        */

        var testout = '';
        var allcats = $(catsel).find('div.summary-item').css('display', 'block');
        allcats.each(function(index, value) {

            var title = $(value).find('.summary-title-link').text();
            var href = $(value).find('.summary-title-link').attr('href');
            var excerpt = $(value).find('.summary-excerpt p').text();
            var img = $(value).find('.summary-thumbnail-outer-container img').data('src');
            var spancat = $(value).find('div.summary-metadata-container').html();
            img = (!img) ? 'https://via.placeholder.com/300x200?text=Coming%20Soon' : img;

            testout +=
            `<div class="itemFilter">
                  <div class="itemFilterImage">
                      <a href="${href}">
                      <img src="${img}">
                      </a>
                  </div>
                  <div class="itemFilterContent">
                      <a href="${href}">
                          ${title}</a>
                          <p class="message">${excerpt}</p>

                      <a href="${href}" class="summary-read-more-link">
                          Read More →
                      </a>
                      <div class="itemFilterCats">
                          <!-- Categories -->
                          <span class="theCats">
                              ${spancat}
                          </span>

                      </div>
                  </div>
              </div>`;
        })

        $('<div id="newSummaryItems"><div class="summaryFilterContainer">' +
            testout + '</div></div>').insertAfter(selector);


        /* Here we are building the actual html checkbox/radio buttons based
        on the requested groups in the call.  I.e. "locations, grades".
        */

        var out = '<div class="flexBox">\n';
        for (i = 0; i < allgroups.length; i++) {
            var group = allgroups[i].trim().toLowerCase();
            var labels = allgroups[i].split(':');
            var type = 'checkbox'; // default
            var temp = group.split(':');
            var validtypes = ['radio', 'checkbox'];
            if (temp.length > 1) {
                group = temp[0];
                if (validtypes.indexOf(temp[1]) > -1) {
                    type = temp[1];
                }
            }
            var defaultvalue = '';
            if (temp.length > 2) {
                defaultvalue = temp[2].toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
            }
            group = group.toLowerCase();
            groupparts = group.split('/');
            group = groupparts[0];
            grouplabel = (groupparts[1]) ? groupparts[1] : group;

            var prettyname = grouplabel.charAt(0).toUpperCase() + grouplabel.slice(1);
            if (labels.length > 2 && typeof (labels[2]) != 'undefined') {
                prettyname = labels[2];
            }
            out = out + '<div class="filterGroup">\n';
            out = out + '<span>' + prettyname + '</span><table class="outer">\n';
            var colorClass = "group" + group.charAt(0).toUpperCase() + group.slice(1);
            var numcols = 1;
            if (group == 'grades') {
                numcols = 2;
            }
            numcols = (groupparts[2]) ? groupparts[2] : numcols;
            var curcol = 0;
            var tr = '<tr>';
            if (type == 'radio') {
                if (defaultvalue == '') {
                    checked = ' checked ';
                }
                out = out + tr + '<td><input type="' + type + '" value="" name="' + group + '"' + checked + '><span>Any</span></td>\n';
                curcol = curcol + 1;
            }
            for (n = 0; n < cats.length; n++) {
                if (cats[n] && cats[n].c[0].v.toLowerCase() == group) {
                    var item = cats[n];
                    var lookup = item.c[2].v.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
                    // Only show category if it appears in at least one blog entry
                    if (mycats.indexOf(lookup) !== -1) {
                        curcol = curcol + 1;

                        if (parseInt(curcol) > parseInt(1) && parseInt(curcol) <= parseInt(numcols)) {
                            tr = '';

                        }
                        else {
                            tr = '<tr>';
                            curcol = 1;
                        }
                        if (curcol > numcols) {
                            curcol = 1;
                        }
                        //var item = cats[n];
                        var checked = '';
                        var lookup = item.c[2].v.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
                        if (defaultvalue == lookup) {
                            checked = ' checked ';
                        }

                        out = out + tr + '<td><input type="' + type + '" value="' + lookup + '" name="' + group + '"' + checked + '><span>' + item.c[3].v + '</span></td>\n';
                    }
                }
            }
            out = out + '</table></div>\n';
        }
        var out = out + '</div>\n';
        $(selector).html(out);
        filter_showvals(selector);
        filter_values(selector);
        $(selector).parent().parent().next().find('div.summary-item').remove();

        $('#newSummaryItems').css('display','block');
        return;
    });
}

/* ----------------------------------------------------------- */
/* Get data from spreadsheet a build flipcards html            */
/*    Updated 03/02/2022                                       */
/* ----------------------------------------------------------- */

function build_flipcards(selectorID, boxNumber = '1') {

  file_id = '1wEfSb4Dnjz-eNEayaNiiws3ta1ZEueiQyG5-BTWSXag';
  sheet = 'Cards2';
  var where = 'SELECT * WHERE A=' + boxNumber + ' ORDER BY A, B';
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=' + sheet +
    '&headers=1&tq=' + escape(where);

  $(selectorID).addClass('flipBoxContainer');

  $(selectorID).html('<div class="flex-container"></div>');

  fetchGoogleDataAll([url]).then((dataArrayx) => {
    if (dataArrayx[1]) {  // if there was a status error of some kind
    jQuery('#classList .gallery-items')
      .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
    return;
    }
    var cards = dataArrayx[0][0].table.rows;

    var prevcard = '';
    cards.forEach(function(item, key) {
      var images = [];
      var cardnumber = '';
      var label = 'More Info';
      var message = 'See more info';
      var caption = 'VISIT';
      var link = '#';
      var background = 'rgb(102,102,102)';
      var color = 'white';

      if (item.c[1] != null) {cardnumber = item.c[1].v;}
      if (item.c[2] != null) {caption = item.c[2].v;}
      if (item.c[3] != null) {label = item.c[3].v;}
      if (item.c[4] != null) {link = item.c[4].v;}
      if (item.c[5] != null) {background = item.c[5].v;}
      if (item.c[6] != null) {color = item.c[6].v;}
      if (item.c[7] != null) {message = item.c[7].v;}
      for (i = 8; i < 15; i++) {
        if (item.c[i] != null) {
          var src = item.c[i].v;
          if (src.indexOf('images.squarespace-cdn.com')) {
            var temp = src.split('?');
            var src = temp[0] + '?format=300w';
          }
          images.push(src);
        }
      };
      process_card_info(selectorID, link,images, caption, label, message);
    })

    $('div.front.face img:first-child')
      .addClass("active");
      $('')
    //setTimeout(flip_carousel, 5000);
    setTimeout(function() {flip_carousel(selectorID)}, 5000);

    flipCardResize(selectorID);

    $( window ).resize(function() {
      flipCardResize(selectorID);
    });

  })
}

/*-------------------------------------------------------------*/
/* Address/Hours/Admissions flex boxes                         */
/*    04/10/2021 - initial                                     */
/*    Updated 03/03/2022                                       */
/*-------------------------------------------------------------*/

function showAddressInfo(selectorID, museum = 'aahom') {

    var file_id = '1eBU2TqbjAT0-PUkKVa0J9obsoyIBJ7ib_KJMQLNym8Y';
    var sheet = 'Hours';

    museum = museum.toLowerCase();
    var qry = "SELECT *  WHERE A = '" + museum + "' ORDER BY A, B";
    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=' + sheet +
    '&headers=1&tq=' + escape(qry);
    // alert(url);
    var colorClass = "museum" + museum.charAt(0).toUpperCase() + museum.slice(1);

    $(selectorID).addClass(colorClass).addClass('hoursContainer');

     // Fetch the spreadsheet data
    fetchGoogleDataAll([url]).then((dataArrayx) => {
        if (dataArrayx[1]) {  // if there was a status error of some kind
            jQuery('#classList .gallery-items')
            .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
            return;
        }
        var adds = dataArrayx[0][0].table.rows;
        var out = '<p>No data found</p>';
        for (i = 0; i < adds.length; i++) {
            if (adds[i] && adds[i].c[0] != null && adds[i].c[0].v == museum) {
              if (adds[0]) {
                var item = adds[0];
                var namd = item.c[0].v;

                var add1 = (item.c[1] != null) ? item.c[1].v : 'unknown';
                var text1 = (item.c[2] != null) ? item.c[2].v : 'unknown';
                var add2 = (item.c[3] != null) ? item.c[3].v : 'unknown';
                var text2 = (item.c[4] != null) ? item.c[4].v : 'unknown';
                var add3 = (item.c[5] != null) ? item.c[5].v : 'unknown';
                var text3 = (item.c[6] != null) ? item.c[6].v : 'unknown';
                out = '<div>\n<h3>' + add1 + '</h3>\n' + text1 + '</div>\n';
                out = out + '<div>\n<h3>' + add2 + '</h3>\n' + text2 + '</div>\n';
                out = out + '<div>\n<h3>' + add3 + '</h3>\n' + text3 + '</div>\n';
              }
              $(selectorID).html(out).css('display','flex');
            }
        }
        return;
    });
}

/*-------------------------------------------------------------*/
/* Frequently Asked Questions, FAQS2                           */
/*    04/11/2021 - initial                                     */
/*    Updated 02/22/2022                                       */
/*-------------------------------------------------------------*/

function do_faqs2(theSelector, active = 1,
  single = false, openfirst = true,
  collapsable = false, collapsed = true,
  title = "View Frequently Asked Questions") {

    var listCol = 0;
    var catCol = 1;
    var questionCol = 3;
    var answerCol = 4;
    var tabLinks = '';
    var out = '';
    var activeli = 0;
    var tabs = [];
    active = (active == null) ? 1 : active;
    single = (single == null) ? 1 : single;
    collapsable = (collapsable == null) ? 1 : collapsable;
    collapsed = (collapsed == null) ? 1 : collapsed;
    // Check to see if a parameter was passed to
    // specify which tab becomes active
    var tabparam = getSearchParams("tab");
    if (tabparam) {
      active = tabparam;
    }
    // point to the FAQ's spreadsheet
    file_id = '1f3G-ECzjt8p-czZNPyUQGXG8NND016Nue5QypQTf6PQ';
    var sheet = 'FAQS';

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?sheet=' + sheet + '&tqx=out:json&headers=1&tq=' +
    escape("SELECT A, B, C, D, E WHERE C != 'Yes'");
    var spreadSheetLink = 'https://docs.google.com/spreadsheets/d/' + file_id + '/edit';

    // Set up the collapsed/expanded option
    // valid values 0-4 or "none"
    if (openfirst != true) {
        activeli = 'none';
    }

    if ($(window).width() < 960) {
      activeli = 'none';
    }
    var activeTab = active - 1;  // zero based tabs

    fetchGoogleDataAll([url]).then((dataArrayx) => {
      if (dataArrayx[1]) {  // if there was a status error of some kind
        jQuery('#classList .gallery-items')
          .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
        return;
      }
      dataArray = dataArrayx[0][0].table.rows;

      dataRows = [];
      dataArray.forEach(function(item,key) {
        if (item.c[0] != null) {
          var ar = [];
          for (i = 0; i < 5; i++) {
            var val =  (item.c[i] != null) ? item.c[i].v : '';
            ar.push(val);
          }
          dataRows.push(ar);
        }
      });

      faqs = dataRows;

      // Loop for each tab
      theMuseumList.forEach(function(item, key) {
          if (key) {  // ignore zero (all) for faqs
            // camelcase css tag for background
            var background = 'color' + item[0].charAt(0).toUpperCase() +
              item[0].slice(1).toLowerCase();
            val = item[1];
            var tabnum = +(key+1);
            var hideme = '';
            if (single == true && key != active) {
              hideme = ' hide';
            }
            tabLinks = tabLinks + '<li class="' + background + hideme + '"><a href="#tabs-' +
              tabnum + '">' + val + '</a></li>\n';
            var lookfor = item[0].toLowerCase();


            // Loop for the questions/answers in each tab
            out = out + '<div id="tabs-' + tabnum + '">\n<div class="accordian">\n';
            faqs.forEach(function(item2, key2) {
              if (item2[listCol] != null && item2[listCol].toLowerCase() == lookfor) {
                out = out + '<h3 class="' + background + '">' + item2[questionCol] + '</h3><div>\n';
                out = out + '<p>' + item2[answerCol] + '</p></div>\n';
              }
            });


            out = out + '</div>\n</div>\n';
          }

        });

        var toggle = "<div class=\"toggle\">" +
          "<div class=\"openCloseList\"><i class=\"arrow down\"></i><a href=\"\">" + title + "</a></div>\n";
        out = '<div id="tabs"><ul>' + tabLinks + '</ul>' + out + '</div></div>\n';

        $(theSelector + ' div#tabs').show();
        if (collapsable == true) { // hide if collapsable and collapsed
          out = toggle + out + '</div>';
          $(out).appendTo(theSelector);
          if (collapsed == true) {
            $(theSelector + ' div#tabs').hide();
          }
        }
        else {
          $(out).appendTo(theSelector);
        }

        $(theSelector).find('li.hide').hide();

        $(theSelector + ' .toggle div.openCloseList a')
          .click(function(e) {
          e.preventDefault();
          $(this).toggleClass("open");
          $(theSelector + ' div#tabs')
          .slideToggle('slow');
          $(theSelector + ' .openCloseList i').toggleClass("down");
        });

        // Initialize the accordian styles
        $( ".accordian" ).accordion({
          collapsible: true, active : activeli,
          heightStyle: "content"
        });

        // Display the faqs
        $(theSelector).addClass('faq_container tabListContainer');
        $( "#tabs" ).tabs({active: activeTab});
    })

}

/* ----------------------------------------------------------- */
/* Show Team Members from Spreadsheet                          */
/*    02/25/2022 - Updated                                     */
/* ----------------------------------------------------------- */

function do_team_members(selectorID) {

    var firstCol = 0;
    var lastCol = 1;
    var orgCol = 2;
    var unusedCol = 3; // Extra unused column
    var titleCol = 4;
    var hideCol = 5;
    var imageCol = 6;
    var bioCol = 7;
    var linkCol = 8;

    var file_id = '1hiPd3cJMf_JOr3Z4RnR3XA6-Z927OSJhxJJgYXix448';
    var sheet = 'Members';

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?sheet=' + sheet + '&tqx=out:json&headers=1&tq=' + escape("SELECT A, B, C, D, E, F, G, H, I WHERE F = 'No' ORDER BY B, A");

    fetchGoogleDataAll([url]).then((dataArray) => {
        if (dataArray[1]) {
            // if there was a status error of some kind
            jQuery('div#loading').hide();
            jQuery('#classList .gallery-items')
            var errorMsg = `<div class="errorMessage">
                Error fetching spreadsheet, status=${dataArray[1]}
                try refreshing page</div>`
            .html(errorMsg);
            return;
        }

        var teamlist = dataArray[0][0];
        if (teamlist.length == 0) {
            $(selectorID).append('<br>Ooops.. unable to read spreadsheet</br>');
            return;
        }
        var out = '';
        var teams = teamlist.table.rows;
        var itemSrc = '';
        $('<div id="teamDetail"></div>').insertBefore(selectorID)
        teams.forEach(function(item, key) {
            if (item.c[imageCol] != null) {itemSrc = item.c[imageCol].v;}
            var teamName = '';
            var teamTitle = '';
            var itemName = '';
            var itemTitle = '';
            if (item.c[lastCol] != null && item.c[firstCol] != null) {
                teamName = '<div class="memberName">' +
                    item.c[firstCol].v + ' ' + item.c[lastCol].v + '</div>';
                itemName = teamName;
                if (item.c[titleCol] != null) {
                    teamTitle = '<div class="memberTitle">' +
                    item.c[titleCol].v + '</div>';
                    itemTitle = item.c[titleCol].v;
                }
            }
            var biotext = '<p>No bio</p>';
            if (item.c[bioCol] != null) {biotext = item.c[bioCol].v;}
            out = out +
            `<div class="item_box">
            <div class="item_front">
                <img class="item_img" src="${itemSrc}">
                <div class="item_name">
                    <div class="item_title">
                        <div class="memberName">${itemName}</div>
                        <div class="memberTitle">${itemTitle}</div>
                    </div>
                </div>
            </div>
            <div class="item_back">
                <div class="item_bio">${biotext}
                </div><button class="readMoreDetails">
                    <i class="arrow"></i></button>
            </div>
        </div>`;
        })
        $(selectorID).append(out);
        $(selectorID).addClass('team_container'); // for style statements
        teamCardResize();
        $(window).resize(function() {
            teamCardResize();
        });
        $('#teamDetail').hide();
        $(selectorID).show();
        teamCardResize();

        $('div.item_back').on('click', function() {
            var content = $(this).find('.item_bio').html();
            content = (content) ? content : '<p>No bio</p>'
            var front = $(this).parent();
            var img = front.find('img').attr('src');
            //var name = front.find('.item_name').clone().children().remove().end().text();
            var name = front.find('.item_title .memberName .memberName').text();
            var title = front.find('.item_title .memberTitle').text();
            var modalContent = `<!-- Modal content -->
            <div id="teamDetail" class="modal-content" style="display: block;">
            <div class="teamName">${name}</div>
            <div class="teamTitle">${title}</div>
            <div class="teamContent">
                <img class="item_img" src="${img}">${content}
            </div>
            <div style="clear:both;"></div>
            <div class="topClose close"><a href="#">X</a></div>
            <div class="bottomClose close"><a href="#">Close</div></a>
            </div>`;

            $('#myModal').html(modalContent);

            // When the user clicks on close buttons
            $('#myModal div.topClose, #myModal div.bottomClose')
                .on('click', function(e) {
                e.preventDefault();
                $('#myModal').css('display', 'none');
            })
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target.id == 'myModal') {
                    $('#myModal').css('display', 'none');
                }
            }
            $('#myModal').show();
            $('#myModal').scrollTop(0);
        });

        addMyModal();

    });

}

function do_donor_wall(selectorID) {

    var colMin = 0;
    var colDonor = 1;
    var colDonors = 2;
    var colEndowment = 3;
    var colRecent = 4;
    var footone = '';
    var foottwo = '';
    var notes = '';

    file_id = '1Euo2kWx3lMC60XIAE7oUgXjEjoXkktFU3cW3YpZKLKw';
    var sheet = 'DonorWall';

    var spreadSheetLink = 'https://docs.google.com/spreadsheets/d/' + file_id + '/edit';

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?sheet=' + sheet + '&tqx=out:json&headers=1&tq='
    + escape('SELECT A, B, C, D, E ORDER BY A DESC');

    fetchGoogleDataAll([url]).then((dataArrayx) => {
        if (dataArrayx[1]) {  // if there was a status error of some kind
        jQuery('#classList .gallery-items')
          .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
        return;
        }
        dataArray = dataArrayx[0][0].table.rows;

        dataRows = [];
        dataArray.forEach(function(item,key) {
            if (item.c[0] != null) {
              var ar = [];
              for (i = 0; i < 5; i++) {
                var val =  (item.c[i] != null) ? item.c[i].v : '';
                ar.push(val);
              }
              dataRows.push(ar);
            }
        });

        var donors = dataRows;

        var data = '';
        var foot = '';
        var donorcount = '';
        var donor = '';
        var heading = '';
        var prevMin = '';
        var maxval = ' & Above';
        donors.forEach(function(item, key) {
            if (item[colMin] && item[colDonor]) {
                var donorname = item[colDonor];
                var minval = item[colMin];
                if (prevMin != minval && minval) {
                  // new group
                  if (prevMin) {
                    maxval = ' - ' + formatter.format(prevMin - 1);
                  }
                  var heading = formatter.format(minval);
                  data = data + '<div class="heading">' + heading + maxval + '</div>\n';
                  prevMin = minval;
                }
                if (donorname == 'Anonymous') {
                  if (item[colDonors]) {
                    donorcount = '<span class="donorCount">(' + item[colDonors] + ')</span>';
                  }
                  else {
                    donorcount = '<span class="donorCount">(1)</span>';
                  }
                }
                else {
                  donorcount = '';
                }
                if (item[colEndowment] == 'Yes') {
                  foot = '<sup>E</sup>';
                  footone = '<div class="footnote"><sup>E</sup>&nbsp;Endowment contributor</div>\n';
                }
                else {
                  foot = '';
                }
                if (item[colMin]) {
                  data  = data + '<div class="donor">' + donorname + donorcount + foot + '</div>';
                }
                else {
                  notes  = notes + '<div class="note">' + donorname + '</div>';
                }

            }
        })
        var link = '<p><a href="' + spreadSheetLink + '" target="_blank">(Edit/View spreadsheet data)</a></p>';
        $(selectorID).addClass('donorWall');
        $(selectorID).append(footone).append(notes).append(data).append(link);
    })
}

/* ----------------------------------------------------------- */
/* Build a tabbed list of calendars from spreadsheet           */
/*    05/18/2021 - initial                                     */
/*    Updated to use fetch promise 02/16/22                    */
/*    Updated parameter list + other things 02/23/22           */
/* ----------------------------------------------------------- */

function build_calendars(
    theSelector = "#calendarDiv",
    active = 0,
    single = false,
    collapsable = true,
    collapsed = false) {

  // Point to calendars spreadsheet
  file_id = '1i5EjZCpxI4UnvXyMYXCLyLP9tSCNt0PZYemaU6f6XtU';
  sheet = 'Calendars';

  // Make sure null parameters are handled
  active = (active == null) ? 1 : active;
  single = (single == null) ? true : single;
  collapsable = (collapsable == null) ? true : collapsable;
  collapsed = (collapsed == null) ? false : collapsed;

  // check url paramaters to see if we need to
  // default to a particular calendar
  var tabparam = getSearchParams("tab");
    if (tabparam) {
      active = tabparam;
    }

  var where = "SELECT B, C, E, F, G WHERE D != 'Yes' AND B IS NOT NULL ORDER BY A, B";
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=&sheet=' + sheet +
    '&headers=1&tq=' + escape(where);

  // Fetch the spreadsheet data
  fetchGoogleDataAll([url]).then((dataArrayx) => {
    if (dataArrayx[1]) {  // if there was a status error of some kind
      jQuery('#classList .gallery-items')
        .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
      return;
    }
    dataArray = dataArrayx[0][0].table.rows;

    // Clean up the Google array data
    dataRows = [];
    dataArray.forEach(function(item,key) {
      if (item.c[0] != null) {
        var ar = [];
        for (i = 0; i < 5; i++) {
          var val =  (item.c[i] != null) ? item.c[i].v : '';
          ar.push(val);
        }
        dataRows.push(ar);
      }
    });

    var temp = '';
    if (collapsable == true) {
    temp = `
      <div class="toggle">
        <div class="openCloseList">
        <i class="arrow down"></i>
          <a href="">View Calendars</a>
        </div>
      </div>`;
    }
    temp = temp + `<div class="theCalendarContainer"></div>`;
    $(theSelector).html(temp);

    var tab = 1;
    var tabs = '';
    var tabsdata = '';
    var iframes = [];
    dataRows.forEach(function(item, key) {
      var museum = item[0];
      var name = item[1];
      var title = item[2];
      var large = item[3];
      var small = large.replace(/mode=MONTH/gi,'mode=AGENDA');
      var after = item[4];
      var colorClass = "color" + museum.charAt(0).toUpperCase() + museum.slice(1);
      var ar = [large,small];
      iframes.push(ar);
      if ((tab - 1) != active) {
        large = '';
        small = '';
      }

      var hideme = '';
      if (single == true && key != active) {
        hideme = 'hide';
      }

      tabs = tabs +
        '<li class="' + hideme + '"><a href="#tabs-' + tab + '" data-tab="' + tab + '" class="' + colorClass + '">' +
        name + '</a></li>\n';
        tabsdata = tabsdata +
        '<div id="tabs-' + tab + '">\n' +
        '<p><strong>' + title + '</strong>\n' +
        '<div class="calendarLarge">' + large + '</div>\n' +
        '<div class="calendarSmall">' + small + '</div>\n' +
        '</p>' +
        after +
        '</div>\n';
      tab = tab + 1;
    })
    tabs = '<div id="tabs"><ul>' + tabs + '</ul></div>\n';
    $(tabs).appendTo(theSelector + ' .theCalendarContainer');
    $(tabsdata).appendTo('#tabs');

    $(theSelector + ' .toggle div.openCloseList a')
          .click(function(e) {
          e.preventDefault();
          //$(this).toggleClass("open");
          $(theSelector + ' .theCalendarContainer')
          .slideToggle('slow');
          $(theSelector + ' .openCloseList i').toggleClass("down");
        });

    $(theSelector).addClass('faq_container tabListContainer');
    $( "#tabs" ).tabs({ active: active});
    if (single == true) {
      $(theSelector).find('li.hide').hide();
      $(theSelector + ' .theCalendarContainer').find('.ui-tabs-nav').hide();
    }
    if (collapsable == true && collapsed == true) {
      $(theSelector + ' .theCalendarContainer').hide();
      $(theSelector + ' .openCloseList i').removeClass("down");
    }
    $(theSelector + ' .theCalendarContainer iframe').width('100%');
    $('#tabs a').click(function() {
      var id = $(this).attr("href");
      var tab = id.substr(6) - 1;
      var x = $(id).find('.calendarLarge iframe').length;
      if (!x) {  // if no iframe found, then fill it in
        $(id).find('.calendarLarge').html(iframes[tab][0]);
        $(id).find('.calendarSmall').html(iframes[tab][1]);
        $(theSelector + ' .theCalendarContainer iframe').width('100%');
      }
    })
  }) // End of promis
}

/* ---------------------------------------------------------- */
/* filterSelections - Main entery                             */
/*    03/04/2022                                              */
/* ---------------------------------------------------------- */

/*
parameter 1 (selector): ie. '#filtercontainer'
parameter 2 (groups): group<:[radio|checkbox]><:[label]>
parameter 3 Flag indicating if we are using Lazy Summaries
*/

function filterSelections(
    selectorID,
    groups = 'locations, groups',
    lazy = false) {

    if (!lazy) {
        showFilterSelections(groups, selectorID);
    }
    else {
        window.customLazySummaries = {
            general: { //runs for all summary blocks
                allItemsAddedFunction: function(sum_block, jsonData) {
                    showFilterSelections(groups,selectorID);
                }
            }
        };
    }
}

/* ---------------------------------------------------------- */
/* Get the category groups and items from the spreadsheet     */
/* then build radio and/or checkboxes based on requested      */
/* groups                                                     */
/* ---------------------------------------------------------- */

function showFilterSelections(

groups='locations, groups', selector="#filterContainer",
file_id='1qrUPQu2qs8eOOi-yZwvzOuGseDFjkvj5_mSnoz0tJVc',
sheet='Categories') {

    var where = "SELECT A,B,C,D,E WHERE E != 'Yes' AND A IS NOT NULL ORDER BY A,B";
    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=' + sheet +
    '&headers=1&tq=' + escape(where);

    // hide the squarespace summary block, we are going to
    // build an entirly new flexbox list
    $(selector).parent().parent().next().find('div.summary-item-list')
      .css('display','none !important');

    // Fetch the spreadsheet data
    fetchGoogleDataAll([url]).then((dataArrayx) => {
        if (dataArrayx[1]) {
            // if there was a status error of some kind
            jQuery('#classList .gallery-items')
            .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
            return;
        }
        var cats = dataArrayx[0][0].table.rows;
        // This is for a quick check for abbreviated category names.
        // facilitates swapping out the abbreviation with the full name
        var catsAbbrev = [];
        var catsFull = [];
        cats.forEach(function(item, key) {
            var abbrev = item.c[2].v;
            var full = item.c[3].v;
            if (abbrev.toLowerCase() != full.toLowerCase()) {
                catsAbbrev.push(abbrev.toLowerCase());
                catsFull.push(full);
            }
        })
        allgroups = groups.split(',');

        // Get a list of the found categories and nested list of
        // the div index's that the categorie are found on
        // Needed later for AND/OR filtering
        var catsel = $(selector).parent().parent().next().css('display','none');
        $(catsel).find('div.summary-item').each(function(index, value) {
            $(this).find(catloc).filter(function(index2) {
                var t = this.href.indexOf('?category=');
                //var catref = this.href.toLowerCase().replaceAll(' ','+').replaceAll('%20','+');
                var cat = this.href.substr(t + 10).toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
                //var cat = catref.substr(t+10);
                //this.attr("href", catref);
                var x = catsAbbrev.indexOf(cat);
                if (x != -1) {
                    // Abbreviation found, swap it out with full name
                    $(this).prop("href", href.substr(0, t + 10) + catsFull[x]);
                    $(this).text(catsFull[x]);
                }
                var i = mycats.indexOf(cat);
                if (i == -1) {
                    mycats.push(cat);
                    mycatsids.push([index]);
                }
                else {
                    if (mycatsids[i].indexOf(index) == -1) {
                        mycatsids[i].push(index);
                    }
                }
            })
        });

        /* At this point we have several arrays

            cats = Raw data from categories spreadsheet

            mycats = A list of categories found in blog items which match categories
            from the spreadsheet. ie. ["3rd","4th","5th", ...]

            mycatsids = Nested array for each of "mycats" provides a list of blog items
            where that category is listed [0,[0,1,2],[1,[4,5,6]], ...
            says that category 0 ("3rd") was found in blog items 0,1 and 2

            catsAbbrev = Array of category abbreviations found in the spreadsheet.

            catsFull = Array of matching full name for each abbreviation found in catsAbbrev

        */

        var testout = '';
        var allcats = $(catsel).find('div.summary-item').css('display', 'block');
        allcats.each(function(index, value) {

            var title = $(value).find('.summary-title-link').text();
            var href = $(value).find('.summary-title-link').attr('href');
            var excerpt = $(value).find('.summary-excerpt p').text();
            var img = $(value).find('.summary-thumbnail-outer-container img').data('src');
            var spancat = $(value).find('div.summary-metadata-container').html();
            img = (!img) ? 'https://via.placeholder.com/300x200?text=Coming%20Soon' : img;

            testout +=
            `<div class="itemFilter">
                  <div class="itemFilterImage">
                      <a href="${href}">
                      <img src="${img}">
                      </a>
                  </div>
                  <div class="itemFilterContent">
                      <a href="${href}">
                          ${title}</a>
                          <p class="message">${excerpt}</p>

                      <a href="${href}" class="summary-read-more-link">
                          Read More →
                      </a>
                      <div class="itemFilterCats">
                          <!-- Categories -->
                          <span class="theCats">
                              ${spancat}
                          </span>

                      </div>
                  </div>
              </div>`;
        })

        $('<div id="newSummaryItems"><div class="summaryFilterContainer">' +
            testout + '</div></div>').insertAfter(selector);


        /* Here we are building the actual html checkbox/radio buttons based
        on the requested groups in the call.  I.e. "locations, grades".
        */

        var out = '<div class="flexBox">\n';
        for (i = 0; i < allgroups.length; i++) {
            var group = allgroups[i].trim().toLowerCase();
            var labels = allgroups[i].split(':');
            var type = 'checkbox'; // default
            var temp = group.split(':');
            var validtypes = ['radio', 'checkbox'];
            if (temp.length > 1) {
                group = temp[0];
                if (validtypes.indexOf(temp[1]) > -1) {
                    type = temp[1];
                }
            }
            var defaultvalue = '';
            if (temp.length > 2) {
                defaultvalue = temp[2].toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
            }
            group = group.toLowerCase();
            groupparts = group.split('/');
            group = groupparts[0];
            grouplabel = (groupparts[1]) ? groupparts[1] : group;

            var prettyname = grouplabel.charAt(0).toUpperCase() + grouplabel.slice(1);
            if (labels.length > 2 && typeof (labels[2]) != 'undefined') {
                prettyname = labels[2];
            }
            out = out + '<div class="filterGroup">\n';
            out = out + '<span>' + prettyname + '</span><table class="outer">\n';
            var colorClass = "group" + group.charAt(0).toUpperCase() + group.slice(1);
            var numcols = 1;
            if (group == 'grades') {
                numcols = 2;
            }
            numcols = (groupparts[2]) ? groupparts[2] : numcols;
            var curcol = 0;
            var tr = '<tr>';
            if (type == 'radio') {
                if (defaultvalue == '') {
                    checked = ' checked ';
                }
                out = out + tr + '<td><input type="' + type + '" value="" name="' + group + '"' + checked + '><span>Any</span></td>\n';
                curcol = curcol + 1;
            }
            for (n = 0; n < cats.length; n++) {
                if (cats[n] && cats[n].c[0].v.toLowerCase() == group) {
                    var item = cats[n];
                    var lookup = item.c[2].v.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
                    // Only show category if it appears in at least one blog entry
                    if (mycats.indexOf(lookup) !== -1) {
                        curcol = curcol + 1;

                        if (parseInt(curcol) > parseInt(1) && parseInt(curcol) <= parseInt(numcols)) {
                            tr = '';

                        }
                        else {
                            tr = '<tr>';
                            curcol = 1;
                        }
                        if (curcol > numcols) {
                            curcol = 1;
                        }
                        //var item = cats[n];
                        var checked = '';
                        var lookup = item.c[2].v.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
                        if (defaultvalue == lookup) {
                            checked = ' checked ';
                        }

                        out = out + tr + '<td><input type="' + type + '" value="' + lookup + '" name="' + group + '"' + checked + '><span>' + item.c[3].v + '</span></td>\n';
                    }
                }
            }
            out = out + '</table></div>\n';
        }
        var out = out + '</div>\n';
        $(selector).html(out);
        filter_showvals(selector);
        filter_values(selector);
        $(selector).parent().parent().next().find('div.summary-item').remove();

        $('#newSummaryItems').css('display','block');
        return;
    });
}

function createFilteredGallery(
    selectorID,
    json,
    attr) {

    var groups = ('groups' in attr) ? attr['groups'] : 'grades,outreach';
    var findCats = ('findcats' in attr) ? attr['findcats'] : '';
    var showCats = ('showcats' in attr) ? attr['showcats'] : false;
    var showDots = ('dots' in attr) ? attr['dots'] : false;

    var file_id='1qrUPQu2qs8eOOi-yZwvzOuGseDFjkvj5_mSnoz0tJVc';
    var where = "SELECT A,B,C,D,E WHERE E != 'Yes' AND A IS NOT NULL ORDER BY A,B";
    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=Categories' +
    '&headers=1&tq=' + escape(where);

    var url2 = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=groups' +
    '&headers=1&tq=';

    // hide the squarespace summary block, we are going to
    // build an entirly new flexbox list
    $(selectorID).parent().parent().next().find('div.summary-item-list')
      .css('display','none !important');

    // Fetch the spreadsheet data
    fetchGoogleDataAll([url,url2]).then((dataArrayx) => {
        if (dataArrayx[1]) {
            // if there was a status error of some kind
            jQuery('#classList .gallery-items')
            .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
            return;
        }
        var cats = cleanUpArray(dataArrayx[0][0].table.rows,4);
        var info = cleanUpArray(dataArrayx[0][1].table.rows,3);
        allgroups = groups.split(',');
        var dataArray = formatGalleryItems(selectorID, json);
        var counter = '<div id="filterItemCount"></div>';
        $('<div id="filterContainer"></div>' + counter).prependTo(selectorID);

        makeFilterBoxes('#filterContainer',groups, cats, info, dataArray[0], dataArray[1]);

        filterGalleryShowvals(selectorID, dataArray[0], dataArray[1]);
        // Process selection when a radio or checkbox is changes
        $('#filterContainer input[type=checkbox], ' +
          '#filterContainer input[type=radio]')
          .on('change', function(e) {
            filterGalleryShowvals(selectorID, dataArray[0], dataArray[1]);
        })
     })
  }

/*-------------------------------------------------------------*/
/* Frequently Asked Questions, FAQS2                           */
/*    04/11/2021 - initial                                     */
/*    Updated 02/22/2022                                       */
/*-------------------------------------------------------------*/

function do_faqs2(theSelector, active = 1,
  single = false, openfirst = true,
  collapsable = false, collapsed = true,
  title = "View Frequently Asked Questions") {

    var listCol = 0;
    var catCol = 1;
    var questionCol = 3;
    var answerCol = 4;
    var tabLinks = '';
    var out = '';
    var activeli = 0;
    var tabs = [];
    active = (active == null) ? 1 : active;
    single = (single == null) ? 1 : single;
    collapsable = (collapsable == null) ? 1 : collapsable;
    collapsed = (collapsed == null) ? 1 : collapsed;
    // Check to see if a parameter was passed to
    // specify which tab becomes active
    var tabparam = getSearchParams("tab");
    if (tabparam) {
      active = tabparam;
    }
    // point to the FAQ's spreadsheet
    file_id = '1f3G-ECzjt8p-czZNPyUQGXG8NND016Nue5QypQTf6PQ';
    var sheet = 'FAQS';

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?sheet=' + sheet + '&tqx=out:json&headers=1&tq=' +
    escape("SELECT A, B, C, D, E WHERE C != 'Yes'");
    var spreadSheetLink = 'https://docs.google.com/spreadsheets/d/' + file_id + '/edit';

    // Set up the collapsed/expanded option
    // valid values 0-4 or "none"
    if (openfirst != true) {
        activeli = 'none';
    }

    if ($(window).width() < 960) {
      activeli = 'none';
    }
    var activeTab = active - 1;  // zero based tabs

    fetchGoogleDataAll([url]).then((dataArrayx) => {
      if (dataArrayx[1]) {  // if there was a status error of some kind
        jQuery('#classList .gallery-items')
          .html('<div class="errorMessage">Error fetching spreadsheet, status= ' + dataArrayx[1] + ' try refreshing page</div>');
        return;
      }
      dataArray = dataArrayx[0][0].table.rows;

      dataRows = [];
      dataArray.forEach(function(item,key) {
        if (item.c[0] != null) {
          var ar = [];
          for (i = 0; i < 5; i++) {
            var val =  (item.c[i] != null) ? item.c[i].v : '';
            ar.push(val);
          }
          dataRows.push(ar);
        }
      });

      faqs = dataRows;

      // Loop for each tab
      theMuseumList.forEach(function(item, key) {
          if (key) {  // ignore zero (all) for faqs
            // camelcase css tag for background
            var background = 'color' + item[0].charAt(0).toUpperCase() +
              item[0].slice(1).toLowerCase();
            val = item[1];
            var tabnum = +(key+1);
            var hideme = '';
            if (single == true && key != active) {
              hideme = ' hide';
            }
            tabLinks = tabLinks + '<li class="' + background + hideme + '"><a href="#tabs-' +
              tabnum + '">' + val + '</a></li>\n';
            var lookfor = item[0].toLowerCase();


            // Loop for the questions/answers in each tab
            out = out + '<div id="tabs-' + tabnum + '">\n<div class="accordian">\n';
            faqs.forEach(function(item2, key2) {
              if (item2[listCol] != null && item2[listCol].toLowerCase() == lookfor) {
                out = out + '<h3 class="' + background + '">' + item2[questionCol] + '</h3><div>\n';
                out = out + '<p>' + item2[answerCol] + '</p></div>\n';
              }
            });


            out = out + '</div>\n</div>\n';
          }

        });

        var toggle = "<div class=\"toggle\">" +
          "<div class=\"openCloseList\"><i class=\"arrow down\"></i><a href=\"\">" + title + "</a></div>\n";
        out = '<div id="tabs"><ul>' + tabLinks + '</ul>' + out + '</div></div>\n';

        $(theSelector + ' div#tabs').show();
        if (collapsable == true) { // hide if collapsable and collapsed
          out = toggle + out + '</div>';
          $(out).appendTo(theSelector);
          if (collapsed == true) {
            $(theSelector + ' div#tabs').hide();
          }
        }
        else {
          $(out).appendTo(theSelector);
        }

        $(theSelector).find('li.hide').hide();

        $(theSelector + ' .toggle div.openCloseList a')
          .click(function(e) {
          e.preventDefault();
          $(this).toggleClass("open");
          $(theSelector + ' div#tabs')
          .slideToggle('slow');
          $(theSelector + ' .openCloseList i').toggleClass("down");
        });

        // Initialize the accordian styles
        $( ".accordian" ).accordion({
          collapsible: true, active : activeli,
          heightStyle: "content"
        });

        // Display the faqs
        $(theSelector).addClass('faq_container tabListContainer');
        $( "#tabs" ).tabs({active: activeTab});
    })

}

/* ----------------------------------------------------------- */
/* Fetch one or more URL's from Google                         */
/*    02/16/2022 - initial                                     */
/* ----------------------------------------------------------- */

async function fetchGoogleDataAll(urls) {
  var promises = [];
  //urls[1] = 'xx'; // to test errors
  var status = "";
  urls.map((x) => promises.push(
    fetch(x)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response;
        } else {
          status = response.statusText;
        }
      })
      .catch((error) => {
        status = error;
      })
  ));
  const promisResponse = await Promise.all(promises);
  var i = 0;
  var data3 = [];
  if (!status) {
    for (i = 0; i < promisResponse.length; i++) {
      var temp = await promisResponse[i].text();
      data3.push(JSON.parse(temp.substr(47).slice(0, -2)));
    }
  }
  return [data3,status];
}
