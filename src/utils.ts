
export const baseColours = ["transparent", "#ED5565", "#FFCE54" , "#A0D468", "#4FC1E9", "#AC92EC", "#EC87C0", "#656D78"]
// "#FC6E51" Orange
const randomColourNo = () => Math.ceil(Math.random() * (baseColours.length-1))

export const generateColourCode = () => [randomColourNo(), randomColourNo(), randomColourNo(), randomColourNo()]

export const matchCodes = (correctCode: number[], attemptCode: number[]) => {
    let correctCount = 0
    let incorrectCount = 0
    // Check for correctly positioned
    attemptCode.forEach((code, position) => {
        const actualPosition = position + (correctCode.length-4)
       
        if(code === correctCode[actualPosition]){
            correctCount += 1
            correctCode.splice(actualPosition, 1)
            // Substitute used attempt with invalid value - check if there is a way to remove it instead without removing iterations.
            attemptCode.splice(position, 1, -1) 
        }
    });

    // Check remainding for incorrectly positioned
    correctCode.forEach((code, position) => {
        if(attemptCode.includes(code)){
            incorrectCount += 1
            attemptCode = attemptCode.filter(attempt => attempt !== code)
        }
    })

    return {
        correct: correctCount, incorrect: incorrectCount
    }
}