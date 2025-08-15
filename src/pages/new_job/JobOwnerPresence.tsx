import React from 'react';
import Radio from '../../components/Radio';
import { useNewJob } from './NewJobContext';

const JobOwnerPresence: React.FC = () => {
  const { jobState, updateJobState } = useNewJob();

  const handleOwnerPresenceChange = (value: string) => {
    updateJobState({ ownerPresence: value });
  };

  const radioOptions = [
    { value: 'yes', label: "Yes, I'll be there" },
    { value: 'no', label: "No, someone else will be there" }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Will you be at the property?
      </h2>
      <Radio
        value={jobState.ownerPresence}
        onChange={handleOwnerPresenceChange}
        options={radioOptions}
        name="ownerPresence"
        required
      />
    </div>
  );
};

export default JobOwnerPresence;
