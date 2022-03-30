import React from 'react';

function Task({ task, onDelete, onToggle }) {
	return (
		<div
			className={`task ${task.reminder ? 'reminder' : ''}`}
			onDoubleClick={() => onToggle(task._id, task.reminder)}
		>
			<div className='task-info'>
				<h3>
					{task.text}{' '}
					<button onClick={() => onDelete(task._id)} className='delete-btn'>
						X
					</button>
				</h3>
				<p>{task.day}</p>
			</div>
		</div>
	);
}

export default Task;
