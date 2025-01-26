import React, { FC } from 'react'
import Row from '../containers/Row'
import ConfettiExplosion from 'react-confetti-explosion'

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
                <div style={{ position: 'relative' }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <ConfettiExplosion
                            force={0.5}
                            duration={3000}
                            particleCount={300}
                        />
                    </div>
                </div>

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
