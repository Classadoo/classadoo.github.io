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

steps = steps.concat(introSteps);
steps = steps.concat(furnitureSteps);
steps = steps.concat(namedElementSteps);
steps = steps.concat(htmlSteps); 

function startTerminal() {
	var stepIndex = 0;
	exampleElements = $(".example-element")
	shadowElements = $(".example-dom").children();	
	consoleEl = $(".console");

	// overlayHtmlExamples()
	// overlayHtmlExamples();

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

			if (step.helpTutorial) nextStep()
		} else {
			if (step && step.interaction) {
				step.task && setTask(step.task);
				step.action && step.action();
				term.echoHelp(" ");
				if (command) {				
					var goToNextStep = step.interaction(command)
					if (goToNextStep) {
						nextStep()	
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

				nextStep()				
			}               				
		}		
    }, {
        // greeting: "<div class='class-title'>Example Tutorial: How a Webpage Works</div><div class='class-intro'>Welcome to your first classadoo tutorial! This is an example of what a classadoo session is like, minus a live instructor. If you like this tutorial, email us, and we can schedule another one with a real teacher!</div><div class='call-to-action'>Press enter to get started!</div>",  
        prompt: "press enter or type <c>help</c>>",
        enabled: false
    });	

	var progressBar = new ProgressBar($(".progress-bar-container"), steps.length);
	openConsole()

	function nextStep() {
		stepIndex += 1;
		progressBar.incrementProgress();
	}
}



function openConsole() {
	consoleOpen = true;
	var consoleContainer = $(".console-container")
	consoleContainer.animate({ "height":  consoleContainer[0].scrollHeight }, { complete: function() { consoleEl.click(); } });	
	$(".console-button").hide();
	term.enable();
	term.focus();
}

$(function() {
	startTerminal();
	$(".console-button").click(openConsole);	
})

ProgressBar = function(parent, numberOfSteps) {
	var self = this 
	var progressBarContainer = $("<div class='progress-meter'>");
	var unit = $("<div class='progress-unit'>");
	var cursor = $("<div class='progress-cursor progress-unit'>");

	var unitWidth = 10;

	unit.css({ 
		width: unitWidth
	})	

	cursor.css({ 
		width: unitWidth
	})	

	progressBarContainer.css({
		width: unitWidth * (numberOfSteps + 1)
	})

	parent.append(progressBarContainer.append(cursor));

	self.incrementProgress = function () {
		progressBarContainer.prepend(unit.clone());
	}
}























