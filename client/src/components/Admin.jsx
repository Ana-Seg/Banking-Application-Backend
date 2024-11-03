import React, { useState } from 'react';
import bank from "../assets/bank.png";
import AllData from "../components/AllData";

const Admin = () => {
  const [showAllData, setShowAllData] = useState(false);

  const handleButtonClick = () => {
    setShowAllData(prevShowAllData => !prevShowAllData);
  };

  return (
    <div className='p-4 max-w-[1400px] mx-auto mt-16 bg-gray-100 rounded-lg shadow-lg'>
      <div className='text-center'>
        <h1 className='text-6xl my-8 font-bold'>
          Welcome <span className='text-blue-800'>Admin</span>
        </h1>
        <button
          onClick={handleButtonClick}
          className='bg-blue-800 text-white text-lg py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300'
        >
          {showAllData ? 'Hide All Data' : 'Show All Data'}
        </button>
        {showAllData && <AllData key={showAllData} />}
      </div>
      <div className='mt-8'>
        <img src={bank} alt="bank" className="rounded-2xl h-auto w-full max-w-md mx-auto object-cover shadow-md" />
      </div>
    </div>
  );
}

export default Admin;



