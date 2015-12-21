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
	var progressContainer = $(".progress-container");

	// overlayExamples()
	// overlayHtmlExamples();

	term = new Terminal(consoleEl, function(command) {
		progressContainer.css("visibility", "visible");
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

			if (step.helpTutorial) nextStep(step)
		} else {
			if (step) {
				newSection(step);

				if (step.questionComplete) {					
					progressBar.complete();
				}

				if (step.interaction) {
					step.task && setTask(step.task);
					step.action && step.action();
					term.echoHelp(" ");
					if (command) {				
						var goToNextStep = step.interaction(command)
						if (goToNextStep) {
							nextStep(step)	
						}
					} 	
				} else {					
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

					nextStep(step)				
				}
			} 
		}		
    }, {
        greeting: "<div class='class-title'>Example Tutorial: How a Webpage Works</div><div class='class-intro'>Welcome to your first classadoo tutorial! This is a 10 minute example of what a classadoo session is like, minus a live instructor. If you like this tutorial, email us, and we can schedule another one with a real teacher!</div><div class='call-to-action'>Press enter to get started!</div>",  
        prompt: "press enter or type <c>help</c>>",
        enabled: false
    });	

	var progressBar = new ProgressBar($(".progress-bar-container"), 400);	
	// openConsole();

	function nextStep(step) {
		stepIndex += 1;
		step.section || step.noProgress || progressBar.incrementProgress();
	}

	function newSection(step) {		
		if (step.section) {
			var numberOfSteps = steps.length - stepIndex;
			$.each(steps.slice(stepIndex + 1), function(i, step) {			
				if (step.section) {				
					numberOfSteps = i + 1;
					return false
				} 
			});		
			setSection(step.section);								

			if (step.noProgress) {
				progressBar.clearProgress();
			} else {
				progressBar.reset(numberOfSteps);
			}
		}
	}
}

function openConsole() {
	consoleOpen = true;
	var consoleContainer = $(".console-container")
	consoleContainer.animate({ "height":  consoleContainer[0].scrollHeight }, { complete: function() { consoleEl.click(); } });	
	$(".intro-container").animate({ "padding-top": 10 });
	$(".console-button").hide();

	term.enable();
	term.focus();
}

$(function() {
	startTerminal();
	$(".console-button").click(openConsole);	
})

ProgressBar = function(parent, size) {
	var self = this 
	var progressBarContainer = $("<div class='progress-meter'>");
	var unit = $("<div class='progress-unit'>");
	var cursor = $("<div class='first-progress progress-unit'>");
	var completeOverlay = $("<div class='complete-overlay'>Answered!</div>");
	var numberOfFlashes;

	progressBarContainer.css("width", size);	

	parent.append(progressBarContainer).append(completeOverlay);

	self.complete = function() {
		numberOfFlashes = 0;
		flash();
		function flash() {
			completeOverlay.show();
			setTimeout(function() {
				completeOverlay.hide()
				numberOfFlashes += 1

				if (numberOfFlashes < 0) {
					// do nothing, the flashing has been cancelled
				} else if (numberOfFlashes < 3) {
					setTimeout(flash, 400);
				} else {
					completeOverlay.show();
				}
			}, 400)
		}		
	}

	self.clearProgress = function() {
		progressBarContainer.html("");
	}

	self.reset = function(newNumberOfSteps) {
		// we just need a weird number here, so we can recognize and stop the flashing
		numberOfFlashes = -100;
		completeOverlay.hide();
		self.clearProgress()
		unit.css({ 
			width: (100 / (newNumberOfSteps)) + "%"
		})	
		cursor.css({ 
			width: (100 / (newNumberOfSteps)) + "%"
		})					
		progressBarContainer.append(cursor.clone());					
	}

	self.incrementProgress = function () {
		progressBarContainer.prepend(unit.clone());
	}	
}