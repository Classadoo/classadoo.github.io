var validDirections = ["top", "right", "left", "bottom"]
var validColors = ["blue", "red", "gray", "black", "white", "green", "yellow", "purple", "brown"]
var exampleElements;
var shadowElements;
var numberOfChanges = 0;

var promptText = "previous command> "
var escapedPromptText = "previous command&gt; "

var escapedFrontEmphasis = "&lt;i&gt;"
var escapedBackEmphasis = "&lt;/i&gt;"

var escapedFrontBold = "&lt;b&gt;"
var escapedBackBold = "&lt;/b&gt;"

var consoleEl;
var consoleOpen = false;

// intervals for animation example
var bannerInterval;
var linksInterval;
var logoInterval;
var pitch1Interval;
var pitch2Interval;
var pitch3Interval;

var steps = [
	// {
	// 	text: "This is the Classadoo webpage",
	// 	action: function() { changePrompt("press enter or type 'help'") }
	// },
	// {
	// 	text: "What is a webpage really?"
	// },
	// {
	// 	text: "A webpage is like a room in your house",
	// 	action: function() {	
	// 		// $("body").css("border", "solid black 10px")
	// 	}
	// },
	// {
	// 	text: "All the things on the page are like furniture",
	// 	action: function() {	
	// 		overlayExamples()
	// 	}
	// },
	// {
	// 	text: "Like furniture in a room, I've carefully arranged and HAND painted EVERYTHING on this page."	
	// },
	// {
	// 	interaction: function(cmd, term) {
	// 		changePrompt("enter command or type 'help'");							

	// 		if (cmd === "table right 100") {
	// 			var el = $("[example-name=table]");
	// 			el.css("right", "100");
	// 			echo(term, "Oh no, not my table!");							
	// 			changePrompt("press enter or type 'help'");
	// 			return true
	// 		} else {
	// 			echo(term, "It would be TERRIBLE if you were to move the table by typing <i>table right 100</i> and pressing enter");
	// 			return false				
	// 		}							
	// 	},
	// 	help: "Try typing exactly this: <i>table right 100</i>. Then press enter to input that command."	
	// },
	// {
	// 	text: "What just happened is that you told your browser to push the table's right edge until it was 100 pixels from it's starting location",
	// 	action: function() {
	// 		// add the overlay showing the distance moved
	// 		var overlay = $("<div class='movement-example-overlay'>100 pixels</div>");
	// 		var el = $("[example-name=table]");			
	// 		$(el).append(overlay);			
	// 	}		
	// },
	// {
	// 	text: "This is why the whole table actually moved to the LEFT, because you pushed the RIGHT edge.",
	// 	help: "Imagine if I told you to push a table from the right side, 100 inches. By tying <i>table right 100</i> you are telling the broswer to do just that, but it thinks in pixels instead of inches."
	// },
	// {
	// 	interaction: function(cmd, term) {
	// 		$(".movement-example-overlay").remove()
	// 		changePrompt("enter comment or type 'help'");	
	// 		var args = cmd.split(" ")
	// 		var furntitureName = args[0];
	// 		var command = args[1];
	// 		var color = args[2]
	// 		if (args.length < 3) {
	// 			echo(term, "Well, while you're moving my furniture around, you might as well do some painting as well. Try changing the background of one of the furniture pieces by typing something like <i>counter background blue</i>")
	// 		} else {
	// 			if (command == "background") {
	// 				colorChanged = false
	// 				invalidColor = false
	// 				exampleElements.each(function(i, el) {				
	// 				if ($(el).attr("example-name") == furntitureName) {												
	// 						if (validColors.indexOf(color) > -1) {
	// 							$(el).css(command, color); 							
	// 							$(el).find(".example-overlay").css("background", "rgba(80,80,80,.6)");
	// 							colorChanged = true;
	// 						} else {							
	// 							invalidColor = true
	// 						}						
	// 					}
	// 				})			

	// 				if (invalidColor) { 
	// 					echo(term, "I don't know that color try one of [" + validColors.join(", ") + "]");
	// 					return false
	// 				} else if (!colorChanged) {
	// 					echo(term, "I don't know that piece of furniture...")
	// 					return false
	// 				} else {
	// 					echo(term, "ok great!");							
	// 					// $(".no-img").show();
	// 					changePrompt("press enter or type 'help'");
	// 					return true
	// 				}			
	// 			} else {
	// 				echo(term, "Oops, you typed <i>" + command + "</i>, when you need to type <i>background</i>. Try <i>counter background blue</i>")
	// 				return false
	// 			}								
	// 		}
	// 	},
	// 	help: "Try typing exactly this: counter background blue"		
	// },
	// {
	// 	text: "Good reorganization of my webpage's furniture, but let's put everything back for now",
	// 	action: function() {
	// 		$(".no-img").hide();			
	// 		resetWithOverlays()
	// 	}
	// },
	// {
	// 	text: "OK so a web page is a collection of things, like furniture in a room, as well as some instructions which specify how the things should look and be laid out, like <i>table background blue</i>."
	// },
	// {
	// 	text: "In the software world we call these 'things', elements.",
	// 	action: function() {
	// 		$(".example-name").html("element");
	// 	}
	// },
	// {
	// 	text: "And to make sure we can choose the right element when reorganizing a page, like we did above, we give each element a name.",
	// 	action: function() {
	// 		$(".example-name").each(function(i, el) {
	// 			$(el).html($(el).parent().parent().attr("example-id"));
	// 		})
	// 	}	
	// },
	{
		interaction: function(cmd, term) {
			changePrompt("enter comment or type 'help'")
			var args = cmd.split(" ")
			var id = args[0];
			var command = args[1];			
			var arg = args[2]			
			if (args.length < 3) {
				echo(term, "Try changing the layout or background of each element now, using their new names. You can use a command like: <i>banner <b>edge</b> direction</i> or <i>counter background <b>color</b></i>. <b>edge</b> can be top, right, bottom, or left, <b>number</b> can be any number, and <b>color</b> can be any primary color")
			} else {			
				actionTaken = false;
				var el = $("[example-id=" + id + "]")
				if (el.length) {
					if (command === "background") {
						if (validColors.indexOf(arg) > -1) {
							el.css(command, arg); 								
							el.find(".example-overlay").css("background", "rgba(80,80,80,.6)");
							actionTaken = true;
						} 
					} else if (validDirections.indexOf(command) > -1) {
						el.css(command, arg); 														
						actionTaken = true;
					} 										
				} 
				
				if (!actionTaken) {
					echo(term, "Try <i>heading left 100</i> or <i>links background red</i>.\nPossible backgrounds: " + validColors.join(", ") + "\nPossible directions: " + validDirections.join(", "));
					return false
				} else {
					el.find(".example-overlay").remove();
					var numberRemainingElementsToMove = $(".example-overlay").length
					if (numberRemainingElementsToMove){
						// still some elements left to move
						echo(term, "Good! Now change the other " + numberRemainingElementsToMove + " elements as well.")
						return false
					} else {
						// all elements have been moved, go to the next step
						changePrompt("press enter or type 'help'");
						echo(term, "Great, nice redesign!")
						return true
					}
				}
			}	
		},
		help: "To complete this step make at least one change to every element that has a name. You can change their background or push the elements around."
	},
	{
		text: "Now, the commands you wrote before are just fine for changing elements that are already on a page, but how do they get there in the first place?",
		action: resetWithOverlays
	},
	{
		text: "When you go to a website your browser is given some code which specifies how the page should look. This code is called HTML",
	},
	{
		text: "So the browser knows to show the elements you worked with before, based on html, which looks like this.",
		action: overlayHtmlExamples
	},
	{
		text: "Each of the elements which are highlighted are contained within a 'div'. Div is short for 'divider'. Divs are boxes that holds other elements. Like, the div with the id 'logo' is a box which is holding the text 'Clasadoo'",		
	},
	{
		text: "Notice that the code for each div includes something like id='banner', or id='logo'. This is how we specify an elements name in code."
	},
	{
		interaction: function(cmd, term) {
			changePrompt("enter comment or type 'help'")
			var args = cmd.split(" ")
			var id = args[0];
			var command = args[1];			
			var arg = args[2]			
			if (args.length < 3) {
				echo(term, "Try moving around elements again, or changing their backgrounds, using commands like <i>banner right 100</i> or <i>logo background blue</i>. See how each div's code changes. Let's make 3 changes.")
			} else {			
				actionTaken = false;
				var el = $("[example-id=" + id + "]")
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
					echo(term, "Try <i>heading left 100</i> or <i>links background red</i>.\nPossible backgrounds: " + validColors.join(", ") + "\nPossible directions: " + validDirections.join(" "));
					return false
				} else {
					numberOfChanges += 1
					if (numberOfChanges < 3){
						// still some elements left to move
						echo(term, "Great! Try " + (3 - numberOfChanges) + " more.")
						el.find(".example-overlay").html(generateExampleHtmlOverlay(el.attr("example-id")));
						return false
					} else {
						// three elements have been moved, go to the next step
						el.find(".example-overlay").html(generateExampleHtmlOverlay(el.attr("example-id")));
						changePrompt("press enter or type 'help'");						
						echo(term, "Good job, notice that each div now has some code like style='background: blue'. An element's style tells your browser where to put each element, and how it should look.")
						return true
					}
				}
			}	
		},
		help: 'In order to move an element or change it\'s backgroud you need to know it\'s id. You can find each element\'s id by looking at the part of the code that says id="banner", or id="logo". To change an element try something like <i>links bottom 100</i>.'
	},
	{
		text: "Whenever you see something change on a webpage, it's because an element's 'style' attribute is being changed. You can use this to make move things across a page, or make them blink.",			
	},
	{
		text: "Hit enter and I'll show a demonstration of this. What the HTML code for each element, and notice how each one's 'style' changes."		
	},
	{		
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
	},
	{
		text: "In this case the changes to 'style' are being made by invisible code running on the page called Javascript",
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
		},
		help: "Watch how each element's style attribute changes as they move around and change color."
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

