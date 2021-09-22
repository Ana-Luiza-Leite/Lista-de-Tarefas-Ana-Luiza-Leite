
import './App.css';
import {useState, useEffect} from 'react';
import Item from './components/item';

function App() {

  const [itens, setItens] = useState([])
  const[filterItens, setFilterItens] = useState({filter: false, active: true})
  function pegaDados(){
    fetch("http://localhost:8080/todo/list", {method: "GET"})
    .then (res => res.json() )
    .then (dados => setItens(dados))
  }

  function insertDocument(){
    fetch ("http://localhost:8080/todo/add", 
    {
      method: "POST", 
      headers:{'Content-Type':"application/json" }, 
      body: JSON.stringify ({"text":"","active": true})
    })
     
      
  }
  function updatedeDocumento(item){
    fetch ("http://localhost:8080/todo/update",
    {
      method: "PATCH", 
      headers:{'Content-Type':"application/json" }, 
      body: JSON.stringify (item)
    })
      .then(res => res.json())
      .then(dados => pegaDados())
  }
  function deletar(item){
    fetch ("http://localhost:8080/todo/delete",
    {
      method: "DELETE", 
      headers:{'Content-Type':"application/json" }, 
      body: JSON.stringify (item)
    })
      .then(res => res.json())
      .then(dados => pegaDados())
  }
  useEffect(() => {
    pegaDados()
  },[itens])
  const printarItens= filterItens.filter ? itens.filter(item => item.active === filterItens.active) : itens
  return (
    <div className="principal">
      <div className="to-do-list">
      <h1>Lista de Tarefas</h1>
        {printarItens.map (item => {
          return <Item key ={item._id} item ={item} updatedeDocumento={updatedeDocumento} deletar={deletar}/>
        })}
        
        <div className="botoes">
          
          <button onClick={() => setFilterItens({filter: false})}
          style={filterItens.filter ? {} : {fontWeight: "bold"}} >Geral</button>
          <button 
          onClick={() => setFilterItens({filter: true, active: true})}
          style={((filterItens.filter) && (filterItens.active === true)) ? {fontWeight: "bold"} : {}}
          >Pendentes</button>
          <button 
          onClick={() => setFilterItens({filter: true, active: false})}
          style={((filterItens.filter) && (filterItens.active === false)) ?{fontWeight: "bold"}:{}}
          >Concluídos</button>
        </div>
        <div className="botoes">
          <button onClick={insertDocument}>Novo a fazer</button>
        </div>
        
      </div>
        
    </div>
  );
}

export default App;
