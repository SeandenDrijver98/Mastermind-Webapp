
export const baseColours = ["transparent", "red", "green", "blue"]

const randomColourNo = () => Math.floor(Math.random() * baseColours.length)

export const generateColourCode = () => [randomColourNo(), randomColourNo(), randomColourNo(), randomColourNo()]

export const matchCodes = (correctCode: number[], attemptCode: number[]) => {
    let correctCount = 0
    let incorrectCount = 0
    // Check for correctly positioned
    attemptCode.forEach((code, position) => {
        if(attemptCode[position] === correctCode[position]){
            correctCount += 1
            correctCode.splice(position, 1)
        }
    });

    // Check remanding for incorrectly positioned
    attemptCode.forEach((code, position) => {
        if(correctCode.includes(attemptCode[position])){
            incorrectCount += 1
        }
    })

    return {
        correct: correctCount, incorrect: incorrectCount
    }
}