function resetWithOverlays() {	
	exampleElements.css({background: "", top: "", right: "", left: "", bottom: ""});
	shadowElements.css({background: "", top: "", right: "", left: "", bottom: ""});
	// should be synced to what is in index.css
	$(".example-overlay").css("background", "rgba(80,80,80,.9)");
}

// echos and deletes any empty prompt lines
function echo(term, text) {
	// first replace my custom tags with single characters, so they don't get cutoff if the terminal wraps to a new line.
	var openBold = "%"
	var openEmphasis = "#"
	var close = "~"

	var processedText = replaceAll(replaceAll(replaceAll(text, "<i>", openEmphasis), "(<\/i>)|(<\/b>)", close), "<b>", openBold)
	term.echo(processedText)		
	
	consoleEl.find(".output").each(function(i, el) {		
		$(el).children().each(function(i, child) {			
			var html = child.innerHTML;
			
			if (html === escapedPromptText) {
				$(el).remove();
			} 
			
			html = replaceAll(replaceAll(replaceAll(html, openBold, "<i class='bold'>"), openEmphasis, "<i class='emphasis'>"), close, "</i>");		 		

			child.innerHTML = html;
		})		
	})
}

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function startTerminal() {
	var stepIndex = 0;
	exampleElements = $(".example-element")
	shadowElements = $(".example-dom").children();	
	consoleEl = $(".console");

	// overlayExamples()
	// overlayHtmlExamples();

	consoleEl.terminal(function(command, term) {
		var step = steps[stepIndex]
		if (command === "help" || command === "'help'") {
			if (step && step.help){
				echo(term, step.help)
			} else {
				echo(term, "Press your enter key to move on to the next step!")
			}
		} else {
			if (step && step.interaction) {
				var goToNextStep = step.interaction(command, term)
				if (goToNextStep) {
					stepIndex += 1
				}
			} else {
				step.text && echo(term, step.text)
				step.action && step.action()			
				stepIndex += 1		
			}               				
		}		
    }, {
        greetings: '',
        name: 'classadoo_demo',
        height: 200,
        outputLimit: -1,
        prompt: promptText
    });

    $(".terminal-output").append("<div class='class-intro'>Welcome to 'Making Things Happen on a Website'. Our courses are based around understanding and creating real websites (like this one). If you like this tutorial, let us know, and we can schedule another one with a real teacher!</div>")
    $(".terminal-output").append("<div class='class-intro'>If you have a question, just type 'help' and press enter. In a real Classadoo course you would raise your hand and our teacher would answer. However, for this example unfortunately only our robot teacher is available.</div>");
    changePrompt("press enter or type 'help'")
}

function openConsole() {
	consoleOpen = true;
	$(".console-container").animate({ "height": "200px" }, { complete: function() { consoleEl.click(); } });	
	$(".console-button").hide();
}

$(function() {
	startTerminal();
	$(".console-button").click(openConsole);
	$("body").keydown(function(e) {
		if (e.keyCode === 13 && !consoleOpen) {						
			openConsole()
			return false
		}		
	})
})