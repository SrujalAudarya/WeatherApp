import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck } from 'react-icons/fa'; // Import Icons

function TodoList() {
  const [inputData, setInputData] = useState(''); // Initialize as empty string
  const [toggleButton, setToggleButton] = useState(true);
  const [editedItem, setEditedItem] = useState(null);
  const [taskList, setTaskList] = useState(() => {
  const storedTasks = localStorage.getItem('taskList');
  return storedTasks ? JSON.parse(storedTasks) : [];
});

  const addTask = () => {
    try {
      if (!inputData) {
        alert('Please enter a task');
      } else if (!toggleButton) {
        setTaskList(
          taskList.map((item) => {
            if (item.id === editedItem) {
              return { ...item, name: inputData };
            }
            return item;
          })
        );
        setToggleButton(true);
        setInputData('');
        setEditedItem(null);
      } else {
        const allInputData = { id: new Date().getTime().toString(), name: inputData };
        setTaskList([...taskList, allInputData]);
        setInputData('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = (index) => {
    const updateList = taskList.filter((item) => item.id !== index);
    setTaskList(updateList);
  };

  const editTask = (id) => {
    const modifiedTask = taskList.find((item) => item.id === id);
    setToggleButton(false);
    setInputData(modifiedTask.name);
    setEditedItem(id);
  };

  useEffect(() => {
      localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          
          {/* Glass Card Container */}
          <div className="card shadow-lg p-4 text-light" 
               style={{ 
                 backgroundColor: '#1f1f1f', 
                 borderRadius: '20px', 
                 border: '1px solid #333' 
               }}>
            
            <h3 className="text-center mb-4" style={{ color: '#4dabf7' }}>
              Task Manager
            </h3>

            {/* Input Section with Icons */}
            <div className="input-group mb-4">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Add a new task..." 
                value={inputData} 
                onChange={(e) => setInputData(e.target.value)}
                style={{
                  backgroundColor: '#2c2c2c',
                  color: 'white',
                  border: '1px solid #444',
                  height: '50px'
                }}
              />
              <div className="input-group-append">
                <button 
                  className={`btn ${toggleButton ? 'btn-primary' : 'btn-warning'}`} 
                  onClick={addTask}
                  style={{ width: '60px' }}
                >
                  {/* Toggle Logic: Show Plus for Add, Check for Update */}
                  {toggleButton ? <FaPlus size={20}/> : <FaCheck size={20}/>}
                </button>
              </div>
            </div>

            {/* List Section */}
            <div className="list-wrapper" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {taskList.length === 0 ? (
                <p className="text-center text-muted mt-3">No tasks yet. Add one above!</p>
              ) : (
                taskList.map((item) => (
                  <div 
                    key={item.id} 
                    className="d-flex justify-content-between align-items-center mb-3 p-3"
                    style={{
                      backgroundColor: '#2c2c2c',
                      borderRadius: '10px',
                      borderLeft: '5px solid #4dabf7', // Nice accent color on left
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                      {item.name}
                    </span>
                    
                    {/* Action Icons */}
                    <div>
                      <button 
                        className="btn btn-sm btn-outline-info mr-2" 
                        onClick={() => editTask(item.id)}
                        title="Edit"
                        style={{ border: 'none' }}
                      >
                        <FaEdit size={18} />
                      </button>
                      
                      <button 
                        className="btn btn-sm btn-outline-danger" 
                        onClick={() => deleteTask(item.id)}
                        title="Delete"
                        style={{ border: 'none' }}
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;