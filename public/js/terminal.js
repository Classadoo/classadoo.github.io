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

	var taskLabel = $("<div class='display-label col-md-1'>task</div>");
	var taskDisplay = $("<div class='task-display display col-md-10'>")
	var taskWrapper = $("<div class='task-wrapper row'>")

	taskWrapper.append(taskLabel).append(taskDisplay)

	var helpLabel = $("<div class='display-label col-md-1'>help</div>");
	var helpDisplay = $("<div class='help-display display col-md-10'>")
	var helpWrapper = $("<div class='help-wrapper row'>")

	helpWrapper.append(helpLabel).append(helpDisplay)

	var commandHistoryLabel = $("<div class='display-label col-md-1'>&nbsp;</div>");
	var commandHistoryDisplay = $("<div class='command-history-display display col-md-10'>");
	var commandHistoryWrapper = $("<div class='command-history-wrapper row'>")

	commandHistoryWrapper.append(commandHistoryLabel).append(commandHistoryDisplay)
	
	var commandInputLabel = $("<div class='display-label col-md-1'>input</div>");	
	var commandInputWrapper = $("<div class='input-wrapper col-md-10 display'>")	
	var prompt = $("<span class='prompt'>" + promptText + "</span>")
	var commandInput = $("<span class='command-input' contentEditable='true'>");	
	var commandDisplayWrapper = $("<div class='command-display-wrapper row'>")	

	commandInputWrapper.append(prompt).append(commandInput)

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
		overflow: "hidden",
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
	commandDisplayWrapper.append(commandInputLabel).append(commandInputWrapper)
	wrapper.append(displayWrapper).append(commandDisplayWrapper);	

	commandInput.keydown(handleCommand)	

	parent.append(wrapper);	

	function handleCommand(e) {
		if (e.keyCode === 13 && enabled) {							
			var cmd = commandInput.html();			

			if (cmd && (cmd !== 'help' && cmd !== "'help'")) {
				var inputClone = commandInputWrapper.clone();
				inputClone.find(".prompt").html(previousPrompt);				
				inputClone.find(".display-label").remove();
				inputClone.addClass("input-history");
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
		commandDisplayWrapper.css("visibility", "hidden");

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
		commandDisplayWrapper.css("visibility", "visible")
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