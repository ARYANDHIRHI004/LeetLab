import React, { useMemo, useState } from 'react'
import {useAuthStore} from "../Store/useAuthStore.js"
import { Link } from 'react-router-dom'

const ProblemTable = ({problems}) => {
  const {authUser} = useAuthStore()

  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState("ALL")
  const [selectedTag, setSelectedTag] = useState("ALL")
  const [currentPage, setCurrentPage] = useState(1)

  const allTags = useMemo(()=>{
    if(!Array.isArray(problems)) return []

    const tagsSet = new Set()

    problems.forEach((p)=>p.tags?.forEach((t)=>tagsSet.add(t)))

    return Array.from(tagsSet)
  }, [problems])

  const filteredProblems = useMemo(()=>{
    return (problems || [])
    .filter((problem) => problem.title.toLowerCase().includes(search.toLowerCase()))
    .filter((problem) => difficulty === "ALL"? true: problem.difficulty === difficulty)
    .filter((problem) => selectedTag === "ALL"? true: problem.tags?.includes(selectedTag))
  }, [problems, search, difficulty, selectedTag])

  const itemsPerPage = 5;
  const totlePages = Math.ceil(filteredProblems.lenght/itemsPerPage)
  const paginatedProblems = useMemo(()=>{
    return filteredProblems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  }, [filteredProblems, currentPage])

  const difficultys = ["EASY", "MEDIUM", "HARD"]
console.log('paginatedProblems', paginatedProblems)
  return (
    <div className='w-full max-w-6xl mx-auto, mt-10'>
      <div className='flex justify-between items-center, mb-6'>
        <h2 className='text-2xl font-bold'>Problems</h2>
        <button 
          className='btn btn-primary gap-2'
          onClick={()=>{}}
        >
          Create Playlist
        </button>
      </div>

      <div className='flex flex-wrap justify-between items-center mb-6 gap-4'>
        <input 
          type="text"
          placeholder='Search by title'
          className='input input-primary w-full md:w-1/3 bg-base-200'
          onChange={(e)=>{setSearch(e.target.value)}}
        />
        <select
         className='select select-primary bg-base-200'
         value={difficulty}
         onChange={(e)=>{setDifficulty(e.target.value)}}
        >
          <option value="ALL">All Difficulties</option>
          {difficultys.map((diff)=>(
              <option value={diff} key={diff}>
                {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
              </option>
            ))
          }            
        </select>
        <select 
          className='select select-primary bg-base-200'
          value={selectedTag}
          onChange={(e)=>{setSelectedTag(e.target.value)}}
        >
          <option value="ALL">ALL Tags</option>
          {
            allTags.map((tag)=>(
              <option value={tag} key={tag}>
                {tag}
              </option>
            ))
          }
        </select>
      </div>

      <div className='overflow-auto rounded-xl shadow-md'>
        <table className='table table-zebra table-lg bg-base-200 text-base-content'>
          <thead className='bg-base-200'>
            <tr>
              <th>Solved</th>
              <th>Title</th>
              <th>Tage</th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody> 
            {
              paginatedProblems.length > 0? (
                paginatedProblems.map((problem) => {
                  const isSolved = problem.solvedBy?.some(
                    (user)=>user.userId === authUser?.id
                  )
                  return (
                    <tr key={problem.id}>
                      <td>
                        <input 
                        type="checkbox"
                        checked={isSolved}
                        readOnly
                        className='checkbox checkbox-sm'
                        />
                      </td>
                      <td>
                        <Link to={`/problem/${problem.id}`} className='font-semibold hover:underline'>
                          {problem.title}
                        </Link>
                      </td>
                      <td >
                        {problem.tags.map((tag)=>
                          <span className='text-[11px] mx-0.5 bg-white text-purple-900 px-2 rounded-2xl'>{tag}</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ):(
                <tr>
                  <td colSpan={5} className='text-center py-6 text-gray-500'>
                  No Problems Found
                </td>
                </tr>
              )
            }
          </tbody>
        </table>

      </div>
    </div>  
  )
}

export default ProblemTable