import { useRef,useEffect }  from "react";
 const usePrevState=(state)=>{
const preState=useRef()
useEffect(()=>{
    preState.current=state
})
return preState.current
}
export default usePrevState