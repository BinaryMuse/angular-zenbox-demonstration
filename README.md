This project demonstrates my attempt to wrap a jQuery modal library called [Zenbox](https://github.com/goaway/zenbox) in an Angular.js directive. Zenbox moves DOM around as part of showing and hiding modals.

Installation
------------

The project runs using Node.js.

  * `npm install`
  * `node app.js`
  * Visit `http://localhost:3000/` (port can be changed with `PORT` environment variable)

Demonstration
-------------

The homepage shows three examples. In each case, the modal content, which would normally be hidden until shown via Zenbox, is shown, to aid in debugging. The Angular code for the app can be found in `public/javascripts/app.js`.

The main directive used to show a modal is called `modal`; it takes three attributes:

  * `modal` - an expression that, when truthy, will cause the modal to be shown, and when falsy, will cause the modal to hide
  * `modalOpen` - an expression to be evaluated when the modal is opened (not used in these examples)
  * `modalClose` - an expression to be evaluated when the modal is closed using Zenbox's close button

Basic use of the directive can be found in the first example in `views/index.jade`. It works with no problem, and is only there to demonstrate basic usage of the directive.

The second example in `index.jade` shows a modal that includes a text input that is linked to a value on the scope; that value is also linked to a text input outside of the modal. The `ngModel` directive uses an object accessor, even though the `modal` directive does not create new scope, simply for parity when comparing to the third example.

To see that the second example works correctly, follow the following steps:

  1. Click the button to show the modal. Notice that the button is disabled.
  2. Enter text into the input. Notice that the button becomes enabled and that the text in the input on the page behind the modal correctly changes.
  3. Erase the text from the input. Notice that the button becomes disabled.
  4. Close the modal by clicking the `x` button.
  5. Click the 'Set modal2 text' button.
  6. Click the button to show the modal again. Notice that the input inside the modal has changed to the programmatically set text, and that the button is enabled.

The third example is almost the same, except that the directive in use, called `transcluded`, creates the modal via a template using `ngTransclude`; see the directive in `public/javascripts/app.js`. It shows the modal when the value `data.step` on the scope becomes equal to the (non-evaluated) string passed into the `transcluded` attribute (in this case, "show"). The directive creates (a non-isolate) scope.

To see the problem, follow the following steps:

  1. Click the button to show the modal. Notice that the button is disabled.
  2. Enter text into the input. Notice that the button becomes enabled and that the text in the input on the page behind the modal correctly changes.
  3. Erase the text from the input. Notice that the button becomes disabled.
  4. Close the modal by clicking the `x` button.
  5. CLick the 'Set modal3 text' button.
  6. Click the button to show the modal again. Notice that the input inside the modal has *not* changed to the programmatically set text, and that the button no longer becomes enabled or disabled based on the contents of the field.

It's also worth noting that the problem exists even if you don't click the 'Set modal3 text' button; simply re-opening the modal and trying to use the input is enough to demonstrate that it is broken.

I worked for a very long time on fixing or working around this problem. I finally ended up with a solution that used the `$compile` service to recompile the modal HTML after Zenbox returned the element to its original position in the DOM, but I had a lot of problem dealing with the transclusion (elements would be repeated, or I would get errors from `$compile`). I can provide additional details if necessary.
