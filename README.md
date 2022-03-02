# Welcome to Mastermind Webapp!

Mastermind is a code-breaking game originally played by two people, the *codemaker* and *codebreaker*.

This Webapp acts as the codemaker by pseudo-randomly selecting a set of four colours. 
Your job as the codebreaker is to guess the combination of colours in the correct position within 10 attempts.

Ready for the challenge give it a go: https://mastermind-web.netlify.app/

## How to play?

 1. Starting from the bottom of the board, look for the highlighted Row of Tiles and select a colour combination by tapping each tile repeatedly until you have your desired colour.
 2. Click the Submit button once you've chosen a colour for all 4 Tiles, The App will then grade your combination with the Orange number on the left indicating how many colours are correctly guessed but are in the wrong position, whereas the Green number on the right indicates how many coulers are correctly guessed and positioned.
3. Using the Grading determine your next set of colours and repeat until you have found the correct combination or you run of turns, whichever comes first.
4. GG HF!

## Technical Info
This app was built with **React & Typescript** and Bootstrapped with the Typescript CRA template

    npx create-react-app my-app --template typescript

Jest Unit Tests are used to ensure the Grading logic works correctly.


    test('Sanity', () => {
	    expect(isSane()).toBe(True);
    })
    
	npm run test -t 'Sanity'
	>> Tests:       1 failed, 1 total

Hosted using **Netlify**! An all-in-one platform for automating modern web projects.

## Useful links
- [Typescript](
https://www.typescriptlang.org/docs/)
- [React](https://reactjs.org/) & [React Beta](https://beta.reactjs.org/) 
- [Jest testing](https://jestjs.io/)
- [Netlify](https://docs.netlify.com)