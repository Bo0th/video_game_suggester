import React from 'react'

const Body = ({page}) => {
  return (
    <div>
        {page === 'Suggest A Game' ? <Suggester reRun={reRunIncrement}/> : ''}
    </div>
  )
}

export default Body
