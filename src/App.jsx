import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])
  

  const savetoLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  
  const toogleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  

  const handleEdit = (e, id)=> {
   let t =  todos.filter(i=> i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    savetoLocalStorage()
  }

  const handleDelete = (e, id)=> {
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    savetoLocalStorage()
    
  }

  const handleAdd = ()=> {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    savetoLocalStorage()
    
  }

   const handleChange = (e)=> {
    setTodo(e.target.value)
  }
  
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetoLocalStorage()

  }
  

  return (
    <>
    <Navbar/>
      <div className=" container my-5 rounded-xl bg-violet-300  md: w-3/4 sm: w-5/6 p-5 mx-auto min-h-[80vh]">
        <h1 className='font-bold text-center text-2xl my-1 font-sans md: text-lg'>iTask - Manage Your Todos at one place</h1>
        <div className="addTodo flex flex-col">
          <h2 className='text-lg font-bold md: text-sm my-2'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" placeholder='type your todo' className='w-full rounded-full px-5 py-2' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2  text-sm font-bold text-white rounded-full disabled:bg-violet-500 my-2 '>Save</button>
        </div>
        <input onChange={toogleFinished} type="checkbox" checked={showFinished} className='my-4' />Show-Finished
          <h2 className='text-lg font-bold md: text-sm'>Your ToDos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
            {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-4/4 justify-between my-3">
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                 <button onClick={(e)=>{handleEdit (e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1  text-sm font-bold text-white rounded-md mx-1'><FaEdit/></button>
                 <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1  text-sm font-bold text-white rounded-md mx-1'><MdDelete/></button>
              </div>

            </div>
          })}
          </div>
      </div>
    </>
  )
}

export default App
