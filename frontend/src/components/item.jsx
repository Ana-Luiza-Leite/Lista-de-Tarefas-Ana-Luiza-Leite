import {useState} from 'react'

function Item({ item, updatedeDocumento, deletar }){
   
  const[tempText, setTempText] = useState("")

  return(
        <div className="secundaria">

        <input 
          type="checkbox"
          checked={!item.active}
          onChange={()=>{}} 
          onClick={ () => {updatedeDocumento({...item, active: !item.active}) }}> 
         </input>
   
        {((item.edit ) || (item.text === ""))? (
          <input
            type="text" 
            placeholder={item.text} 
            onChange={(e) => {setTempText(e.target.value)}}
            onBlur={() => {updatedeDocumento({...item, text: tempText, edit: false})}}>
           </input>
            )
          :
          <span 
          onClick={() => {updatedeDocumento({...item, edit: true}) }}
          style={item.active ? {}: {textDecoration: "line-throgh"}}
          >{item.text}</span>
        }
      
        <button onClick={() => {deletar (item)}}>Apagar</button>

      </div>
    )
   
}
export default Item