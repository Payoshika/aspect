import React, { useState } from 'react';
import { useNewJob } from './NewJobContext';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { HugeiconsIcon } from '@hugeicons/react';
import { CancelCircleIcon } from '@hugeicons/core-free-icons';

const BookingDiscount: React.FC = () => {
  const { jobState, updateJobState } = useNewJob();
  const [discountCode, setDiscountCode] = useState('');

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
        //for now immediately update appliedDiscountCode in JobState
      updateJobState({ appliedDiscountCode: discountCode });
      //may need to update appliedDiscountAmount in JobState
      setDiscountCode('');
    }
  };

  const handleRemoveDiscount = () => {
    updateJobState({ appliedDiscountCode: '' });
    //may need to update db but for now leave it
  };

  return (
    <div className="w-full bg-primary rounded-md shadow-sm">
      <div className='w-full bg-white rounded-md'>
        {/* Section 1: Title */}
        <div className='w-full bg-background rounded-md flex items-center gap-2 px-4 py-2'>
          <p className="text-lg font-semibold text-gray-900">
            % Discounts
          </p>
        </div>

        {/* Section 2: Discount Input */}
        <div className="p-4 pb-2 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <TextInput
                value={discountCode}
                onChange={setDiscountCode}
                placeholder="Discount code"
                name="discountCode"
              />
            </div>
            <Button
              onClick={handleApplyDiscount}
              disabled={!discountCode.trim()}
              className="px-6"
              variant='outline'
            >
              Apply
            </Button>
          </div>
        </div>
        {/* Section 3: Info Message */}
        {!jobState.appliedDiscountCode ? (
          <div className="p-1">
            <div className="rounded-md p-3">
              <p className="text-sm text-center">
                Enter a valid discount code to apply additional savings to your booking.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-1">
            <div className="flex items-center rounded-md p-3">
              <p className="text-sm">
                Discount of {jobState.appliedDisountAmount}£ is applied with code: {jobState.appliedDiscountCode}
              </p>
              <button
                  onClick={handleRemoveDiscount}
                  className="hover:cursor-pointer"
                >
                  <HugeiconsIcon icon={CancelCircleIcon} className="w-5 h-5" />
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDiscount;
