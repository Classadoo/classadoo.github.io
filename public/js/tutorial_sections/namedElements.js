namedElementSteps = [
	{
		text: "OK so a web page is a collection of things, like furniture in a room, as well as some instructions which specify how the things should look and be laid out, like <c>table background blue</c>."
	},
	{
		text: "In the software world we call these 'things', elements.",
		action: function() {
			$(".example-name").html("element");
			setTimeout(function() { flashOverlays(2) }, 500);
		}
	},
	{
		text: "And to make sure we can choose the right element when reorganizing a page, like we did above, we give each element a name, like 'banner', or 'links'.",
		action: function() {
			$(".example-name").each(function(i, el) {
				$(el).html($(el).parent().parent().attr("example-id"));
			})
			setTimeout(function() { flashOverlays(2) }, 500);
		}	
	},
	{	
		task: "Try changing the layout or background of each element, using their new names.<br>Examples: <c>banner <d>edge</d> <d>distance</d></c> or <c>counter background <d>color</d></c>. <d>edge</d> can be top, right, bottom, or left, <d>distance</d> can be any number, and <d>color</d> can be any primary color.",
		interaction: function(cmd) {			
			var args = cmd.split(" ")
			var id = args[0];
			var command = args[1];			
			var arg = args[2]			
			
			
			actionTaken = false;
			var el = $("[example-id=" + id + "]")
			if (el.length) {
				console.log("in here");
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
				echo(term, "Try <c>banner left 100</c> or <c>links background red</c>");
				return false
			} else {
				el.find(".example-overlay").remove();
				var exampleOverlays = $(".example-overlay");				
				var numberRemainingElementsToMove = exampleOverlays.length
				var remainingNames = exampleOverlays.map(function(i, el) { return $(el).parent().attr("example-id") } ).toArray()
				if (numberRemainingElementsToMove){
					// still some elements left to move
					echo(term, "Good! Now change the other " + numberRemainingElementsToMove + " elements as well. Their names are " + remainingNames.join(", ") );
					return false
				} else {
					// all elements have been moved, go to the next step
					echo(term, "Great, nice redesign!")
					return true
				}
			}
					
		},
		help: "To complete this step make at least one change to every element that has a name. You can change their background or push the elements around."
	}
]