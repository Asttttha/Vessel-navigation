import React from 'react'

function Readings({ startingCoordinates, endingCoordinates, speed }) {
  return (
    <div className='reading-container'>
      <div style={{ gap: '0px' }}>
        <p><strong>Starting</strong></p>
        <p><strong>Lat:</strong> {startingCoordinates[0]}</p>
        <p><strong>Long:</strong> {startingCoordinates[1]}</p>
      </div>
      <div>
        <p style={{ color: 'blue' }}><strong>Speed:</strong> {speed}kmph</p>

      </div>
      <div>
        <p><strong>Ending</strong></p>
        <p><strong>Lat:</strong> {endingCoordinates[0]}</p>
        <p><strong>Long:</strong> {endingCoordinates[1]}</p>
      </div>
    </div>
  )
}

export default Readings
