var bannerInterval;
var linksInterval;
var logoInterval;
var pitch1Interval;
var pitch2Interval;
var pitch3Interval;

htmlSteps = [
	{
		section: "How do elements get onto a page?",
		text: "So our next question is: How do elements get on the page in the first place?",
		action: resetWithOverlays
	},
	{
		text: "When you go to a website your computer is given the website's code, called HTML. The code tells your computer what elements should be on the page.",
	},
	{
		text: "The HTML code for this website looks like this:",
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
		text: "Each of the elements we've been working with are contained within a 'div'. Div is short for 'divider'. Divs are boxes that hold other content."
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
		questionComplete: true,
		text: "<e>So now we know that elements are placed on a page by HTML code, like what you see here.</e>",
		action: logComplete(4)
	},
	{
		section: "What does the code look like when we move an element?",
		text: "However, what happens to the HTML when we start moving elements around again?"
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
						shadowCss(shadowEl, command, arg)
						el.find(".example-overlay").css("background", "rgba(80,80,80,.6)");
						actionTaken = true;
					} 
				} else if (validDirections.indexOf(command) > -1) {
					el.css(command, arg); 
					shadowCss(shadowEl, command, arg);
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
		text: "Whenever you see something change on a webpage, it's because an element's 'style' attribute is being changed. Throughout this tutorial you've been changing the style of each element.",
	},
	{
		text: "By changing an element's style, you can move things across a page, make them blink or more."
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
					animate("banner", {"right": "100px" });	
				} else {					
					animate("banner", {"right": "-100px"})
				}

				bannerRight = !bannerRight				
			}

			function animateLinks() {
				if (linksTop) {
					animate("links", { "top": "20px" });	
				} else {					
					animate("links", {"top": "-20px"})
				}

				linksTop = !linksTop				
			}

			logoInterval = setInterval(function() {
				if (logoBlue) {
					style("logo", "background", "blue");	
				} else {
					style("logo", "background", "green")
				}
				
				logoBlue = !logoBlue				
			}, 700)

			pitch1Interval = setInterval(function() {
				if (pitch1Red) {
					style("text1", "background", "red");	
				} else {
					style("text1", "background", "grey")
				}
				
				pitch1Red = !pitch1Red				
			}, 700)

			pitch2Interval = setInterval(function() {
				if (pitch2Left) {
					style("text2", "left", "40px");	
				} else {
					style("text2", "left", "-40px")
				}
				
				pitch2Left = !pitch2Left				
			}, 700)

			pitch3Interval = setInterval(function() {
				if (pitch3Yellow) {
					style("text3", "background", "yellow");	
				} else {
					style("text3", "background", "teal");
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
				clearStyle("logo");
				clearStyle("banner");
				clearStyle("links");
				clearStyle("text1");
				clearStyle("text2");
				clearStyle("text3");
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
		text: "This is the end of this tutorial, but let's recap what we learned:"
	},
	{
		text: "A webpage is like a room, and everything inside it is like furniture. Like furniture you can arrange the things in a webpage in any way you like."
	},
	{
		text: "All these \"things\" on a webpage are called elements. Each element has a name, which we use to change how it looks.",
	},
	{
		text: "Elements are put onto a page by code called HTML.",
		action: logComplete(5)
	},
	{
		questionComplete: true,
		text: "<e>And to answer our final question: by changing the 'style' of each element, in code, we can change the way an element looks.</e>",		
	},		
	{		
		section: "What's next?",
		noProgress: true,
		task: "That's it for now! If you're interested in scheduling a live class with us, <c>just type in your email address now</c>, and we'll get back to you within a day. You can also read more about our <a href='/teachers.html'>teachers</a> or <a href='/courses.html'>courses</a>.",		
		interaction: function(cmd) {				
			sendEmail(cmd);
			term.echoHelp("Thanks, we'll be in touch soon!");
			logComplete(7);
			return true
		},
		help: "Type in your email address and press enter, if you'd like more info, or to schedule a class.",
		action: logComplete(6)
	},
	{
		noProgress: true,
		task: " ",		
	}
]