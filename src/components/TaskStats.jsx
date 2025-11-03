import { CheckCircle, Circle, AlertCircle, TrendingUp } from 'lucide-react';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.completed).length;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon total">
          <Circle size={24} />
        </div>
        <div className="stat-content">
          <h3>{totalTasks}</h3>
          <p>Total Tasks</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon active">
          <AlertCircle size={24} />
        </div>
        <div className="stat-content">
          <h3>{activeTasks}</h3>
          <p>Active</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon completed">
          <CheckCircle size={24} />
        </div>
        <div className="stat-content">
          <h3>{completedTasks}</h3>
          <p>Completed</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon rate">
          <TrendingUp size={24} />
        </div>
        <div className="stat-content">
          <h3>{completionRate}%</h3>
          <p>Completion Rate</p>
        </div>
      </div>

      {highPriorityTasks > 0 && (
        <div className="stat-card highlight">
          <div className="stat-icon high-priority">
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{highPriorityTasks}</h3>
            <p>High Priority</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStats;
