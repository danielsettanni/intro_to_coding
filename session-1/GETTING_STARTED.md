# GETTING_STARTED.md  

## Your First Web Page (3 Tiny Versions)

In this project, you’ll build a *super simple* webpage three times. Each version adds one new idea:

1) **HTML**: structure (what’s on the page)  
2) **CSS**: style (how it looks)  
3) **JavaScript**: behavior (what it does when you interact)

You can copy each version into a file named `index.html` and open it in your browser (or use VS Code + Live Server).

---

## Version 1 — The smallest possible web page

## V1 Code (copy into `index.html`)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
  </head>

  <body>
    <div>
      <p>Hello World!</p>
    </div>
  </body>
</html>
```

## What you just used (the basics)

### HTML tags

An HTML tag is a label inside angle brackets, like &lt;p&gt; or &lt;div&gt;. Tags tell the browser what something is.

  •  &lt;p&gt; means “paragraph text”
  •  &lt;div&gt; means “a box/container to group stuff”
  •  &lt;head&gt; holds page info (not usually shown on the page)
  •  &lt;title&gt; sets the text you see on the browser tab
  •  &lt;body&gt; contains what you actually see on the page

### Closing tags

Most tags must be closed using the &lt;/tag&gt; syntax:
  •  Opening tag: &lt;p&gt;
  •  Closing tag: &lt;/p&gt;

This “open + close” pattern is part of the syntax of HTML.

### What “syntax” means here

Syntax is the set of rules for how code must be written so the computer can understand it.
Examples of HTML syntax rules:
  •  Tags use &lt; &gt;
  •  Most tags have a matching closing tag &lt;/ &gt;
  •  Tags are usually nested (one inside another) in a neat structure

### Attributes (extra info on tags)

An attribute is extra information inside a tag, like:

&lt;p id="message"&gt;Hello World!&lt;/p&gt;

Here, id="message" is an attribute. It gives that element a name we can find later.

### Document structure (what each section does)

A basic HTML file usually looks like this:
  •  &lt;!DOCTYPE html&gt;: tells the browser this is HTML
  •  &lt;html&gt;: wraps the whole page
  •  &lt;head&gt;: information about the page (like the &lt;title&gt;)
  •  &lt;body&gt;: everything visible on the page

IDs and classes (you’ll use these a lot)
  •  ID: a unique name for ONE element on the page
Example: id="startButton" (should be used once)
  •  Class: a reusable label for MANY elements
Example: class="choiceButton" (can be used on multiple buttons)

You’ll use IDs and classes to style things with CSS and to find things with JavaScript.

### References (HTML syntax + structure)

  •  [Introduction to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
  •  [Document and website structure](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)

⸻

## Version 2 — Add inline styles (colors!)

In this version, you’ll add inline CSS to:
  •  change the whole page background color
  •  change the div box background color
  •  change the color of the word world

## V2 Code (copy into index.html)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Styled Web Page</title>
  </head>

  <body style="background-color: #e9f5ff;">
    <div style="background-color: #ffffff; padding: 16px; border-radius: 10px;">
      <p>
        Hello <span style="color: #d13b3b;">World!</span>
      </p>
    </div>
  </body>
</html>
```

## What you just added (the basics)

### What CSS is

CSS stands for Cascading Style Sheets. CSS controls how things look, like:
  •  colors (text color, background color)
  •  size (font size, width/height)
  •  layout (how things are arranged)
  •  spacing (padding and margin)
  •  borders (border thickness, rounded corners)

A few quick examples
  •  Color: color: red;
  •  Background color: background-color: lightblue;
  •  Font size: font-size: 18px;
  •  Layout (simple): display: flex;
  •  Padding (space inside a box): padding: 16px;
  •  Margin (space outside a box): margin: 16px;
  •  Rounded corners: border-radius: 10px;

### Three ways to use CSS

  1. Inline CSS (what we used here)
  •  goes inside the tag using style="..."
  •  Example: &lt;div style="background-color: white;"&gt;
  1. Embedded CSS (in a &lt;style&gt; tag inside &lt;head&gt;)
  •  good for small pages
  •  Example:

&lt;style&gt;
  body { background-color: #e9f5ff; }
&lt;/style&gt;

  1. External CSS (in a separate .css file)
  •  best for bigger projects
  •  Example:

&lt;link rel="stylesheet" href="style.css"&gt;

### CSS syntax (how it’s written)

CSS is usually written like this:

selector {
  property: value;
  property: value;
}

Example:

p {
  font-size: 18px;
  color: black;
}

### Inline CSS is the same property: value; format — it’s just inside quotes

### References (CSS basics + layout)

  •  [CSS First Steps](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps)
  •  [CSS Layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)

⸻

## Version 3 — Add a button + JavaScript (make it interactive!)

Now we’ll add:

  •  a second &lt;div&gt; with a button
  •  an id on the button (so JavaScript can find it)
  •  a small JavaScript program that changes the button text when clicked

## V3 Code (copy into index.html)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Interactive Web Page</title>
  </head>

  <body style="background-color: #e9f5ff; font-family: Arial, sans-serif;">
    <div style="background-color: #ffffff; padding: 16px; border-radius: 10px;">
      <p style="font-size: 18px;">
        Hello <span style="color: #d13b3b;">World!</span>
      </p>
    </div>

    <div style="margin-top: 14px; background-color: #ffffff; padding: 16px; border-radius: 10px;">
      <button
        id="funButton"
        style="padding: 10px 14px; font-size: 16px; cursor: pointer; border-radius: 8px;"
      >
        Click me
      </button>
    </div>

    <script>
      // JavaScript runs in the browser and can change the page.
      // 1) Find the button using its ID:
      const button = document.getElementById("funButton");

      // 2) When the button is clicked, run this code:
      button.onclick = () => {
        button.textContent = "Nice click!";
      };
    </script>
  </body>
</html>
```

## What you just added (the JavaScript basics)

### What JavaScript is

JavaScript is a real programming language.
Unlike HTML and CSS (which describe structure and style), JavaScript lets you:
  •  react to user actions (like clicks)
  •  change text, images, styles, and more
  •  store data in variables
  •  make decisions with logic (like if statements)
  •  build interactive games and apps

### JavaScript syntax (very small starter ideas)

JavaScript code is made of:
  •  variables (store information)

const name = "Catherine";

  •  functions (a block of code that runs when called)

function sayHi() { alert("Hi!"); }

  •  events (like click, keypress, etc.)

button.onclick = () => { ... };

### The DOM (super simple explanation)

The DOM stands for Document Object Model.
Think of it as the browser’s “map” of your page — every tag becomes an object JavaScript can find and change.

So when you write:

document.getElementById("funButton")

you’re telling the browser:

“Find the page element with the id funButton.”

Then you can change it:

button.textContent = "New text!";

### Basic logic (IF statements)

JavaScript can make decisions:

if (button.textContent === "Click me") {
  button.textContent = "You clicked it!";
} else {
  button.textContent = "Click me";
}

That’s how games remember choices and react differently.

### References (JavaScript basics + working with the page)

  •  [JavaScript First Steps](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps)
  •  [JavaScript Manipulating Documents](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

⸻

✅ Quick reminder

Always follow your family’s rules and expectations when using the internet.
If you’re unsure whether a website is okay to use, check with a parent or guardian first.
