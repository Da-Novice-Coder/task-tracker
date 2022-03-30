import Button from './Button';

function Header({ title, onAdd, showAdd }) {
	return (
		<header className='header'>
			<h1>{title}</h1>
			<Button
				color={showAdd ? 'red' : 'green'}
				text={showAdd ? 'close' : 'Add'}
				onClick={onAdd}
			/>
		</header>
	);
}

// const headingStyle = {
// 	color: 'red',
// };

export default Header;
