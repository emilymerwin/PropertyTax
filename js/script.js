(function() {
	$('#map').load('assets/metrozips.svg', null, function(data) {
		$.ajax({
			type: "GET",
			url: "data/zips2013.json",
			dataType: "json",
			success: parseZIPS
		});

		function parseZIPS(json){
			json.forEach(function(ZIP){
				var myID = ZIP.COUNTY + "_" + ZIP.ZIP_CODE,
				me = $("#"+myID),
				myGap = parseFloat(ZIP.GAP);
				me.attr("class", "county");
				if(myGap === undefined || isNaN(myGap)){
					$("#" + myID).css({ 'fill':'#FFFFFF' });
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
							title: ZIP.COUNTY+" "+ZIP.ZIP_CODE,
							text: "Median gap: " + myGap + "%<br><span class='metainfo'>*</span>Median price: " + ZIP.PRICE + "<br><span class='metainfo'>*</span>Sales: " + ZIP.SALES
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
							title: ZIP.COUNTY+" "+ZIP.ZIP_CODE,
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
			});
		}
	});

	function addCommas(x) {
		//x = x*1000;
		x = Math.round(x);
		if(x){
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}
}());