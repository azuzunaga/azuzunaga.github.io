# Emoji Shooter
A JavaScript-built collect-three game, inspired by Bubble Shooter and the Unicode® Technical Standard #51

## Background and overview

Emoji Shooter is a collect-three game, the objective is to clear all the game tokens
before they reach the bottom of the screen.

The board is setup so that there is an x number of rows randomly prefilled with game tokens and gaps (95/5). The user starts with 5 available shots, and aims and shoots tokens using the mouse. Everytime a group of three or more tokens is created they dissappear from the screen. If no groups are destroyed, the number of available shots decreases by one. If the user runs out of shots the token wall drops down one row, and the user starts over with 4 shots. This keeps going until the user completly clears the screen of tokens or the token wall reaches the bottom of the screen.

## Functionality and MVPs

In Emoji Shooter, users will be able to:

- [ ] Shoot tokens at the token wall, aiming with their mouse cursor and
shooting on click.
- [ ] Start and pause the game.
- [ ] Hear sounds on token impact with the chain and on grouped-token
"explosion".
- [ ] Mute sounds.

In addition, this project will include:

- [ ] A modal with instructions.

## Wireframes

This project will consist of a single page with an instructions modal. The game
page will have buttons to start/pause the game, access the instructions, and to
mute the sound. Additionally, the navbar will have links to my Github / LinkedIn
pages.

![wireframe](https://raw.githubusercontent.com/azuzunaga/zumoji/master/assets/images/wireframes.png)

## Architecture and Technologies

Emoji Shooter will be implemented with the technologies below:

* Vanilla JS for overall structure and game logic,
* HTML5 Canvas for DOM manipulation and rendering,
* Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts used in this
project:

* `board.js`: this script will handle the logic for creating and updating the
necessary DOM elements.
* `wall.js`: handle the drawing and physics logic for creating the token wall.
* `shooting.js`: handle the physics of shooting tokens into the wall.
* `emojis.js`: handle the logic and physics of removing grouped tokens or adding tokens to the wall. 
