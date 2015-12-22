var validDirections = ["top", "right", "left", "bottom"]
var validColors = ["blue", "red", "gray", "black", "white", "green", "yellow", "purple", "brown", "gold", "pink", "orange", "silver"]
var numberOfChanges = 0;

function overlayFurnitureExample(furnitureName) {
	var el = $("[example-name=" + furnitureName + "]")
	el.css({"position": "relative"})
	var overlay = $("<div class='example-overlay'><div class='example-name'>" + furnitureName + "</div></div>");
	el.append(overlay);
	return overlay
}

function overlayExamples() {	
	exampleElements.each(function(i, el) {				
		$(el).css({"position": "relative"})		
		$(el).append("<div class='example-overlay'><div class='example-name'>" + $(el).attr("example-name") + "</div></div>");
	})
}

function overlayHtmlExamples() {	
	exampleElements.each(function(i, el) {				
		$(el).css({"position": "relative"})		
		var exampleOverlay = $("<div class='example-overlay'></div>");
		var elId = $(el).attr("example-id")			
		exampleOverlay.append(generateExampleHtmlOverlay(elId))
		$(el).append(exampleOverlay);
	})
}

function generateExampleHtmlOverlay(id) {
	var htmlExample = $("<div class='html-example'></div>");
	var shadowEl = $("#" + id)[0];
	var escaped = htmlExample.text(shadowEl.outerHTML).html();			
	htmlExample.html(prettifyHtml(escaped));
	

	return htmlExample
}

function prettifyHtml(htmlString) {
	// // clean up the style tag so when jquery adds extra stuff for different browsers, that doesn't show to the user.
	// var cleanStyleRegEx = /(background|top|right|left):\s(\w+)\b([^;"]*)/g
	// var cleanStyleArr = []
	// var match = cleanStyleRegEx.exec(htmlString)
	// while (match !== null) {
	// 	cleanStyleArr = cleanStyleArr.concat(match[1] + ": " + match[2])		
	// 	match = cleanStyleRegEx.exec(htmlString)
	// }	

	// htmlString = htmlString.replace(new RegExp('style="[^"]+"', 'g'), 'style="' + cleanStyleArr.join("; ") + '"');

	// insert special tags around each attribute
	htmlString = htmlString.replace(new RegExp('(\\S+)=("[^"]*")', 'g'), "<span class='attr-highlight-$1'>$1=$2</span>");

	// insert line breaks where necessary	
	htmlString = htmlString.replace(RegExp('&lt;br&gt;', 'g'), "<br>");	

	// insert special tags around the text and tags, so we can highlight them		
	htmlString = htmlString.replace('"&gt;', '"&gt;</span><span class="content-highlight">').replace('&lt;/', '</span><span class="tag-highlight">&lt;');
	htmlString = htmlString.replace('&gt;', '&gt;</span>').replace('&lt;', '<span class="tag-highlight">&lt;');

	// debugger;

	return htmlString 
}

// functions to style an el, it's shadow el and update html in the overlay
function style(id, prop, attr) {
	var el = $("[example-id=" + id + "]")
	var shadowEl = $("#" + id)	

	el.css(prop, attr);	
	shadowEl.attr("style", prop + ": " + attr);	

	el.find(".example-overlay").html(generateExampleHtmlOverlay(id));
}

function clearStyle(id) {
	var el = $("[example-id=" + id + "]")
	var shadowEl = $("#" + id)	

	el.css({background: "", top: "", right: "", left: "", bottom: ""});
	shadowEl.css({background: "", top: "", right: "", left: "", bottom: ""});

	el.find(".example-overlay").html(generateExampleHtmlOverlay(id));
}

function animate(id, newStyle) {
	var el = $("[example-id=" + id + "]")
	var shadowEl = $("#" + id);

	el.animate(newStyle, { duration: 1000 });	
	shadowEl.animate(newStyle, { duration: 1000,progress: function() {
		el.find(".example-overlay").html(generateExampleHtmlOverlay(id));
	}});	
}

function resetWithOverlays() {	
	exampleElements.css({background: "", top: "", right: "", left: "", bottom: ""});
	shadowElements.css({background: "", top: "", right: "", left: "", bottom: ""});
	// should be synced to what is in index.css
	$(".example-overlay").css("background", "rgba(80,80,80,.9)");
}

function flashOverlays(numberOfCycles) {
	flash($(".example-overlay"), numberOfCycles)
}

function flashOverlay(id, numberOfCycles) {
	flash($("[example-id=" + id + "]").find(".example-overlay"), numberOfCycles)	
}

function flash(elements, numberOfCycles, callback) {
	var cycles = 0;	
	function cycle() {
		elements.css({ background: "rgba(256, 256, 256, .9", color: "darkgrey" });		
		setTimeout(function() { 
			elements.css({ background: "rgba(80, 80, 80, .9)", color: "white" })
			cycles += 1
			if (cycles < numberOfCycles) {
				setTimeout(cycle, 300)
			} else {
				callback && callback();
			}
		}, 300)		
	}
	
	cycle()	
}

// echos and deletes any empty prompt lines
function echo(term, text) {
	// first replace my custom tags with single characters, so they don't get cutoff if the terminal wraps to a new line.
	term.echoHelp(text);
}

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

var currentTask = "";
function setTask(task) {
	currentTask !== task && term.echoTask(task);	
	currentTask = task;
}

function setSection(sectionName) {
	$(".section-name").html(sectionName);
}

function sendEmail(emailAddress) {
	$.ajax({
		type: "post",
		url: "//formspree.io/learn@classadoo.com",
		data: {
			email_address: emailAddress			
		},
		success: function(resp) {
			console.log("email response is", resp);
		}
	})
}

function shadowCss($el, prop, attr) {
	var currentStyle = $el.attr("style") 
	var styleArr;
	if (currentStyle) {
		styleArr = currentStyle.split(";");	
	} else {
		styleArr = []
	}
	
	styleArr = styleArr.concat(prop + ": " + attr);
	$el.attr("style", styleArr.join("; "));
}

function logComplete(sectionNumber) {
	return function() {
		ga('send', 'event', 'tutorial', sectionNumber);
	}
}


