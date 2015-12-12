var exampleElements;
var shadowElements;

var escapedFrontEmphasis = "&lt;i&gt;"
var escapedBackEmphasis = "&lt;/i&gt;"

var escapedFrontBold = "&lt;b&gt;"
var escapedBackBold = "&lt;/b&gt;"

var consoleEl;
var consoleOpen = false;

// intervals for animation example


var term;

var steps = []

// steps = steps.concat(introSteps);
// steps = steps.concat(furnitureSteps);
// steps = steps.concat(namedElementSteps);
steps = steps.concat(htmlSteps); 

function startTerminal() {
	var stepIndex = 0;
	exampleElements = $(".example-element")
	shadowElements = $(".example-dom").children();	
	consoleEl = $(".console");

	// overlayExamples()
	overlayHtmlExamples();

	term = new Terminal(consoleEl, function(command) {
		var step = steps[stepIndex]
		if (command === "help" || command === "'help'") {			
			if (step && step.help && step.interaction){
				// if it's an interactive step, then we should show help for the current step
				term.echoHelp(step.help);				
			} else if (steps[stepIndex-1] && steps[stepIndex-1].help) {
				// if it's not an interactive step, we should show the help from the last step, since that's the prompt the user is going off
				term.echoHelp(steps[stepIndex-1].help);				
			} else {
				term.echoHelp("Press your enter key to move on to the next step!");
			}

			if (step.helpTutorial) stepIndex += 1
		} else {
			if (step && step.interaction) {
				step.task && setTask(step.task);
				term.echoHelp(" ");
				if (command) {				
					var goToNextStep = step.interaction(command)
					if (goToNextStep) {
						stepIndex += 1
					}
				} 
			} else if (step) {		
				console.log("action time!");
				step.task && setTask(step.task);
				if (step.text) {
					step.beforeAction && step.beforeAction();
					term.echoHelp(step.text, function(){
						step.action && step.action();
					});
				} else {
					term.echoHelp(" ");
					step.action && step.action();		
				}

				stepIndex += 1		
			}               				
		}		
    }, {
        // greeting: "<div class='class-intro'>Welcome to your first classadoo tutorial. This is an example of what a classadoo session is like, minus a live instructor. If you like this tutorial, email us, and we can schedule another one with a real teacher!</div><div class='call-to-action'>Press enter to get started!</div>",  
        prompt: "press enter or type <c>help</c>>"
    });	

    openConsole();
}

function openConsole() {
	consoleOpen = true;
	$(".console-container").animate({ "height": "200px" }, { complete: function() { consoleEl.click(); } });	
	$(".console-button").hide();
	term.focus();
}

$(function() {
	startTerminal();
	$(".console-button").click(openConsole);	
})