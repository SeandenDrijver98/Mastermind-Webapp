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

