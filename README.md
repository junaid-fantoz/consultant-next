## Getting Started

```bash
npm install
npm run dev
```

-------- Original README.md below --------

# Welcome to the front-end engineering test

In this exercise you will create a small single page application that displays (and filters) launch information. 
We perform these exercises to get a feel for how you approach challenging problems.

## Introduction

You will be building a web application using NextJS and EmberJS.
Some of the components have already created and styled within the react so that the app is responsive.
For your convenience, we've already set these projects up for you so you can start right away. However, the codebase would need to be converted to NextJS and EmberJS, as if you are rewriting the application.

The data required for this task will be available on a local api server in JSON format. You will be expected to fetch 
(or AJAX) the data into your web application and manipulate/filter the results to display.

The creative and business analyst teams have provide you with some supporting designs which can be found in the `designs`
folder.

Above all, we're not expecting a completed masterpiece. We're looking for your attention to detail, semantic goodness, 
and to see how you tackle different problems.

Good luck!

## Prerequisites

- You have [Node](https://nodejs.org/en/) v8 with npm installed
- You are familiar with entering simple [terminal commands](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line)
- You are familiar with [Git source control](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners)
- You will require an internet connection to install npm packages
- An editor of your choice (e.g. [Atom](https://atom.io/), [VSCode](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), [WebStorm](https://www.jetbrains.com/webstorm/), or your own editor/IDE)


## Instructions

**1. Assumptions**

Please list any assumptions in the `ASSUMPTIONS.md` file that you have made in order to solve any problems.

**2. Read the Getting Started guide below and choose one solution technology (eg React)**

**3. Read the Requirements and start building your application**

**4. Submit your solution for review.**

Submission details are down below.

## Getting started

We have provided you with a hi-fidelity desktop design file for the app, located at `/designs/Design.png`. You should 
make your solution match these designs as closely as possible. Unfortunately, the creative team have not provided any 
mobile designs and look to your expertise in making it responsive. The font used is called `Lato` and readily available 
on the internet. 

The business analyst team have also provided you with a technical specification located at `/designs/Functional Specification.pdf`.

We have provided you with a starting project in React framework.Some of the components have already created and styled so that the app is responsive.(Refer to the project
overview and component guide within the docs folder in the react-project)

### Solution Technologies

**React**

https://reactjs.org/

1. Change into the `react-project` folder and run `npm install`. 
2. Start the project via `npm run start`.
3. You can then view the project by visiting `localhost:3000` in your browser.
4. Open the `react-project` in your editor to make changes

 
### API Server

Your solution will require interaction with a local API server that provides data.

To start the server, use a separate terminal window with the following:

1. Change into the `server` directory and run `npm install`
2. Start the server via `npm run start`

The following 2 endpoints will now be available.

| Endpoint                             | Description                       |
| ------------------------------------ | --------------------------------- |
| http://localhost:8001/launches       | returns an array of launch data   |
| http://localhost:8001/launchpads     | returns launchpads                |

### Stopping the projects and server

If at anytime you want to stop the project servers. Press keys `control + c` in the terminal.

## Requirements

Please allocate your self 4 hours to complete the following. You are expected to prioritise your 
tasks to deliver the most overall complete application in this time frame.

- In your approach, consider this project exactly as you would a real-world project.
- Your application must fetch/ajax all launch data. By default, ALL launch missions should be listed.
- If at anytime, there is no listing data to display, your application should tell users there are no results.
- If your application is ever busy, this should be reflected in the interface (eg a loader).
- Your solution must work in IE11, latest Chrome/Firefox/Safari (including touch devices).
- Your solution must be valid, semantic HTML and Accessible to the WCAG 2.0 Level AA standard
- You must follow the `designs/Functional Specification.pdf` business rules.
- Consistent code formatting is good. We recommend using a linter for your CSS and JS.

## Submitting your solution

1. Ensure you have added your assumptions, anything missing and any changes you made to the starter project to the `ASSUMPTIONS.md`
2. Delete the `node_modules` folder from the root of your project and the server folder.
3. ZIP up the project root folder and include your name in the filename. eg (JohnSmith-fed-exercise.zip)
4. Either email the zip back as an attachment OR upload onto dropbox/google drive and send us the download link.
