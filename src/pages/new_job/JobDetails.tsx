import React from 'react';
import Property from './Property';

const JobDetails: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        <Property />
      </div>
    </div>
  );
};

export default JobDetails;
