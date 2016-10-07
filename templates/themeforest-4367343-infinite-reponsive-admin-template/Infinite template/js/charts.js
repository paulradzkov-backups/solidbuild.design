$(function(){

	var sin = [], cos = [];
		for (var i = 0; i < 21; i += 0.5) {
			sin.push([i, Math.sin(i)]);
			cos.push([i, Math.cos(i)]);
	}

	var plot = $.plot($("#chartdemo01"),
		[ { data: sin, label: "Sales (this month)"}, { data: cos, label: "Profit (this month)" } ], {
			series: {
			lines: { show: true },
			points: { show: true, lineWidth: 1.5 }, 
			shadowSize: 0,
		},
			grid: { hoverable: true, clickable: true, borderWidth: 0 },
			yaxis: { min: -1.2, max: 1.2 },
		    colors: [ "#ef5f3c", "#089dcf" ],
	        legend: {
	            show: false
	        }
	});

	function showTooltip(x, y, contents) {
	    $('<div id="tooltip">' + contents + '</div>').css( {
	        position: 'absolute',
	        display: 'none',
	        //float: 'left',
	        top:  y - 40,
	        left: x - 30,
	        color: '#afafaf',
	        fontSize: '11px',
	        fontFamily: 'Arial',
	        fontWeight: 'normal',
	        '-webkit-border-radius': '2px',
	        '-moz-border-radius': '2px',
	        'border-radius': '2px',
	        padding: '4px 10px',
	        'background-color': 'rgba(47, 47, 47, 0.95)'
	    }).appendTo("body").fadeIn(200);
	 }


	var previousPoint = null;
	$("#chartdemo01").bind("plothover", function (event, pos, item){
	    $("#x").text(pos.x.toFixed(2));
	    $("#y").text(pos.y.toFixed(2));
	    if (item) {
	        if (previousPoint != item.dataIndex){
	            previousPoint = item.dataIndex;

	            $("#tooltip").remove();
	            var x = item.datapoint[0].toFixed(2),
	                y = item.datapoint[1].toFixed(2);

	                showTooltip(item.pageX, item.pageY,
	                        item.series.label +" = "+ y);
	                                            }
	    }
	    else {
	        $("#tooltip").remove();
	        previousPoint = null;
	     }
	});

	var data = [];
	var series = Math.floor(Math.random()*10)+1;
	for( var i = 0; i<series; i++)
		{
			data[i] = { label: "Series"+(i+1), data: Math.floor(Math.random()*100)+1 }
		}


	$.plot($("#donut"), data, 
	{
			series: {
				pie: { 
					show: true,
					innerRadius: 0.5,
					radius: 1,
					label: {
						show: false,
						radius: 2/3,
						formatter: function(label, series){
							return '<div style="font-size:11px;text-align:center;padding:4px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
						},
						threshold: 0.1
					}
				}
			},
			legend: {
				show: true,
				noColumns: 1, // number of colums in legend table
				labelFormatter: null, // fn: string -> string
				labelBoxBorderColor: "#000", // border color for the little label boxes
				container: null, // container (as jQuery object) to put legend in, null means default on top of graph
				position: "ne", // position of default legend container within plot
				margin: [5, 10], // distance from grid edge to default legend container within plot
				backgroundColor: "#efefef", // null means auto-detect
				backgroundOpacity: 1 // set to 0 to avoid background
			},
			grid: {
				hoverable: true,
				clickable: true
			},
	});


});