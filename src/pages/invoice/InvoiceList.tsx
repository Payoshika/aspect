import React, { useState } from 'react';
import Button from '../../components/Button';
import { HugeiconsIcon } from '@hugeicons/react';
import { FilterIcon, Sorting05Icon, Download05Icon, MoreVerticalIcon, CheckmarkCircle02Icon, AlertCircleIcon, ArrowUp01Icon, ArrowDown01Icon } from '@hugeicons/core-free-icons';
import CreditCardChoiceModal from './CreditCardChoiceModal';

interface Invoice {
  id: string;
  number: string;
  jobRef: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Outstanding';
  due: number;
}

interface CreditNote {
  id: string;
  number: string;
  invoiceNumber: string;
  jobRef: string;
  date: string;
  amount: number;
}

interface ActionDropdownProps {
  itemId: string;
  itemType: 'invoice' | 'creditNote';
  status?: string;
  isOpen: boolean;
  onToggle: (itemId: string) => void;
  onView: (itemId: string) => void;
  onPay: (itemId: string) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  itemId,
  itemType,
  status,
  isOpen,
  onToggle,
  onView,
  onPay
}) => {
  const dropdownId = `${itemType}-${itemId}`;

  return (
    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 z-50">
      <div className="relative">
        <button
          onClick={() => onToggle(dropdownId)}
          className="p-1 hover:bg-gray-200 rounded-md transition-colors"
        >
          <HugeiconsIcon icon={MoreVerticalIcon} className="w-4 h-4 text-gray-600" />
        </button>
        
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-1 w-24 bg-white rounded-md shadow-lg border border-gray-200 z-[100]">
            <button
              onClick={() => onView(itemId)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-t-md"
            >
              View
            </button>
            {itemType === 'invoice' && status !== 'Paid' && (
              <button
                onClick={() => onPay(itemId)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-b-md"
              >
                Pay
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const InvoiceList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'invoice' | 'creditNotes'>('invoice');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<Invoice | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Sample invoice data
  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      jobRef: 'JOB-2024-001',
      date: '2024-01-15',
      amount: 1250.00,
      status: 'Paid',
      due: 0
    },
    {
      id: '2',
      number: 'INV-2024-002',
      jobRef: 'JOB-2024-002',
      date: '2024-01-20',
      amount: 850.50,
      status: 'Outstanding',
      due: 850.50
    },
    {
      id: '3',
      number: 'INV-2024-003',
      jobRef: 'JOB-2024-003',
      date: '2024-01-25',
      amount: 2100.00,
      status: 'Outstanding',
      due: 2100.00
    },
    {
      id: '4',
      number: 'INV-2024-004',
      jobRef: 'JOB-2024-004',
      date: '2024-01-30',
      amount: 750.25,
      status: 'Outstanding',
      due: 750.25
    }
  ];

  // Sample credit notes data
  const creditNotes: CreditNote[] = [
    {
      id: '1',
      number: 'CN-2024-001',
      invoiceNumber: 'INV-2024-001',
      jobRef: 'JOB-2024-001',
      date: '2024-01-18',
      amount: -150.00
    },
    {
      id: '2',
      number: 'CN-2024-002',
      invoiceNumber: 'INV-2024-002',
      jobRef: 'JOB-2024-002',
      date: '2024-01-22',
      amount: -75.50
    },
    {
      id: '3',
      number: 'CN-2024-003',
      invoiceNumber: 'INV-2024-003',
      jobRef: 'JOB-2024-003',
      date: '2024-01-28',
      amount: -200.00
    }
  ];

  //sorting and 
  const handleSort = () => {
    console.log('Sort clicked');
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handleAccountStatement = () => {
    console.log('Account Statement clicked');
  };

  const toggleDropdown = (itemId: string) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedInvoiceForPayment(null);
  };

  const toggleExpandedItem = (itemId: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };

  const handleView = (itemId: string) => {
    console.log('View clicked for item:', itemId);
    closeDropdown();
  };

  const handlePay = (itemId: string) => {
    console.log('Pay clicked for item:', itemId);
    closeDropdown();
    
    // Find the invoice to pay
    const invoice = invoices.find(inv => inv.id === itemId);
    if (invoice) {
      setSelectedInvoiceForPayment(invoice);
      setIsPaymentModalOpen(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Outstanding':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-green-600" />;
      case 'Outstanding':
        return <HugeiconsIcon icon={AlertCircleIcon} className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  return (
    <div className="p-2 lg:p-6">
      {/* Section 1: Controls */}
      <div className="flex gap-4 mb-6">
        {/* Toggle Buttons */}
        <div className="flex bg-white rounded-md p-2 gap-2">
          <button
            onClick={() => setActiveTab('invoice')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'invoice'
                ? 'bg-accent text-primary border'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('creditNotes')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'creditNotes'
                ? 'bg-accent text-primary border'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Credit Notes
          </button>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-2 ml-auto">
          <Button
            onClick={handleSort}
            variant="outline"
            size="sm"
          >
            <div className='flex items-center gap-1'>            
                <HugeiconsIcon icon={Sorting05Icon} className="w-4 h-4" />
                <span className='hidden md:block'>Sort</span>
            </div>
          </Button>
          <Button
            onClick={handleFilter}
            variant="outline"
            size="sm"
          >
        <div className='flex items-center gap-1'>            
            <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
            <span className='hidden md:block'>Filter</span>
        </div>
          </Button>
          <Button
            onClick={handleAccountStatement}
            variant="primary"
            size="sm"
          >
        <div className='flex items-center gap-1'>            
            <HugeiconsIcon icon={Download05Icon} className="w-4 h-4" />
            <span className='hidden md:block'>Account Statement</span>
        </div>
          </Button>
        </div>
      </div>

      {/* Section 2: List */}
      <div className="overflow-x-auto">
        {activeTab === 'invoice' ? (
          /* Invoice List */
          <div className="min-w-full">
            {/* Invoice Headers - Desktop */}
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
              <div className='text-center'>Number</div>
              <div className='text-center'>Job Ref.</div>
              <div className='text-center'>Date</div>
              <div className='text-center'>Amount</div>
              <div className='text-center'>Status</div>
              <div className='text-center'>Due</div>
            </div>

            {/* Invoice Headers - Mobile */}
            <div className="md:hidden grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
              <div className='text-center'>Number</div>
              <div className='text-center'>Date</div>
              <div className='text-center'>Amount</div>
              <div className='text-center'>Status</div>
              <div className='text-center'></div>
            </div>
            
            {/* Invoice Items */}
            {invoices.map((invoice) => (
              <div key={invoice.id}>
                {/* Desktop View */}
                <div
                  className={`hidden md:grid relative grid-cols-6 gap-4 p-4 my-2 border-b rounded-md border-gray-200 hover:bg-gray-50 transition-colors ${
                    invoice.status === 'Outstanding' ? 'bg-red-50' : 'bg-white'
                  }`}
                >
                  <div className="font-medium flex justify-center items-center">{invoice.number}</div>
                  <div className="text-gray-700 flex justify-center items-center">{invoice.jobRef}</div>
                  <div className="text-gray-700 flex justify-center items-center">{new Date(invoice.date).toLocaleDateString()}</div>
                  <div className="font-medium flex justify-center items-center">{formatCurrency(invoice.amount)}</div>
                  <div className="flex items-center justify-center text-xs font-medium">
                      <span className={`text-center px-1.5 py-1 rounded-md flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                        
                        {invoice.status}
                      </span>
                  </div>
                  <div className="font-medium flex justify-center items-center">{formatCurrency(invoice.due)}</div>
                  
                  <ActionDropdown
                    itemId={invoice.id}
                    itemType="invoice"
                    status={invoice.status}
                    isOpen={openDropdown === `invoice-${invoice.id}`}
                    onToggle={toggleDropdown}
                    onView={handleView}
                    onPay={handlePay}
                  />
                </div>

                {/* Mobile View */}
                <div
                  className={`md:hidden ${
                    invoice.status === 'Outstanding' ? 'bg-red-50' : 'bg-white'
                  } my-2 border-b rounded-md border-gray-200`}
                >
                  <div
                    onClick={() => toggleExpandedItem(invoice.id)}
                    className={`grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer`}
                  >
                    <div className="font-medium flex justify-center items-center">{invoice.number}</div>
                    <div className="text-gray-700 flex justify-center items-center">{new Date(invoice.date).toLocaleDateString()}</div>
                    <div className="font-medium flex justify-center items-center">{formatCurrency(invoice.amount)}</div>
                    <div className="flex items-center justify-center text-xs font-medium">
                        <span className={`text-center px-1.5 py-1 rounded-md flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)}
                          
                        </span>
                    </div>
                    <div className="flex justify-center items-center">
                      <HugeiconsIcon 
                        icon={expandedItems.has(invoice.id) ? ArrowUp01Icon : ArrowDown01Icon} 
                        className="w-4 h-4 text-gray-600" 
                      />
                    </div>
                  </div>

                  {/* Mobile Expanded Area */}
                  {expandedItems.has(invoice.id) && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Job Reference:</span>
                          <span className="font-medium">{invoice.jobRef}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Due:</span>
                          <span className="font-medium">{formatCurrency(invoice.due)}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => handleView(invoice.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            View
                          </Button>
                          {invoice.status !== 'Paid' && (
                            <Button
                              onClick={() => handlePay(invoice.id)}
                              variant="primary"
                              size="sm"
                              className="flex-1"
                            >
                              Pay
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Credit Notes List */
          <div className="min-w-full">
            {/* Credit Notes Headers - Desktop */}
            <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
              <div className='text-center'>Number</div>
              <div className='text-center'>Invoice Number</div>
              <div className='text-center'>Job Ref</div>
              <div className='text-center'>Date</div>
              <div className='text-center'>Amount</div>
            </div>

            {/* Credit Notes Headers - Mobile */}
            <div className="md:hidden grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
              <div className='text-center'>Number</div>
              <div className='text-center'>Invoice Number</div>
              <div className='text-center'>Job Ref</div>
              <div className='text-center'>Date</div>
              <div className='text-center'></div>
            </div>
            
            {/* Credit Notes Items */}
            {creditNotes.map((creditNote) => (
              <div key={creditNote.id}>
                {/* Desktop View */}
                <div
                  className="hidden md:grid relative grid-cols-5 gap-4 my-2 p-4 bg-white rounded-md border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-center">{creditNote.number}</div>
                  <div className="text-gray-700 text-center">{creditNote.invoiceNumber}</div>
                  <div className="text-gray-700 text-center">{creditNote.jobRef}</div>
                  <div className="text-gray-700 text-center">{new Date(creditNote.date).toLocaleDateString()}</div>
                  <div className="font-medium text-center">{formatCurrency(creditNote.amount)}</div>
                  
                  <ActionDropdown
                    itemId={creditNote.id}
                    itemType="creditNote"
                    isOpen={openDropdown === `creditNote-${creditNote.id}`}
                    onToggle={toggleDropdown}
                    onView={handleView}
                    onPay={handlePay}
                  />
                </div>

                {/* Mobile View */}
                <div className="md:hidden bg-white my-2 border-b rounded-md border-gray-200">
                  <div
                    onClick={() => toggleExpandedItem(creditNote.id)}
                    className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-center">{creditNote.number}</div>
                    <div className="text-gray-700 text-center">{creditNote.invoiceNumber}</div>
                    <div className="text-gray-700 text-center">{creditNote.jobRef}</div>
                    <div className="text-gray-700 text-center">{new Date(creditNote.date).toLocaleDateString()}</div>
                    <div className="flex justify-center items-center">
                      <HugeiconsIcon 
                        icon={expandedItems.has(creditNote.id) ? ArrowUp01Icon : ArrowDown01Icon} 
                        className="w-4 h-4 text-gray-600" 
                      />
                    </div>
                  </div>

                  {/* Mobile Expanded Area */}
                  {expandedItems.has(creditNote.id) && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Amount:</span>
                          <span className="font-medium">{formatCurrency(creditNote.amount)}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => handleView(creditNote.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Overlay to close dropdown when clicking elsewhere */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdown}
        />
      )}

      {/* Credit Card Choice Modal */}
      {selectedInvoiceForPayment && (
        <CreditCardChoiceModal
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          invoiceNumber={selectedInvoiceForPayment.number}
          amount={selectedInvoiceForPayment.due}
        />
      )}
    </div>
  );
};

export default InvoiceList;
