import { useState } from 'react';

function AddTask({ onAdd }) {
	const [text, setText] = useState('');
	const [day, setDay] = useState('');
	const [reminder, setReminder] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		if (!text) {
			alert('add task');
			return;
		}

		onAdd({ text, day, reminder });
		setText('');
		setDay('');
		setReminder(false);
	};
	return (
		<form className='form' onSubmit={onSubmit}>
			<div className='form-control'>
				<label>Task</label>
				<input
					type='text'
					placeholder='Enter Task'
					value={text}
					onChange={(e) => setText(e.target.value)}
				></input>
			</div>
			<div className='form-control'>
				<label>Enter Date & Time</label>
				<input
					type='text'
					placeholder='Enter Date & Time'
					value={day}
					onChange={(e) => setDay(e.target.value)}
				></input>
			</div>
			<div className='form-control form-control-check'>
				<label>Set Reminder</label>
				<input
					type='checkbox'
					checked={reminder}
					value={reminder}
					onChange={(e) => setReminder(e.currentTarget.checked)}
				></input>
			</div>
			<input className='btn btn-submit' type='submit' value='Save Task'></input>
		</form>
	);
}

export default AddTask;
