/* ----------------------------------------------------------- */
/* Generate MailChimp html                                     */
/* ----------------------------------------------------------- */

var thestyles2 = `<style>
h2.sectionType{
  text-align: left;
  font-weight: normal;
  color: #0000CD;
  font-size: 32px;
  margin: 24px 0 24px 0}
img.theimg{
  width: 150px;
  height: auto;
  object-fit: cover;
  float: left;
  margin: 5px 10px 5px 0;
  padding: 0;}
div.contentData:not(:first-child){margin-top: 24px}
div.contentData{content: "";clear: both;}
p.contentData{margin: 0;padding: 0}div.title{font-weight: bold;font-size: 16px;color: #4B0082}
.datetime{font-style: italic;font-size: .9em}
.startdate{color: black;font-weight: 700}
div.contentData p{white-space: normal !important}
div.contentData > p:first-of-type{margin-top: 0 !important}
</style>`;

function copyToClipboard2(selector) {
  var beautify = $(selector).html();
  beautify = cleanup2(beautify);
  $('textarea').addClass('active')
  $('textarea').val(beautify);
  $('textarea').select();
    document.execCommand("copy");
    alert('HTML copied to clipboard');
}

function formatAMPM(thedate) {

    var myDate = new Date(thedate);
    var pstDate = myDate.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles"
    })
    var date = new Date(pstDate);

    const months = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday",
    "Friday","Saturday"];

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = days[date.getDay()] + ", " + months[date.getMonth()]
        + " " + date.getDate() + ", " + date.getFullYear() + " " + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function cleanup2(beautify) {
    beautify = beautify.replace(/\<p style=\"white-space:normal;\"\>\<\/p\>/gi,'');
    beautify = beautify.replace(/\<p\>\<\/p\>/gi,'');
    beautify = beautify.replace(/white-space:pre-wrap;/gi,'white-space:normal;');
    beautify = beautify.replace(/\<strong\>(\s+)*\<\/strong>/gi,'');
    beautify = beautify.replace(/\<em\>\<\/em\>/gi,'');
    beautify = beautify.replace(/\<\/a\>[\s\r\n\t]*\./gi,'\<\/a\>.');
    beautify = beautify.replace(/\<\/a\>[\s\r\n\t]*\,/gi,'\<\/a\>,');
    beautify = beautify.replace(/\t*/gi,'');
    return beautify;
}


/* Main entry point called from code on page,
This calls recursiveAjax to collect all of the blog
data and then returns to the callback routine for
processing */

function theControl(selectorID,
  collection = ["announcements"],
  type = 'mailchimp',
  attr = {}) {
  var offset = "";
  var items = []
  recursiveAjaxCall2(
    collection,
    offset, selectorID, theMailchimpCallback2, items, attr, true);
}

function theMailchimpCallback2(selectorID,json, attr) {
  var prevsection = "";
  var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  var i = 0;
  var theimg = "";
  var img = ""
  var href = "";
  var parts = [];
  var temp = "";
  var imgtmp = "";
  var title = "";
  var itemtitle = "";
  var tags = [];
  var excerpt = "";
  var bio = "";
  var sections = [
    ["announcements","Announcements"]
  ]

  sections = ('sections' in attr) ? attr['sections'] : sections; 
  var findCats = ('findcats' in attr) ? attr['findcats'] : '';

  // Set up an array with requested categories
  var findCatsArray = [];
  console.log(typeof findCats);

  if (typeof findCats === 'object') {
    var findCatsArray = findCats.map(element => {
      return element.toLowerCase();
    });
  }
  else {
    if (findCats.trim() != '') {
      findCatsArray = findCats.toLowerCase().split(',');
    }
  }
  console.log(findCatsArray);

  var out = '';
  var body = '';
  var startdata = '';
  var starttime = '';
  var enddate = '';
  var endtime = '';
  var starting = '';
  var addit = `
    <div id=controls-wrapper>
      <button id="copyToClip" onclick="copyToClipboard2('${selectorID}')">Copy to clipboard</button>
      <textarea placeholder="insert html" ></textarea>
    </div>`;

  $(selectorID).append(thestyles2);
  $(selectorID).before(addit);
  $(selectorID).css('border','1px solid black').css('padding','10px');
  $.each(json["items"], function(index, value) {

    categories = ('categories' in value) ? value['categories'].sort() : [];
    console.log(categories);
    $.each(categories,function(index, value) {
      categories[index] = categories[index].toLowerCase().trim();
    })

    // If we have a list of required categories, then
    // look through the categories and verify
    myflag = true;
    if (findCatsArray.length) {
      myflag = false;
      $.each(findCatsArray,function(index, value) {
        if (categories.indexOf(value.trim()) != -1) { myflag = true;}
      })
    }

      console.log('myflag=' + myflag);

      if (myflag == true) {
        // get the data for this blog entry
        theimg = "";
        img = value["assetUrl"];
        href = value["fullUrl"];
        title = value["title"];
        body = $(value["body"]);
        content = $(body).find("div.sqs-block-html div.sqs-block-content")
          .html();
        if (typeof content != "undefined") {
        startdate = ('startDate' in value) ? value['startDate'] : '';
        enddate = ('endDate' in value) ? value['endDate'] : '';
        
        content = cleanup2(content);
        parts = href.split("/");
        if (!allowedExtensions.exec(img)) {
          // doesn't look like an image url, look inside the body
          imgtmp = $(value["body"]).find("img").eq(0).data("src");
          if (imgtmp && allowedExtensions.exec(imgtmp)) {
            img =imgtmp;
          }
          else {img = '';}
        }
        img = (img) ? `<img class="theimg" src="${img}">` : '';

        // if this is a new section then put out section header
        if (prevsection != parts[1]) {
          prevsection = parts[1];
          sectionName = parts[1];
          $.each(sections, function(index, value) {
            if (parts[1] === value[0]) {
              sectionName = value[1];
            }
          })
          out += `<h2 class="sectionType">${sectionName}</h2>`;
        }

        starting = '';
        if (startdate) {
          var datestring = formatAMPM(startdate);
          starting = `<div class="startdate">${datestring}`;
          if (starttime) {
          starting += ` ${starttime}`;
          }
          starting += "</div>";
        }
        // Now add the blog info
        out += `<div class="contentData" style="clear:both;">
            <div class="title">${title}</div>
            ${starting}
            ${img}
            <p style="white-space:normal;">${content}</p>
          </div>`;
        }
      }
  })
  out += `<div style="clear:both;"></div>`;
  $(selectorID).append(out);
  $('div.contentData').each(function(index, v) {
    var temp = $(v).find('p:first').text().trim();
    if (temp === '') {$(v).find('p:first').remove(); }
  })
  $(selectorID).find('p:empty').remove();
  $(selectorID).css('display','block');
  $('button#copyToClip').css('display','block');
}