import React from 'react'

type Props = {
    value: string
    title: string
}

export const Stat = (props: Props) => {
    const { title, value } = props

    return (
        <div>
            <h2>{value}</h2>
            <p>{title}</p>
        </div>
    )
}

export default Stat
