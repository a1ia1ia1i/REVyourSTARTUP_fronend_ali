import React, { useState, useEffect } from 'react';
import './Year1.css';
import Dashboard from './Dashboard';

const objectListTest = [
  {
    name: "Kilter Roller Chair",
    numberToSell: 10,
    price: 3999
  },
  {
    name: "Kilter Roller",
    numberToSell: 5,
    price: 85
  }
];

function Year1({ setLoggedIn }) {
  const [customerSegments, setCustomerSegments] = useState([]);

  useEffect(() => {
    if (objectListTest.length > 0) {
      const initialMonthlyData = {
        NumbersSold: 0,
        Deposit: 0,
        Original: 0,
        ExtraFromPreviousMonths: 0,
        commission: 0,
        fixedFees: 0
      };

      const newCustomerSegments = objectListTest.map(item => ({
        name: item.name,
        numberToSell: item.numberToSell,
        price: item.price,
        status: 'Pending',
        inputData: {
          depositPercent: 0,
          deliveredIn: 0,
          extraMonths: 0,
          commission: 0,
          fixedFees: 0
        },
        monthlyData: Array.from({ length: 34 }, () => ({ ...initialMonthlyData }))
      }));

      setCustomerSegments(newCustomerSegments);
    }
  }, []);

  const handleInputChange = (segmentIndex, inputName, value) => {
    const updatedCustomerSegments = customerSegments.map((segment, index) => {
      if (index === segmentIndex) {
        return {
          ...segment,
          inputData: {
            ...segment.inputData,
            [inputName]: value
          }
        };
      }
      return segment;
    });
    setCustomerSegments(updatedCustomerSegments);
  };

  const handleMonthlyInputChange = (segmentIndex, monthIndex, fieldName, value) => {
    const updatedCustomerSegments = [...customerSegments];
    updatedCustomerSegments[segmentIndex].monthlyData[monthIndex][fieldName] = Number(value);
    setCustomerSegments(updatedCustomerSegments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customerSegments);
    // Further processing or API call
  };

  return (
    <div className="year1">
      <Dashboard setLoggedIn={setLoggedIn}/>
      <h2>Year 1 Income Overview</h2>
      <form onSubmit={handleSubmit}>
        {customerSegments.map((segment, segmentIndex) => (
          <div key={segmentIndex} className="segment-form">
            <h3>{segment.name}</h3>
            <label>Deposit %: </label>
            <input
              type="number"
              value={segment.inputData.depositPercent || ''}
              onChange={(e) => handleInputChange(segmentIndex, 'depositPercent', e.target.value)}
            />
            {/* Add other inputs for segment.inputData similarly */}
            {segment.monthlyData.map((monthData, monthIndex) => (
              <div key={monthIndex} className="month-data">
                <label>Numbers Sold in Month {monthIndex + 1}: </label>
                <input
                  type="number"
                  value={monthData.NumbersSold || 0}
                  onChange={(e) => handleMonthlyInputChange(segmentIndex, monthIndex, 'NumbersSold', e.target.value)}
                />
                {/* Add other inputs for monthData similarly */}
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Year1;
