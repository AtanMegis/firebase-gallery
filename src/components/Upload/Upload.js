import React, { useState } from 'react';
import Form from './Form';
import ProgressList from './Progress/ProgressList';

const Upload = () => {
	const [files, setFiles] = useState([]);

	return (
		<div>
			<Form setFiles={setFiles} />
			<ProgressList files={files} />
		</div>
	);
};

export default Upload;
