import { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete, onEdit, onUpdatePriority }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(task.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`}></label>
      </div>

      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            className="edit-input"
            autoFocus
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn" title="Save">
              <Check size={16} />
            </button>
            <button onClick={handleCancel} className="cancel-btn" title="Cancel">
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="task-content">
          <div className="task-text-container">
            <p className="task-text">{task.text}</p>
            <div className="task-meta">
              <span className={`priority-badge ${task.priority}`}>
                {task.priority}
              </span>
              <span className="task-date">{formatDate(task.createdAt)}</span>
            </div>
          </div>
          <div className="task-actions">
            <select
              value={task.priority}
              onChange={(e) => onUpdatePriority(task.id, e.target.value)}
              className="priority-dropdown"
              title="Change priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
              title="Edit task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="delete-btn"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
