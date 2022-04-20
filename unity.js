/*jslint browser */
/* check allow for
   add "$ = jQuery" option
   https://www.jslint.com/ */
/*-------------------------------------------------------------*/
/* Initialize the standard list of museums                     */
/*    02/21/2022 - initial                                     */
/*-------------------------------------------------------------*/

var theMuseumList = [
  ["unity","Unity in Learning",false],
  ["aahom","Ann Arbor Hands-On Museum",false],
  ["leslie","Leslie Science & Nature Center",false],
  ["yankee","Yankee Air Museum",false],
  ["challenger","Challenger Learning Center at SC4",false],
  ["experience","Experience Center",true]
];

var theMuseumKeys = [
  "unity",
  "aahom",
  "leslie",
  "yankee",
  "challenger",
  "experience"
];

/* ----------------------------------------------------------- */
/* Do some basic setup on page load                            */
/* ----------------------------------------------------------- */

$(document).ready(function() {
  // Insert return to previous page on all blog item displays
  var temp = `<div class="returnPrev">
    <A HREF="javascript:javascript:history.go(-1)">
    Back to previous page</A></div>`;
  $(temp).insertBefore("div.blog-item-wrapper");
  $(temp).insertAfter("div.blog-item-wrapper");
});

/* ----------------------------------------------------------- */
/* Search URL Parameters                                       */
/*    02/16/2022 - initial                                     */
/* ----------------------------------------------------------- */

/* https://stackoverflow.com/questions/19491336/
    how-to-get-url-parameter-using-jquery-or-plain-javascript */
function getSearchParams(k){
 var p={};
 location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v});
 return k?p[k]:p;
}

/* ----------------------------------------------------------- */
/* Slideshow gallery                                           */
/* ----------------------------------------------------------- */

