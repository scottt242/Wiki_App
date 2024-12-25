import React,{Fragment,useEffect,useState,useRef} from 'react'
import axios from "axios"
import './App.css';
import  prevState from "./custom-hooks/usePrevState";
const App = () => {
  const [name,setName]=useState("")
  const [phone,setPhone]=useState("")
  //useEffect always come after state
  // useEffect(()=>{
  //   console.log("useEffect")//print after first render(reload) if array is empty
  // },[])
//-----------------------------------------------------------------------------------------------------------
  // useEffect(()=>{
  //   if(name || phone){// for does'nt print in render
  //   console.log("update useEffect")//print after update the value of(state || props || var)
  //   }
  // },[name,phone])

// useEffect(()=>console.log("update"))//print when update and render
//------------------------------------------------------------------------------------------------------------
// useEffect(()=>{
// const timeOut=setTimeout(() => {//to make the render wait some time to re-render(1)
//   console.log("timeOut")
// }, 1000);
// return ()=>{//for the cleanup of memory(2)
//   clearTimeout(timeOut)
// }
// },[name])//before print when writing the 2nd char it will be clean the 1st timeOut
//------------------------------------------------------------------------------------------------------------






const [term,setTerm]=useState("javascript")
const [debounce,setDebounce]=useState(term)
const [res,setRes]=useState([])
//(2)
// useEffect(()=>{
// let timeOut=setTimeout(()=>{
//   setDebounce(term)
// },1200)
// return ()=>clearTimeout(timeOut)
// },[term])
// useEffect(()=>{
//   const search=async ()=>{
//         const response=await axios("https://en.wikipedia.org/w/api.php",{
//           params:{
//             action:"query",
//             list:"search",
//             origin:"*",
//             format:"json",
//             srsearch:debounce
//           }
//         })
//     setRes(response.data.query.search)
//     }
//     if(debounce){
//     search()
//   }
// },[debounce])

//(1)
const preTerm=prevState(term)
useEffect(()=>{
  const search=async ()=>{
    const response=await axios("https://en.wikipedia.org/w/api.php",{
      params:{
        action:"query",
        list:"search",
        origin:"*",
        format:"json",
        srsearch:term
      }
    })
setRes(response.data.query.search)
}
if(!res.length){
  if (term){
    search()
    }
}else if(preTerm!==term){//we do that because when we set state with the same previous value nothing happen(avoid fire api state)
const debounce=setTimeout(()=>{
if (term){
search()
}},1500)
return ()=>{
  clearTimeout(debounce)
}//we do that to avoid fire search every update and wait for full writing
}
},[term,res.length,preTerm])


const results=res.map((e,i)=>{
    return(
      <tr  key={i}>
      <td >{i+1}</td>
      <td>{e.title}</td>
      <td><span dangerouslySetInnerHTML={{"__html":e.snippet}}/></td>
    </tr>
    )
  })//we use dangerouslySetInnerHTML only when we use a secure API and for avoid XSS attack
//---------------------------------------------------------------------------------------------------
//useRef don't do render that's why we need it to take prevState
// const prevState=useRef()
// useEffect(()=>{
//   prevState.current=term
//render:
//--term='js'/pretnput=undefined
//--print in document
//--useEffect:preinput='js'
//because of useRef don't do render it will print always previous state
//})
//const prevInput=prevState.current






//when we set state with the same value it has in useeffect nothing update gonna happen
  //console.log("render")//print while updating
  return (
    <Fragment>
{/* <input type='text' placeholder='name' onChange={(e)=>setName(e.target.value)} value={name}/>
<input type='tel' placeholder='phone' onChange={(e)=>setPhone(e.target.value)} value={phone}/>
<p>name:{name}</p>
<p>phone:{phone}</p> */}

    <hr/>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Search Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              value={term}
              onChange={(e)=>setTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Desc</th>
              </tr>
            </thead>
            <tbody>
{results}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr/>
    {/* <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Search previous Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              value={term}
              onChange={(e)=>setTerm(e.target.value)}
            />
          </div>
          <p>input:{term}</p>
          <p>previous input:{prevInput}</p> */}
    </Fragment>
  )
}

export default App



