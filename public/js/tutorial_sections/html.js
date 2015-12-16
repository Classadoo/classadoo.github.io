var bannerInterval;
var linksInterval;
var logoInterval;
var pitch1Interval;
var pitch2Interval;
var pitch3Interval;

htmlSteps = [
	{
		task: " ",
		text: "Now, the commands you wrote before are just fine for changing elements that are already on a page, but how do they get there in the first place?",
		action: resetWithOverlays
	},
	{
		text: "When you go to a website your browser is given some code which specifies how the page should look. This code is called HTML.",
	},
	{
		text: "So the browser knows to show the elements you worked with before, based on html, which looks like this.",
		action: function() {
			overlayHtmlExamples();
			flashOverlays(2);
		}
	},
	{
		beforeAction: function() {
			$(".content-highlight").css("color", "darkgray");
			$(".example-overlay").css("background", "rgba(80, 80, 80, .95");
		},
		text: "Each of the elements which are highlighted are contained within a 'div'. Div is short for 'divider'. Divs are boxes that hold other content."
	},
	{
		text: "For example the div with the id logo is holding the content 'Classadoo'",
		action: function () {
			flashOverlay("logo", 2);
		}
	},
	{
		text: "Notice that the code for each div includes something like id='banner', or id='logo'. This is how we specify an elements name in code.",
		action: function() {
			flash($(".attr-highlight-id"), 2, function() { $(".attr-highlight-id").css("color", "red") });
		}
	},
	{
		task: "Try moving around elements again, or changing their backgrounds, using commands like <c>banner right 100</c> or <c>logo background blue</c>. See how each div's code changes. Let's make 3 changes.",
		interaction: function(cmd) {			
			var args = cmd.split(" ")
			var id = args[0];
			var command = args[1];			
			var arg = args[2]			
			
			actionTaken = false;
			var el = $("[example-id=" + id + "]");
			var shadowEl = $("#" + id); 
			if (el.length) {
				if (command === "background") {
					if (validColors.indexOf(arg) > -1) {
						el.css(command, arg); 								
						shadowEl.css(command, arg)
						el.find(".example-overlay").css("background", "rgba(80,80,80,.6)");
						actionTaken = true;
					} 
				} else if (validDirections.indexOf(command) > -1) {
					el.css(command, arg); 
					shadowEl.css(command, arg)														
					actionTaken = true;
				} 										
			} 
			
			if (!actionTaken) {
				echo(term, "Oops, not quite... try <c>heading left 100</c> or <c>links background red</c>");
				return false
			} else {
				numberOfChanges += 1
				if (numberOfChanges < 3){
					// still some elements left to move
					term.echoHelp("Great! Try " + (3 - numberOfChanges) + " more.")
					el.find(".example-overlay").html(generateExampleHtmlOverlay(el.attr("example-id")));
					return false
				} else {
					// three elements have been moved, go to the next step
					el.find(".example-overlay").html(generateExampleHtmlOverlay(el.attr("example-id")));
					term.echoHelp("Good job, notice that the divs you modified now have some code like style='background: blue'", function() {
						$(".attr-highlight-id").css("color", "white");
						flash($(".attr-highlight-style"), 2, function () { $(".attr-highlight-style").css("color", "gold") });
					})
					return true
				}
			}				
		},
		help: 'In order to move an element or change it\'s backgroud you need to know it\'s id. You can find each element\'s id by looking at the part of the code that says id="banner", or id="logo". To change an element try something like <c>links bottom 100</c>.'
	},
	{ 
		task: " ",
		text: "An element's style tells your browser where to put each element, and how it should look."

	},
	{
		text: "Whenever you see something change on a webpage, it's because an element's 'style' attribute is being changed. You can use this to move things across a page, or make them blink.",
	},
	{
		text: "Hit enter and I'll show a demonstration of this. Watch the HTML code for each element, and notice how each one's 'style' changes."		
	},
	{		
		task: "Watch the 'style' attribute for each element. I am moving elements by changing their styles very quickly. Hit <c>enter</c> when you want to continue.",
		action: function() {
			var bannerRight = false;
			var logoBlue = false;
			var linksTop = false;
			var pitch1Red = false;
			var pitch2Left = false;
			var pitch3Yellow = false;

			resetWithOverlays()

			animateBanner();
			animateLinks();
			bannerInterval = setInterval(animateBanner, 1500);
			linksInterval = setInterval(animateLinks, 1200);

			function animateBanner() {
				if (bannerRight) {
					animate("banner", { right: "100px" });	
				} else {					
					animate("banner", {right: "-100px"})
				}

				bannerRight = !bannerRight				
			}

			function animateLinks() {
				if (linksTop) {
					animate("links", { top: "20px" });	
				} else {					
					animate("links", {top: "-20px"})
				}

				linksTop = !linksTop				
			}

			logoInterval = setInterval(function() {
				if (logoBlue) {
					style("logo", { background: "blue" });	
				} else {
					style("logo", {background: "green"})
				}
				
				logoBlue = !logoBlue				
			}, 700)

			pitch1Interval = setInterval(function() {
				if (pitch1Red) {
					style("pitch-1", { background: "red" });	
				} else {
					style("pitch-1", {background: "grey"})
				}
				
				pitch1Red = !pitch1Red				
			}, 700)

			pitch2Interval = setInterval(function() {
				if (pitch2Left) {
					style("pitch-2", { left: "40px" });	
				} else {
					style("pitch-2", {left: "-40px"})
				}
				
				pitch2Left = !pitch2Left				
			}, 700)

			pitch3Interval = setInterval(function() {
				if (pitch3Yellow) {
					style("pitch-3", { background: "yellow" });	
				} else {
					style("pitch-3", { background: "teal"});
				}
				
				pitch3Yellow = !pitch3Yellow				
			}, 700)
		},		
		help: "hit enter when you're ready to move on"
	},
	{
		task: " ",
		text: "In this case the changes to 'style' are being made by invisible code running on the page called Javascript. It's the same type of code that this tutorial is made of.",
		action: function () {
			clearInterval(bannerInterval);
			clearInterval(logoInterval);
			clearInterval(linksInterval);
			clearInterval(pitch1Interval);
			clearInterval(pitch2Interval);
			clearInterval(pitch3Interval);
			setTimeout(function() {
				style("logo", {background: ""});
				style("banner", {right: ""});
				style("links", {top: ""});
				style("pitch-1", { background: "" })
				style("pitch-2", { left: "" })
				style("pitch-3", { background: "" })	
			}, 1000)
		}		
	},
	{
		text: "With a knowledge of Javascript and HTML, you can make a webpage that does almost anything.",
		action: function() {
			$(".example-overlay").remove();
		}
	},
	{
		text: "You can make an online game, drawing tool, music player or more! Javascript and HTML are the tools that allow you to pursue your passions, online."		
	},
	{
		interaction: function(cmd) {

		}
	}
]