function doGalleryShow() {

    // get some selectors and data
    var background = $("#page article:first-child section:first-child " +
        "div.section-background");
    var gallery = $("#page  article:first-child section.gallery-section")
        .first().find("figure.gallery-grid-item");

    // If no gallery found so abort
    if (gallery.length === 0) {
        return false;
    }

    // Hide the initial template, not needed.
    background.find("img").css("display","none");

    // https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
    // See if we are editing the SquareSpace page, if so hide the gallery section
    var isEditor = window.frameElement ? true : false;
    if (isEditor == false) {
       gallery.closest("section").css("display", "none");
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
        for (i = 0; i < imgpos.length; i++) {
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

/*-------------------------------------------------------------*/
/* Frequently Asked Questions, FAQS3                           */
/*    04/11/2021 - initial                                     */
/*    Updated 04/04/2022                                       */
/*-------------------------------------------------------------*/

function do_faqs3(theSelector, data, attr) {

    // Update 4/4/22

    var active = ('activetab' in attr) ? attr['activetab'] : 1;
    var single = ('singe' in attr) ? attr['single'] : false;
    var openfirst = ('openfirst' in attr) ? attr['openfirst'] : true;
    var collapsable = ('collapsable' in attr) ? attr['collapsable'] : false;
    var collapsed = ('collapsed' in attr) ? attr['collapsed'] : true;
    var title = ('title' in attr) ? attr['title'] : 'View Frequently Asked Questions';

    var tabLinks = '';
    var out = '';
    var activeli = 0;
    var tabs = [];
    active = (active == null) ? 1 : active;
    single = (single == null) ? 1 : single;
    collapsable = (collapsable == null) ? 1 : collapsable;
    collapsed = (collapsed == null) ? 1 : collapsed;

    // find the faq reference data
    var thedata = {};
    var i = 0;
    for (i = 0; i < data['items'].length; i++) {
      if (data['items'][i]['fullUrl'] == '/reference-data/faqs') {
        theMuseumList.forEach(function(item, key) {
          if (item[2] != true) { // not hiding this museum
            data2 = parseData(data['items'][i]['body'], '#' + item[0]);
            thedata[item[0]] = data2;
          }
        })
      }
    }

    // Check to see if a parameter was passed to
    // specify which tab becomes active
    var tabparam = getSearchParams("tab");
    if (tabparam) {
      active = tabparam;
    }

    // Set up the collapsed/expanded option
    // valid values 0-4 or "none"
    if (openfirst != true) {
        activeli = 'none';
    }

    if ($(window).width() < 960) {
      activeli = 'none';
    }
    var activeTab = active - 1;  // zero based tabs

    theMuseumList = getMuseumList(data);

      // Loop for each tab
      theMuseumList.forEach(function(item, key) {
          if (key && item[2] != true) {
            // camelcase css tag for background
            var background = 'color' + item[0].charAt(0).toUpperCase() +
              item[0].slice(1).toLowerCase();
            val = item[1];
            var tabnum = +(key+1);
            var hideme = '';
            if (single == true && key != active) {
              hideme = ' hide';
            }
            tabLinks = tabLinks + '<li class="' + background + hideme + '"><a href="#tabsFaqs-' +
              tabnum + '">' + val + '</a></li>\n';
            var lookfor = item[0].toLowerCase();

            var thisdata = thedata[lookfor];
            out = out + '<div id="tabsFaqs-' + tabnum + '">\n<div class="accordian">\n';
            for (i = 0; i < thisdata.length; i++) {
                out = out + '<h3 class="' + background + '">' + thisdata[i][0] + '</h3><div>\n';
                out = out + '<p>' + thisdata[i][1] + '</p></div>\n';
            }

            out = out + '</div>\n</div>\n';
          }

        });

        var toggle = "<div class=\"toggle\">" +
          "<div class=\"openCloseList\"><i class=\"arrow down\"></i><a href=\"\">" + title + "</a></div>\n";
        out = '<div id="tabsFaqs"><ul>' + tabLinks + '</ul>' + out + '</div></div>\n';

        $(theSelector + ' div#tabsFaqs').show();
        if (collapsable == true) { // hide if collapsable and collapsed
          out = toggle + out + '</div>';
          $(out).appendTo(theSelector);
          if (collapsed == true) {
            $(theSelector + ' div#tabsFaqs').hide();
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
          $(theSelector + ' div#tabsFaqs')
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
        $( theSelector + " #tabsFaqs" ).tabs({active: activeTab});


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
    if (afterh > beforeh) {
        lines = lines - 2;
        $(this).find('.readMoreDetails').show();
    }
    temp.css('-webkit-line-clamp',lines.toString());
    temp.css('-webkit-box-orient','vertical');
    temp.css('overflow','hidden');
  })
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

//var path = window.location.pathname;
//slug = path.split("/").pop();

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
    $(selectorID + " .subMenuBar").toggleClass("open")
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
    return [...first].filter((item) => second.has(item));
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


/* ----------------------------------------------------------- */
/* Build a tabbed list of maps from spreadsheet                */
/*    02/24/2022 - initial                                     */
/* ----------------------------------------------------------- */

function do_maps(theSelector, data, attr) {

  // Update 4/4/22

  var active = ('activetab' in attr) ? attr['activetab'] : 0;
  var single = ('singe' in attr) ? attr['single'] : false;
  var openfirst = ('openfirst' in attr) ? attr['openfirst'] : true;
  var collapsable = ('collapsable' in attr) ? attr['collapsable'] : true;
  var collapsed = ('collapsed' in attr) ? attr['collapsed'] : false;
  var title = ('title' in attr) ? attr['title'] : 'View Location Maps';

  // Point to calendars spreadsheet
  file_id = '1Xrz1gJ0to5c01jiDyMvl38486s_J94lHhERtTHEBw5E';
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

  theMuseumList = getMuseumList(data);

  // find the faq reference data
    var thedata = {};
    var i = 0;
    for (i = 0; i < data['items'].length; i++) {
      if (data['items'][i]['fullUrl'] == '/reference-data/location-maps') {
        theMuseumList.forEach(function(item, key) {
          if (item[2] != true) { // not hiding this museum
            data2 = parseData(data['items'][i]['body'], '#' + item[0]);
            thedata[item[0]] = data2;
          }
        })
      }
    }

    var newdata = [];
    $.each(thedata, function( index, value ) {
      var before = '';
      var iframe = '';
      var after = '';
      var ar = [];
      $.each(value,function(index2, value2) {
        if (value2.length > 1) {
          var temp = value2[0].toLowerCase();
          before = (temp == 'before') ? value2[1] : before;
          iframe = (temp == 'iframe') ? value2[1] : iframe;
          after = (temp == 'after') ? value2[1] : after;
          ar = [index2, index,null, before, iframe, after];
        }

      })
      if (ar.length > 0) {
        newdata.push(ar);
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
    var dataRows = newdata;

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
        '<li class="' + hideme + '"><a href="#tabsMaps-' + tab + '" data-tab="' + tab + '" class="' + colorClass + '">' +
        name + '</a></li>\n';
        tabsdata = tabsdata +
        '<div id="tabsMaps-' + tab + '">\n' +
        '<p><strong>' + name + '</strong>\n' + before +
        '<div class="calendarLarge">' + iframe + '</div>\n' + after +
        '</div>';
      tab = tab + 1;

    })

    tabs = '<div id="tabsMaps"><ul>' + tabs + '</ul></div>\n';
    $(tabs).appendTo(theSelector + ' .theMapsContainer');
    $(tabsdata).appendTo('#tabsMaps');

    $(theSelector + ' .toggle div.openCloseList a')
          .click(function(e) {
          e.preventDefault();
          //$(this).toggleClass("open");
          $(theSelector + ' .theMapsContainer')
          .slideToggle('slow');
          $(theSelector + ' .openCloseList i').toggleClass("down");
        });

    $(theSelector).addClass('faq_container tabListContainer');
    $( theSelector + " #tabsMaps" ).tabs({ active: activeTab});
    if (single == true) {
      $(theSelector).find('li.hide').hide();
      $(theSelector + ' .theMapsContainer').find('.ui-tabs-nav').hide();
    }
    if (collapsable == true && collapsed == true) {
      $(theSelector + ' .theMapsContainer').hide();
      $(theSelector + ' .openCloseList i').removeClass("down");
    }
    $(theSelector + ' .theMapsContainer iframe').width('100%');
    $('#tabsMaps a').click(function() {
      var id = $(this).attr("href");
      var tab = id.substr(6) - 1;
      var x = $(id).find('.calendarLarge iframe').length;
      if (!x) {  // if no iframe found, then fill it in
        $(id).find('.calendarLarge').html(iframes[tab][0]);
        $(theSelector + ' .theMapsContainer iframe').width('100%');
      }
    })
}

/*--------------------  New gallery filter code  ------------------ */


/* here we find the intersection of two arrays */
function intersection(first, second)
{
    first = new Set(first);
    second = new Set(second);
    return [...first].filter((item) => second.has(item));
}

function adjustGalleryItemHeight() {
  var aspect_ratio_box2 = 0.66666666;
  var box2 = jQuery(".summaryFilterContainer img").not(':hidden');
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
        for (i = 0; i < num; i++) {
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
            var i = mycats.findIndex((element) => {  // compare lower case
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
    var showing = catsel2.length;
    if (mygroups.length > 0) {
        $(allcats2).css('display','none');
        common = mygroupids[0];
        for (n = 1; n < mygroups.length; n++) {
            common = intersection(common, mygroupids[n]);
        }
        showing = common.length;
    }
    $('div#filterItemCount').html('Showing: ' + showing + ' of ' + catsel2.length);

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
            var x = mycats.findIndex((element) => {  // compare lower case
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
    for (i=0; i < cats.length; i++) {
      if (cats[i][2] != cats[i][3]) {
        aliasname.push(cats[i][2].toLowerCase());
        realname.push(cats[i][3]);
      }
    }

    var href = a[i]['fullUrl'];
    var source = a[i]['sourceUrl'];
    href = (source) ? source : href;

    var temp = json;
    var a = temp['items'];
    var testout = '';
    var mycats = []; // unique list of categories found
    var mycatsids = [];
    var categories = [];
    var excerpt = '';
    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    var regexp = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;
    for (i=0; i < a.length; i++) {
      var index = i;
      var img = a[i]['assetUrl'];
      if ('excerpt' in a[i]) {excerpt = a[i]['excerpt'];}
      // remove html tags from excerpt.
      excerpt = excerpt.replace(/(<([^>]+)>)/gi, "");
      var focal = a[i]['mediaFocalPoint'];
      var focalx = focal['x'];
      var focaly = focal['y'];

      if ('categories' in a[i]) {categories = a[i]['categories'];}
      var cats = '';
      var sep = '';
      if (!allowedExtensions.exec(img)) {
        // doesn't look like an image url, look inside the body
        var temp = $(a[i]['body']).find('img').eq(0);
        var imgtmp = $(temp).data('src');
        if (imgtmp) {
          img = imgtmp;
          focaltmp = $(temp).data('image-focal-point');

          if (focaltmp) {
            focal = focaltmp.split(",");
            focalx = focal[0];
            focaly = focal[1];

          }
        }
      }
      var fx = (isNaN(focalx)) ? '50%' : (focalx * 100) + '%';
      var fy = (isNaN(focaly)) ? '50%' : (focaly * 100) + '%';
      var newfocal = fx + ' ' + fy;

      for (n=0; n < categories.length; n++) {
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
        var catname = categories[n].toLowerCase().replaceAll(' ', '+')
          .replaceAll('%20', '+').replaceAll("&", "%26");
        cats += `${sep}<span class="newCats" data-itemid="${i}" data-catname="${catname}" data-id="${x}">${categories[n]}</span>`;
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
                      <a href="${href}">
                      <img src="${img}/?format=300w"${focalpoint}>
                      </a>
                  </div>
                  <div class="itemFilterContent">
                      <a href="${a[i]['fullUrl']}" class="itemTitle">
                          ${a[i]['title']}</a>
                          <p class="message">${excerpt}</p>

                      <a href="${href}" class="summary-read-more-link">
                          Read More →
                      </a>
                      <div class="itemFilterCats">
                          <!-- Categories -->
                              ${cats}
                      </div>
                  </div>
              </div>`;
    }
    testout += '<div class="itemCount"></div>';

    //$(document).ready(function() {
      var temp = `<div id="newSummaryItems">
        <div class="summaryFilterContainer">out</div>`;
      $(selectorID).html(temp);
      $('.summaryFilterContainer').html(testout);
      adjustGalleryItemHeight();
      jQuery(window).resize(function() {
        adjustGalleryItemHeight();
      });
   // });
    return [mycats,mycatsids];

  }

/* ------------------------------------------------------- */
/* New Slick Carousel Code                                 */
/*     Initial 03/25/22                                    */
/* ------------------------------------------------------- */

function formatSlickCarousel(selectorID, json, findCats = '', showCats = false) {

    var a = json['items'];
    var testout = '';
    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    var regexp = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;

    // Set up an array with requested categories
    var findCatsArray = [];
    if (findCats.trim() != '') {
      findCatsArray = findCats.split(',');
    }
    for (n=0; n < findCatsArray.length; n++) {
         findCatsArray[n] = findCatsArray[n].trim()
         .toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
    }

    // Set up active class if we are showing categories
    showcats = '';
    if (showCats) {
      showcats = ' active';
    }

    var testout = `<div class="slickButtons">
        <button class="prev slick-arrow"> < </button>
        <button class="next slick-arrow"> > </button>
        </div>
        <div class="theCarousel">`;
    for (i=0; i < a.length; i++) {
      var index = i;
      var img = a[i]['assetUrl'];
      var href = a[i]['fullUrl'];
      var title = a[i]['title'];

      // Process categories and filter if requested
      var categories = a[i]['categories'].sort();
      var x = mycats.findIndex((element) => {  // compare lower case
              return element.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+') === lookup.toLowerCase();
            })
      var cats = '';
      var sep = '';
      var found = false;
      for (n=0; n < categories.length; n++) {
        var classNames = 'newCats';
        var temp = categories[n].toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
        var x = findCatsArray.indexOf(temp);
        if (x != -1) {
          found = true;
          classNames += ' active';
        }
        cats += `${sep}<span class="${classNames}" data-itemid="${i}" data-catname="${temp}">${categories[n]}</span>`;
        sep = ', ';
      }
      if (findCatsArray.length == 0 ) { found = true;}

      // Get the excerpt and remove html tags
      var excerpt = a[i]['excerpt'];
      excerpt = excerpt.replace(/(<([^>]+)>)/gi, "");

      // If the image URL looks good then use it,
      // otherwise look for first image in body
      if (!allowedExtensions.exec(img)) {
        // doesn't look like an image url, look inside the body
        var temp = $(a[i]['body']).find('img').eq(0);
        var imgtmp = $(temp).data('src');
        if (imgtmp) {img = imgtmp;}
      }

      // output this item unless it is not included in filter
      if (found == true) {
        testout +=
            `<div class="item">
              <img src="${img}">
              <div class="title"><a href="${href}">${title}</a></div>
              <div class="classcontent">${excerpt}</div>
              <div class="readmore"><a href="${href}">Read More →</a></div>
              <div class="itemFilterCats${showcats}">${cats}</div>
              </div>`;
      }

    }
    testout += '</div>';

    // Ok, now wait for the page and finish up
    $(document).ready(function() {
      var temp =
      $(selectorID).html(testout);
      var theCarousel = $(selectorID).find('.theCarousel');
      $(theCarousel).slick({
        dots: true,
        adaptiveHeight: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        prevArrow: $(selectorID + ' .prev'),
        nextArrow: $(selectorID + ' .next'),
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

    // adjust the image aspect ratio based on width
    adjustSlickImageHeight();

    });
    return;
  }

// Added 3/28/22 -----------------------------------------

function filterGalleryShowvals(selectorID, mycats, mycatsids, displayType='') {

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
            var i = mycats.findIndex((element) => {  // compare lower case
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

    if (displayType == 'carousel') {
      $(selectorID + " div.theCarousel").slick('slickUnfilter');
      var theCarousel = $(selectorID + " div.theCarousel");
      var catsel2 = $(selectorID + " div.theCarousel div.item"); // carousel type
      var allcats2 = $(catsel2).removeClass('active');
      $(allcats2).find('div.itemFilterCats .newCats').removeClass('active');
      var thetotal = $(selectorID + " div.theCarousel").slick("getSlick").slideCount;

      var common = [];
      var showing = thetotal;
      if (mygroups.length > 0) {
          //$(allcats2).css('display','none');
          common = mygroupids[0];
          for (n = 1; n < mygroups.length; n++) {
              common = intersection(common, mygroupids[n]);
          }
          showing = common.length;
      }
      $(selectorID + ' div.filterItemCount').html('Showing: ' + showing + ' of ' +
        thetotal);

      // Turn on the items that were selected
      for (n = 0; n < common.length; n++) {
          $(theCarousel).find('.item[data-itemid="' + common[n] + '"]').addClass('active');
      }

      // set the selected categories to active
      for (n = 0; n < selectedcatsids.length; n++) {
        $(selectorID + " div.theCarousel").find('div.itemFilterCats .newCats[data-catname="' +
        mycats[selectedcatsids[n]] + '"]').addClass('active');
      }

      if (selectedcatsids.length > 0) {
        $(selectorID + " div.theCarousel").slick('slickUnfilter').slick('slickFilter','.item.active');
      }
    }

    else if (displayType == 'grid') {
      // default is to turn them all on initially
      var catsel2 = $(selectorID + " #newSummaryItems div.itemFilter"); // grid
      var allcats2 = $(catsel2).css('display','block');
      $(allcats2).find('div.itemFilterCats .newCats').removeClass('active');


      var common = [];
      var showing = catsel2.length;
      if (mygroups.length > 0) {
          $(allcats2).css('display','none');
          common = mygroupids[0];
          for (n = 1; n < mygroups.length; n++) {
              common = intersection(common, mygroupids[n]);
          }
          showing = common.length;
      }
      $(selectorID + ' div.filterItemCount').html('Showing: ' + showing + ' of ' + catsel2.length);

      // Turn on the items that were selected
      for (n = 0; n < common.length; n++) {
          $(allcats2).eq(common[n]).css('display','block');
      }

      // set the selected categories to active
      for (n = 0; n < selectedcatsids.length; n++) {
        $(allcats2).find('div.itemFilterCats .newCats[data-catname="' +
        mycats[selectedcatsids[n]] + '"]').addClass('active');
      }
    }
}

var theMuseumList = [
  ['unity','Unity in Learning', false],
  ['aahom','Ann Arbor Hands-On Museum', false],
  ['leslie','Leslie Science & Nature Center', false],
  ['yankee','Yankee Air Museum', false],
  ['challenger','Challenger Learning Center at SC4', false],
  ['experience','Experience Center', true]
];

/*This function will insure that all of the keys of the
passed in object array are lowercase.  This is so we can
confidently compare case insensitive keys
see - https://bobbyhadz.com/blog/javascript-lowercase-object-keys */

function toLowerKeys(obj) {
  return Object.keys(obj).reduce((accumulator, key) => {
    accumulator[key.toLowerCase()] = obj[key];
    return accumulator;
  }, {});
}

/*Recursively fetch SquareSpace collections and build data array
to be passed back.  Multiple collection names can be passed in
and processed.  Return is an array of collection data arrays. */

function recursiveAjaxCall2(
  theCollections,
  offset = "",
  selectorID,
  callback,
  items=[],
  attr,
  nocache = false,
  theCount=0 ) {

  var upcoming = true;
  var past     = false;
  upcoming     = ("upcoming" in attr) ? attr["upcoming"] : upcoming;
  past         = ("past" in attr) ? attr["past"] : past;

  var marktime = '';
  console.log('nocache=' + nocache);
  if (nocache === true) {marktime = new Date().getTime().toString();}
  console.log('marktime=' + marktime);

  $.ajax({
    url: theCollections[theCount],
    data: {offset: offset,
    format: "json",
    t: marktime},
    async:   true
  })
  .done(function (data) {
    var j = data;
      if ("upcoming" in data || "past" in data) {
        if ("upcoming" in data && upcoming === true) {
          items = items.concat(data['upcoming']);
        }
        if ("past" in data && past === true) {
          items = items.concat(data['past']);
        }
      }
      else {
        if ("item" in data) {
          items = items.concat(data["item"]);
        }
        else {
          items = items.concat(data["items"]);
        }
      }
      if ("pagination" in j && "nextPageOffset" in j["pagination"]) {
        var off = j["pagination"]["nextPageOffset"];
        recursiveAjaxCall2(theCollections, off, selectorID,
          callback, items, attr, nocache,theCount);
      }
      else {
          theCount = theCount + 1;
          if (theCollections.length > theCount) {
            recursiveAjaxCall2(theCollections, off, selectorID,
              callback, items, attr, nocache, theCount);
          }
          else {
            var dataArray = [];
            for (i = 0; i < theCollections.length; i++) {
              dataArray.push([]);
            }
            for (i = 0; i < items.length; i++) {
              if (typeof items[i] != "undefined") {
                var temp = items[i]["fullUrl"].split("/");

                var x = theCollections.indexOf(temp[1]);
                if (x != -1) {
                  dataArray[x].push(items[i]);
                }
              }
              else {
                items.splice(i,1);
                i = i - 1;
              }
            }
            callback(selectorID, {items: items, dataArray: dataArray}, attr);
          }
      }
  })
  .fail(function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    var status = jqXHR["status"];
    var msg = "Error encountered, status=\"" +
      status + "\" errorTrhown=\"" + errorThrown + "\"";
    if (status == "404") {
      msg = "Could not find collection \"" +
        theCollections[theCount] + "\"";
    }
    msg = "<div class=\"errorMsg\">Error: " + msg + "</div>";
    console.log("Error from recursiveAjaxCall2: " + msg);
    $(selectorID).html(msg);
  });
}

/*Look through the body and collection the list data found
after the "lookfor" selector.  Then return an array.  It
will process a max of two evels of unordered lists */
function parseData(body, lookfor) {

  var temp1 = $(body).find(lookfor).next('ul').find('> li');

  var data = [];
  for (i = 0; i < temp1.length; i++) {
    var text1 = $(temp1[i]).html();
    var x = text1.indexOf('<ul>');
    var val1 = $(temp1[i]).text();
    var level1 = '';
    var level2 = [];
    if (x != -1) {
      var text1html = text1.substr(x);
      var val1 = text1.substr(0,x);
      var level1 = val1;
      var temp2 = $(text1.substr(x)).find('li');
      for (n = 0; n < temp2.length; n++) {
        var text3 = $(temp2[n]).html();
        var x3 = text3.indexOf('<ul>');
        var val2 = $(temp2[n]).text();
        var val2html = $(temp2[n]).html();
        if (x3 != -1) {
          val2 = val2.substr(0,x3);
        }
      //  if (val2html.indexOf('<iframe') == 0) {
          level2.push(val2html);
      //  } else {
      //    level2.push(val2);
      //  }
      }
    }
    else {
      level1 = val1;
    }
    data.push([level1,level2,text1html]);

  }
  return data;
}

/* ----------------------------------------------------------- */
/* Redirect control function for collection display            */
/*                                                             */
/* ----------------------------------------------------------- */

function collectionControl(
  selectorID,
  collection,
  type = 'carousel',
  attr = {}) {

  toLowerKeys(attr); // make sure the keys re lowercase
  var msg = '';

  /* Validate the selector id, make sure it exists
  and it is the only one found on the page */
  var sel = $(selectorID);
  if (sel.length == 0) {
    msg = 'Error: Selector "' + selectorID + '" not found.';
    msg = '<div class="errorMsg">Error: ' + msg + '</div>';
    $('#page').find('article').eq(0).find('div.content').eq(0).prepend(msg);
    return;
  }
  else if (sel.length > 1) {
    msg = 'Error: Found more than one selector "' + selectorID + '"';
    msg = '<div class="errorMsg">Error: ' + msg + '</div>';
    $(selectorID).eq(0).html(msg);
    return;
  }

  //console.log('collectionControl ' + selectorID + ' collection=' + collection);

  /* process the requested type, call Ajax to read the
  requested collection data and possibly reference data as well,
  then call the specified callback function to process. */
  type = type.toLowerCase();
  if (type == 'carousel') {
    recursiveAjaxCall2([collection],'',selectorID,theCarouselCallback, [], attr);
  }
  else if (type == 'grid') {
    var theCollections = [collection,'reference-data'];
    recursiveAjaxCall2(theCollections,'',selectorID,theGridCallback, [], attr);
  }
  else if (type == 'team') {
    var theCollections = [collection,'reference-data'];
    recursiveAjaxCall2(theCollections,'',selectorID,theTeamCallback, [], attr);
  }
  else if (type == 'flexboxes') {
    recursiveAjaxCall2([collection],'',selectorID,theflexBoxesCallback, [], attr);
  }
  else if (type == 'faqs') {
    var theCollections = ['reference-data'];
    recursiveAjaxCall2(theCollections,'',selectorID,theFaqsCallback, [], attr);
  }
  else if (type == 'address') {
    var theCollections = ['reference-data'];
    recursiveAjaxCall2(theCollections,'',selectorID,theAddressCallback, [], attr);
  }
  else if (type == 'locations') {
    var theCollections = ['reference-data'];
    recursiveAjaxCall2(theCollections,'',selectorID,theLocationsCallback, [], attr);
  }
  else if (type == 'calendars') {
    var theCollections = ['reference-data'];
    recursiveAjaxCall2(theCollections,'',selectorID,theCalendarsCallback, [], attr);
  }
  else if (type == 'donorwall') {
    var theCollections = ['reference-data'];
    recursiveAjaxCall2(theCollections,'',selectorID,theDonorCallback, [], attr);
  }
  else if (type == 'submenu') {
    var theCollections = ['reference-data'];
    recursiveAjaxCall2(theCollections,'',selectorID,theSubMenuCallback, [], attr);
  }
  else if (type == 'validate') {
    $(selectorID).html('<div>Loading...</div>');
    var theCollections = ['announcements','distance-learning-1',
    'outreach-1','field-trips-1','site-features','public-education',
    'promotions','jobs-list','team-members','flex-boxes',
    'giving-opportunities','reference-data'];
    recursiveAjaxCall2(theCollections,'',selectorID,theValidateCallback, [], attr, true);
  }
  else {
    msg = 'Error: Unknown type="' + type + '"'
    msg = '<div class="errorMsg">Error: ' + msg + '</div>';
    $(selectorID).eq(0).html(msg);
  }
}


// Callback for Grid
function theGridCallback(selectorID,json, attr) {
  createGridGallery(selectorID, json, attr);
}

// Callback for Carousel
function theCarouselCallback(selectorID, json, attr) {
  var data = {items: json['dataArray'][0]};
  formatSlickCarousel(selectorID,data, attr);
}

// Callback for Team
function theTeamCallback(selectorID, json, attr) {
  var data = {items: json['dataArray'][0]};
  formatTeamDisplay(selectorID,data, attr);
}

// Callback for Flex Boxes
function theflexBoxesCallback(selectorID, json, attr) {
  var data = {items: json['dataArray'][0]};
  formatflexBoxesDisplay(selectorID,data, attr);
}


// Callback for Locations
function theLocationsCallback(selectorID, json, attr) {
  var data = {items: json['dataArray'][0]};
  formatLocationsDisplay(selectorID,data, attr);
}

// Callback for Faqs
function theFaqsCallback(selectorID, json, attr) {
  var data = {items: json['dataArray'][0]};
  formatFaqsDisplay(selectorID,data, attr);
}

function formatFaqsDisplay(selectorID, data, attr) {
  do_faqs3(selectorID,data,attr);
}

// Callback for Address
function theAddressCallback(selectorID, json, attr) {
  var data = {items: json['dataArray'][0]};
  formatAddressDisplay(selectorID,data, attr);
}

// Callback for Locations
function theCalendarsCallback(selectorID, json, attr) {
  var data = {items: json['dataArray'][0]};
  formatCalendars(selectorID,data, attr);
}

// Callback for Grid
function theDonorCallback(selectorID,json, attr) {
var data = {items: json['dataArray'][0]};
  do_donor_wall2(selectorID, data, attr);
}

// Callback for validate categories
function theValidateCallback(selectorID,json, attr) {
  //var data = {items: json['dataArray'][0]};
  console.log(json);
  //createGridGallery(selectorID, json, attr);
  var fullUrl = '';
  var validcats = [];
  var categories = [];
  var allcats = [];
  var catlook = [];
  var cats = [];
  $.each(json['items'],function(index, item) {
    fullUrl = item['fullUrl'];
    title = item['title'];

    var temp = fullUrl.split("/");
    if (temp[1] === 'reference-data' && temp[2] ==='categories') {

      cats = getCvsData(json, 'categories',3);
        console.log(cats);
        $.each(cats,function(index2, cat) {
          catname = cat[1].toLowerCase().replaceAll(' ', '+')
            .replaceAll('%20', '+')
            .replaceAll('&','%26');
          validcats.push(catname);
        })
    }
    else {
      if ('categories' in item) {
        categories = item['categories'];
        if (categories.length) {
          $.each(categories,function(index3, cat) {
            catname = cat.toLowerCase().replaceAll(' ', '+')
                .replaceAll('%20', '+')
                .replaceAll('&','%26');
            allcats.push([catname,cat,temp[1],temp[2], title]);
            catlook.push(catname);
          })
        }
      }
    }
  })

  var out = `<table class="basicTable"><thead><tr><th>Category</th>
  <th>Blog Slug</th><th>Entry Title</th></tr></thead>
  <tbody>`;
  $.each(catlook,function(index, value) {
    var x = validcats.indexOf(value);
    if (x === -1) {
      out += `<tr><td>${allcats[index][1]}</td>
      <td>${allcats[index][2]}</td><td>${allcats[index][4]}</td></tr>`;

    }
  })
  out += '</tbody></table>';
  out += `<div class="sqs-block-content">
  <hr>
  <p>
  <h4 style="text-align:center;white-space:pre-wrap;">Valid Category List</h4>
  <p class="" style="white-space:pre-wrap;">
  The following table shows the list of all valid categories found in the standard list. </p>
  </div>`;
  out += '<table class="basicTable"><thead><tr><th>Group</th><th>Category</th><th>Hidden</th></tr></thead>';
  out += '<tbody>';
  $.each(cats,function(index, value){
    out += `<tr><td>${value[0]}</td><td>${value[1]}</td><td>${value[2]}</td></tr>`;
  })
  out += '</tbody></table>';
  $(selectorID).html(out);

}

// Callback for Sub Menu
function theSubMenuCallback(selectorID,json, attr) {

  var menudata = getCvsData(json, 'submenu-list',4);
  var menu = ('menu' in attr) ? attr['menu'] : 'learn';
  var more = ('more' in attr) ? attr['more'] : true;
  var title = ('title' in attr) ? attr['title'] : 'More Opportunities';
  var collapsable = (collapsable == null) ? true : collapsable;
  var collapsed = (collapsed == null) ? false : collapsed;
  menu.toLowerCase().trim();
  var out = '';
  var prevtype = '';
  var classname = (collapsable && more != false) ? 'subMenuBar collapsable' : 'subMenuBar';
  $(selectorID).html(`<div class="${classname}"></div>\n`);
  if (menu) {
    $.each(menudata,function(index, value) {
      if (menu === value[0].toLowerCase().trim()) {
        if (prevtype != value[1].toLowerCase().trim()) {
          if (prevtype) {out += "</nav>";}
          out += "<nav>";
          prevtype = value[1].toLowerCase().trim();

        }
        out += `<a data-page="${value[3]}" href="${value[3]}">${value[2]}</a>\n`;
      }
    });
    if (prevtype) {out += "</nav>\n";}
    $(selectorID + ' div.subMenuBar').html(out);
  }

  var temp = `<div class="learnMenuButton">
    <div class="toggle">
    <a href=""></i>- ${title} -</a></div></div>\n`;
  if (more) {$(temp).insertBefore(selectorID);}
  $('.learnMenuButton .toggle a').click(function(e) {
    e.preventDefault();
    $(selectorID + ' div.subMenuBar').toggleClass("open")
  })

  var path = window.location.pathname;
  slug = path.split("/").pop();
  $(selectorID).find('nav a[data-page="' + slug + '"]').addClass("active");
}

function formatflexBoxesDisplay(selectorID,json, attr) {

  var a = json['items'];
  var testout = '';
  $(selectorID).append('<div class="flipBoxContainer"><div class="flex-container"></div></div>');

  for (i=0; i < a.length; i++) {
    var index = i;
    var img = a[i]['assetUrl'];
    var href = a[i]['fullUrl'];
    var title = a[i]['title'];
    var tags = a[i]['tags'];
    var itemtitle = (tags.length > 0) ? tags[0] : '';
    var source = a[i]['sourceUrl'];
    var images = [];
    var tempimg = $(a[i]['body']).find('div.sqs-gallery div.slide');
    for (x=0; x < tempimg.length; x++) {
      var src = $(tempimg[x]).find('img').data('image');
      images.push(src);

    }
    if (tempimg.length == 0) {
      images.push(img);
    }
    var temp = $(a[i]['body']).find('div.sqs-block-html div.sqs-block-content');
    var bio = $(temp).html();
    var excerpt = a[i]['excerpt'];
    excerpt = excerpt.replace(/(<([^>]+)>)/gi, "");
    process_card_info(selectorID, source, images, title, title, excerpt);
  }

  $('div.front.face img:first-child')
      .addClass("active");
      $('')
  //setTimeout(flip_carousel, 5000);
  setTimeout(function() {flip_carousel(selectorID)}, 5000);

  flipCardResize(selectorID);

  $( window ).resize(function() {
    flipCardResize(selectorID);
  });
}

function formatTeamDisplay(selectorID, json, attr) {

    var a = json['items'];
    var testout = '';
    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    var regexp = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;

    var groups = ('groups' in attr) ? attr['groups'] : '';
    var findCats = ('findcats' in attr) ? attr['findcats'] : '';
    var filter = ('filter' in attr) ? attr['filter'] : false;
    var showCats = ('showcats' in attr) ? attr['showcats'] : false;
    var showDots = ('dots' in attr) ? attr['dots'] : false;
    var showCount = ('showcount' in attr) ? attr['showcount'] : false;

    var theclass = (showCount==true) ? ' active' : '';
    var counter = `<div class="filterItemCount${theclass}"></div>`;
    $('<div id="filterContainer"></div>' + counter).prependTo(selectorID);

    // Set up an array with requested categories
    var findCatsArray = [];
    if (findCats.trim() != '') {
      findCatsArray = findCats.split(',');
    }
    for (n=0; n < findCatsArray.length; n++) {
         findCatsArray[n] = findCatsArray[n].trim()
         .toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
    }

    // Set up active class if we are showing categories
    showcats = '';
    if (showCats) {
      showcats = ' active';
    }

    var showing = 0;
    var testout = '';
    for (i=0; i < a.length; i++) {
      var index = i;
      var img = a[i]['assetUrl'];
      var href = a[i]['fullUrl'];
      var title = a[i]['title'];
      var tags = a[i]['tags'];
      var itemtitle = (tags.length > 0) ? tags[0] : '';

      var temp = $(a[i]['body']).find('div.sqs-block-html div.sqs-block-content');
      var bio = $(temp).html();

      // Process categories and filter if requested
      var categories = a[i]['categories'].sort();
      var x = mycats.findIndex((element) => {  // compare lower case
              return element.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+') === lookup.toLowerCase();
            })
      var cats = '';
      var sep = '';
      var found = false;

      for (n=0; n < categories.length; n++) {
        var classNames = 'newCats';
        var temp = categories[n].toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
        var x = findCatsArray.indexOf(temp);
        if (x != -1) {
          found = true;
          classNames += ' active';
        }
        cats += `${sep}<span class="${classNames}" data-itemid="${i}" data-catname="${temp}">${categories[n]}</span>`;
        sep = ', ';
      }
      if (findCatsArray.length == 0 ) { found = true;}

      // Get the excerpt and remove html tags
      var excerpt = a[i]['excerpt'];
      excerpt = excerpt.replace(/(<([^>]+)>)/gi, "");

      // If the image URL looks good then use it,
      // otherwise look for first image in body
      if (!allowedExtensions.exec(img)) {
        // doesn't look like an image url, look inside the body
        var temp = $(a[i]['body']).find('img').eq(0);
        var imgtmp = $(temp).data('src');
        if (imgtmp) {img = imgtmp;}
      }

      // output this item unless it is not included in filter

      if (found == true) {
        testout = testout +
            `<div class="item_box">
            <div class="item_front">
                <img class="item_img" src="${img}">
                <div class="item_name">
                    <div class="item_title">
                        <div class="memberName">${title}</div>
                        <div class="memberTitle">${itemtitle}</div>
                    </div>
                </div>
            </div>
            <div class="item_back">
                <div class="item_bio">${bio}
                </div><button class="readMoreDetails">
                    <i class="arrow"></i></button>
            </div>
        </div>`;
        showing++;
      }

    }
    testout += '</div>';
    $('<div id="teamDetail"></div>').insertBefore(selectorID);
    $('#teamDetail').hide();
    $(selectorID).append('<div class="team_container">' + testout + '</div>');
    $(selectorID + ' div.filterItemCount').html('Showing: ' + showing);

    /* Now, build the filter boxes and set up events, if requested */
    if (filter) {
      collectFilterInfo(selectorID, groups, 'team');
    }

    teamCardResize();

    $('div.item_back').on('click', function() {
        var content = $(this).find('.item_bio').html();
        content = (content) ? content : '<p>No bio</p>'
        var front = $(this).parent();
        var img = front.find('img').attr('src');
        //var name = front.find('.item_name').clone().children().remove().end().text();
        var name = front.find('.item_title .memberName').text();
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

}

function formatLocationsDisplay(selectorID, data, attr) {
  do_maps(selectorID, data, attr);
}

/* Get the list of valid museums and the associated internal code
name and flag indicating if the museum should be shown or not */

function getMuseumList(data) {

  var temp = "";
  var theList = getCvsData(data, 'museum-list',3);
  $.each(theList,function(index,value) {
    temp = value[2].toLowerCase().trim();
    theList[index][2] = (temp === 'hide' || temp === 'yes') ? true : false;
  })
  return theList;

}

/*-------------------------------------------------------------*/
/* Address/Hours/Admissions flex boxes                         */
/*    04/10/2021 - initial                                     */
/*    Updated 03/03/2022                                       */
/*-------------------------------------------------------------*/

function formatAddressDisplay(selectorID, data, attr) {

  var museum = ('museum' in attr) ? attr['museum'] : 'aahom';
  museum = museum.toLowerCase();

  var colorClass = "museum" + museum.charAt(0).toUpperCase() + museum.slice(1);
  $(selectorID).addClass(colorClass).addClass('hoursContainer');

  // find the faq reference data
  var thedata = [];
  var i = 0;
  for (i = 0; i < data['items'].length; i++) {
    if (data['items'][i]['fullUrl'] == '/reference-data/address-hours') {
      theMuseumList.forEach(function(item, key) {
          data2 = parseData(data['items'][i]['body'], '#' + item[0]);
          thedata.push([item[0],data2])
      })
    }
  }

  var out = '';
  $.each(thedata, function( index, value ) {
    if (value[0] == museum) {
      $.each(value[1], function(index2, value2) {
        var add = value2[0];
        var text = value2[2];
        text = text.replaceAll(/\\n/g, '');
        text = text.replaceAll(/<li><\/li>/g, '<li>&nbsp;</li>');
        out += `<div><h3>${add}</h3>${text}</div>`
      })
    }
  })
  $(selectorID).html(out).css('display','flex');
}

function createGridGallery(
    selectorID,
    json,
    attr) {

    // Updated 4/4/22

    var data = {items: json['dataArray'][0]};
    var catdata = json['dataArray'][1];

    /* Process the parameters passed in the object array attr */

    var groups = ('groups' in attr) ? attr['groups'] : 'grades,outreach';
    var findCats = ('findcats' in attr) ? attr['findcats'] : '';
    var filter = ('filter' in attr) ? attr['filter'] : true;
    var showCats = ('showcats' in attr) ? attr['showcats'] : false;
    var showDots = ('dots' in attr) ? attr['dots'] : false;
    var showCount = ('showcount' in attr) ? attr['showcount'] : true;
    var featuredimage = ('image' in attr) ? attr['image'] : true;

    /* Using the json array, fill in the html for all of the items
    found in the array, plus all of the categories found */

    var dataArray = formatGalleryItems(selectorID, data);
    if (featuredimage != true) {
      $(selectorID + ' div.itemFilterImage').remove();
    }

    /* If we are showing counts, then set the count class to active */


    var theclass = (showCount==true) ? ' active' : '';
    var counter = `<div class="testing filterItemCount${theclass}"></div>`;
    $('<div id="filterContainer"></div>' + counter).prependTo(selectorID);

    /* Now, build the filter boxes and set up events, if requested */

    if (filter) {
      collectFilterInfo(selectorID, groups, 'grid', catdata);
    }
  }
function collectFilterInfo(selectorID, groups = 'grades,outreach', displayType, catdata) {

    // Updated 4/9/22
    var i = 0;
    var n = 0;
    var x = 0;
    var k = 0;
    var countOfFilters = 0;

    var allgroups = [];
    var mycats = [];
    var mycatsids = [];
    var mycatsfull = [];
    var mycatsgrps = [];

    // Get the categories and grouping data
    var cats = getCvsData({'items': catdata}, 'categories',4);
    var groupinfo = getCvsData({'items': catdata}, 'category-groups',3);

    /* Navigate through all of the selectors that contain the category
    information for each item.  Collect arrays with the item number,
    category slug name, and category full name. */

    var it = $(selectorID).find('div.itemFilterCats span.newCats');
    it.each(function() {
      var id = $(this).data('itemid');
      var cat = $(this).data('catname');
      var full = $(this).text();
      x = mycats.indexOf(cat);
      if (x === -1) {
        mycats.push(cat);
        mycatsfull.push(full);
        x = mycats.length - 1;
        mycatsids.push([id]);
        var catgroup = 'unknown';
        for (k=0; k < cats.length; k++) {
          if (allgroups.indexOf(cats[k][0])) {
            catgroup = cats[k][0];
          }
        }
        mycatsgrps.push(catgroup);
      }
      else {
        if (mycatsids[x].indexOf(id) === -1) {
          mycatsids[x].push(id);
        }
      }
    })

    /* At this point we should have two arrays.  mycats contains a list of all of the
    unique slug names for categories listed by the items.  mycatsids contains an indexed
    list of the item id's that each unique slug references. */

    // we can override the groups with a url parameter
    var param = getSearchParams("groups");
    if (param) {
      groups = param;
    }
    allgroups = groups.replace(' ','').toLowerCase().split(',');

    var out = '<div id="filterContainer"><div class="flexBox">\n';
    $.each(allgroups,function(indexall, valueall) {
      var groupx = valueall.trim().toLowerCase();
      var groupparts = groupx.split(':',3);
      var group = groupparts[0];
      var label = group;
      var type = 'checkbox';
      for (x = 0; x < groupinfo.length; x++) {
        if (groupinfo[x][0].toLowerCase() === group.toLowerCase()) {
          label = groupinfo[x][1];
          type = groupinfo[x][2];
        }
      }
      label = (typeof groupparts[1] != 'undefined' && groupparts[1] != '') ? groupparts[1] : label;
      type = (typeof groupparts[2] != 'undefined' && groupparts[2] != '') ? groupparts[2] : type;
      type = type.toLowerCase().trim();
      out = out + '<div class="filterGroup">\n';
      out = out + '<span>' + label + '</span><table class="outer">\n';
      var colorClass = "group" + group.charAt(0).toUpperCase() + group.slice(1);
      var numcols = 1;
      if (group === 'grades') {
          numcols = 2;
      }
      var curcol = 0;
      var tr = '<tr>';
      var defaultvalue = '';
      if (type === 'radio') {
          if (defaultvalue === '') {
              checked = ' checked ';
          }
          out = out + tr + '<td><input type="' + type + '" value="" name="' + group + '"' + checked + '><span>Any</span></td>\n';
          curcol = curcol + 1;
      }

      /* Now, go through the list of valid categories and see if any blog entries
      have one of the valid categories.   If so, then add it to the check/radio
      box selections */

      countOfFilters = 0;
      var lookup = '';
      $.each(cats, function(index, value) {
          lookup = value[1].toLowerCase().replaceAll(' ', '+')
            .replaceAll('%20', '+')
            .replaceAll('&','%26');
          // Only show category if it appears in at least one blog entry
          x = mycats.indexOf(lookup);

          if (value[0].toLowerCase() === group) {
              var item = value;

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
                  if (defaultvalue === lookup) {
                      checked = ' checked ';
                  }
                  out = out + tr + '<td><input type="' + type + '" value="' + lookup + '" name="' +
                    group + '"' + checked + '><span>' + value[1] + '</span></td>\n';
                  countOfFilters++;
              }
          }
     })
      out = out + '</table></div>\n';

    })

    var out = out + '</div></div>\n';
    if (countOfFilters) {
      $(selectorID).prepend(out);

      /* Call a funcion (filterGalleryShowvals) to read the current checkboxes and
      enable or disable the appropriate items.  It will also update the category item
      class to "active" for those that have been selected. */

      filterGalleryShowvals(selectorID, mycats, mycatsids, displayType);

      /* Set up an event to re-process the checkboxes whenever a change
      takes place in one of the checkboxes or radio buttons*/

      $(selectorID + ' #filterContainer input[type=checkbox], ' +
        selectorID + ' #filterContainer input[type=radio]')
        .on('change', function(e) {
          filterGalleryShowvals(selectorID, mycats, mycatsids, displayType);
      })
    }
}

function formatSlickCarousel(selectorID, json, attr) {

    var a = json['items'];
    var testout = '';
    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    var regexp = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;

    var groups = ('groups' in attr) ? attr['groups'] : 'grades,outreach';
    var findCats = ('findcats' in attr) ? attr['findcats'] : '';
    var filter = ('filter' in attr) ? attr['filter'] : false;
    var showCats = ('showcats' in attr) ? attr['showcats'] : false;
    var showDots = ('dots' in attr) ? attr['dots'] : false;
    var showCount = ('showcount' in attr) ? attr['showcount'] : false;

    var theclass = (showCount==true) ? ' active' : '';
    var counter = `<div class="filterItemCount${theclass}"></div>`;
    $('<div id="filterContainer"></div>' + counter).prependTo(selectorID);

    // Set up an array with requested categories
    var findCatsArray = [];
    if (findCats.trim() != '') {
      findCatsArray = findCats.split(',');
    }
    for (n=0; n < findCatsArray.length; n++) {
         findCatsArray[n] = findCatsArray[n].trim()
         .toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
    }

    // Set up active class if we are showing categories
    showcats = '';
    if (showCats) {
      showcats = ' active';
    }

    var showing = 0;
    var testout = `<div class="slickButtons">
        <button class="prev slick-arrow"> < </button>
        <button class="next slick-arrow"> > </button>
        </div>
        <div class="theCarousel">`;
    var i = 0;
    for (i=0; i < a.length; i++) {
      var index = i;
      var img = a[i]['assetUrl'];
      var href = a[i]['fullUrl'];
      var title = a[i]['title'];
      var source = a[i]['sourceUrl'];
      href = (source) ? source : href;

      // Process categories and filter if requested
      var categories = a[i]['categories'].sort();
      var x = mycats.findIndex((element) => {  // compare lower case
              return element.toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+') === lookup.toLowerCase();
            })
      var cats = '';
      var sep = '';
      var found = false;

      for (n=0; n < categories.length; n++) {
        var classNames = 'newCats';
        var temp = categories[n].toLowerCase().replaceAll(' ', '+').replaceAll('%20', '+');
        var x = findCatsArray.indexOf(temp);
        if (x != -1) {
          found = true;
          classNames += ' active';
        }
        cats += `${sep}<span class="${classNames}" data-itemid="${i}" data-catname="${temp}">${categories[n]}</span>`;
        sep = ', ';
      }
      if (findCatsArray.length == 0 ) { found = true;}

      // Get the excerpt and remove html tags
      var excerpt = a[i]['excerpt'];
      excerpt = excerpt.replace(/(<([^>]+)>)/gi, "");

      // If the image URL looks good then use it,
      // otherwise look for first image in body
      if (!allowedExtensions.exec(img)) {
        // doesn't look like an image url, look inside the body
        var temp = $(a[i]['body']).find('img').eq(0);
        var imgtmp = $(temp).data('src');
        if (imgtmp) {img = imgtmp;}
      }

      // output this item unless it is not included in filter

      if (found == true) {
        testout +=
            `<div class="item" data-itemid="${i}">
              <img src="${img}">
              <div class="title" data-itemid="${i}><a href="${href}">${title}</a></div>
              <div class="classcontent">${excerpt}</div>
              <div class="readmore"><a href="${href}">Read More →</a></div>
              <div class="itemFilterCats${showcats}">${cats}</div>
              </div>`;
        showing++;
      }

    }
    testout += '</div>';

    $(selectorID + ' div.filterItemCount').html('Showing: ' + showing);

    /* Now, build the filter boxes and set up events, if requested */
    if (filter) {
      collectFilterInfo(selectorID, groups, 'carousel');
    }

    // Ok, now wait for the page and finish up
    //$(document).ready(function() {
      //var temp =
      $(selectorID).append(testout);
      var theCarousel = $(selectorID).find('.theCarousel');
      $(theCarousel).slick({
        dots: showDots,
        adaptiveHeight: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        prevArrow: $(selectorID + ' .prev'),
        nextArrow: $(selectorID + ' .next'),
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

    // adjust the image aspect ratio based on width
    adjustSlickImageHeight();

    //});
    return;
}

/* ----------------------------------------------------------- */
/* Build a tabbed list of calendars from spreadsheet           */
/*    05/18/2021 - initial                                     */
/*    Updated to use fetch promise 02/16/22                    */
/*    Updated parameter list + other things 02/23/22           */
/* ----------------------------------------------------------- */

function formatCalendars(theSelector, data, attr) {

  var active = ('activetab' in attr) ? attr['activetab'] : 0;
  var single = ('singe' in attr) ? attr['single'] : false;
  var openfirst = ('openfirst' in attr) ? attr['openfirst'] : true;
  var collapsable = ('collapsable' in attr) ? attr['collapsable'] : true;
  var collapsed = ('collapsed' in attr) ? attr['collapsed'] : false;
  var title = ('title' in attr) ? attr['title'] : 'View Location Maps';

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

    theMuseumList = getMuseumList(data);

  // find the faq reference data
    var thedata = {};
    var i = 0;
    for (i = 0; i < data['items'].length; i++) {
      if (data['items'][i]['fullUrl'] == '/reference-data/calendars') {
        theMuseumList.forEach(function(item, key) {
          if (item[2] != true) { // not hiding this museum
            data2 = parseData(data['items'][i]['body'], '#' + item[0]);
            thedata[item[0]] = data2;
          }
        })
      }
    }

    var newdata = [];
    $.each(thedata, function( index, value ) {
      var before = '';
      var iframe = '';
      var after = '';
      var ar = [];
      $.each(value,function(index2, value2) {
        if (value2.length > 1) {
          var temp = value2[0].toLowerCase().trim();
          before = (temp == 'before') ? value2[1] : before;
          iframe = (temp == 'iframe') ? value2[1] : iframe;
          after = (temp == 'after') ? value2[1] : after;
          ar = [index, null, null, iframe, after];
        }

      })
      if (ar.length > 0) {
        newdata.push(ar);
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

    dataRows = newdata;

    var tab = 1;
    var tabs = '';
    var tabsdata = '';
    var iframes = [];

    var name = 'Unknown';
    var title = name;
    dataRows.forEach(function(item, key) {
      var museum = item[0];
      $.each(theMuseumList, function(index, value) {
        if (museum == value[0] && value[2] != true) {
          name = value[1];
        }
      })

      if (name != '') {
        var before = (item[2]) ? item[2] : '';
        title = name;
        var large = item[3];
        var small = large.toString().replace(/mode=MONTH/gi,'mode=AGENDA');
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
          '<p><strong>' + name + '</strong>\n' + before +
          '<div class="calendarLarge">' + large + '</div>\n' +
          '<div class="calendarSmall">' + small + '</div>\n' +
          '</p>' +
          after +
          '</div>\n';
        tab = tab + 1;
      }
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
}

/* Get CVS data found in the first code block of slugname
in the reference-data collection.  Return as an array
with all array rows filled to mincols */

function getCvsData(jsonData,slugname, mincols = 5) {
// find the reference data code block and return array
  var retdata = [];
  $.each(jsonData['items'], function(index, value) {
    if (value['fullUrl'] == '/reference-data/' + slugname) {
      var lookfor = 'div.sqs-block-code pre.source-code';
      var temp1 = $(value['body']).find(lookfor).eq(0);
      var result = $(temp1).text().split(/\r?\n/);
      retdata = [];
      $.each(result, function(index,value) {
        element = csvToArray(value);
        for (let i=element.length; i < mincols; i++) { element.push("");}
        if (element[0]) {
          retdata.push(element);
        }
      })
      retdata.shift(); // remove heading
    }
   })
  return retdata;
}

function pluralizeWord(singularWord, pluralWord, count) {
    return count > 1 ? pluralWord : singularWord;
}

function doDonorSearch(selectorID, xchar = false) {
  var thevalue = jQuery('#search').val();
  thevalue = thevalue.trim();
  $('div.donor').removeClass('showme');

  var x = 0;
  var str = '';
  var aval = thevalue.split(" ");
  aval.forEach(function(item,index) {
    if (item) {
      str = str + '[data-name*="' + item + '" i]';
    }
  })
  var good_to_go = jQuery(str).addClass('showme');


  var c = $('div.donor.showme');
  var f = $('div.donor');
  $('#found span.count').text('Found: ' + c.length);

  if (c.length != f.length) {
    $('#resetValues').addClass('show');
  } else {
    $('#resetValues').removeClass('show');
  }

  $('h3 span.found').text('');
  $('#donorInfo span.total').text('');
  if (xchar) {
    $(".ui-accordion-content").hide();
  }
  $('.donorWallDiv span.total').text('').removeClass("active");
  if (str) {
    x = $("div.donor.showme").length;
    $('.donorWallDiv span.total').text('(' + x + ')').addClass("active");
    $("#donorAccordion > div.ui-accordion-content").each(function(index, item) {
      x = $(item).find("div.donor.showme");
      if (x.length) {
        var temp = pluralizeWord(" donor", " donors", x.length);
        $(item).prev().find('span.found').text(' Found: ' + x.length + temp);
        $(item).show();
      }
    })
  }

}
/* Round the passed in value down to the nearest lower
breakpoint.  */
function findTheBreakpoint(val, breakpoints) {
  var i = 0;
  var ret = breakpoints[0];
  for (i=1; i < breakpoints.length; i++) {
    if (parseInt(val) >= parseInt(breakpoints[i])) {
      ret = breakpoints[i];
    }
  }
  return ret;
}

function do_donor_wall2(selectorID, jsonData, attr) {

  var collapsable = ('collapsable' in attr) ? attr['collapsable'] : true;
  var collapsed = ('collapsed' in attr) ? attr['collapsed'] : false;
  var title = ('title' in attr) ? attr['title'] : 'View Location Maps';

  var colMin = 0;
  var colDonor = 1;
  var colDonors = 2;
  var colEndowment = 3;
  var colRecent = 4;
  var footone = '';
  var foottwo = '';
  var notes = '';
  var donorname = "";
  var minval = "";
  var data = '';
  var foot = '';
  var donorcount = '';
  var donor = '';
  var heading = '';
  var prevMin = '';
  var maxval = ' & Above';

  var defaultbreakpoints = [
    1,1000,5000, 10000, 25000,
    50000, 100000, 250000, 500000, 1000000
    ];

   var breakpoints = ('breakpoints' in attr) ? attr['breakpoints'] : defaultbreakpoints;
   $.each(breakpoints, function(index, v) {
    breakpoints[index] = parseInt(breakpoints[index]);
   })
   breakpoints.sort(function(a, b){
    return parseInt(b[0]) - parseInt(a[0])
    }); // --> 3, 12, 23

  // Get the donor CVS data from reference-data/donorwall
  var donors = getCvsData(jsonData, 'donorwall',5);

  var a = jsonData;
  var images = [];
  var fullUrl = '';
  var temp = [];
  $.each(jsonData['items'], function(index, item) {
    if ('fullUrl' in item) {
      fullUrl = item['fullUrl'];
      temp = fullUrl.split("/");
      if (temp[1] === 'reference-data' && temp[2] ==='donorwall') {
        var tempimg = $(item['body']).find('div.sqs-gallery div.slide');
        $.each(tempimg, function(index2, item2) {
          src = $(item2).find('img').data('image');
          images.push(src);
        })
      }
    }
  })

  var layout = `
  <label for="search">Search:</label>
    <div class="searchBox">
      <input type="text" id="search">
      <span class="total"></span>
    </div>
  <div id="donorData">
    <div class="item">
      <div id="donorAccordion"></div>
    </div>
    <div class="item">
      <div id="donorInfo"></div>
    </div>
  </div>`;
  $(selectorID).html(layout);
  $(selectorID).addClass('donorWallDiv');
  donors.sort(function(a, b){
    return parseInt(b[0]) - parseInt(a[0])
    }); // --> 3, 12, 23
  donors.forEach(function(item, key) {
      if (item[colMin] && item[colDonor] &&
          (parseInt(item[colMin]) >= parseInt(breakpoints[0])) ) {
          item[colMin] = parseInt(item[colMin].toString().replace(/[^0-9.-]+/g,""));
          donorname = item[colDonor];
          minval = findTheBreakpoint(item[colMin], breakpoints);
          if (prevMin != minval && minval) {
            // new group
            if (prevMin) {
              maxval = ' - ' + formatter.format(prevMin - 1);
              data += "</div>";
            }
            var heading = formatter.format(minval);
            data += `<h3>${heading}${maxval}<span class="found">test</span></h3><div>\n`;
            prevMin = minval;
          }
          if (donorname == 'Anonymous') {
            if (item[colDonors]) {
              donorcount = `<span class="donorCount">(${item[colDonors]})</span>\n`;
            }
            else {
              donorcount = `<span class="donorCount">(1)</span>\n`;
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
            data += `<div class="donor" data-name="${donorname}">${donorname}${donorcount}${foot}</div>\n`;
          }
          else {
            notes += `<div class="note">${donorname}</div>\n`;
          }

      }
  })
  data += "</div>";

  // Add the sponsors images from the refrence data gallery in donorswall
  var other = `
  <p>We are grateful to the following museum, arts, and culture-based associations for their generous support over the years.</p>
  <div id="sponsors">`;
    $.each(images,function(index,img) {
    other += `<img src="${img}?format=300w" class="logo">`;
    })
    other += "</div>";

  $(selectorID).addClass('donorWall');
  //$(selectorID).prepend(searchbox);
  $(selectorID + " #donorAccordion").html(data);
  $(selectorID + " #donorInfo").append(footone).append(notes).append(other);

  $('#search').on('keyup', function (event) {
      doDonorSearch(selectorID, true);
    });
  doDonorSearch(selectorID);
  $( selectorID + " #donorAccordion").accordion({
      heightStyle: "content",
      collapsible: true
    });
}

//https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data

 function csvToArray(text) {
    let p = '', row = [''], ret = row, i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    ret.map((element) => element.trim());
    return ret;
  };

