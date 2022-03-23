/*-------------------------------------------------------------*/
/* Initialize the standard list of museums                     */
/*    02/21/2022 - initial                                     */
/*-------------------------------------------------------------*/

var theMuseumList = [
  ['unity','Unity in Learning'],
  ['aahom','Ann Arbor Hands-On Museum'],
  ['leslie','Leslie Science & Nature Center'],
  ['yankee','Yankee Air Museum'],
  ['challenger','Challenger Learning Center at SC4'],
  ['experience','Experience Center']
];

var theMuseumKeys = [
  'unity',
  'aahom',
  'leslie',
  'yankee',
  'challenger',
  'experience'
];

/* ----------------------------------------------------------- */
/* Do some basic setup on page load                            */
/* ----------------------------------------------------------- */  

$(document).ready(function() {
  // Insert return to previous page on all blog item displays
  var temp = `<div class="returnPrev">
    <A HREF="javascript:javascript:history.go(-1)"> 
    Back to previous page</A></div>`;
  $(temp).insertBefore('div.blog-item-wrapper');
  $(temp).insertAfter('div.blog-item-wrapper');
})

/* ----------------------------------------------------------- */
/* Search URL Parameters                                       */
/*    02/16/2022 - initial                                     */
/* ----------------------------------------------------------- */  

/* https://stackoverflow.com/questions/19491336/how-to-get-url-parameter-using-jquery-or-plain-javascript */
function getSearchParams(k){
 var p={};
 location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
 return k?p[k]:p;
}

/* ----------------------------------------------------------- */
/* Fetch one or more URL's from Google                         */
/*    02/16/2022 - initial                                     */
/* ----------------------------------------------------------- */  

