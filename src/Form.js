/* TODO List V1*/

import React, { useState , useEffect} from 'react';



const Form = () => {
  const [todos, setTodos] = useState([]);
  
  const [currentTask, setCurrentTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const [searchItem, setSearchItem] = useState('');



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

  

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos && window.location.reload) {
			setTodos(todos);
      
		}
   
	}, [], console.table(todos));

	/*useEffect(() => {
		let adderror = setTimeout(() => {
			setError(false);
		}, 2000);
		return () => {
			clearTimeout(adderror);
		};
	}, [error]);*/

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos], console.table(todos));

  /*const person = { firstName: 'Robin', lastName: 'Wieruch' };

  localStorage.setItem('user', JSON.stringify(person));
  
  const stringifiedPerson = localStorage.getItem('user');
  const personAsObjectAgain = JSON.parse(stringifiedPerson);*/
  


  
	/*useEffect(() => {
		let adderror = setTimeout(() => {
			setError(false);
		}, 2000);
		return () => {
			clearTimeout(adderror);
		};
	}, [error]);*/

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchItem(event.target.value);
  };

 
  


  

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

      <h2>Liste des choses a faire:</h2>
      <ul className="list-group">
        {todos.map((task, index) => (
          <li
            key={index}
            className={`d-flex align-items-center ${
              task.completed ? 'text-muted' : ''
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
              <span className="flex-grow-1">{task.text}</span>
            )}
            {editingIndex === index ? (
              <button type="button" onClick={() => setEditingIndex(null)}>
                Annuler
              </button>
            ) : (
              <>
                {!task.completed && (
                  <button class="btn-edit"
                    type=
                     "button"
                onClick={() => handleEdit(index)}
              >
                🖊️
              </button>
            )}
            <button class="btn-del "
              type="button"
              onClick={() => handleDelete(index)}
            >
              ❌
            </button>
            <button class="btn-vld"
              type="button"
              onClick={() => handleComplete(index)}
            >
              {task.completed  ? 'Non validée' : '✅'}
            </button>
          </>
        )}
      </li>
    ))}
  </ul>
  <div>
    <button id='btn-save'class='mt-2 btn  '
    
   
    >
      Sauvegarder Liste
    </button>
    <button onClick={() => window.location.reload()}>Actualiser</button>
    <button onClick={() => alert(JSON.stringify(todos))}>Afficher tâches</button>
    <button onClick={() => console.log(localStorage)}>Afficher localStorage</button>
        <button onClick={() => console.log(todos)}>Afficher tasks</button>
 
  </div>
</div>
);
};

export default Form;
