var sheet = document.styleSheets[0];
var colourSelected = "#FFF";
var canvas = document.getElementById("colour_picker").getContext("2d");

$(document).ready(function(){
    setUpColourPicker();
	makeGrid(16);

	$("#colour_picker").on("click", function(){
		// get position of click
		var x = event.pageX - this.offsetLeft;
		var y = event.pageY - this.offsetTop;

     
		// extract rgb values
		var imgData = canvas.getImageData(x,y, 1,1).data;
		var R = imgData[0];
		var G = imgData[1];
		var B = imgData[2];

		var rgb = R + "," + G + "," + B;
		var hex = rgbToHex(R,G,B);

		$("#rgb input").val(rgb);
		$("#hex input").val("#" + hex);
		colourSelected = "#" + hex;

		 document.getElementById("colour_display").setAttribute("style", "background-color:" + colourSelected + ";");
        
	});
	
});

function resetGrid(){
	var N = document.getElementById("size_form").elements[0].value;	
	clearGrid();
	makeGrid(N);
}

function makeGrid(sideLengthInBoxes) {
	clearGrid();
	var boxLength = (1/sideLengthInBoxes)*100;
	setBoxStyle(boxLength);
	var box = makeBox();
    for (var i = 0; i < sideLengthInBoxes*sideLengthInBoxes ; i++) {
		$("#grid").append(box);	
    }
	
	// important to put listener here so that it no boxes are created after
	// this code is run
	$(".box").on("click", function(){
																						  
		$(this).get(0).setAttribute("style", "background-color:" + colourSelected + ";");
		
	   
	});


}

function clearGrid() {
	$("#grid").empty();
}

function setBoxStyle(boxLength){
	sheet.deleteRule(0);
	var ruleText = ".box{height :" + boxLength + "%; width : " + boxLength + "%; background-color: #FFF; display: inline-block;}";
	sheet.insertRule(ruleText,0);
}

function makeBox() {
    return "<div class=\"box border\"></div>";
}

function setUpColourPicker(){
	var img = document.createElement("img"); 
	img.crossOrigin = "anonymous";
	img.src = "images/color-picker.png";
	$(img).on("load", function(){
		canvas.drawImage(img,0,0);
	});
	
}

function toggleGrid(){
	$('#grid').children('div').each(function(){
		$(this).toggleClass("border");
	});

}

function rgbToHex(R,G,B){ return toHex(R)+toHex(G)+toHex(B);}

function toHex(n){
	n = parseInt(n,10);
	if (isNaN(n)) return "00";
	n = Math.max(0,Math.min(n,255));
	return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}
