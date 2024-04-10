import React, { useState, useEffect } from 'react';
import './Year1.css';
import Dashboard from './Dashboard';
// Example data structure

const objectListTest = [{
  name: "Kilter Roller Chair",
  numberToSell: 10,
  price: 3999
},
{name: "Kilter Roller",
numberToSell: 5,
price: 85}];

function Year1({ setLoggedIn }) {
  
  
  const [customerSegments, setCustomerSegments] = useState([]);
  const [additionalRevenue, setAdditionalRevenue] = useState([]);
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
  const addItem = () => {

  }


  useEffect(() => {
    const monthlyData = Array.from({length: 12}, () => ({amount: 0}));
    const constNumberOfSources = 5;
    const newAdditionalRevenue = {
      sourceNames: Array.from({length: constNumberOfSources}, () => ({sourceName: ''})),
      sources: Array.from({length: constNumberOfSources}, () => ({...monthlyData}))
    }
    setAdditionalRevenue(newAdditionalRevenue);
  })
  
 
  // Effect to update customerSegments when objectList prop changes
  useEffect(() => {
    // Check if objectList is not empty
    if (objectListTest.length > 0) {
      console.log("yea Making it baby!")
      const initialMonthlyData = {
        NumbersSold: 0,
        Deposit: 0,
        Original: 0,
        ExtraFromPreviousMonths: 0,
        ExtraFromPreviousMonthsCopy: 0,
        commission: 0,
        fixedFees: 0
      }
      // Create customerSegments array based on objectList
      const newCustomerSegments = objectListTest.map((item) => ({
        name: item.name,
        numberToSell: item.numberToSell,
        numbersToSellOriginal: item.numberToSell,
        price: item.price,
        status: 'Pending', // Example status, you can initialize it as needed
        inputData: {
          // You can initialize it with default values
          deposit: 0,
          deliveredIn: 0,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customerSegments);
    // Handle form submission, e.g., send to an API
  };

  const handleChange = (index, field, value) => {
    const updatedSegments = [...customerSegments];
    updatedSegments[index].inputData[field] = +value;
    
    setCustomerSegments(updatedSegments);
  };
  const handleChangeMonthlyData = (index, indexM, field, value) => {
    const updatedSegments = [...customerSegments];
    updatedSegments[index].monthlyData[indexM].NumbersSold = +value;
    
    const depositPercent = (updatedSegments[index].inputData.deposit)/100;
    const deliveredIn = updatedSegments[index].inputData.deliveredIn;
    const extraMonths = updatedSegments[index].inputData.extraMonths;
    const commissionPercent = updatedSegments[index].inputData.commission;
    const fixedFee = updatedSegments[index].inputData.fixedFees;
    const itemPrice = updatedSegments[index].price;
    const depositAmount =  Math.ceil((itemPrice)*depositPercent);
    const numbersSold = updatedSegments[index].monthlyData[indexM].NumbersSold

    updatedSegments[index].monthlyData[indexM].Deposit = depositAmount*numbersSold;
    updatedSegments[index].numberToSell = updatedSegments[index].numbersToSellOriginal - numbersSold;
    const amountDue = (itemPrice*numbersSold) - (depositAmount*numbersSold);
    const amountPerMonth = amountDue/(extraMonths+1);
    const startingMonth = indexM + deliveredIn;

    console.log("Delivered in X months "+deliveredIn)
    console.log("current month "+ indexM);
    console.log("Starting month "+startingMonth);

    

    for (let i = startingMonth; i <= (startingMonth+extraMonths); i++) {
      if (i==startingMonth) {
        updatedSegments[index].monthlyData[i].Original = Math.ceil(amountPerMonth);
      }
      else {
        if (updatedSegments[index].monthlyData[i].ExtraFromPreviousMonths!=0) {
          const extraCopy = updatedSegments[index].monthlyData[i].ExtraFromPreviousMonths
          if (value==0) {
            updatedSegments[index].monthlyData[i].ExtraFromPreviousMonths = 0;
          } else {
            updatedSegments[index].monthlyData[i].ExtraFromPreviousMonths = 0;
            updatedSegments[index].monthlyData[i].ExtraFromPreviousMonths = Math.ceil(amountPerMonth);
          }
        }
        else {
          updatedSegments[index].monthlyData[i].ExtraFromPreviousMonths = Math.ceil(amountPerMonth);
        }
        console.log("Amount per month "+ amountPerMonth)
      }
    }



    setCustomerSegments(updatedSegments);
  };
  useEffect(() => {
    // Check if customerSegments has been initialized
    if (customerSegments.length > 0) {
      // This block will run only after customerSegments has been initialized
      var customerSegmentsLocal = [...customerSegments]; // Create a copy of customerSegments
      console.log(customerSegments)
    }
  }, [customerSegments]);

  //{months.map(month => <tr key={month}>{item.monthlyData[month] || '-'}</tr>)}
  
  return (
    <div className="year1">
      <Dashboard setLoggedIn={setLoggedIn}/>
      <h2>Year 1 Income Overview</h2>

      <form onSubmit={handleSubmit}>
        {customerSegments.map((item, index) => (
          <table className="tableizer-table" key={item.name}>
            <thead>
              <tr>
                <th>Product/Service</th>
                <th>Status: {item.numberToSell}</th>
                {months.map(month => <th className="monthHeader" key={month}>{month}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={6}>{item.name}</td>
                <td rowSpan={6}>
                  <table className="nested-table">
                    <tbody>
                      <tr><td>Number of Customers @ {item.price}</td></tr>
                      <tr>
                        <td>Deposit % <input type="number" name={`depositPercent-${index}`} value={item.inputData.deposit} onChange={e => handleChange(index, 'deposit', e.target.value)} /></td>
                      </tr>
                      <tr>
                        <td>Delivered in X months <input type="number" name={`deliveredInMonths-${index}`} value={item.inputData.deliveredIn} onChange={e => handleChange(index, 'deliveredIn', e.target.value)} /></td>
                      </tr>
                      <tr>
                        <td># of extra months to pay <input type="number" name={`extraMonths-${index}`} value={item.inputData.extraMonths} onChange={e => handleChange(index, 'extraMonths', e.target.value)} /></td>
                      </tr>
                      <tr>
                        <td>Commission as % of income <input type="number" name={`commissionPercent-${index}`} value={item.inputData.commission} onChange={e => handleChange(index, 'commission', e.target.value)} /></td>
                      </tr>
                      <tr>
                        <td>Fixed Fees/Customer <input type="number" name={`fixedFees-${index}`} value={item.inputData.fixedFees} onChange={e => handleChange(index, 'fixedFees', e.target.value)} /></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                {months.map((month, indexM) => (
                  <td rowSpan={6} key={month} className="td-month">
                    <table className="month-table">
                      <thead></thead>
                        <tbody>
                          <tr><td className="td-month-input"><input type="number" name='NumbersSold' value={item.monthlyData[indexM].NumbersSold} onChange={e => handleChangeMonthlyData(index, indexM,'numbersSold', e.target.value)} ></input></td></tr>
                          <tr><td className="td-month">{item.monthlyData[indexM].Deposit}</td></tr>
                          <tr><td className="td-month">{item.monthlyData[indexM].Original}</td></tr>
                          <tr><td className="td-month">{item.monthlyData[indexM].ExtraFromPreviousMonths}</td></tr>
                          <tr><td className="td-month">{item.monthlyData[indexM].commission}</td></tr>
                          <tr><td className="td-month">{item.monthlyData[indexM].fixedFees}</td></tr>
                        </tbody>   
                    </table>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ))}
        <button type="button" onClick={addItem}>Add Another Item</button>
        <button type="submit">Submit</button>
      </form>
       
      <h2>Additional Revenue</h2>
      <table class="tableizer-table2">
        <thead>
          <tr>
            <th>Sources</th>
            {months.map(month => <th className="monthHeader" key={month}>{month}</th>)}
          </tr>
        </thead>
        <tbody>
          {additionalRevenue.sources.map((source, index) => <tr key={index}>source[index]</tr>)}
          
        </tbody>
      </table>
      {/*
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