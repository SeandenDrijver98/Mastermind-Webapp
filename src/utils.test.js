import {matchCodes} from './utils'

test('Counts incorrect only once', () => {
    const correctCode = [0,0,0,1]
    const attemptCode = [1,2,2,2]
    
    expect(matchCodes(correctCode, attemptCode).correct).toBe(0);
    expect(matchCodes(correctCode, attemptCode).incorrect).toBe(1);
  });

test('Counts Correct only once', () => {
    const correctCode = [0,0,0,1]
    const attemptCode = [1,1,1,1]

    expect(matchCodes(correctCode, attemptCode).correct).toBe(1);
    expect(matchCodes(correctCode, attemptCode).incorrect).toBe(0);
});

test('Matches half correctly', () => {
    const correctCode = [1,1,0,1]
    const attemptCode = [1,1,1,0]

    expect(matchCodes(correctCode, attemptCode).correct).toBe(2);
    expect(matchCodes(correctCode, attemptCode).incorrect).toBe(2);
});

test('Matches all correctly', () => {
    const correctCode = [1,1,1,1]
    const attemptCode = [1,1,1,1]

    expect(matchCodes(correctCode, attemptCode).correct).toBe(4);
    expect(matchCodes(correctCode, attemptCode).incorrect).toBe(0);
});

test('Correct matches dont also match incorrect', () => {
    const correctCode = [1,1,3,1]
    const attemptCode = [1,1,1,1]

    expect(matchCodes(correctCode, attemptCode).correct).toBe(3);
    expect(matchCodes(correctCode, attemptCode).incorrect).toBe(0);
})

test('Last code is checked for correctness', () => {
    const correctCode = [2,2,2,1]
    const attemptCode = [3,3,3,1]

    expect(matchCodes(correctCode, attemptCode).correct).toBe(1);
    expect(matchCodes(correctCode, attemptCode).incorrect).toBe(0);
})

test('Duplicate incorrect codes arent counted twice', () => {
    const correctCode = [2,2,3,3]
    const attemptCode = [1,1,2,1]

    expect(matchCodes(correctCode, attemptCode).correct).toBe(0);
    expect(matchCodes(correctCode, attemptCode).incorrect).toBe(1);
})

test('Duplicate colours with 1 correct and one incorrect are counted correct', () => {
    const correctCode = [4,3,4,2]
    const attemptCode = [4,4,3,2]

    expect(matchCodes(correctCode, attemptCode).correct).toBe(2);
    expect(matchCodes(correctCode, attemptCode).incorrect).toBe(2);
})

test('Sanity', () => {
    const correctCode = [2, 3, 3, 1]
    const attemptCode = [3, 3, 2, 2]

    expect(matchCodes(correctCode, attemptCode).correct).toBe(1);
    expect(matchCodes(correctCode, attemptCode).incorrect).toBe(2);
})