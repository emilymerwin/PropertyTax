(function() {
	$('#map').load('assets/metrozips.svg', null, function(data) {
		$.ajax({
			type: "GET",
			url: "data/zips2013.json",
			dataType: "json",
			success: parseZIPS
		});

		function parseZIPS(json){
			var tooltip = $("#tooltip");
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
				$("#"+myID).hover(function (event){
					var $county = $(this), tmp = $(this).detach();
					$("svg").append(tmp); //move it to top level for stroke highlighting
					$(this).css({ 'stroke-width': 3 });
					if(!$county.tip){
						var tip = tipText();
						$county.tip = tip; //store it so we don't have to parse all that again
						$county.xPosition = event.pageX+20;
						$county.yPosition = event.pageY-20;
					}
					placeTip($county.xPosition, $county.yPosition, $county.tip);
				}, function(){
					$(this).css({ 'stroke-width': 1 });
					tooltip.css("display", "none");
				});

				function tipText (){
					if(!isNaN(myGap)){
						return "<h3 class='tip-title'>"+ZIP.COUNTY+" "+ZIP.ZIP_CODE+"</h3>Median gap: " + ZIP.GAP + "%<br><span class='metainfo'>*</span>Median price: " + ZIP.PRICE + "<br><span class='metainfo'>*</span>Sales: " + ZIP.SALES;
					} else {
						return "<h3 class='tip-title'>"+ZIP.COUNTY+" "+ZIP.ZIP_CODE+"</h3>Data not available";
					}
				}
			}); //json.forEach

			function placeTip(x, y, html){
				tooltip
					.css("left", x+"px")
					.css("top", y+"px")
					.css("display", "block")
					.html(html);
			}
		};//parseZIPs
	});
}());