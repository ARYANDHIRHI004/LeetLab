import React, { useState } from 'react'
import { useProblemStore } from '../Store/useProblemStore'

const DescriptionSection = () => {

  const {problem} = useProblemStore()
  
  let exampleArray = []
  const object = problem?.examples
  
  for (const key in object) {
    const exampleObject = {
      language:key,
      value:object[key]
    }
    exampleArray.push(exampleObject)
  }

  console.log(exampleArray)
          

  return (
    <div>
      <div>
        <span className='bg-yellow-500 rounded-full px-4'>{problem?.difficulty}</span>
        <p className='mt-5 mb-5 text-justify'>{problem?.description}</p>
        <div className='flex gap-5 flex-wrap'>
          {
            problem?.tags.map((tag)=>(
              <p className='bg-gray-600 px-5 rounded-full'>{tag}</p>
            ))
          }
        </div>

        <div className='flex flex-col gap-3 mt-5 text-[13px]'>
          <p className='font-bold text-2xl'>Examples:</p>
          {
            exampleArray.map((exampleObject)=>(
              <div className='bg-gray-600 p-5 rounded-2xl flex flex-col gap-1 '>
                <p>{exampleObject.language}</p>
                <p className='font-bold'>Input: <span className='font-normal'>{exampleObject.value.input.split("s =")}</span></p>
                <p className='font-bold'>Output: <span className='font-normal'>{exampleObject.value.output}</span></p>
                <p className='font-bold'>Explanation: <span className='font-normal'>{exampleObject.value.explanation}</span></p>
              </div>
            ))
          }
        </div>
        
        <div className='mt-5 text-[13px]'>
          <p className='pb-2 font-bold text-2xl'>Constraints</p>
          {problem?.constraints}
        </div>

      </div>
    </div>
  )
}

export default DescriptionSection