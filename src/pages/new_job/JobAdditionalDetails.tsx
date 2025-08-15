import React from 'react';
import TextArea from '../../components/TextArea';
import ImageUploader from '../../components/ImageUploader';
import { useNewJob } from './NewJobContext';

const JobAdditionalDetails: React.FC = () => {
  const { jobState, updateJobState } = useNewJob();

  const handleAdditionalDetailsChange = (value: string) => {
    updateJobState({ additionalDetails: value });
  };

  const handleImagesSelected = (files: File[]) => {
    updateJobState({ images: files });
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Additional Details
        </h2>
        <div className="px-3 py-4 rounded-md">
          <TextArea
            value={jobState.additionalDetails}
            onChange={handleAdditionalDetailsChange}
            placeholder="Please provide any additional details about the job..."
            name="additionalDetails"
            rows={4}
          />
        </div>
      </div>

      <div>
        <div className="bg-background px-3 py-4 rounded-md">
          <ImageUploader
            onImagesSelected={handleImagesSelected}
            maxFiles={10}
            maxFileSize={10 * 1024 * 1024}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default JobAdditionalDetails;
