import React from 'react';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import { useNewJob } from './NewJobContext';

const JobType: React.FC = () => {
	const { jobState, updateJobState } = useNewJob();

	const tradeOptions = [
		{ value: 'plumbing', label: 'Plumbing' },
		{ value: 'electrical', label: 'Electrical' },
		{ value: 'carpentry', label: 'Carpentry' },
		{ value: 'painting', label: 'Painting' },
	];

	const handleTradeChange = (value: string) => {
		updateJobState({ jobType: value });
	};

	const handleDescriptionChange = (value: string) => {
		updateJobState({ jobDescription: value });
	};

	return (
		<div className="bg-white rounded-lg shadow-sm p-6">
			<h2 className="text-xl font-semibold mb-2">What work is required?</h2>
			<div className="bg-background p-4 rounded-md flex flex-col gap-3">
				<Select
					value={jobState.jobType}
					onChange={handleTradeChange}
					options={tradeOptions}
					label=""
					className="bg-white"
					placeholder="Select a trade"
					required
				/>
				<TextArea
					value={jobState.jobDescription}
					onChange={handleDescriptionChange}
					label=""
					placeholder="All additional information about the required work will help make the booking process smoother"
				/>
			</div>
		</div>
	);
};

export default JobType;
