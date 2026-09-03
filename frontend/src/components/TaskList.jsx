import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  setEditingTask,
  deleteTask,
}) {
  return (
    <div className="task-list">
      <h2>All Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            setEditingTask={setEditingTask}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;