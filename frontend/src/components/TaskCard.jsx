function TaskCard({
  task,
  setEditingTask,
  deleteTask,
}) {
  return (
    <div className="task-card">

      <div>
        <h3>{task.title}</h3>

        <p>{task.description}</p>

        <span
          className={
            task.status === "Completed"
              ? "completed"
              : "pending"
          }
        >
          {task.status}
        </span>
      </div>

      <div className="task-actions">

        <button
          onClick={() => setEditingTask(task)}
        >
          Edit
        </button>

        <button
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;