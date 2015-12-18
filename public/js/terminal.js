Terminal = function (parent, cdmHandler, options) {
	var self = this;	
	var firstKeypress = true;
	var enabled = false
	
	if (options.enabled !== false) {
		enabled = true;
	}
	promptText = options.prompt || ">"	
	previousPrompt = "previous command>";

	var wrapper = $("<div class='terminal-wrapper'>")

	var displayWrapper = $("<div class='display-wrapper'>");

	var taskLabel = $("<div class='display-label'>task</div>");
	var taskDisplay = $("<div class='task-display display'>")
	var taskWrapper = $("<div class='task-wrapper'>")

	taskWrapper.append(taskLabel).append(taskDisplay)

	var helpLabel = $("<div class='display-label'>help</div>");
	var helpDisplay = $("<div class='help-display display'>")
	var helpWrapper = $("<div class='help-wrapper'>")

	helpWrapper.append(helpLabel).append(helpDisplay)

	var commandHistoryLabel = $("<div class='display-label'>&nbsp;</div>");
	var commandHistoryDisplay = $("<div class='command-history-display display'>");
	var commandHistoryWrapper = $("<div class='command-history-wrapper'>")

	commandHistoryWrapper.append(commandHistoryLabel).append(commandHistoryDisplay)
	
	var commandInputLabel = $("<div class='display-label'>input</div>");
	var prompt = $("<span class='prompt'>" + promptText + "</span>")
	var commandInput = $("<span class='command-input' contentEditable='true'>");
	var commandInputWrapper = $("<div class='input-wrapper'>")	

	var greetingEl;

	displayWrapper.css({		
		"position": "relative"
	})

	taskDisplay.css({
		"min-height": "4.5em"
	})

	helpDisplay.css({
		"min-height": "3em"
	})

	commandHistoryDisplay.css({
		position: "absolute",
		bottom: "0px",
		"max-height": "1.5em"
	})

	if (options.greeting) {
		showGreeting(options.greeting);	
	}

	commandInput.css({
		// "height": "1em",
		// "whitespace": "nobreak"
	})

	displayWrapper.append(taskWrapper).append(helpWrapper).append(commandHistoryWrapper);
	commandInputWrapper.append(commandInputLabel).append(prompt).append(commandInput);
	wrapper.append(displayWrapper).append(commandInputWrapper);	

	commandInput.keydown(handleCommand)	

	parent.append(wrapper);	

	function handleCommand(e) {
		if (e.keyCode === 13 && enabled) {							
			var cmd = commandInput.html();			

			if (cmd && (cmd !== 'help' && cmd !== "'help'")) {
				var inputClone = commandInputWrapper.clone();
				inputClone.find(".prompt").html(previousPrompt);				
				inputClone.find(".display-label").remove();
				commandHistoryDisplay.append(inputClone);
				commandHistoryDisplay.scrollTop(commandHistoryDisplay[0].scrollHeight);
			}

			commandInput.html("");

			cdmHandler(cmd, self);			
			return false			
		}		
	}

	function showGreeting(greeting) {
		greetingEl = $("<div class='greeting'>" + greeting + "</div>")
		displayWrapper.append(greetingEl);
		commandHistoryWrapper.css("visibility", "hidden");
		taskWrapper.css("visibility", "hidden");
		helpWrapper.css("visibility", "hidden")		
		commandInputWrapper.css("visibility", "hidden");

		function respondToKeydown(e) {
			if (e.keyCode === 13 && enabled) {										
				$("body").off("keydown", respondToKeydown);
				clearGreeting();
				self.focus();
				handleCommand(e);
				return false;
			}
		}

		$("body").on("keydown", respondToKeydown)
	}

	function clearGreeting() {
		greetingEl.remove()
		taskWrapper.css("visibility", "visible");
		commandHistoryWrapper.css("visibility", "visible");
		helpWrapper.css("visibility", "visible")
		commandInputWrapper.css("visibility", "visible")
	}

	self.echoTask = function(text) {
		var clone = taskDisplay.clone();
		taskDisplay.replaceWith(clone);
		clone.typed({strings: [text], typeSpeed: 0, showCursor: false});
		taskDisplay = clone;
	}

	self.echoHelp = function(text, onFinish) {
		var clone = helpDisplay.clone();
		helpDisplay.replaceWith(clone);
		clone.typed({ strings: [text], typeSpeed: 0, showCursor: false, onStringTyped: onFinish });
		helpDisplay = clone;
	}

	self.enable = function() {
		enabled = true;
	}

	self.changePrompt = function(newPrompt) {
		// prompt.html(newPrompt);
	}

	self.focus = function() {		
		commandInput.focus();
	}

	$(wrapper).click(self.focus);
}