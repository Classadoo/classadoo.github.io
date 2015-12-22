furnitureSteps = [
	{
		text: "This is the classadoo webpage.",
		section: "Why does this webpage look the way it does?"
	},	
	{
		text: "When I created this webpage, I created it to look exactly the way you see. So how did I do that?"
	},	
	{
		text: "Well imagine this webpage is like a room, and all the things you see are like furniture."
	},	
	{
		text: "The big banner is like a table.",
		action: function() {	
			var overlay = overlayFurnitureExample("table");
			flash(overlay, 2);
		}
	},
	{
		text: "Our logo is like a cabinet.",
		action: function() {	
			var overlay = overlayFurnitureExample("cabinet");
			flash(overlay, 2);
		}
	},
	{
		text: "The links are like a counter.",
		action: function() {	
			var overlay = overlayFurnitureExample("counter");
			flash(overlay, 2);
		}
	},
	{
		text: "And the explanations below are like chairs.",
		action: function() {	
			var overlay1 = overlayFurnitureExample("chair1");
			var overlay2 = overlayFurnitureExample("chair2");
			var overlay3 = overlayFurnitureExample("chair3");
			flash(overlay1, 2);
			flash(overlay2, 2);
			flash(overlay3, 2);
		}
	},
	{
		text: "Like in any room, I've carefully chosen, arranged and HAND painted all the furniture on this page."	
	},		
	{
		text: "But I think it needs a makeover...let's try moving some things around!"
	},
	{
		task: "Try moving the table by typing <c>table right 200</c> and pressing enter.",
		interaction: function(cmd) {
			term.changePrompt("enter command or type 'help'");							
			if (cmd === "table right 200") {
				var el = $("[example-name=table]");
				el.css("right", "200");				
				term.echoHelp("Oh, wow, very nice positioning.", function() {
					flash(el.find(".example-overlay"), 2);
				});							
				term.echoTask(" ");
				term.changePrompt("press enter or type 'help'");
				return true
			} else {
				term.echoHelp("Almost. You typed <c>" + cmd + "</c>, but for this task you need to type exactly <c>table right 200</c>.")
				return false				
			}							
		},
		help: "Try typing exactly this: <c>table right 200</c>. Then press enter to input that command."	
	},
	{
		text: "What just happened is that you told your computer to push the table's right edge until it was 200 pixels from it's starting location.",
		action: function() {
			// add the overlay showing the distance moved
			var overlay = $("<div class='movement-example-overlay'>200 pixels</div>");
			var el = $("[example-name=table]");			
			$(el).append(overlay);		
			flash(overlay, 2, function() { overlay.css("background", "") });	
		}		
	},
	{
		text: "A pixel is the unit of measurement that computers use when drawing things on a screen. Where you think in inches, computers think in pixels."
	},
	{
		text: "So the whole table actually moved LEFT, because you pushed the RIGHT edge.",
		help: "Imagine if I told you to push a table from the right side, 200 inches. By tying <c>table right 200</c> you are telling the computer to do just that, but it thinks in pixels instead of inches."
	},
	{	
		action: function () {
			$(".movement-example-overlay").remove();
		},
		task: "Well, while you're moving my furniture around, you might as well do some painting as well. Try changing the background of one of the furniture pieces by typing something like <c>counter background blue</c>.",
		interaction: function(cmd) {
			
			term.changePrompt("enter comment or type 'help'");	
			var args = cmd.split(" ")
			var furntitureName = args[0];
			var command = args[1];
			var color = args[2]
		
			if (args.length === 3 && command == "background") {
				colorChanged = false
				invalidColor = false
				exampleElements.each(function(i, el) {				
				if ($(el).attr("example-name") == furntitureName) {												
						if (validColors.indexOf(color) > -1) {
							$(el).css(command, color); 	
							var exampleOverlay = $(el).find(".example-overlay")																				
							flash(exampleOverlay, 2, function () { exampleOverlay.css("background", "rgba(80,80,80,.6)") });
							colorChanged = true;
						} else {							
							invalidColor = true
						}						
					}
				})			

				if (invalidColor) { 
					term.echoHelp("I don't know that color try one of [" + validColors.join(", ") + "]");
					return false
				} else if (!colorChanged) {
					term.echoHelp("I don't know that piece of furniture...")
					return false
				} else {
					term.echoHelp("ok great!");							
					term.echoTask(" ");
					term.changePrompt("press enter or type 'help'");
					return true
				}			
			} else {
				term.echoHelp("Oops, you typed <c>" + cmd + "</c>, when you need to type <c>counter background blue</c>. Try again!")
				return false
			}										
		},
		help: "Try typing exactly this <c>counter background blue</c>."		
	},
	{		
		text: "Good reorganization of my webpage's furniture, but let's put everything back for now.",
		action: function() {
			$(".no-img").hide();			
			resetWithOverlays()
		}
	},
	{
		text: "So I think we can now answer our second question!:"
	},
	{
		questionComplete: true,
		text: "<e>This webpage's look was created by arranging things (like furniture) on the page, using commands like <c>table right 100</c> or <c>counter background blue</c>.</e>",
		action: logComplete(2)
	}	
]