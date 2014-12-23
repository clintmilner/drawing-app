#Welcome to Paintbrush
## The Command-line drawing app

Paintbrush is a simple HTML5 app that will take simple canvas drawing commands via
text field and render drawings on the full screen canvas element.

The command line can be access by pressing the up-arrow or down-arrow key, and
commands can be sent to be processed by pressing the Send Query button, or by
hitting enter.

If the user enters a command that isn't recognized, or doesn't pass the correct
number of parameters, a error message is shown.

Once the user enters a correct command, a code hint shows to help the user finish
the drawing command.


##CODE
The HTML and CSS are very simple, and the JavaScript is based on a pattern that
we've been using at my current job which I enjoy using. Drawing.js is the M in MVC.
It would normally be accompanied by a 'trigger' file which would be comparable
to the controller of an MVC.


###NOTE
The 'fill' command is a little scrappy. I'm creating the illusion of the canvas
being filled by redrawing the rectangle a few times over a setInterval.

With more time, I would have make the interface prettier.

Thanks for your time.
Clint