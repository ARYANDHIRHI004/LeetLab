import React, { useState } from 'react'
import { useProblemStore } from '../Store/useProblemStore'

const HintSection = () => {

    const {problem} = useProblemStore()

  return (
    <div>
         {
            problem?.hints?(
                <p>{problem?.hints}</p>
            ):(
                <p className='text-xl text-center'>NO HINTS FOR THIS QUESTION</p>
            )
        }
    </div>
  )
}

export default HintSection