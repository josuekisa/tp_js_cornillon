/* TODO List V1*/

import React, { useState , useEffect} from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { FiCircle } from 'react-icons/fi';
import { FaEdit} from 'react-icons/fa';
import { RiDeleteBin5Line} from 'react-icons/ri';

//import { SelectButton } from 'primereact/selectbutton';
        



const Form = () => {
  const [todos, setTodos] = useState([]);
  
  const [currentTask, setCurrentTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchItem, setSearchItem] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

 
 
  const handleUpdateFilter= (event)=>{
    console.log('updating')
    setFilterStatus(event.target.value)

  }; 


  const handleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };



  const filterTasks = (tasks, filterStatus) => {
    switch (filterStatus) {
      case 'completed':
        return showCompleted ? tasks.filter(task => task.completed) : [];
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };



const filteredTasks = filterTasks(todos, filterStatus);




  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingIndex === null ) {
      // Add new task
      let uniqueId =new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
      setTodos(
        todos.concat({
          id: uniqueId,
          text: currentTask,
          completed: false,
        })
      );
      setCurrentTask('');
     
    } else {
      // Edit existing task
      const newTaskData = [...todos];
      newTaskData[editingIndex].text = currentTask;
      setTodos(newTaskData);
      setCurrentTask('');
      setEditingIndex(null);

    
    }
    
  }; 
  
  
  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentTask(todos[index].text);
 
  };
  
  
  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    
   
  };

  
  const handleComplete = (index) => {
    const newTaskData = [...todos];
    newTaskData[index].completed = !newTaskData[index].completed;
    setTodos(newTaskData);
    
  };

  

	

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchItem(event.target.value);
  };
  useEffect(() => {
		const data = JSON.parse(localStorage.getItem('todos'));
		if (data) {
			setTodos(data);
		}
	}, []);

  useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);
 
  


  

  return (
    <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">
      <form onSubmit={handleSubmit} className="form-row align-items-center mb-3">
        <label id='todo'htmlFor="todo" className="form-label mt-3">
          Chose a faire
          <input 
            type="text"
            className="form-control mb-2"
            id="todo"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            placeholder='Entrer une tâche'
          />
          
        </label>
        <button id='btn-create'type="submit" class="mt-2 btn d-block">
          {editingIndex === null ? 'Créer' : 'Modifier'}
        </button>
        <select id='status' value={filterStatus} onChange={handleUpdateFilter}>
          <option value="all">Toutes les tâches</option>
          <option value="completed">Complet</option>
          <option value="incomplete">Incomplet  </option>
        </select>
        {editingIndex !== null && (
          
        
        <button id='button-del'
            type="button"
            className="ml-2 btn btn-secondary d-block"
            onClick={() => setEditingIndex(null)}
         
          >
            Annuler         
          </button>
        )}
        
      </form>
      <form onSubmit={handleSearch}   >
      <input type="text"
          placeholder="Recherche de tâche"
          value={searchItem}
          onChange={handleSearch} />
      <button id='btn-search' type="submit" class="mt-2 btn d-block">
           Recherche de Tâche
        </button>
        </form>
        
        <button onClick={handleShowCompleted}>
  {showCompleted ? 'Masquer les tâches terminées' : 'Voir les tâches terminées'}
</button>

        
      <h2>Liste des choses a faire:</h2>
      <ul className="list-group">
        {filteredTasks.map((todos, index) => (
          <li
            key={index}
            className={`d-flex align-items-center ${
              todos.completed ? 'text-muted' : ''
            }`}
          >
            {editingIndex === index ? (
              <form onSubmit={handleSubmit} className="flex-grow-1">
                <input
                  type="text"
                  className="form-control"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                />
              </form>
            ) : (
              <span className="flex-grow-1">{todos.text}</span>
            )}
            {editingIndex === index ? (
              <button type="button" onClick={() => setEditingIndex(null)}>
                Annuler
              </button>
            ) : (
              <>
                {!todos.completed && (
                  <button class="btn-edit"
                    type=
                     "button"
                onClick={() => handleEdit(index)}
              >
                <FaEdit className='icone-edit'/>
              </button>
            )}
            <button class="btn-del "
              type="button"
              onClick={() => handleDelete(index)}
            >
              <RiDeleteBin5Line className='icon-delete'/>
            </button>
            <button class="btn-vld"
              type="button"
              onClick={() => handleComplete(index)}
            >
              {!todos.completed  ? (<FiCircle/>):(<IoIosCheckmarkCircle className={todos.completed ? 'icone-done' : ''}/>)/*'Non validée' : '✅'*/}
            </button>
          </>
        )}
      </li>
    ))}
  </ul>
 
</div>
);
};

export default Form;
