import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './index.css';
import { transactionTypesData, settlementStatusesData } from './data';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [settlementStatuses, setSettlementStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchData = () => {
      try {
        const fetchedTransactionTypes = transactionTypesData.data;
        const fetchedSettlementStatuses = settlementStatusesData.data;

        if (!fetchedTransactionTypes.length) {
          setTransactionTypes(transactionTypesData.data.map(item => ({ ...item, value: '-' })));
        } else {
          setTransactionTypes(fetchedTransactionTypes);
        }

        if (!fetchedSettlementStatuses.length) {
          setSettlementStatuses(settlementStatusesData.data.map(item => ({ ...item, value: '-' })));
        } else {
          setSettlementStatuses(fetchedSettlementStatuses);
        }

        setLoading(false);
      } catch (err) {
        setTransactionTypes(transactionTypesData.data.map(item => ({ ...item, value: '-' })));
        setSettlementStatuses(settlementStatusesData.data.map(item => ({ ...item, value: '-' })));
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`relative transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-48'} transition-transform duration-300 ease-in-out`}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          transactionTypes={transactionTypes}
          settlementStatuses={settlementStatuses}
        />
      </div>
      <div className="flex-grow p-6">
        <button onClick={toggleSidebar} className="p-2 bg-blue-500 text-white rounded">
          Toggle Sidebar
        </button>
        {error && <div>Error fetching data: {error.message}</div>}
        {/* Other content goes here */}
      </div>
    </div>
  );
};

export default App;
