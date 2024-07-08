import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaBars } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, toggleSidebar, transactionTypes, settlementStatuses }) => {
  const [isTransactionTypeOpen, setTransactionTypeOpen] = useState(false);
  const [isSettlementStatusOpen, setSettlementStatusOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleTransactionType = () => setTransactionTypeOpen(!isTransactionTypeOpen);
  const toggleSettlementStatus = () => setSettlementStatusOpen(!isSettlementStatusOpen);

  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className={`h-screen bg-gray-100 p-4 overflow-y-auto ${isSidebarOpen ? 'w-64' : 'w-16'} transition-width duration-300 ease-in-out relative`}>
      <button onClick={toggleSidebar} className="absolute top-4 left-4">
        <FaBars />
      </button>
      <div className="mt-12">
        <div className="mb-4">
          <div
            className="flex items-center p-2 bg-gray-300 rounded cursor-pointer"
            onClick={toggleTransactionType}
          >
            {isTransactionTypeOpen ? <FaAngleUp /> : <FaAngleDown />}
            {isSidebarOpen && <span className="ml-2">Transaction Type</span>}
          </div>
          {isTransactionTypeOpen && isSidebarOpen && (
            <ul className="pl-6 mt-2 space-y-2">
              {transactionTypes.map((item) => (
                <li
                  key={item.title}
                  className={`cursor-pointer flex justify-between ${selectedItems.includes(item) ? 'bg-blue-200' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item.title}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div
            className="flex items-center p-2 bg-gray-300 rounded cursor-pointer"
            onClick={toggleSettlementStatus}
          >
            {isSettlementStatusOpen ? <FaAngleUp /> : <FaAngleDown />}
            {isSidebarOpen && <span className="ml-2">Settlement Status</span>}
          </div>
          {isSettlementStatusOpen && isSidebarOpen && (
            <ul className="pl-6 mt-2 space-y-2">
              {settlementStatuses.map((item) => (
                <li
                  key={item.title}
                  className={`cursor-pointer flex justify-between ${selectedItems.includes(item) ? 'bg-blue-200' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item.title}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
