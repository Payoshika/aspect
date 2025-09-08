import React from "react";
import InvoiceList from "./InvoiceList";

const InvoiceLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-2">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <InvoiceList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceLayout;
