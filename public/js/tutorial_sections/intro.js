var introSteps = [	
	{
		text: "Welcome to the tutorial! Press enter to continue...",
		section: "How does this tutorial work?"
	},
	{
		text: "In this lesson you will learn how a webpage works, using THIS webpage as an example."
	},
	{
		text: "Instructions and help will appear here in the 'help' section. To move on to the next instruction press enter at any time.",
	},
	{
		text: "Classadoo lessons are based around inquiry. Throughout the tutorial we will discover answers to different questions."
	},
	{
		text: "The question we are currently working is shown in the question display, along with our progress towards answering that question.",
		action: function() {
			var progressContainer = $(".progress-container");
			flash(progressContainer, 2, function () { 
				progressContainer.css("background", "") 				
			})
		}
	},	
	{
		task: "As we work towards answers, you will be given 'tasks' to complete. Your current task (if there is one) will appear here.",	
	},
	{
		task: " ",
		text: "To complete tasks you will type commands into the prompt below, then press enter. Once the task is complete the tutorial will automatically move on."
	},
	{
		task: "",
		text: "If at any point you feel confused, just type <c>help</c>, and press enter."
	},	
	{
		task: " Let's try this now! Type <c>help</c> and press enter.",
		help: "Great! Notice that the word <c>help</c> is highlighted white. Anything highlighted white is an example command which you can type into the prompt.",
		// this is just to tell the command processor to move on after help is typed.
		helpTutorial: true,
		interaction: function(cmd) {
			term.echoHelp("Hmm, not quite, you typed: <c>" + cmd + "</c>, but you need to type <c>help</c>")
		}
	},
	{
		task: " ",
		text: "Let's try one more practice task before we start..."
	},
	{
		task: "Type <c>set-name <d>name</d></c>, to tell me the name you'd like to use. The word <d>name</d> here is a placeholder. So you should substitute something like <c>Alice</c> for <d>name</d>, and type <c>set-name Alice</c>.",
		interaction: function(cmd) {
			var args = cmd.split(" ")
			var cmdName = args[0]
			var name = args[1]
			if (cmdName == "set-name" && name) {
				if (name == "name") {
					term.echoHelp("Almost, but don't actually type <c>set-name name</c>, instead, substitute your name for the word <d>name</d>. Ex: <c>set-name Hugo</c>.");
					return false
				} else {
					term.echoHelp("Great, nice to meet you " + name + "!");
					return true	
				}				
			} else {
				term.echoHelp("Hmmm, not quite. Try typing something like <c>set-name Alice</c> or <c>set-name Paul</c>.");
				return false
			}
		},
		help: "Try typing something like <c>set-name David</c>. This will tell the tutorial the name you'd like to use."
	},
	{
		task: " ",
		text: "Awesome, now you know how the tutorial works, so we've solved our first question! Hit enter when you're ready to continue.",
		questionComplete: true,
		action: logComplete(1)
	}	
]