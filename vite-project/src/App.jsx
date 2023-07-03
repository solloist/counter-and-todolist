import { Button } from 'bootstrap';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';



export default function App(){
return(
<>
<TodoList title={"Todo List"}/>
  <Counter title={"Counter"}/>
</>
  
  // <Form/>
  
)
  
};
 
// Create a simple counter component that displays a number and has two buttons: 
// one for incrementing the number and another for decrementing it.
function Counter({title}){
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')
  const [num, setNum] = useState(0)

  function handleIncrementClick(){
    setCount(count + 1)
    setNum(0)
  }

  function handleDecrementClick(){
    setCount((count > 0) ? (count - 1) : count)    
  }
  
  return(
    <>
    <h1>{title}</h1>
      <button onClick={()=>{
        handleIncrementClick()
        
      }}>
        Plus one
      </button>
      <h1>{count}</h1>
      <button onClick={()=> {
        handleDecrementClick()
        if(count === 0) {
          setNum(num + 1)
          setMessage("You can press only \"Plus One\" Button")
        }
      }}
      >
        Minus one
      </button>
      {(num > 0) && <h4 style={{color: 'red'}}>{message}</h4>}
    </>
  )
}

// Exercise 2: Todo List
// Create a todo list component that allows users to add and remove items from a list. 
// Each item should have a checkbox indicating whether it's completed or not.
const initialtasks = [{id: 1, text: 'Hallo', done: false}]
function TodoList({title}){
  const [tasks, dispatch] = useReducer(reducer, initialtasks)
  
  let nextIndex = tasks.length
  
  function addTask(text){
     dispatch(
          {
      type: 'added',
      id: nextIndex + 1,
      text: text,
      }
    )
  }

  function changeTask(value){
    dispatch({
      type: 'changed',
      task: value
    })
  }

  function deleteTask(taskId){
    dispatch({
      type: 'deleted',
      id: taskId
    })
  }

  function reducer(tasks, action){
    switch(action.type){
      case 'added': {
        return [
          ...tasks,
          {
            id: action.id,
            text: action.text,
            done: false
          }
        ]
      }
      case 'changed': {
        return tasks.map(t => {
          if (t.id === action.id) {
            return action.value
          } else {
            return t
          }
        })
      }
      case 'deleted': {
        return tasks.filter(
          t => t.id !== action.id
        )
      }
      default:
        throw Error("Unknown action: " + action.type)
    }
  }
  
  return(
    <>
    <h1>{title}</h1>
    <AddTask onAddTask={addTask}/>
    <TaskList tasks={tasks} onChangeTask={changeTask} onDeleteTask={deleteTask}/>
   <CountTask tasks={tasks}/>
    </>
  )
}

function AddTask({onAddTask}){
  const [text, setText] = useState('')

  return(
    <>
      <label>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={()=> {
          onAddTask(text)
          setText('')
          }}>Add</button>
      </label>
      
    </>
  )
}

function TaskList({tasks, onChangeTask, onDeleteTask}){
 
  
  return(
    <>
      <ul>
        {tasks.map((todo)=>(
        <li key={todo.id} style={{listStyleType: 'none'}}>
          <Task
          todo={todo}
          onChange={onChangeTask}
          onDelete={onDeleteTask}
          />
        </li>
      ))}
       
      </ul>
      </>       
    
  )
}

function Task({todo, onChange, onDelete}){
  const [isEdited, setIsEdited] = useState(false)

  let content;

  if(isEdited){
    content = (
      <>
        <input value={todo.text} onChange={e=> {
          onChange(todo.text=e.target.value)
          console.log(todo.text);
          }}/>
        <button onClick={()=> setIsEdited(false)}>Save</button>
      </>
    )
  } else{
    content = (
    <> 
      <span style={(todo.done === true) ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{todo.text}</span> 
      <button onClick={()=> setIsEdited(true)}>Edit</button>
    </>)
  }

  return(    
    <label>
      <input type="checkbox" checked={todo.done} onChange={e=>{
        console.log(todo.done);
        onChange((todo.done = e.target.checked))}} />
      {content}
      <button onClick={()=> onDelete(todo.id)}>Delete</button>
    </label>
  )
}

function CountTask({tasks}){
  let doneTasks = tasks.filter(t=>t.done === true)

  return(
    <p>
    {doneTasks.length > 0 && `Congratulations! You've done ${doneTasks.length} tasks!`}
    </p>
  )
}


// Exercise 3: Fetching Data
// Create a component that fetches data from an API (e.g., using the fetch function or a library like Axios) and displays the results on the page. You can fetch a list of posts, users, or any other type of data you prefer.

function Fetch(){ 
  const [person, setPerson] = useState('Alice');
const [bio, setBio] = useState(null);
useEffect(() => {
  let ignore = false;
  setBio(null);
  fetchBio(person).then(result => {
    if (!ignore) {
      setBio(result);
    }
  });
  return () => {
    ignore = true;
  }
}, [person]);

return (
  <>
    <select value={person} onChange={e => {
      setPerson(e.target.value);
    }}>
      <option value="Alice">Alice</option>
      <option value="Bob">Bob</option>
      <option value="Taylor">Taylor</option>
    </select>
    <hr />
    <p><i>{bio ?? 'Loading...'}</i></p>
  </>
);
  }
// Exercise 4: Form Validation
// Create a form component with various input fields (e.g., name, email, password) and implement client-side validation for each field. Display error messages if the user enters invalid data.

// Exercise 5: Conditional Rendering
// Create a component that renders different content based on a condition. For example, you could have a login form that displays a "Welcome" message after the user successfully logs in.

// Exercise 7: Context API
// Create a context provider that stores some global state (e.g., user authentication status, theme preferences) and allows child components to access and modify that state.

const CurrentTheme = createContext(null)
const CurrentUser = createContext(null)

const light = {
  backgroundColor: 'beige',
  color: 'black'
}

const dark = {
  backgroundColor: 'black',
  color: 'beige'
}

function Form(){
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  return(
    <CurrentTheme.Provider value={theme}>
      <CurrentUser.Provider value={{user, setUser}}>
        <Panel
          title={'Welcome'}
        />
      </CurrentUser.Provider>
    </CurrentTheme.Provider>
  )
}

function Panel({title}){
  const {user} = useContext(CurrentUser)
  return(
    <>
      <h1>{title}</h1>
      <User />
      {/* <Theme/> */}
    </>
  )
}

function User(){
  const {setUser} = useContext(CurrentUser)
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const isLogin = firstName !== '' && lastName !== ''

  return(
    <>
      <input type="text" placeholder='First name' value={firstName} onChange={e => setFirstname(e.target.value)} />
      <input type="text" placeholder='Last name' value={lastName} onChange={e => setLastname(e.target.value)} />
      <LoginButton disabled={isLogin === false} onClick={()=>{
        isLogin = true
        setUser({name: firstName + ' ' + lastName})
      }}>
        Log in
      </LoginButton>
      {(isLogin === true) ? <Welcome user={user}/> : <i>Fill in both fields</i>}
    </>
  )
}

function Welcome(){
  const {user} = useContext(CurrentUser)
  return(
    <h1>Welcome, {user.name}!</h1>
  )
}

function LoginButton({disabled, onClick, children}){

  return(
    <button disabled={disabled} onClick={onClick}>{children}</button>
  )
}

