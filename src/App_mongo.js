import './index.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';

function App() {
	const [showAddTask, setshowAddTask] = useState(false);
	const [tasks, setTask] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fechTasks();
			setTask(tasksFromServer);
		};
		getTasks();
	}, []);

	// FetchTasks

	const fechTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks');
		const data = await res.json();
		// console.log(data);
		return data;
	};

	// FetchTask

	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();
		// console.log(data);
		return data;
	};

	// Add Task

	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(task),
		});

		const data = await res.json();
		setTask([...tasks, data]);

		// console.log(task)
		// const id = Math.floor(Math.random() * 10000) + 1;
		// const newTask = { id, ...task };
		// setTask([...tasks, newTask]);
	};

	// Delete Task

	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		});
		setTask(tasks.filter((task) => task._id !== id));
		// console.log('deleteTask', id);
		// console.log(tasks);
	};

	// Toggle Reminder
	const toggleReminder = async (id) => {
		// console.log(typeof id);
		const taskToToggle = await fetchTask(id);
		const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(updatedTask),
		});

		// const data = await res.json();
		// console.log(data);
		// console.log(typeof data);
		// console.log(updTask);

		setTask(
			tasks.map((task) =>
				task._id === id ? { ...task, reminder: updatedTask.reminder } : task
			)
		);
	};

	return (
		<div className='container'>
			<Header
				showAdd={showAddTask}
				onAdd={() => setshowAddTask(!showAddTask)}
				title='Task Tracker'
			/>
			{showAddTask && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
			) : (
				<div className='no-task'>No Task To Show</div>
			)}
		</div>
	);
}

export default App;
