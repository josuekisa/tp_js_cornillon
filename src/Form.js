import React, { useState } from 'react';

const Form = () => {
  const [taskData, setTaskData] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const saveTaskToLocalStorage = (taskData)=> {
localStorage.setItem('taskData', JSON.stringify(taskData));

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingIndex === null) {
      // Add new task
      setTaskData(
        taskData.concat({
          text: currentTask,
          completed: false,
        })
      );
      setCurrentTask('');
    } else {
      // Edit existing task
      const newTaskData = [...taskData];
      newTaskData[editingIndex].text = currentTask;
      setTaskData(newTaskData);
      setCurrentTask('');
      setEditingIndex(null);
    }
  };

  
  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentTask(taskData[index].text);
    saveTaskToLocalStorage()
  };

  const handleDelete = (index) => {
    setTaskData(taskData.filter((_, i) => i !== index));
    saveTaskToLocalStorage()
  };

  const handleComplete = (index) => {
    const newTaskData = [...taskData];
    newTaskData[index].completed = !newTaskData[index].completed;
    setTaskData(newTaskData);
    saveTaskToLocalStorage()
  };


  return (
    <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">
      <form onSubmit={handleSubmit} className="mb-3">
        <label htmlFor="todo" className="form-label mt-3">
          Chose a faire
          <input
            type="text"
            className="form-control"
            id="todo"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
        </label>
        <button type="submit" className="ml-2 btn btn-primary d-block">
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

      <h2>Liste des choses a faire:</h2>
      <ul className="list-group">
        {taskData.map((task, index) => (
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
                  <button
                    type=
                     "button"
                onClick={() => handleEdit(index)}
              >
                🖊️
              </button>
            )}
            <button
              type="button"
              onClick={() => handleDelete(index)}
            >
              ❌
            </button>
            <button
              type="button"
              onClick={() => handleComplete(index)}
            >
              {task.completed ? 'Non validée' : '✅'}
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
