import React, { FC } from 'react'
import Row from '../containers/Row'

type Props = {
    success: boolean
    colourCode: number[]
}

export const Alert: FC<Props> = (props) => {
    const { success, colourCode } = props
    if (success) {
        return (
            <div
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '400px',
                    margin: '0 auto',
                }}
            >
                <h1>Congratulations, You cracked the code!</h1>
                <p>
                    The correct code was:{' '}
                    <Row
                        key={'result'}
                        rowNo={-1}
                        played={true}
                        active={false}
                        onSubmit={() => console.log('')}
                        colours={colourCode}
                        updateColour={() => console.log('')}
                        result={true}
                    />
                </p>
                <button onClick={() => window.location.reload()}>
                    Play Again
                </button>
            </div>
        )
    }
    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                margin: '0 auto',
            }}
        >
            <h1>Game over!</h1>
            <p>
                The correct code was:{' '}
                <Row
                    key={'result'}
                    rowNo={-1}
                    played={true}
                    active={false}
                    onSubmit={() => console.log('')}
                    colours={colourCode}
                    updateColour={() => console.log('')}
                    result={true}
                />
            </p>
            <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
    )
}

export default Alert
