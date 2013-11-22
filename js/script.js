(function() {
	var myZip, mapCounty, countyName, mySales, myGap, myPrice;

	$(document).ready(function(){
		$.ajax({
			type: "GET",
			url: "data/zips.xml",
			dataType: "xml",
			success: parseZIPS
		});
	});
	function parseZIPS(xml){
		$(xml).find("ZIP").each(function(){
			myZip = $(this).attr('ZIP_CODE');
			countyName = $(this).attr('COUNTY');
			myID = countyName + "_" + myZip;
			myGap = parseFloat($(this).attr('GAP'));
			mySales = $(this).attr('SALES');
			myPrice = $(this).attr('PRICE');
			mapCounty = myZip;

			if(myGap === undefined || isNaN(myGap)){
				$("#" + mapCounty).css({ 'fill':'#FFFFFF' });
			} else if(myGap > 3){
				$("#"+myID).css({ 'fill':'#C30206' });
			} else if(myGap < -3){
				$("#"+myID).css({ 'fill':'#0055A3' });
			} else {//light blue: #A3C0DC
				$("#"+myID).css({ 'fill':'#2D8221' });
			}
			$("#"+myID).hover(function (){
				$(this).css({ 'stroke-width': 3 });
			},function(){
				$(this).css({ 'stroke-width': 0.75 });
			});
			if(!isNaN(myGap)){
				$("#"+myID).qtip({
					content: "<h3 class='tip-title'>"+countyName+" "+myZip+"</h3> Median gap: " + myGap + "%<br><span class='metainfo'>*</span>Median price: " + myPrice + "<br><span class='metainfo'>*</span>Sales: " + mySales,
					show: { solo: true, delay: 0,when: { event: 'mouseover' } },
					hide: { fixed: true, delay: 0, when:'mouseout'}, style: {'font-family':'Arial', width: { min:190, max: 250 }, tip: false },
					position: {
						adjust: {screen:true, x: 38, y: 40},
						/*corner: {
						target: 'mouse',
						tooltip: 'bottomRight'
						}*/
					}
				});//qtip
			} else {
				$("#"+myID).qtip({
					content: "<h3 class='tip-title'>"+countyName+" "+myZip+"</h3> Data not available<br>",
					show: { solo: true, delay: 0, when: { event: 'mouseover' } },
					hide: { fixed: true, delay: 0, when: 'mouseout' }, style: { 'font-family':'Arial', width: { min:150, max: 250 }, tip: false },
					position: {
						adjust: { screen:true, x: 38, y: 40 },
					}
				});//qtip
			}
		});//parseXML
	}
	function addCommas(x) {
		//x = x*1000;
		x = Math.round(x);
		if(x){
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}
}());