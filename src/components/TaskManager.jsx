import { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import TaskItem from './TaskItem';
import TaskStats from './TaskStats';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    // Initialize state from localStorage
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [priority, setPriority] = useState('medium');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString(),
    };

    setTasks([task, ...tasks]);
    setNewTask('');
    setPriority('medium');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const updatePriority = (id, newPriority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority: newPriority } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // Filter and search tasks
  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter(task =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="task-manager">
      <header className="header">
        <h1>Task Management System</h1>
        <p>Stay organized, stay productive</p>
      </header>

      <TaskStats tasks={tasks} />

      <div className="task-input-container">
        <form onSubmit={addTask} className="task-form">
          <div className="input-group">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="task-input"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit" className="add-btn">
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </form>
      </div>

      <div className="controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <Filter size={18} />
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found. {filter !== 'all' ? 'Try changing the filter.' : 'Add one to get started!'}</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
              onUpdatePriority={updatePriority}
            />
          ))
        )}
      </div>

      {tasks.filter(t => t.completed).length > 0 && (
        <div className="footer-actions">
          <button onClick={clearCompleted} className="clear-btn">
            Clear Completed Tasks
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
