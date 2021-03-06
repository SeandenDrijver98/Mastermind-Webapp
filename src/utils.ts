import React from 'react'

export const baseColours = {
    none: 'transparent',
    Red: '#ED5565', // Grapefruit
    Yellow: '#FFCE54', // Sunflower
    Green: '#A0D468', // Grass
    Blue: '#4FC1E9', // Aqua
}
// "Lavender":"#AC92EC",
// "Pink Rose":"#EC87C0",
// "Charcoal":"#656D78"}

const randomColourNo = () =>
    Math.ceil(Math.random() * (Object.values(baseColours).length - 1))

export const generateColourCode = () => [
    randomColourNo(),
    randomColourNo(),
    randomColourNo(),
    randomColourNo(),
]

export const matchCodes = (correctCode: number[], attemptCode: number[]) => {
    let correctCount = 0
    let incorrectCount = 0
    // Check for correctly positioned
    attemptCode.forEach((code, position) => {
        const actualPosition = position + (correctCode.length - 4)

        if (code === correctCode[actualPosition]) {
            correctCount += 1
            correctCode.splice(actualPosition, 1)
            // Substitute used attempt with invalid value - check if there is a way to remove it instead without removing iterations.
            attemptCode.splice(position, 1, -1)
        }
    })

    // Check remainding for incorrectly positioned
    correctCode.forEach((code, position) => {
        if (attemptCode.includes(code)) {
            incorrectCount += 1
            attemptCode = attemptCode.filter((attempt) => attempt !== code)
        }
    })

    return {
        correct: correctCount,
        incorrect: incorrectCount,
    }
}

/**
 * @description Set and Access the currently active colour without prop drilling by using [React Context](https://reactjs.org/docs/context.html)
 */
export const ColourContext = React.createContext<number | null>(null)
export const ThemeContext = React.createContext<boolean>(false)
export const CodeContext = React.createContext<boolean>(false)

export const theme = {
    lightGrey: '#d3d6da',
    darkGrey: '#787c7e',
    black: '#000',
    white: '#FFF',
    green: '#6aaa64',
}
