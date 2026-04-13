import { useCallback, useEffect, useState } from "react"


type Tags = {
    id : number,
    tag : string
}

export default function TagInput() {

    const [inputValue , setInputValue] = useState('')
    const [tags , setTags ] = useState<Tags[]>([])
    const [error,setError] = useState('')

    function handleChange (e : React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    const AddTag = useCallback(() => {
        setError('')
        if(!inputValue) return ;

        if(tags.find(val=>val.tag === inputValue)){
            setError('Similar Value can not added multiple times')
            return
        }

        if(tags.length >= 10){
            setError('Max length is 10')
            return
        }

        setTags(prev=>{
            return [...prev,{id : Date.now(),tag : inputValue.trim()}]
        })
    },[inputValue,tags])

    function RemoveTag(id : number){
        setTags(prev=>{
             const newArr = prev.filter((val)=>val.id !== id)
             return newArr
        })
    }

    useEffect(()=>{

        function handleAdd(e : KeyboardEvent){
            if(e.key === 'Enter'){
                AddTag()
            }
        }

        window.addEventListener('keydown', handleAdd)

        return ()=>window.removeEventListener('keydown',handleAdd)
    },[AddTag])

  return (
    <div>
        <h1>Tags : </h1>
        {
            error ? <p style={{color:'red'}}>{error}</p> :
            tags.map(val=>(
               <div key={val.id}>
                   <span>{val.tag}</span>
                   <button onClick={()=>RemoveTag(val.id)}>x</button>
               </div>
           ))
        }
        <label htmlFor="tag">Enter Tag Name : </label>
        <input type="text" id="tag" name="tag" value={inputValue} onChange={handleChange} />
        {/* <button onClick={AddTag}>Add</button> */}

    </div>
  )
}
