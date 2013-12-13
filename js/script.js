(function() {
	$('#map').load('assets/metrozips.svg', null, function(data) {
		$.ajax({
			type: "GET",
			url: "data/zips2013.xml",
			dataType: "xml",
			success: parseZIPS
		});
	});

	function parseZIPS(xml){
		var myZip, mapCounty, countyName, mySales, myGap, myPrice;

		$(xml).find("ZIP").each(function(){
			myZip = $(this).attr('ZIP_CODE');
			countyName = $(this).attr('COUNTY');
			myID = countyName + "_" + myZip;
			$("#"+myID).attr("class", "county");
			myGap = parseFloat($(this).attr('GAP'));
			mySales = $(this).attr('SALES');
			myPrice = $(this).attr('PRICE');
			mapCounty = myZip;

			if(myGap === undefined || isNaN(myGap)){
				$("#" + mapCounty).css({ 'fill':'#FFFFFF' });
			} else if(myGap > 3){
				$("#"+myID).css({ 'fill':'#CB372D' });
			} else if(myGap < -3){
				$("#"+myID).css({ 'fill':'#463770' });
			} else {//light blue: #A3C0DC
				$("#"+myID).css({ 'fill':'#F4C556' });
			}
			$("#"+myID).hover(function (){
				var tmp = $(this).detach();
				$("svg").append(tmp);
				$(this).css({ 'stroke-width': 3 });
			},function(){
				$(this).css({ 'stroke-width': 0.75 });
			});
			if(!isNaN(myGap)){
				$("#"+myID).qtip({
					content: {
						title: countyName+" "+myZip,
						text: "Median gap: " + myGap + "%<br><span class='metainfo'>*</span>Median price: " + myPrice + "<br><span class='metainfo'>*</span>Sales: " + mySales
					},
					style: {
						classes: 'qtip-light',
						tip: {
							corner: false
						}
					}
				});//qtip
			} else {
				$("#"+myID).qtip({
					content: {
						title: countyName+" "+myZip,
						text: " Data not available"
					},
					style: {
						classes: 'qtip-light',
						tip: {
							corner: false
						}
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