/* ----------------------------------------------------------- */
/* Get the requested data                                      */
/* ----------------------------------------------------------- */

function doAjaxCall(theurl, startdate='12/29/2022') {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: theurl,
	   dataType: 'text',
      data: { 
        "startdate": startdate
      },
      success: function (data) {
        resolve(JSON.parse(data))
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}

function formatAMPM(thedate) {

	var ret = []; 
    var myDate = new Date(thedate);
    //if (myDate ==)
    var pstDate = myDate.toLocaleString("en-US", {
      timeZone: "America/Detroit"
    })
    var date = new Date(pstDate);

    const months = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday",
    "Friday","Saturday"];

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    var strTime = days[date.getDay()] + ", " + months[date.getMonth()]
        + " " + date.getDate() + ", " + date.getFullYear() + " " + hours + ':' + minutes + ampm;
    var key = days[date.getDay()] + ", " + months[date.getMonth()]
        + " " + date.getDate() + ", " + date.getFullYear();
    ret = [date, (date.getMonth() +1) + '/' + (date.getDate()) + '/' + date.getFullYear(),
    		key , 
    		days[date.getDay()].substr(0,3),
    		months[date.getMonth()].substr(0,3),
    		date.getDate(),
    		hours + ':' + minutes + ampm];
    return ret;
}   
function refreshData(selectorID, thedate, refreshMinutes, defaultImage = '', backgroundImage = '') {

	var formatted = formatAMPM(thedate);
	var startdate = formatted[1];

	var todayData = []; 
	var futureData = [];
	var todayHtml = ''; 
	var futureHtml = ''; 

	var dataURL = 'https://script.google.com/macros/s/AKfycbx_jUAIh11lopjr7gTl92FsXhFRWX3qCM_RS9fkuxDwgD_49yvGxmuotmIfcQPkZEJi/exec';
	//var startdate = '12/29/2022';
	//var theData = getGoogleData(dataURL, startdate);

	doAjaxCall(dataURL, startdate)
		.then((theData) => {
		// start data process
			var temp = formatAMPM(new Date());
			var todayDate = `
					<div class="agendaMonth">${temp[4]}</div>
					<div class="agendaDay">${temp[5]}</div>
					<div class="agendaWeekday">${temp[3]}</div>`;

			$('#sideBySide .box:first-child .summary .itembox .item .date .agendaDate').html(todayDate);

			var prevdate = ''; 
			futureHtml = '<div class="title">Coming Up</div>';
			theData.forEach(function(item,key) {
				var time1 = formatAMPM(item[1]);
				var time2 = formatAMPM(item[2]);
				if (item[4] != "") {
					
					// if the event is today then 
					if (time1[1] == startdate) {
						// if we haven't yet put the date block
						if (todayHtml == '') {
							todayHtml = 
							`<div class="title">Happening today</div>
								<div class="itembox">
									<div class="item">
										<div class="date">
											<div class="agendaDate">
												<div class="agendaMonth">${time1[4]}</div>
												<div class="agendaDay">${time1[5]}</div>
												<div class="agendaWeekday">${time1[3]}</div>
											</div>
										</div>`;
						}
						// create the event content
						todayHtml += 
						`<div class="itemInfo">
							<!-- First event for today -->
							<div class="eventBlock">
								<span class="title">
									${item[0]}
								</span><br>
								<span class="time">${time1[6]} - ${time2[6]}</span>
								<div class="happening">${item[4]}</div>
							</div>`;
						todayData.push(temp);
					}
					else {
						if (prevdate != time1[1]) {
							futureHtml += `<!-- processing ${time1[1]} -->`;
							if (prevdate != '') {
								futureHtml += '</div></div></div><!-- next future date -->';
							}
							// start of new day 
							futureHtml += 
								`<div class="itembox">
									<div class="item">
										<div class="date">
											<div class="agendaDate">
												<div class="agendaMonth">${time1[4]}</div>
												<div class="agendaDay">${time1[5]}</div>
												<div class="agendaWeekday">${time1[3]}</div>
											</div>
										</div>
										<div class="itemInfo">`;
							
							prevdate = time1[1];
						}
						futureHtml += 
						`<!-- First event for today -->
							<div class="eventBlock">
								<span class="title">
									${item[0]}
								</span><br>
								<span class="time">${time1[6]} - ${time2[6]}</span>
							</div>	
						`;
					
					}
				}
		    })

		    if (todayHtml != '') {
		    	todayHtml += '</div><!-- final today-->';
		    	
		    }
		    else {
		    	//todayHtml = `<img src="https://www.grcrane2.com/lights%20of%20the%20round%20table.jpg">`;
		    	todayHtml = `<img src="${defaultImage}">`;
		    };
		    $('#sideBySide .box:first-child .summary').html(todayHtml);
		    if (futureHtml != '') {
		    	futureHtml += '</div><!-- final future-->';
		    	$('#sideBySide .box:nth-child(2) .summary').html(futureHtml);
		    }

		 		/* look for days that overflow off the page and hide them */
		    var t = $('#sideBySide')[0].clientHeight;
		    $($('#sideBySide .box:nth-child(2) .summary div.itembox').get().reverse()).each(function(index, value){
			  var bottom = this.clientHeight + this.offsetTop; 
			  if (bottom > t) {
			  	$(this).hide();
			  }
			});

			var updated = formatAMPM(new Date());

			$('body').css('background-image', 'url("' + backgroundImage + '")');

			$('#refreshedSign').html('<div>Updated<br>' + updated[1] + ' ' + updated[6] + '</div>');

			if (refreshMinutes != '') {
				var refreshMil = 1000 * 60 * refreshMinutes;
				setTimeout(collectionControl, refreshMil, 
					selectorID,
					'',
					'signage',
					{ refresh: refreshMinutes});
			}

		// end data process
		
		})
		.catch((error) => {
		console.log(error)
		var temp = `<div>${error.statusText}</div>`;
		$('#signageDiv').html(temp);
	})
   
}

