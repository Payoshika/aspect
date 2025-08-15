import React from 'react';
import { useNewJob } from './NewJobContext';
import { HugeiconsIcon } from '@hugeicons/react';
import { Location09Icon } from '@hugeicons/core-free-icons';

const BookingPrice: React.FC = () => {
  const { jobState } = useNewJob();

  const calculateVAT = () => {
    return (jobState.halfHourlyRate * jobState.vatRate) / 100;
  };

  const calculateTotalHalfHourlyRate = () => {
    return jobState.halfHourlyRate + calculateVAT();
  };

  return (
    <div className="w-full bg-primary rounded-md shadow-sm pt-1">
        <div className='w-full bg-white rounded-md'>
            {/* Section 1: Title */}
            <div className='w-full bg-background rounded-md flex items-center gap-2 px-4 py-2'>
                <HugeiconsIcon icon={Location09Icon} />
                <p className="text-lg font-semibold text-gray-900">
                Best rate for your location
                </p>
            </div>

            {/* Section 2: Price Breakdown */}
            <div className="p-4 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700"><b>Half-hourly rate</b></p>
                    <p className="font-medium text-gray-900">
                        <b>£{jobState.halfHourlyRate.toFixed(2)}</b>
                    </p>
                </div>

                {jobState.vatRate > 0 && (
                <div className="flex justify-between items-center">
                    <p className="text-gray-700">VAT</p>
                    <p className="font-medium text-gray-900">
                    £{calculateVAT().toFixed(2)}
                    </p>
                </div>
                )}

                <div className="flex justify-between items-center">
                <p className="text-gray-700">Total half-hourly rate</p>
                <p className="font-medium text-gray-900">
                    £{calculateTotalHalfHourlyRate().toFixed(2)}
                </p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Section 3: Account Discount */}
            <div className="flex justify-between items-center p-4">
                <p className="text-gray-700">Account discount</p>
                <p className="font-medium text-gray-900">
                {jobState.accountDiscount}%
                </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Section 4: On-site Discounts */}
            <div className="p-4">
                <p className="text-gray-700">
                A discount applies when we are on-site for:
                </p>
                
                <div className="flex justify-between items-center">
                <p className="text-gray-700">4 or more hours</p>
                <p className="font-medium text-gray-900">
                    {jobState.discount4Hours}%
                </p>
                </div>

                <div className="flex justify-between items-center">
                <p className="text-gray-700">8 or more hours</p>
                <p className="font-medium text-gray-900">
                    {jobState.discount8Hours}%
                </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BookingPrice;
