import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './components/hooks/use-http';

function App() {
	const [tasks, setTasks] = useState([]);

	const { isLoading, error, sendRequest: fetchTasks } = useHttp();

	useEffect(() => {
		const transformTasks = (taskObject) => {
			const loadedTasks = [];

			for (const taskKey in taskObject) {
				loadedTasks.push({ id: taskKey, text: taskObject[taskKey].text });
			}

			setTasks(loadedTasks);
		};
		fetchTasks(
			{
				url: 'https://react-http-77fd4-default-rtdb.firebaseio.com/tasks.json',
			},
			transformTasks,
		);
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