async function fetchGoogleDataAll(urls) {
  let promises = [];
  //urls[1] = 'xx'; // to test errors
  var status = ''; 
  urls.map(x => promises.push(
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
  var data3 = []; 
  if (!status) {
    for (let i = 0; i < promisResponse.length; i++){
      var temp = await promisResponse[i].text();
      data3.push(JSON.parse(temp.substr(47).slice(0, -2)));
    }
  }
  return [data3,status];
}

/* ----------------------------------------------------------- */
/* Slideshow gallery                                           */
/* ----------------------------------------------------------- */

function doGalleryShow() {

    // get some selectors and data 
    var background = $('#page article:first-child section:first-child div.section-background');
    var gallery = $('#page  article:first-child section.gallery-section').first().find('figure.gallery-grid-item');
    
    // If no gallery found so abort
    if (gallery.length == 0) {
        return false;
    } 

    // Hide the initial template, not needed.
    background.find('img').css('display','none');

    // https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
    // See if we are editing the SquareSpace page, if so hide the gallery section
    var isEditor = window.frameElement ? true : false;
    if (isEditor == false) {
       gallery.closest('section').css('display', 'none'); 
    }

    // Loop through each figure and add to the list of slides 
    gallery.each(function() {

        var imgtemp = $(this).find('img');
        var imgcap = $(this).find('figcaption p.gallery-caption-content').text();
        var caplink = $(this).find('a').first().attr('href');
        if (caplink && imgcap) {
            imgcap = '<a href="' + caplink + '">' + imgcap + '</a>';
        }
        if (imgcap) { imgcap = '<div class="slideCaption">' + imgcap + '</div>';}
        var imgpos = imgtemp.attr('data-image-focal-point');

        imgpos = imgpos.split(",");
        var temp = "";
        for (var i = 0; i < imgpos.length; i++) {
            imgpos[i] = imgpos[i] * 100;
            temp = temp + " " + imgpos[i] + "%";
        }
        imgpos = temp.trim();
        var style = ' style="object-position:' + imgpos + ';';
        temp = '<div class="mySlides"><img src="' + imgtemp.attr('data-src') + '"' + style + '">' +
        imgcap + '</div>';
        background.append(temp);
    });

    // start the slideshow
    
    galleryCarousel();
}
  
  var myGalIndex = 0;
  function galleryCarousel() {
    var i;
    var background = $('#page article:first-child section:first-child div.section-background');
    var x = background.find('.mySlides');
    if (myGalIndex >= x.length) {
      myGalIndex = 0
    }
    x.removeClass("opaque");
    background.find('div.mySlides').eq(myGalIndex).addClass("opaque");
    myGalIndex++;
    setTimeout(galleryCarousel, 8000);
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

/*-------------------------------------------------------------*/
/* Icon Bar - new version.                                     */
/*    03/14/2022 - initial                                     */
/*-------------------------------------------------------------*/

function addIconBar(where = 'header') {
  where = where.toUpperCase(); 
  var temp = '<ul class="iconBarFlex">';
  icons.forEach(function(item,key) {
    temp += '<li class="flex-item ' + 'logo' + iconsFor[key] + '"><img src="' + item + '"></li>\n';
  })
  temp += '</ul>\n';

  if (where == 'HEADER') { // stick to header
    var s = $('article:first-of-type section:first-of-type div.content-wrapper div.content');
    var h = s.height();
    h = parseInt(h) + 100; 
    s.height(h + 'px'); 
    temp = '<div id="iconBar" class="sticky">' + temp + '</div>';
    $(temp).appendTo('#page article:first-of-type section:first-of-type div.section-background');
        $('div.mySlides div.slideCaption').css('bottom','100px');
  } 
  else if (where == 'FOOTER') { // stick to footer
    temp = '<div id="iconBarFoot">' + temp + '</div>';
    $(temp).prependTo('footer:first-of-type');
  }
  else {
    // do nothing. 
  }
}

/* ----------------------------------------------------------- */
/* Flipbox - Home page flip boxes                              */
/*    04/10/2021 - initial                                     */
/*    Updated 03/02/2022                                       */
/* ----------------------------------------------------------- */

var columnIndex = 1; 

function flipCardResize(selectorID) {
  var fontsize = parseInt($(selectorID + ' .backContent div').css('font-size'));
  var height = parseInt($(selectorID + ' .backContent').css('height'));
  var lineheight = fontsize * 1.2;
  var lines = parseInt(height / lineheight);
  //alert(fontsize + ' ' + height + ' ' + lineheight + ' ' + lines); 
  $(selectorID + ' .backContent div').css("-webkit-line-clamp", lines.toString());
  $(selectorID + ' .backContent div').css("line-height", lineheight + 'px');
}

function flip_carousel(selectorID) {
  var i;
  var numColumns = $('.newColumn').length;
  if (columnIndex > numColumns) { columnIndex = 1;}
  var background = $('.newColumn:nth-child(' + +columnIndex + ') .flip-card-front');
  columnIndex++;
  var t = background.find('img.active').index();
  myIndex =  t + 1;
  var x = background.find('img');
  if (myIndex >= x.length) {
    myIndex = 0
  }
  x.removeClass("active");
  background.find('img').eq(myIndex).addClass("active");
  myIndex++;
  setTimeout(function() {flip_carousel(selectorID)}, 5000);
}

function process_card_info(selectorID, link,images, caption, label, message) {
    var str = `<div class=newColumn>
       <div class="f1_container flip-card">
        <div class="f1_card flip-card-inner" class="shadow">
         <div class="front face flip-card-front">`;
    images.forEach(function(img, key) {
      str = str + `<img src="${img}"/>`;
    })
    str = str + `<div class="labelText">${caption}</div>
         </div>
         <div class="back face center flip-card-back">
          <a href="${link}">
            <div class=centerBack>
              <div class="topBox">
                 <div class="labelText">${caption}</div>
              </div>
              <div class="backContent">\n<div>${message}
              </div></div>
              <div class="backLink"><span>Learn More</span></div>
            </div>
         </a>
         </div>
       </div>
      </div>`;
   
  $(selectorID + ' .flex-container').append(str);
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

  fetchGoogleDataAll([url]).then(dataArrayx => {
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
      for (var i = 8; i < 15; i++) {
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
    fetchGoogleDataAll([url]).then(dataArrayx => {
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

    fetchGoogleDataAll([url]).then(dataArrayx => {
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
          for (let i = 0; i < 5; i++) {
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
/* Open modal window for calassmate details                    */
/* ----------------------------------------------------------- */

function addMyModal() {
    var myModalID = jQuery('#myModal');
    var myModal = `<!-- The Modal -->
<div id="myModal" class="sqs-block-content modal">
</div>`

    ;
    if (myModalID.length == 0) {
        jQuery('html').append(myModal);
        
    }
}

/* ----------------------------------------------------------- */
/* Team Boxes                                                  */
/*    04/11/2021 - initial                                     */
/* ----------------------------------------------------------- */ 

function teamCardResize() {

  //if ($('.team_container').is(':hidden') == true) { return;};
  var fontsize = parseInt($('.item_bio').css('font-size'));
  var height = parseInt($('div.team_container div.item_box div.item_back').css('height'));
  var padding = parseInt($('div.team_container div.item_box div.item_back div.item_bio').css('padding-top'));
  height = height - (padding * 2); // allow for padding top and bottom
  var lineheight = fontsize * 1.2;
  var lines = parseInt(height / lineheight);
  //alert(padding + " " + fontsize + ' ' + height + ' ' + lineheight + ' ' + lines); 
  $('div.team_container div.item_box div.item_bio').css("-webkit-line-clamp", lines.toString());
  $('div.team_container div.item_box div.item_bio').data("lines", lines.toString());
  $('div.team_container div.item_box').css("line-height", lineheight + 'px');

  var teams = $('.team_container .item_back');
  teams.each(function(index) {
    temp = $(this).find('.item_bio');
    $(this).find('.readMoreDetails').hide(); 
    var dataLines = temp.data("lines");
    var client = temp.prop('clientHeight');
    var beforeh = parseInt(temp.height());
    var lineh = parseInt(temp.css('line-height'));
    var lines = dataLines;
    temp.css('-webkit-box-orient','unset');
    temp.css('-webkit-line-clamp','unset');
    temp.css('overflow','unset');
    var afterh = parseInt(temp.height());
    //console.log('beforeh=' + beforeh + ' afterh=' + afterh);
    if (afterh > beforeh) {
        //console.log('client=' + client + ' datalines=' + dataLines + ' before=' + beforeh + ' after=' + afterh + ' lines=' + lines);
        lines = lines - 2; 
        $(this).find('.readMoreDetails').show(); 
    }
    temp.css('-webkit-line-clamp',lines.toString());
    temp.css('-webkit-box-orient','vertical');  
    temp.css('overflow','hidden');
         
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

    fetchGoogleDataAll([url]).then(dataArray => {
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

/* ------------------------------------------------------------------- */
/* Donor Wall                                                          */
/*   Updated 02/26/22                                                  */
/* ------------------------------------------------------------------- */

//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
var formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: 'currency',
  currency: 'USD',
});

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

    fetchGoogleDataAll([url]).then(dataArrayx => {
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
              for (let i = 0; i < 5; i++) {
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

/* ------------------------------------------------------------------- */
/* slick.js carousel                                                   */
/* ------------------------------------------------------------------- */

/* Resize carousel images with screen size to keep aspect ratio right */


function adjustSlickImageHeight() {
  var aspect_ratio_box2 = 0.6
  var box2 = jQuery("div.slick-list div.slick-track div.item img");
  var w = box2.width();
  var h = w * aspect_ratio_box2;
  var topval = (h / 2) - 25;
  jQuery('button.slick-arrow').css('top',topval + 'px');
  box2.height(h);
}

jQuery(window).resize(function() {
  adjustSlickImageHeight(); 
});

/* ------------------------------------------------------------------- */
/* slick.js carousel                                                   */
/*    Build a slick carousel based on an existing summary block        */
/*    Copy all items to slick structure and remove the original block  */
/* ------------------------------------------------------------------- */

function createCarousel (id, container = 0) {

    var x = $(id).closest('section').find('div.summary-item-list-container').eq(container);

    var temp = '<div class="slickButtons">\n' +
        '<button class="prev slick-arrow"> < </button>\n' +
        '<button class="next slick-arrow"> > </button>\n' +
        '</div>\n' +
        '<div class="theCarousel"></div>\n';
    $(temp).appendTo(id); 

    var theCarousel = $(id).find('.theCarousel');

    $(x).find('.summary-item').each(function(index) {
        var src = $(this).find('.summary-thumbnail img').data('src');
        var title = $(this).find('.summary-title a').text();
        var titlehref = $(this).find('.summary-title a').attr('href');
        var excerpt = $(this).find('.summary-excerpt').text();
        var read = $(this).find('.summary-read-more-link').text();
        var readhref = $(this).find('.summary-read-more-link').attr('href');
        var temp = '<div class="item">\n' + 
        '<img src="' + src + '">\n' +
        '<div class="title"><a href="' + titlehref + '">' + title + '</a></div>\n' +
        '<div class="classcontent">' + excerpt + '</div>\n' + 
        '<div class="readmore"><a href="' + readhref + '">' + read + '</a></div>\n' +
        '</div>';
        $(temp).appendTo(theCarousel);
        $(x).remove();
    })
   
    $(theCarousel).slick({
        dots: true,
        adaptiveHeight: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
      prevArrow: $(id + ' .prev'),
    nextArrow: $(id + ' .next'),
        
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
    var w = $(theCarousel).find('div.item img').eq(0).width();
    //$(theCarousel).find('div.item img').css('height','150px');

    adjustSlickImageHeight(); 

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
  file_id = '1i5EjZCpxI4UnvXyMYXCLyLP9tSCNt0PZYemaU6f6XtU', 
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
  fetchGoogleDataAll([url]).then(dataArrayx => {
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
        for (let i = 0; i < 5; i++) {
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

/* ----------------------------------------------------------- */
/* Sub Menu Bar                                                */
/*    05/18/2021 - initial                                     */
/* ----------------------------------------------------------- */

function subMenuBar(selectorID = '#subMenu', act = '') {

  var menu = 
  '<div class="subMenuBar">\n' +
  '<nav>\n' +
  '   <a href="#" class="headerName">For Families and Indiviuals</a>\n' +
  '   <a name="adventure" href="choose-your-adventure">Choose Adventure</a>\n' +
  '   <a name="birthdays" href="/birthday-parties">Birthdays Parties</a>\n' +
  '   <a name="camp" href="/camps">Pick your Camp</a>\n' +
  '</nav>\n' +
  '<nav>\n' +
  '   <a href="#" class="headerName">For Schools and Organizations</a>\n' +
  '   <a name="outreach" href="/outreach">Outreach</a>\n' +
  '   <a name="field" href="/field-trips">Field Trips</a>\n' +
  '   <a name="distance" href="/distance-learning">Distance Learning</a>\n' +
  '</nav>\n' +
'</div>\n';

  act = act.toLowerCase();
  // add the menu code
  $(menu).appendTo(selectorID);
  // Set the appropriate active 
  $(selectorID).find('.subMenuBar a[name="' + act + '"]').addClass('active');
  var temp = '<div class="learnMenuButton">' +
    '<div class="toggle">' +
    '<a href=""></i>- More Opportunities -</a></div></div>';
  $(temp).insertBefore(selectorID);
  $('.learnMenuButton .toggle a').click(function(e) {
    e.preventDefault(); 
    $(selectorID).toggleClass("open")
  })
return menu; 
}


/*-------------------------------------------------------------*/
/* Add filter radio/checkboxes                                 */
/*    07/03/2021 - initial                                     */
/*-------------------------------------------------------------*/

/*  This is the selector that we will use to find all of 
    the category items
    within the current SquareSpace page section. 
*/
var catloc =  'div.summary-content ' + 
    'div.summary-metadata-container ' + 
    'div.summary-metadata ' + 
    'span.summary-metadata-item--cats a';

var mygroups = [];   // Groups 
var mygroupids = []; // Nested array of blog item index ids
var mycats = [];     // List of found categories 
var mycatsids = [];  // Nested array list of found items by category

function filter_values (selector = '#filterContainer') {

    // Find all of the categories in this section 
    var catsel = $(selector).parent().parent().next().find(catloc);
    $(selector).closest('section').addClass('filterValuesSection');

    // tag them all
    $(catsel).addClass('filterCat');

    // initialize based on current checkboxes
    filter_showvals();

    // Process selection when a radio or checkbox is changes 
    $(selector + ' input[type=checkbox], ' +
      selector + ' input[type=radio]')
      .on('change', function(e) {
        filter_showvals(selector);
    })
}

/* here we find the intersection of two arrays */
function intersection(first, second)
{
    first = new Set(first);
    second = new Set(second);
    return [...first].filter(item => second.has(item));
}

function filter_showvals(selector='#filterContainer') {

    // get an array of checked items
    var ids = [];
    var xidsx = [];
    mygroups = [];
    mygroupids = [];
    selectedcats = [];
    $(selector + ' input[type=checkbox]:checked, ' +
    selector + ' input[type=radio]:checked')
    .each(function() {
        if (this.value) {
            ids.push(this.value);
            var group = $(this).attr('name');
            var cat = this.value;
            cat = cat.replace("&", "%26");
            selectedcats.push(cat);
            i = mycats.indexOf(cat);
            if (i != -1) {
                var x = mygroups.indexOf(group);
                if (x == -1) {
                    mygroups.push(group);
                    mygroupids.push(mycatsids[i]);
                }
                else {
                    var newids = mygroupids[x].concat(mycatsids[i]);
                    mygroupids[x] = newids;
                }
            }
            else {
                var x = mygroups.indexOf(group);
                if (x == -1) {
                    mygroups.push(group);
                    mygroupids.push([999]);
                }
                else {
                    var newids = mygroupids[x].concat([999]);
                    mygroupids[x] = newids;
                }
            }
        }

    });

//    var catsel = $(selector).parent().parent().next();
//    var allcats = $(catsel).find('div.summary-item').css('display', 'block');

    // default is to turn them all on initially
    var catsel2 = $("#newSummaryItems div.itemFilter");
    var allcats2 = $(catsel2).css('display','block');

 
    var common = [];
    if (mygroups.length > 0) {
//        $(allcats).css('display', 'none')
        $(allcats2).css('display','none');
        common = mygroupids[0];
        for (n = 1; n < mygroups.length; n++) {
            common = intersection(common, mygroupids[n]);
        }
    }
    for (n = 0; n < common.length; n++) {
//        $(allcats).eq(common[n]).css('display', 'block');
        $(allcats2).eq(common[n]).css('display','block');
    }
/*
    var catsel = $(selector).parent().parent().next();
    $(catsel).find('a.active').removeClass('active');
    $(catsel).find('div.summary-item').each(function(index, value) {
        $(this).find(catloc).filter(function(index2) {
            var t = this.href.indexOf('?category=');
            var code = this.href.substr(t + 10).toLowerCase().replaceAll('%20', '+');
            if (selectedcats.indexOf(code) != -1) {
                $(this).addClass('active');
            }

        })

    });
*/

    var catsel2 = $("#newSummaryItems div.itemFilter");
    $(catsel2).find('a.active').removeClass('active');
    var catloc2 = $(catsel2).find('div.itemFilterContent a');
    $(catloc2).each(function(index, value) {
        var t = value.href.indexOf('?category=');
        var code = value.href.substr(t + 10).toLowerCase().replaceAll('%20', '+');
        if (selectedcats.indexOf(code) != -1) {
            $(this).addClass('active');
        }
    });

}
/* 
*/
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
    fetchGoogleDataAll([url]).then(dataArrayx => {
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
/* Build a tabbed list of maps from spreadsheet                */
/*    02/24/2022 - initial                                     */
/* ----------------------------------------------------------- */

function do_maps(
    theSelector = "#directionDiv",
    active = 0, 
    single = false,
    collapsable = true,
    collapsed = false,
    title = "View Location Maps") {

  // Point to calendars spreadsheet
  file_id = '1Xrz1gJ0to5c01jiDyMvl38486s_J94lHhERtTHEBw5E', 
  sheet = 'Maps';

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

  if (active < 1 || active > 4) {active = 1;}

  var where = "SELECT A, B, C, D, E, F WHERE C != 'Yes' AND B IS NOT NULL ORDER BY A, B";
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=&sheet=' + sheet + 
    '&headers=1&tq=' + escape(where);

  // Fetch the spreadsheet data 
  fetchGoogleDataAll([url]).then(dataArrayx => {
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
        for (let i = 0; i < 6; i++) {
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
          <a href="">${title}</a>
        </div>
      </div>`;
    }
    temp = temp + `<div class="theMapsContainer"></div>`;
    $(theSelector).html(temp);

    var tab = 1; 
    var tabs = ''; 
    var tabsdata = '';
    var iframes = []; 

    var activeTab = 0;

    dataRows.forEach(function(item, key) {
      var museum = item[1];
      var iframe = item[4];
      var before = item[3];
      var after = item[5];
    
      var listkey = theMuseumKeys.indexOf(item[1]);
      var name = (listkey > -1) ? theMuseumList[listkey][1] : 'Unknown';
      if (museum == theMuseumKeys[active]) {activeTab = key;}
      var colorClass = "color" + museum.charAt(0).toUpperCase() + museum.slice(1);

      var hideme = '';
      if (single == true && key != active) {
        hideme = 'hide';
      }

      tabs = tabs + 
        '<li class="' + hideme + '"><a href="#tabs-' + tab + '" data-tab="' + tab + '" class="' + colorClass + '">' + 
        name + '</a></li>\n';
        tabsdata = tabsdata + 
        '<div id="tabs-' + tab + '">\n' +
        '<p><strong>' + name + '</strong>\n' + before +
        '<div class="calendarLarge">' + iframe + '</div>\n' + after +
        '</div>'; 
      tab = tab + 1; 

    })  

    tabs = '<div id="tabs"><ul>' + tabs + '</ul></div>\n'; 
    $(tabs).appendTo(theSelector + ' .theMapsContainer');
    $(tabsdata).appendTo('#tabs');

    $(theSelector + ' .toggle div.openCloseList a')
          .click(function(e) {
          e.preventDefault(); 
          //$(this).toggleClass("open");
          $(theSelector + ' .theMapsContainer')
          .slideToggle('slow');
          $(theSelector + ' .openCloseList i').toggleClass("down");
        });

    $(theSelector).addClass('faq_container tabListContainer');
    $( "#tabs" ).tabs({ active: activeTab});
    if (single == true) {
      $(theSelector).find('li.hide').hide(); 
      $(theSelector + ' .theMapsContainer').find('.ui-tabs-nav').hide(); 
    }
    if (collapsable == true && collapsed == true) {
      $(theSelector + ' .theMapsContainer').hide(); 
      $(theSelector + ' .openCloseList i').removeClass("down");
    }
    $(theSelector + ' .theMapsContainer iframe').width('100%');
    $('#tabs a').click(function() {
      var id = $(this).attr("href");
      var tab = id.substr(6) - 1;
      var x = $(id).find('.calendarLarge iframe').length;
      if (!x) {  // if no iframe found, then fill it in
        $(id).find('.calendarLarge').html(iframes[tab][0]);
        $(theSelector + ' .theMapsContainer iframe').width('100%');
      }
    })
  }) // End of promis
}

/*--------------------  New gallery filter code  ------------------ */


/* here we find the intersection of two arrays */
function intersection(first, second)
{
    first = new Set(first);
    second = new Set(second);
    return [...first].filter(item => second.has(item));
}

function adjustGalleryItemHeight() {
  var aspect_ratio_box2 = 0.66666666;
  var box2 = jQuery(".summaryFilterContainer img");
  /*
  var focal = $(".summaryFilterContainer img").data('image-focal-point');
  if (focal) {
    focalparts = focal.split(" ",2);
    var newfocal = (focal[0] * 100) + '% ' + (focal[1] * 100) + '%';
    if (newfocal != '50% 50%') {
      box2.css('object-position',newfocal);
    }
  }
  */
  var w = box2.width();
  var h = w * aspect_ratio_box2;
  box2.height(h);
}

/* ------------------------------------------------------- */
/* CleanUpArray - take spreadsheet data and normalize      */
/*     into a normal array                                 */
/* ------------------------------------------------------- */

function cleanUpArray(dataArray, num=5) {
  // Clean up the Google array data
    dataRows = [];
    dataArray.forEach(function(item,key) {
      if (item.c[0] != null) {
        var ar = [];
        for (let i = 0; i < num; i++) {
          var val =  (item.c[i] != null) ? item.c[i].v : '';
          ar.push(val);
        } 
        dataRows.push(ar);
      }
    });
    return dataRows;
}

function filterGalleryShowvals(selectorID, mycats, mycatsids) {

    // get an array of checked items
    var ids = [];
    var xidsx = [];
    mygroups = [];
    mygroupids = [];
    selectedcats = [];
    var selectedcatsids = [];
    $('#filterContainer input[type=checkbox]:checked, ' +
    '#filterContainer input[type=radio]:checked')
    .each(function() {
        if (this.value) {
            ids.push(this.value);
            var group = $(this).attr('name');
            var cat = this.value;
            cat = cat.replace("&", "%26");
            selectedcats.push(cat);
            var i = mycats.findIndex(element => {  // compare lower case 
                  return element.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+') === cat.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
                })
            selectedcatsids.push(i);
            //i = mycats.indexOf(cat);
            if (i != -1) {
                var x = mygroups.indexOf(group);
                if (x == -1) {
                    mygroups.push(group);
                    mygroupids.push(mycatsids[i]);
                }
                else {
                    var newids = mygroupids[x].concat(mycatsids[i]);
                    mygroupids[x] = newids;
                }
            }
            else {
                var x = mygroups.indexOf(group);
                if (x == -1) {
                    mygroups.push(group);
                    mygroupids.push([999]);
                }
                else {
                    var newids = mygroupids[x].concat([999]);
                    mygroupids[x] = newids;
                }
            }
        }

    });

    // default is to turn them all on initially
    var catsel2 = $("#newSummaryItems div.itemFilter");
    var allcats2 = $(catsel2).css('display','block');
    $(allcats2).find('div.itemFilterCats .newCats').removeClass('active');

 
    var common = [];
    if (mygroups.length > 0) {
        $(allcats2).css('display','none');
        common = mygroupids[0];
        for (n = 1; n < mygroups.length; n++) {
            common = intersection(common, mygroupids[n]);
        }
    }

    // Turn on the items that were selected
    for (n = 0; n < common.length; n++) {
        $(allcats2).eq(common[n]).css('display','block');
    }

    // set the selected categories to active 
    for (n = 0; n < selectedcatsids.length; n++) {
      $(allcats2).find('div.itemFilterCats .newCats[data-id="' + 
      selectedcatsids[n] + '"]').addClass('active');
    }
  } 

function makeFilterBoxes(selectorID, groups, cats, groupinfo, mycats, mycatsids) {

     /* Here we are building the actual html checkbox/radio buttons based 
        on the requested groups in the call.  I.e. "locations, grades". 
    */

    //var groups = 'grades,outreach,unknown';
/*
    // group, order, abberv, category  from spreadsheet
    var cats = [
        ['grades',10,'PreK','PreK'],
        ['grades',20,'K','K'],
        ['locations',10,'aahom','Ann Arbor Hands-On Museum'],
        ['locations',20,'leslie','Leslie Science & Nature Center'],
        ['outreach',10,'Classroom Workshop','Classroom Workshop'],
        ['outreach',10,'Super Science Day','Super Science Day']
    ];

    // group, label, type
    var groupinfo = [
        ['locations','Locations','radio'],
        ['grades','Grades','checkbox'],
        ['outreach','Outreach','checkbox']
    ];

    var mycats = [
        'PreK','K',
        'Ann+Arbor+Hands-On+Museum',
        'Leslie+Science+&+Nature+Center',
        'Super+Science+day'
    ];
*/

    var param = getSearchParams("groups");
    if (param) {
      groups = param;
    }
    allgroups = groups.split(',');
   
    var out = '<div class="flexBox">\n';
    for (i = 0; i < allgroups.length; i++) {
        var groupx = allgroups[i].trim().toLowerCase();
        var groupparts = groupx.split(':',3);
        var group = groupparts[0];
        var label = group; 
        var type = 'checkbox';
        for (x = 0; x < groupinfo.length; x++) {
          if (groupinfo[x][0].toLowerCase() == group.toLowerCase()) {
            label = groupinfo[x][1];
            type = groupinfo[x][2];
          }
        }      
        label = (typeof groupparts[1] != 'undefined' && groupparts[1] != '') ? groupparts[1] : label;
        type = (typeof groupparts[2] != 'undefined' && groupparts[2] != '') ? groupparts[2] : type;
   
        out = out + '<div class="filterGroup">\n';
        out = out + '<span>' + label + '</span><table class="outer">\n';
        var colorClass = "group" + group.charAt(0).toUpperCase() + group.slice(1);
        var numcols = 1;
        if (group == 'grades') {
            numcols = 2;
        }
        var curcol = 0;
        var tr = '<tr>';
        var defaultvalue = '';
        if (type == 'radio') {
            if (defaultvalue == '') {
                checked = ' checked ';
            }
            out = out + tr + '<td><input type="' + type + '" value="" name="' + group + '"' + checked + '><span>Any</span></td>\n';
            curcol = curcol + 1;
        }
        for (n = 0; n < cats.length; n++) { 
            var lookup = cats[n][3].toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
                // Only show category if it appears in at least one blog entry
            var x = mycats.findIndex(element => {  // compare lower case 
              return element.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+') === lookup.toLowerCase();
            })
            if (cats[n][0].toLowerCase() == group) {
                var item = cats[n];
                
                if (x !== -1) {
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
                    var checked = '';
                    var lookup = cats[n][2].toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
                    if (defaultvalue == lookup) {
                        checked = ' checked ';
                    }
                    out = out + tr + '<td><input type="' + type + '" value="' + lookup + '" name="' + group + '"' + checked + '><span>' + cats[n][3] + '</span></td>\n';
                }
            }
        }
        out = out + '</table></div>\n';
    }
    var out = out + '</div>\n';
    $(selectorID).html(out);

}

function getData(theurl) {
    var result = "";
    $.ajax({
        url: theurl,
        dataType: 'text',
        async: false,
        success: function(data) {
            result = data;
        }
    });
    return result;
}

function createFilteredGallery(
    selectorID, 
    json, 
    groups='locations, groups') {

    var file_id='1qrUPQu2qs8eOOi-yZwvzOuGseDFjkvj5_mSnoz0tJVc';
    var where = "SELECT A,B,C,D,E WHERE E != 'Yes' AND A IS NOT NULL ORDER BY A,B";
    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=Categories' +
    '&headers=1&tq=' + escape(where);

    var url2 = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=groups' +
    '&headers=1&tq=';

    //var url3 = 'https://www.uildev.com/outreach-1';

    //var res = getData(url3);
    //console.log(res);

    // hide the squarespace summary block, we are going to 
    // build an entirly new flexbox list
    $(selectorID).parent().parent().next().find('div.summary-item-list')
      .css('display','none !important');

    // Fetch the spreadsheet data 
    fetchGoogleDataAll([url,url2]).then(dataArrayx => {
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
        $('<div id="filterContainer"></div>').prependTo(selectorID);

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

 function formatGalleryItems(selectorID, json, cats = []) {
/*
   var cats = [
        ['grades',10,'PreK','PreK'],
        ['grades',20,'K','K'],
        ['locations',10,'aahom','Ann Arbor Hands-On Museum'],
        ['locations',20,'leslie','Leslie Science & Nature Center'],
        ['outreach',10,'Classroom Workshop','Classroom Workshop'],
        ['outreach',10,'Super Science Day','Super Science Day']
    ];
*/
    // cats array is from category spreadsheet 
    // used here to substitute aliase names if any
    var aliasname = [];
    var realname = [];
    for (var i=0; i < cats.length; i++) {
      if (cats[i][2] != cats[i][3]) {
        aliasname.push(cats[i][2].toLowerCase());
        realname.push(cats[i][3]);
      }
    }

    var temp = json;
    var a = temp['items'];
    var testout = ''; 
    var mycats = []; // unique list of categories found 
    var mycatsids = []; 
    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
    var regexp = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;
    for (var i=0; i < a.length; i++) {
      var index = i;
      var img = a[i]['assetUrl'];
      var excerpt = a[i]['excerpt'];
      // remove html tags from excerpt.
      excerpt = excerpt.replace(/(<([^>]+)>)/gi, "");
      var focal = a[i]['mediaFocalPoint'];
      var focalx = focal['x'];
      var focaly = focal['y'];
      var categories = a[i]['categories'];
      var cats = ''; 
      var sep = ''; 
      if (!allowedExtensions.exec(img)) {
        // doesn't look like an image url, look inside the body
        var temp = $(a[i]['body']).find('img').eq(0);
        var imgtmp = $(temp).data('src');
        if (imgtmp) {
          img = imgtmp; 
          focaltmp = $(temp).data('image-focal-point');
          console.log('focal=' + focaltmp);
          if (focaltmp) {
            focal = focaltmp.split(",");
            focalx = focal[0];
            focaly = focal[1];
            console.log('focalx=' + focalx + ' focaly=' + focaly);
            console.log(typeof focalx + ' math=' + focalx * 100); 
          }
        }
      }
      var fx = (isNaN(focalx)) ? '50%' : (focalx * 100) + '%';
      var fy = (isNaN(focaly)) ? '50%' : (focaly * 100) + '%';
      var newfocal = fx + ' ' + fy;
      for (var n=0; n < categories.length; n++) {
        // look for a possible alise name and swap out
        var x = aliasname.indexOf(categories[n].toLowerCase());
        if (x != -1) {
          categories[n] = realname[x];
        }
        x = mycats.indexOf(categories[n]);
        if (x == -1) {
          mycats.push(categories[n]);
          x = mycats.length - 1;
          mycatsids.push([i]); 
        }
        else {
          if (mycatsids[x].indexOf(i) == -1) {
              mycatsids[x].push(index);
          }
        } 
        cats += `<span class="newCats" data-id="${x}">${sep}${categories[n]}</span>`;
        sep = ', '; 
      }

      var focalpoint = ''; 
      if (newfocal != '50% 50%') {
         // box2.css('object-position',newfocal);
          focalpoint = ' style="object-position:' + newfocal + ';"';
      }
      
      testout += 
            `<div class="itemFilter" data-itemid="${index}">
                  <div class="itemFilterImage">
                      <a href="${a[i]['fullUrl']}">
                      <img src="${img}/?format=300w"${focalpoint}>
                      </a>
                  </div>
                  <div class="itemFilterContent">
                      <a href="${a[i]['fullUrl']}" class="itemTitle">
                          ${a[i]['title']}</a>
                          <p class="message">${excerpt}</p>
                      
                      <a href="${a[i]['fullUrl']}" class="summary-read-more-link">
                          Read More →
                      </a>
                      <div class="itemFilterCats">
                          <!-- Categories -->
                              ${cats}
                      </div>
                  </div>
              </div>`;
    }
   
    $(document).ready(function() { 
      var temp = `<div id="newSummaryItems">
        <div class="summaryFilterContainer">out</div>`;
      $(selectorID).html(temp); 
      $('.summaryFilterContainer').html(testout);
      adjustGalleryItemHeight();
      jQuery(window).resize(function() {
        adjustGalleryItemHeight(); 
      });
    });
    return [mycats,mycatsids];

  }