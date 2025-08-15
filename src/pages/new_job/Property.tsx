import React from 'react';
import Select from '../../components/Select';
import { useNewJob } from './NewJobContext';

const Property: React.FC = () => {
  const { jobState, updateJobState } = useNewJob();

  const propertyOptions = [
    { value: 'property1', label: 'Property 1' },
    { value: 'property2', label: 'Property 2' },
    { value: 'property3', label: 'Property 3' },
  ];

  const handlePropertyChange = (value: string) => {
    updateJobState({ selectedProperty: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2">Where is your property</h2>
      <div className="bg-background p-4 rounded-md">
        <Select
            value={jobState.selectedProperty}
            onChange={handlePropertyChange}
            options={propertyOptions}
            label=""
            className="bg-white"
            placeholder="Select from saved list of properties"
            required
        />
      </div>
    </div>
  );
};

export default Property;
