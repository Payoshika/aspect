import React from 'react';
import DateField from '../../components/Date';
import JobTimeSelect from './JobTimeSelect';
import { useNewJob } from './NewJobContext';

const JobDateTime: React.FC = () => {
	const { jobState, updateJobState } = useNewJob();

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">When do you need us?</h2>
			<div className="bg-background p-4 rounded-md space-y-4">
				<DateField
					label=""
					value={jobState.jobDate}
					onChange={(d) => updateJobState({ jobDate: d })}
					placeholder="Select a date"
				/>
				<JobTimeSelect
					value={jobState.jobTime as any}
					onChange={(v) => updateJobState({ jobTime: v as any })}
				/>
			</div>
		</div>
	);
};

export default JobDateTime;