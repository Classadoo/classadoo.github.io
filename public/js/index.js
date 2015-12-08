var validDirections = ["top", "right", "left", "bottom"]
var validColors = ["blue", "red", "gray", "black", "white", "green", "yellow", "purple"]
var exampleElements;
var numberOfChanges = 0;

// intervals for animation example
var bannerInterval;
var linksInterval;
var logoInterval;
var pitch1Interval;
var pitch2Interval;
var pitch3Interval;

var steps = [
	{
		text: "This is the Classadoo webpage",
		action: function() { changePrompt("press enter") }
	},
	{
		text: "What is a webpage really?"
	},
	{
		text: "A webpage is like a room in your house",
		action: function() {	
			// $("body").css("border", "solid black 10px")
		}
	},
	{
		text: "All the things on the page are like furniture",
		action: function() {	
			overlayExamples()
		}
	},
	{
		text: "Like furniture in a room, I've carefully arranged and HAND painted EVERYTHING on this page."	
	},
	{
		interaction: function(cmd, term) {
			changePrompt("enter command");							

			if (cmd === "table right 100") {
				var el = $("[example-name=table]");
				el.css("right", "100");
				term.echo("Oh no, not my table!");							
				changePrompt("press enter");
				return true
			} else {
				term.echo("It would be TERRIBLE if you were to move the table by typing 'table right 100' and pressing enter");
				return false				
			}							
		},
		help: "try typing exactly this: table right 100. Then press enter to input that command."	
	},
	{
		text: "What just happened is that you told your browser to push the table's right edge until it was 100 pixels from it's starting location",
		action: function() {
			// add the overlay showing the distance moved
			var overlay = $("<div class='movement-example-overlay'>100 pixels</div>");
			var el = $("[example-name=table]");			
			$(el).append(overlay);			
		}		
	},
	{
		text: "This is why the whole table actually moved to the LEFT, because you pushed the RIGHT edge.",
		help: "Imagine if I told you to push a table from the right side, 100 inches. By tying 'table right 100' you are telling the broswer to do just that, but it thinks in pixels instead of inches."
	},
	{
		interaction: function(cmd, term) {
			$(".movement-example-overlay").remove()
			changePrompt("enter command");	
			var args = cmd.split(" ")
			var furntitureName = args[0];
			var command = args[1];
			var color = args[2]
			if (args.length < 3) {
				term.echo("Well, while you're moving my furniture around, you might as well do some painting as well. Try changing the color of one of the furniture pieces by typing something like 'counter background blue'")
			} else {
				colorChanged = false
				invalidColor = false
				exampleElements.each(function(i, el) {				
					if ($(el).attr("example-name") == furntitureName) {												
						if (validColors.indexOf(color) > -1) {
							$(el).css(command, color); 							
							colorChanged = true;
						} else {							
							invalidColor = true
						}						
					}
				})	

				if (invalidColor) { 
					term.echo("I don't know that color try one of [" + validColors.join(", ") + "]");
					return false
				} else if (!colorChanged) {
					term.echo("I don't know that piece of furniture...")
					return false
				} else {
					term.echo("ok great!");							
					// $(".no-img").show();
					changePrompt("press enter");
					return true
				}
			}
		},
		help: "Try typing exactly this: counter background blue"		
	},
	{
		text: "Good reorganization of my webpage's furniture, but let's put everything back for now",
		action: function() {
			$(".no-img").hide();			
			exampleElements.css({background: "", top: "", right: "", left: "", bottom: ""})						
		}
	},
	{
		text: "OK so a web page is a collection of things, like furniture in a room, as well as some instructions which specify how the things should look and be laid out, like 'table color blue'."
	},
	{
		text: "In the software world we call these 'things', elements.",
		action: function() {
			$(".example-name").html("element");
		}
	},
	{
		text: "and to make sure we can choose the right element when reorganzing a page, like we did above, we give each element a name.",
		action: function() {
			$(".example-name").each(function(i, el) {
				$(el).html($(el).parent().parent().attr("example-id"));
			})
		}	
	},
	{
		interaction: function(cmd, term) {
			changePrompt("enter command")
			var args = cmd.split(" ")
			var id = args[0];
			var command = args[1];			
			var arg = args[2]			
			if (args.length < 3) {
				term.echo("Try changing the layout or background of each element now, using their new names. You can use a command like: 'banner {edge} {number}' or 'counter color {color}'. {edge} can be top, right, bottom, or left, {number} can be any number, and {color} can be any primary color.")
			} else {			
				actionTaken = false;
				var el = $("[example-id=" + id + "]")
				if (el.length) {
					if (command === "background") {
						if (validColors.indexOf(arg) > -1) {
							el.css(command, arg); 								
							actionTaken = true;
						} 
					} else if (validDirections.indexOf(command) > -1) {
						el.css(command, arg); 														
						actionTaken = true;
					} 										
				} 
				
				if (!actionTaken) {
					term.echo("Try 'heading left 100' or 'links background red'.\nPossible backgrounds: " + validColors.join(", ") + "\nPossible directions: " + validDirections.join(", "));
					return false
				} else {
					el.find(".example-overlay").remove();
					if ($(".example-overlay").length){
						// still some elements left to move
						return false
					} else {
						// all elements have been moved, go to the next step
						changePrompt("press enter");
						term.echo("Great, nice redesign!")
						return true
					}
				}
			}	
		},
		help: "To complete this step make at least one change to every element that has a name. You can change their color or push the elements around."
	},
	{
		text: "Now, the commands you wrote before are just fine for changing elements that are already on a page, but how do they get there in the first place?",
		action: function() {
			exampleElements.css({background: "none", top: "", right: "", left: "", bottom: ""})
		},		
	},
	{
		text: "When you go to a website your browser is given some code which specifies how the page should look. This code is called HTML",
	},
	{
		text: "So the browser knows to show the elements you worked with before, based on html, which looks like this.",
		action: overlayHtmlExamples
	},
	{
		text: "Each of the elements which are highlighted is a 'div'. A div is a container element. It holds other elements. This means that when you move a div, everything inside it moves with it.",		
	},
	{
		text: "So the '...' which is shown inside each div represents the other elements inside each div, like text and images.",		
	},
	{
		interaction: function(cmd, term) {
			changePrompt("enter command")
			var args = cmd.split(" ")
			var id = args[0];
			var command = args[1];			
			var arg = args[2]			
			if (args.length < 3) {
				term.echo("Now try changing some elements again, the same as before, using their ids, and see how the HTML changes. Let's make 3 changes.")
			} else {			
				actionTaken = false;
				var el = $("[example-id=" + id + "]")
				var shadowEl = $("#" + id); 
				if (el.length) {
					if (command === "background") {
						if (validColors.indexOf(arg) > -1) {
							el.css(command, arg); 								
							shadowEl.css(command, arg)
							actionTaken = true;
						} 
					} else if (validDirections.indexOf(command) > -1) {
						el.css(command, arg); 
						shadowEl.css(command, arg)														
						actionTaken = true;
					} 										
				} 
				
				if (!actionTaken) {
					term.echo("Try 'heading left 100' or 'links background red'.\nPossible backgrounds: " + validColors.join(", ") + "\nPossible directions: " + validDirections.join(" "));
					return false
				} else {
					numberOfChanges += 1
					if (numberOfChanges < 3){
						// still some elements left to move
						term.echo("Great! Try " + (3 - numberOfChanges) + " more.")
						el.find(".example-overlay").html(generateExampleHtmlOverlay(el.attr("example-id")));
						return false
					} else {
						// three elements have been moved, go to the next step
						el.find(".example-overlay").html(generateExampleHtmlOverlay(el.attr("example-id")));
						changePrompt("press enter");						
						term.echo("Good job, notice that there is now some HTML code for 'style'. An element's style tells your browser where to put each element, and how it should look.")
						return true
					}
				}
			}	
		},
		help: 'Each element has an id. You can find each element\'s id by looking at the part of the code that says id="banner", or id="logo". To change an element try something like \'links bottom 100\'.'
	},
	{
		text: "Whenever you see something change on a webpage, it's because an element's 'style' attribute is being changed",
		action: function() {
			var bannerRight = false;
			var logoBlue = false;
			var linksTop = false;
			var pitch1Red = false;
			var pitch2Left = false;
			var pitch3Yellow = false;

			exampleElements.css({background: "none", top: "", right: "", left: "", bottom: ""});

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
		help: "Watch how each element's style attribute changes as they move around and change color."
	},
	{
		text: "The changes to the HTML are made by invisible code running on the page called Javascript",
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
		text: "With a knowledge of Javascript and HTML, you can make a webpage that does almost anything",
		action: function() {
			$(".example-overlay").remove();
		}
	},
	{
		text: "You can make an online game, real time chat room, drawing tool, music player or more! Javascript and HTML are the tools that allow you to pursue your passions, online."		
	},
	{
		text: "That's it for this tutorial! Check out our course offerings and email us at learn@classadoo.com if you are interested in hearing more about us."
	}
]

function changePrompt(prompt) {
	$(".prompt").html(prompt + ">&nbsp;")	
}

function overlayExamples() {	
	exampleElements.each(function(i, el) {				
		$(el).css({"position": "relative"})
		var name = name ||
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
	if (id === "links") {
		// we don't add a new line to the html for links, because the element is not big enough
		htmlExample.html(escaped)	
	} else {
		htmlExample.html(prettifyHtml(escaped));
	}

	return htmlExample
}

function prettifyHtml(htmlString) {
	return htmlString.replace('"\&gt;', '"&gt;</br>').replace('&lt;/', '</br>&lt;/');	
}

// functions to style an el, it's shadow el and update html in the overlay
function style(id, newStyle) {
	var el = $("[example-id=" + id + "]")
	var shadowEl = $("#" + id)	

	el.css(newStyle);	
	shadowEl.css(newStyle);	

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

function startTerminal() {
	var stepIndex = 0;
	exampleElements = $(".example-element")

	// overlayExamples()
	// overlayHtmlExamples();

	$('.console').terminal(function(command, term) {
		var step = steps[stepIndex]
		if (command === "help") {
			if (step && step.help){
				term.echo(step.help)
			} else {
				term.echo("Press your enter key to move on to the next step!")
			}
		} else {
			if (step && step.text) {
				term.echo(steps[stepIndex].text)
				step.action && step.action()			
				stepIndex += 1
			} else if (step && step.interaction) {
				var goToNextStep = step.interaction(command, term)
				if (goToNextStep) {
					stepIndex += 1
				}
			}               	
		}
		
    }, {
        greetings: '',
        name: 'classadoo_demo',
        height: 200,
        prompt: 'prompt> '
    });

    $(".terminal-output").append("<div class='class-intro'>Welcome to 'Making Things Happen on a Website'. Our courses are based around understanding and creating real websites (like this one). If you like this tutorial, let us know, and we can schedule another one with a real teacher!</div>")
    $(".terminal-output").append("<div class='class-intro'>If you have a question, just type 'help' and press enter. In a real Classadoo course you would raise your hand and our teacher would answer. However, for this example unfortunately only our robot teacher is available.</div>");
    changePrompt("press enter")
}

$(function() {
	startTerminal();

	$(".console-button").click(function() {
		$(".console-container").animate({ "height": "200px" }, { complete: function() { $(".console").click(); } });
		$(".console-button").hide();
	})
})