function startSignage(selectorID, json = [], attr = {}) {

	var a = json['items'];
	var temp = $(a[0]['body']).find('img').eq(0);
	var defaultImage = $(temp).data('src');
	var temp = $(a[0]['body']).find('img').eq(1);
	var backgroundImage = $(temp).data('src');

	var signage = `<div id="signagePage">
		<div id="refreshedSign"></div>
		<section>
			<div id=sideBySide>
				<div class="box">
					<div class="summary">		
					</div>
				</div>
				<div class="box">
					<div class="summary">
					</div>
				</div>
			</div>
		</section>
		</div>`;

	$(selectorID).html(signage);

	attr = toLowerKeys(attr); // make sure the keys re lowercase

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	var thedate = new Date(); 
	var refreshMinutes = ('refresh' in attr) ? attr['refresh'] : '';

	if (urlParams.get('fontsize') != null) {
		var theFont = urlParams.get('fontsize');
		var newSize = 25 * theFont;
		 $(":root").css({"--global-sign-text-size": newSize + 'px'});
		 newSize = 20 * theFont;
		 $(":root").css({"--global-sign-calendar-text-size": newSize + 'px'});
		 newSize = 15 * theFont;
		 $(":root").css({"--global-sign-text-event-time": newSize + 'px'});
		 newSize = 70 * theFont;
		 console.log('setting width to ' + newSize);
		 $(":root").css({"--global-sign-date-box-width": newSize + 'px'});
	}
	if (urlParams.get('date') != null) {
		thedate = new Date(urlParams.get('date'));
	}
	if (urlParams.get('refresh') != null) {
		refreshMinutes = urlParams.get('refresh');
		refreshMinutes = refreshMinutes.replace(/\D/g,'');
	}
	refreshMinutes = refreshMinutes.toString().replace(/\D/g,'')
	if (thedate == 'Invalid Date') {
		thedate = new Date(); // problem with passed date 
	}
	refreshData(selectorID, thedate, refreshMinutes, defaultImage, backgroundImage);	
}