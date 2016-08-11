# repl-challenge

Fork this repo and implement the following challenge, modifying this README with full instructions on how to run and view your solution.

## Challenge

In a language of your choosing, build a web interface to write and execute code and display the results. In particular, build an interface with 3 boxes:

1. A simple text editor (syntax highlighting and line numbers optional)
1. An input prompt
1. A display to view returned values

### Acceptance Criteria (User Stories)

- A user arrives at the page to find a text editor with an empty `run()` function stub
- In the text editor, a user can edit the `run()` function signature and body. The function may accept 0 or more parameters. For example, the user may implement a function called `run(x, y)` that simply returns the sum of `x` and `y`
- In the input prompt, the user can input an array of values, such as `[1, 2]` to represent any parameters required for the `run()` function. These values will be passed into the `run()` function and executed.
- The user clicks a run button to execute the code, upon which the result of the `run()` function should be displayed in the display box.

### Bonus (Required for Sr. Candidates)

- In the interface, add a `deploy` button next to the `run` button that creates a fixed endpoint that can be called repeatedly with other params via HTTP
- Include instructions within the interface for hitting the API endpoint that executes the user supplied `run()` function and how to pass in any arguments
