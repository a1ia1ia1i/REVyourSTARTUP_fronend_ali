import React, { useState, useEffect } from 'react';
import './Year1.css';
import Dashboard from './Dashboard';
// Example data structure


function Year1({ setLoggedIn }) {
  const objectListTest = [{
    name: "Kilter Roller Chair",
    numberToSell: 10,
    price: 3999
  },
  {name: "Kilter Roller",
  numberToSell: 5,
  price: 85}];
  
  const [customerSegments, setCustomerSegments] = useState([]);
  const [sources, setSources] = useState([]);
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthsOnly = monthNames.map((month, index) => `${month}-${currentYear}`);
  const extendedMonths = Array.from({ length: 22 }, (_, index) => `Ext +${index + 1}`);
  const months = monthsOnly.concat(extendedMonths);

  // Effect to update customerSegments when objectList prop changes
  useEffect(() => {
    // Check if objectList is not empty
    if (objectListTest.length > 0) {
      const initialMonthlyData = {
        NumbersSold: 0,
        Deposit: 0,
        Original: 0,
        ExtraFromPreviousMonths: 0,
        commission: 0,
        fixedFees: 0
      }
      // Create customerSegments array based on objectList
      const newCustomerSegments = objectListTest.map((item) => ({
        name: item.name,
        numberToSell: item.numberToSell,
        price: item.price,
        status: 'Pending', // Example status, you can initialize it as needed
        inputData: {
          // You can initialize it with default values
          deposit: 0,
          delivedIn: 0,
          extraMonths: 0,
          commission: 0,
          fixedFees: 0
        },
        monthlyData: Array.from({ length: 34 }, () => ({ ...initialMonthlyData }))
      }));
      // Update the state with the new customerSegments array
      setCustomerSegments(newCustomerSegments);
    }
  }, []); // Execute effect whenever objectList prop changes
  
  useEffect(() => {
    // Check if customerSegments has been initialized
    if (customerSegments.length > 0) {
      // This block will run only after customerSegments has been initialized
      var customerSegmentsLocal = [...customerSegments]; // Create a copy of customerSegments
      console.log(customerSegmentsLocal[0]);
      customerSegmentsLocal[0].name = 'Name ME';
      console.log(customerSegmentsLocal[0]);
    }
  }, [customerSegments]);

  //{months.map(month => <tr key={month}>{item.monthlyData[month] || '-'}</tr>)}
  
  return (
    <div class="year1">
      <Dashboard setLoggedIn={setLoggedIn}/>
      <h2>Year 1 Income Overview</h2>

      {customerSegments.map(item => (
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Product/Service</th>
            <th>{item.status}</th>
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>
              <tr>Number of Customers @ <span style={{padding: '2px'}}>{item.inputData.deposit}</span></tr>
              <tr><label for="inp1">Deposit %</label></tr><input name="inp1"></input>
              <tr>Delievered in X months </tr><input></input>
              <tr># of extra months to pay </tr><input></input>
              <tr>Commission as % of income </tr><input></input>
              <tr>Fixed Fees/Customer </tr><input></input></td>
              {months.map((month, index) => (
              <td key={index}>
                <tr style={{ padding: '10px', border: '1px solid black' }}>{item.monthlyData[index].NumbersSold}</tr>
                <tr style={{ padding: '10px', border: '1px solid black' }}>{item.monthlyData[index].Deposit}</tr>
                <tr style={{ padding: '10px', border: '1px solid black' }}>{item.monthlyData[index].Original}</tr>
                <tr style={{ padding: '10px', border: '1px solid black' }}>{item.monthlyData[index].ExtraFromPreviousMonths}</tr>
                <tr style={{ padding: '10px', border: '1px solid black' }}>{item.monthlyData[index].commission}</tr>
                <tr style={{ padding: '10px', border: '1px solid black' }}>{item.monthlyData[index].fixedFees}</tr>
              </td>
              ))}
            </tr>
        </tbody>
      </table>
      ))}
      {/* 
      <h2>Additional Revenue</h2>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Sources</th>
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.sources.map(source => (
            <tr>
              <td><input></input></td>
              {months.map(month => <td key={month}>{source.monthlyData[month]}<input></input></td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Funding/Investment</h2>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Sources</th>
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.funding_investment.map(source => (
            <tr>
              <td>{source.sourceName}<input></input></td>
              {months.map(month => <td key={month}>{source.monthlyData[month] || '-'}<input></input></td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total All Income</h2>
      <table class="tableizer-table">
        <thead>
          <tr>
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Distributions (Profit First)</h2>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Include Investments</th>
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td><button>Yes</button> <button>No  </button></td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Cash On Hand</h2>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Exclude Depreciation</th>
            <th>Starting Amount</th>
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td><button>Yes</button>  <button>No </button></td>
              <td>25000</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>


      <h2>Expenses</h2>
      <h3>Total All Expenses</h3>
      <table class="tableizer-table">
        <thead>

          <tr>
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.expenses.map(expense => (
            <tr key={expense.category}> 
              {months.map(month => <td key={month}>{expense.monthlyData[month] || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Founder's Draw</h3>
      <table class="tableizer-table">
        <thead>
          <tr>
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Returns/Reworks</h3>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Percent of Revenue</th>
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              <td>10%</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Marketing Expenses</h3>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>        
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Fixed Assets</h3>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>        
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Recurring Expenses</h2>

      <h4>Property Related</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>        
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Legal and Professional Services</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>        
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Office/General Business</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>        
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Banking Fees</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>        
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Travel/Vehicule Related</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>        
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Production Related</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Sources</th>        
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
        {data.revenue.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td><tr>{item.status}</tr>
              <tr>Overall Material/Supplies</tr>
              <tr>Overall Contract Labor</tr>
              <tr>Material/Supplies</tr>
              <tr>Contract Labor</tr>
              <tr>Packaging</tr>
              <tr>Shipping</tr></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Other expenses</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Item Name</th>        
            {months.map(month => <th key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Employee Related</h2>

      <h4>Salaried</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Monthly Salary</th>        
            {months.map(month => <th key={month}># working</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              <td>Amount</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Hourly Full Time</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Monthly Wages</th>        
            {months.map(month => <th key={month}># working</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              <td>Amount</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Hourly Part Time</h4>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Monthly Wages</th>        
            {months.map(month => <th key={month}># working</th>)}
          </tr>
        </thead>
        <tbody>
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Name</td>
              <td>Amount</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Founder(s) Status</h4>
      <button>Founder(s) are NOT Taxed</button>
      <button>Founder(s) are Taxed</button>

      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Description</th>
                  
            {months.map(month => <th key={month}># working</th>)}
          </tr>
        </thead>
        <tbody>

          {data.totalAllMonths.map(source => (
            <tr>
              <td>Founders Head Count</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Payroll Taxes and Benefits</h3>
      <table class="tableizer-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            {months.map(month => <th key={month}># working</th>)}
          </tr>
        </thead>
        <tbody>
          
          {data.totalAllMonths.map(source => (
            <tr>
              <td>Social Security (Rate)</td>
              <td>Number</td>
              {months.map(month => <td key={month}>{source.amount || '-'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
          */}

      {/* Additional tables for other sections can be generated similarly */}
    </div>
  );
};

export default Year1;