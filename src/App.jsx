import { useState, useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("") //input text
  const [todos, setTodos] = useState([]) //array containing todo's
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
       let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])

    const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
     let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    console.log(todos)
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    console.log(e, )
    let id = e.target.name;
    console.log(`the id: ${id}`);
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos)
    saveToLS()
  }

  return (
    <>
    <Navbar/>
      <div className="mx-10 md:container md:mx-auto my-7 rounded-2xl p-5 bg-blue-100 min-h-[85vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl'>WeTask! - Your one stop destination for daily planning</h1>
       <div className="addTodo my-5 flex flex-col gap-4">
         <h2 className='text-2xl my-2 font-bold'>Add Your Todo:</h2>
         <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='bg-white w-full rounded-full px-5 py-1 text-black' />
         <button onClick={handleAdd} disabled={todo.length<=3} className='bg-blue-900 hover:bg-blue-950 disabled:bg-blue-800 mx-2 rounded-full p-4 py-2 text-sm font-bold text-white'>Save</button>
         </div>
         
       </div>
       <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
       <label className='mx-2' htmlFor="show">Show Finished</label> 
       <div className="h-[2px] bg-black opacity-30 w-9/10 mx-auto "></div>
       <h2 className='text-xl my-5 font-bold'>Your Todos:</h2>
        <div className="todos">
          {todos.length == 0 && <div className='m-5 text-2xl'>No Todos to display!</div>}
          {todos.map(item=>{

          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">
            <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox}type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
               <button onClick={(e)=>handleEdit(e, item.id)} className='bg-blue-900 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-blue-900 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>

            </div>
          
          </div>
             })}
        </div>
        
      </div>
    </>
  )
}

export default App
