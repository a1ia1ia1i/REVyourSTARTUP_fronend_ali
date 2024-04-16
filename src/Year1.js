import React, { useState, useEffect } from 'react';
import _ from 'lodash';
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
  const initialMonthlyData = Array.from({ length: 12 }, () => ({ amount: 0 }));
      
  const [customerSegments, setCustomerSegments] = useState([]);
  const [additionalRevenue, setAdditionalRevenue] = useState({
    sourceNames: Array.from({ length: 5 }, () => ' '),
    sources: Array.from({ length: 5 }, () => Array.from({ length: 12 }, () => ({ amount: 0 }))),
    totalMonthly: Array.from({ length: 12 }, () => ({ amount: 0 }))
  });  
  const [fundingInvestment, setFundingInv] = useState({
    sourceNames: Array.from({ length: 5 }, () => ' '),
    sources: Array.from({ length: 5 }, () => _.cloneDeep(initialMonthlyData)),
    totalMonthly: Array.from({ length: 12 }, () => ({ amount: 0 }))
  });
  const [totalAllIncome, setTotalIncome] = useState(_.cloneDeep(initialMonthlyData));
  const [Distributions, setDistributions] = useState([]);
  const [cashOnHand, setCashOnHand] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(_.cloneDeep(initialMonthlyData));
  const [foundersDraw, setFoundersDraw] = useState([]);
  const [returnReworks, setReturnReworks] = useState([]);
  const [marketingExpenses, setMarketingExpenses] = useState([]);
  const [fixedAssets, setFixedAssets] = useState([]);
  const [propertyRelated, setPropertyRelated] = useState([]);
  const [legalAndProfessionalServices, setLegalAndProfessionalServices] = useState([]);
  const [officeGeneralBusiness, setOfficeGeneralBusiness] = useState([]);
  const [bankingFees, setBankingFees] = useState([]);
  const [travelVehicleRelated, setTravelVehicleRelated] = useState([]);
  const [productionRelated, setProductionRelated] = useState([]);
  const [otherExpenses, setOtherExpenses] = useState([]);
  const [salariedWorkers, setSalariedWorkers] = useState([]);
  const [fullTimeWorkers, setFullTimeWorkers] = useState([]);
  const [partTimeWorkers, setPartTimeWorkers] = useState([]);
  const [workersHeadCount, setWorkersHeadCount] = useState([]);
  const [selectedValue, setSelectedValue] = useState("option1")
  const [payRollTaxesAndBenefits, setpayRollTaxesAndBenefits] = useState([]);



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
    if (objectListTest.length > 0) {
      console.log("yea Making it baby!")
      const initialMonthData = {
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
        monthlyData: Array.from({ length: 34 }, () => (_.cloneDeep(initialMonthData))),
        totalMonthlyData: Array.from({ length: 34 }, () => ({ amount: 0 }))
      }));
      // Update the state with the new customerSegments array

      setCustomerSegments(newCustomerSegments);
      const newReturnReworks = objectListTest.map((item) => ({
        name: item.name,
        percentOfRevenue: 0,
        monthlyData: _.cloneDeep(initialMonthlyData),

      }));
      setReturnReworks(newReturnReworks);

      const materialExpensesNames = ["Overall Material/Supplies", "Overall Contract Labor", "Material/Supplies", "Contract Labor", "Packaging", "Shipping"]
      const newProductionRelated = objectListTest.map((item) => ({
        name: item.name,
        expensesList: materialExpensesNames.map((name) => ({
          sourceName: name,
          monthlyData: _.cloneDeep(initialMonthlyData),
        }))
      }));
      setProductionRelated(newProductionRelated);

    }

    const newDistributions = {
      includeInvestments: true,
      withInvestments: _.cloneDeep(initialMonthlyData), // Deep copy of initialMonthlyData
      withoutInvestments: _.cloneDeep(initialMonthlyData) // Another deep copy of initialMonthlyData
    };
    setDistributions(newDistributions);

    const newCashOnHand = {
      excludeDepreciation: true,
      initialCashOnHand: 0,
      withDepreciation: _.cloneDeep(initialMonthlyData),
      withoutDepreciation: _.cloneDeep(initialMonthlyData)
    }
    setCashOnHand(newCashOnHand);

    const newFoundersDraw = {
      numberOfFounders: 1,
      foundersDrawPayArray: Array.from({length: 1}, () => _.cloneDeep(initialMonthlyData)) 
    }
    setFoundersDraw(newFoundersDraw);

    const newMarketingExpensesNames = [
      "Brand-Related Expenses",
      "Owned Media (blogs…etc)",
      "Public Relations",
      "Content Creation",
      "Marketing Analytics",
      "Marketing Research",
      "Conferences",
      "Trade Shows",
      "Marketing Training",
      "Sales Support Tools",
      "Website Expenses",
      "Mobile Platform Expenses",
      "Social Media Marketing",
      "Affiliate Marketing",
      "Traditional Media"
    ];
    const newMarketingExpenses = {
      numberOfExpenses: 15,
      marketingList: newMarketingExpensesNames.map((name) => ({
        sourceName: name,
        monthlyData: _.cloneDeep(initialMonthlyData),
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setMarketingExpenses(newMarketingExpenses);

    const newFixedAssets = {
      newAcquisitions:  _.cloneDeep(initialMonthlyData),
      depreciation:  _.cloneDeep(initialMonthlyData),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setFixedAssets(newFixedAssets);
    const propertyRelatedNames = ["Interest (Mortgage)", "Rent of Lease (business property)", "Rent or lease (vehicles, machinery, and equipment", "Repairs and maintenance", "Depletion", "Other"];
    const newPropertyRelated = {
      expensesList: propertyRelatedNames.map((name) => ({
        sourceName: name,
        monthlyData: _.cloneDeep(initialMonthlyData),
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setPropertyRelated(newPropertyRelated);

    const serviceNames = ["Lawyer", "Accounting", "Bookkeeping", "Insurance", "Other"];

    const newLegalAndProfessional = {
      expensesList: serviceNames.map((name) => ({
        sourceName: name,
        monthlyData: _.cloneDeep(initialMonthlyData),
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setLegalAndProfessionalServices(newLegalAndProfessional);
    
    const officeExpensesNames = ["Phone", "Internet", "Utilities", "Office supplies", "Misc. Office Equipment", "Cleaning Service", "Taxes and Licenses"];
    const newOfficeBusiness = {
      expensesList: officeExpensesNames.map((name) => ({
        sourceName: name,
        monthlyData: _.cloneDeep(initialMonthlyData),
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setOfficeGeneralBusiness(newOfficeBusiness);

    const bankingFeesNames = ["Interest (Banks/Credit)", "Interest (Other)"];
    const newBankingFees = {
      expensesList: bankingFeesNames.map((name) => ({
        sourceName: name,
        monthlyData: _.cloneDeep(initialMonthlyData),
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setBankingFees(newBankingFees);

    const travelExpensesNames = ["Car and Truck expenses", "Travel/Expenses", "Deductible Meals", "Mileage", "Parking/Tools", "Other"];
    const newTravelExpenses = {
      expensesList: travelExpensesNames.map((name) => ({
        sourceName: name,
        monthlyData: _.cloneDeep(initialMonthlyData),
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setTravelVehicleRelated(newTravelExpenses);

    const newOtherExpenses = {
      expensesList: Array.from({ length: 5 }, () => ({
        sourceName: "Misc.",
        monthlyData: _.cloneDeep(initialMonthlyData)
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData),
    };
    setOtherExpenses(newOtherExpenses);

    const newSalariedWorkers = {
      workersList: Array.from({ length: 6 }, () => ({
        description: "Misc.",
        monthlySalary: 0,
        monthlyData: _.cloneDeep(initialMonthlyData)
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData),
    };
    setSalariedWorkers(newSalariedWorkers);

    const newFullTime = {
      workersList: Array.from({ length: 6 }, () => ({
        description: "Misc.",
        monthlySalary: 0,
        monthlyData: _.cloneDeep(initialMonthlyData)
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData),
    };
    setFullTimeWorkers(newFullTime);

    const newPartTime = {
      workersList: Array.from({ length: 6 }, () => ({
        description: "Misc.",
        monthlySalary: 0,
        monthlyData: _.cloneDeep(initialMonthlyData)
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData),
    };
    setPartTimeWorkers(newPartTime);

    
    const newHeadCount = {
      foundersHeadCount: _.cloneDeep(initialMonthlyData),
      salariedHeadCount: _.cloneDeep(initialMonthlyData),
      fullTimeHeadCount: _.cloneDeep(initialMonthlyData),
      partTimeHeadCount: _.cloneDeep(initialMonthlyData),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setWorkersHeadCount(newHeadCount);
    const taxesAndBenefitsNames = ["Social Security (Rate)", "Social Security (Base)", "Medicare", "Federal Unemployment Tax (FUTA)", "Federal Unemployment Tax (Base)", "State Unemployment Tax (SUTA)", "State Unemployment Tax (Base)", "Employee Pension Programs", "Worker's Compensation", "Employee Health Insurace", "Other Employee Benefit Programs"];
    const newPayRoll = {
      payrollList: taxesAndBenefitsNames.map((name) => ({
        sourceName: name,
        value: 0,
        monthlyData: _.cloneDeep(initialMonthlyData),
      })),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setpayRollTaxesAndBenefits(newPayRoll);


  }, []); // Execute effect whenever objectList prop changes
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customerSegments);
    // Handle form submission, e.g., send to an API
  };

  const handleChange = (index, field, value) => {
    const updatedSegments = _.cloneDeep(customerSegments);
    updatedSegments[index].inputData[field] = +value;
    
    setCustomerSegments(updatedSegments);
  };
  const sumArray = (arr1, arr2) => {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      result.push({ amount: arr1[i].amount + arr2[i].amount });
    }
    return result;
  };
  useEffect(() => {
    const newTotalMonthly = sumArray(additionalRevenue.totalMonthly, fundingInvestment.totalMonthly);
    setTotalIncome(newTotalMonthly);
  }, [fundingInvestment, additionalRevenue]);
  const handleChangeMonthlyData = (index, indexM, field, value) => {
    const updatedSegments = _.cloneDeep(customerSegments);
    const previousNumbersSold = updatedSegments[index].monthlyData.map(month => month.NumbersSold);  // Capture previous numbers sold for all months
  
    updatedSegments[index].monthlyData[indexM].NumbersSold = +value;  // Directly update the numbers sold for the selected month
  
    // Reset ExtraFromPreviousMonths to 0 for recalculation
    updatedSegments[index].monthlyData.forEach(month => month.ExtraFromPreviousMonths = 0);
    // Calculate the total numbers sold after the update
    const totalNumbersSold = updatedSegments[index].monthlyData.reduce((acc, month) => acc + month.NumbersSold, 0);
    
    // Update the numberToSell for the segment
    updatedSegments[index].numberToSell = updatedSegments[index].numbersToSellOriginal - totalNumbersSold;
  
    // Loop through each month to recalculate based on the current numbers sold
    updatedSegments[index].monthlyData.forEach((monthData, currentMonth) => {
      const numbersSold = monthData.NumbersSold;
      const { deposit, deliveredIn, extraMonths, commission, fixedFees } = updatedSegments[index].inputData;
      const depositPercent = deposit / 100;
      const itemPrice = updatedSegments[index].price;
      const depositAmount = Math.ceil(itemPrice * depositPercent);
      const commissionPercentage = commission/100;
      monthData.Deposit = depositAmount * numbersSold;
  
      const amountDue = (itemPrice * numbersSold) - (depositAmount * numbersSold);
      const amountPerMonth = amountDue / (extraMonths + 1);
      const startingMonth = currentMonth + deliveredIn;
      if ((startingMonth)<34) {
        updatedSegments[index].monthlyData[startingMonth].Original = Math.ceil(amountPerMonth);
      }
      // Apply the calculated changes to all relevant future months
      for (let i = startingMonth+1; i < updatedSegments[index].monthlyData.length && i <= startingMonth + extraMonths; i++) {
        updatedSegments[index].monthlyData[i].ExtraFromPreviousMonths += Math.ceil(amountPerMonth);
      }
      monthData.commission = ((monthData.Deposit+monthData.Original+monthData.ExtraFromPreviousMonths)*commissionPercentage);
      monthData.fixedFees = (fixedFees*numbersSold);
    });
  
    // Recalculate the total for each month
    updatedSegments[index].totalMonthlyData = updatedSegments[index].monthlyData.map((data) => {
      const totalAmount = (data.Original + data.ExtraFromPreviousMonths + data.Deposit) - (data.commission + data.fixedFees);
      return { amount: totalAmount };
    });
  
    // Update the main state with the new customerSegments array
    setCustomerSegments(updatedSegments);
  };
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleSourceNameChange = (stateName, index, newName) => {
    if (stateName==="additional_revenue") {
      const newSourceNames = [...additionalRevenue.sourceNames];
      newSourceNames[index] = newName;
      setAdditionalRevenue(prev => ({ ...prev, sourceNames: newSourceNames }));
    } else if (stateName==="funding_investment") {
      const newSourceNames = [...fundingInvestment.sourceNames];
      newSourceNames[index] = newName;
      setFundingInv(prev => ({ ...prev, sourceNames: newSourceNames }));
    }
    console.log(additionalRevenue.sourceNames[index]);
    
  };
  const handleAmountChange = (stateName, sourceIndex, monthIndex, newValue) => {
    if (stateName==="additional_revenue") {
      setAdditionalRevenue(prev => {
        // Update specific source amount at the given month index
        const newSources = [...prev.sources];
        newSources[sourceIndex][monthIndex] = { ...newSources[sourceIndex][monthIndex], amount: parseFloat(newValue) || 0 };
  
        // Recalculate the total for the month across all sources
        const newTotalMonthly = prev.totalMonthly.map((total, idx) => {
          if (idx === monthIndex) {
            // Sum up all sources' amounts for this month
            const sum = newSources.reduce((acc, source) => acc + (source[idx].amount || 0), 0);
            return { ...total, amount: sum };
          }
          return total;
        });
  
        return { ...prev, sources: newSources, totalMonthly: newTotalMonthly };
      });

    } else if (stateName==="funding_investment") {
      setFundingInv(prev => {
    // Create a new copy of sources to ensure immutability
        const newSources = prev.sources.map((source, idx) => {
          if (idx === sourceIndex) {
            // Only update the month's amount for the current source
            return source.map((data, idx) => idx === monthIndex ? { ...data, amount: parseFloat(newValue) || 0 } : data);
          }
          return source;
        });
        // Calculate new totals for the updated month
        const newTotalMonthly = prev.totalMonthly.map((total, idx) => {
          if (idx === monthIndex) {
            // Sum up all sources' amounts for the current month
            const sum = newSources.reduce((acc, source) => acc + (source[idx].amount || 0), 0);
            return { ...total, amount: sum };
          }
          return total;
        });

        return {
          ...prev,
          sources: newSources,
          totalMonthly: newTotalMonthly
        };
      });
    }
  };
  


const addNewSource = (stateName) => {
  // Define a helper function to update the state
  const updateState = (setterFunction, newStateName) => {
    setterFunction(prev => {
      const newSource = Array.from({ length: 12 }, () => ({ amount: 0 }));
      const newSourceName = newStateName === "additional_revenue" ? ' ' : ' ';

      const newSourceNames = [...prev.sourceNames, newSourceName];
      const newSources = [...prev.sources, newSource];
      const newTotalMonthly = prev.totalMonthly.map(total => ({
        ...total,
        amount: total.amount // No change needed, just 0 added
      }));

      return {
        ...prev,
        sourceNames: newSourceNames,
        sources: newSources,
        totalMonthly: newTotalMonthly
      };
    });
  };

  // Decide which state to update based on the stateName
  if (stateName === "additional_revenue") {
    updateState(setAdditionalRevenue, "additional_revenue");
  } else if (stateName === "funding_investment") {
    updateState(setFundingInv, "funding_investment");
  }
};
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
                      <tr>
                        <td>TOTAL</td>
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
                          <tr><td className="td-month">{item.totalMonthlyData[indexM].amount}</td></tr>
                        </tbody>   
                    </table>
                  </td>
                ))}
              </tr>
                
            </tbody>
          </table>
        ))}
        <h2>Additional Revenue</h2>
        <table className="tableizer-table2">
          <thead>
            <tr>
              <th>Source Names</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {additionalRevenue.sources.map((source, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="string"
                    value={additionalRevenue.sourceNames[index]}
                    onChange={e => handleSourceNameChange("additional_revenue", index, e.target.value)}
                  />
                </td>
                {source.map((monthData, indexM) => (
                  <td key={indexM}>
                    $<input
                      type="number"
                      value={monthData.amount}
                      onChange={e => handleAmountChange("additional_revenue", index, indexM, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Total</td>
              {additionalRevenue.totalMonthly && additionalRevenue.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
            
          </tbody>
        </table>
        <button onClick={() => addNewSource("additional_revenue")}>+</button>
        <h2>Funding/Investment</h2>
        <table className="tableizer-table2">
          <thead>
            <tr>
              <th>Source Names</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {fundingInvestment.sources.map((source, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="string"
                    value={fundingInvestment.sourceNames[index]}
                    onChange={e => handleSourceNameChange("funding_investment", index, e.target.value)}
                  />
                </td>
                {source.map((monthData, monthIndex) => (
                  <td key={monthIndex}>
                    $<input
                      type="number"
                      value={monthData.amount}
                      onChange={e => handleAmountChange("funding_investment", index, monthIndex, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Total</td>
              {fundingInvestment.totalMonthly.map((month, index) => (
                <td key={index}>{month.amount}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <button onClick={() => addNewSource("funding_investment")}>+</button>
        <h2>Total All Income</h2>
        <table class="tableizer-table2">
          <thead>
            <tr>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {totalAllIncome.map(month => <td>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>

        <h2>Distributions</h2>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Include Investments</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button>Yes</button><button>No</button></td>
              {Distributions.includeInvestments ? 
                (Array.isArray(Distributions.withInvestments) && Distributions.withInvestments.length > 0 ?
                Distributions.withInvestments.map(month => (
                  <td key={month}>{month.amount}</td>
                )) 
                : null)
                : (Array.isArray(Distributions.withoutInvestments) && Distributions.withoutInvestments.length > 0 ?
                  Distributions.withoutInvestments.map(month => (
                    <td key={month}>{month.amount}</td>
                )) 
                : null)
              }
                
          </tr>
          </tbody>
        </table>

        <h2>Cash On Hand</h2>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Exclude Depreciation</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button>Yes</button><button>No</button></td>
              {cashOnHand.excludeDepreciation ? 
                (Array.isArray(cashOnHand.withoutDepreciation) && cashOnHand.withoutDepreciation.length > 0 ?
                cashOnHand.withoutDepreciation.map(month => (
                  <td key={month}>{month.amount}</td>
                )) 
                : null)
                : (Array.isArray(cashOnHand.withDepreciation) && cashOnHand.withDepreciation.length > 0 ?
                  cashOnHand.withDepreciation.map(month => (
                    <td key={month}>{month.amount}</td>
                )) 
                : null)
              }
                
          </tr>
          </tbody>
        </table>

        <h2>Expenses</h2>
        <h3>Total All Expenses</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
            {totalExpenses && totalExpenses.map(month => <td key={month}>{month.amount}</td>)}
          </tr>
          </tbody>
        </table>


        <h2>Founder's Draw</h2>
        <table class="tableizer-table2">
          <thead>
            <tr>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
          {foundersDraw.foundersDrawPayArray && foundersDraw.foundersDrawPayArray.map((source, index) => (
            <tr key={index}>
                {Array.isArray(source) && source.map((month, indexM) => (
              <td key={indexM}>{month.amount}</td>
              ))}
            </tr>
          ))}
      
          </tbody>
        </table>
        
        <h2>Returns/Rework</h2>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Percent of Revenue</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
          {returnReworks && returnReworks.map((source, index) => (
            <tr key={index}>
              <td>{source.name}</td>
              <td><input type="number"></input></td>
              {Array.isArray(source.monthlyData) && source.monthlyData.map((month, indexM) => (
                <td key={indexM}>{month.amount}</td>
              ))}
            </tr>
          ))}
      
          </tbody>
        </table>

        <h2>Marketing Expenses</h2>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Sources</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
          {marketingExpenses.marketingList && marketingExpenses.marketingList.map((source, index) => (
            <tr key={index}>
              <td>{source.sourceName}</td>
                {Array.isArray(source.monthlyData) && source.monthlyData.map((month, indexM) => (
              <td key={indexM}>$<input type="number"></input></td>
              ))}
            </tr>
          ))}
          </tbody>
        </table> 

        <h2>Fixed Assets</h2>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th></th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>New Acquisitions</td>
            {fixedAssets.newAcquisitions && fixedAssets.newAcquisitions.map(month => <td key={month}>{month.amount}</td>)}
          </tr>
          <tr>
            <td>Depreciation</td>
            {fixedAssets.depreciation && fixedAssets.depreciation.map(month => <td key={month}>{month.amount}</td>)}

          </tr>
      
          </tbody>
        </table>
        <h2>Recurring Expenses</h2>
        <h3>Property Related</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th></th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {propertyRelated.expensesList && propertyRelated.expensesList.map(expense => <tr key={expense}>
              <td>{expense.sourceName}</td>
              {expense.monthlyData && expense.monthlyData.map(month => <td key={month}><input type="number"></input></td>)}
            </tr>)}
            <tr>
              <td>Total</td>
              {propertyRelated.totalMonthly && propertyRelated.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>

        <h3>Legal and Professional Serives</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th></th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {legalAndProfessionalServices.expensesList && legalAndProfessionalServices.expensesList.map(expense => <tr key={expense}>
              <td>{expense.sourceName}</td>
              {expense.monthlyData && expense.monthlyData.map(month => <td key={month}><input type="number"></input></td>)}
            </tr>)}
            <tr>
              <td>Total</td>
              {legalAndProfessionalServices.totalMonthly && legalAndProfessionalServices.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>

        <h3>Office/General Business</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th></th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {officeGeneralBusiness.expensesList && officeGeneralBusiness.expensesList.map(expense => <tr key={expense}>
              <td>{expense.sourceName}</td>
              {expense.monthlyData && expense.monthlyData.map(month => <td key={month}><input type="number"></input></td>)}
            </tr>)}
            <tr>
              <td>Total</td>
              {officeGeneralBusiness.totalMonthly && officeGeneralBusiness.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>

        <h3>Banking Fees</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th></th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {bankingFees.expensesList && bankingFees.expensesList.map(expense => <tr key={expense}>
              <td>{expense.sourceName}</td>
              {expense.monthlyData && expense.monthlyData.map(month => <td key={month}><input type="number"></input></td>)}
            </tr>)}
            <tr>
              <td>Total</td>
              {bankingFees.totalMonthly && bankingFees.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>

        <h3>Travel/Vehicule Related</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th></th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {travelVehicleRelated.expensesList && travelVehicleRelated.expensesList.map(expense => <tr key={expense}>
              <td>{expense.sourceName}</td>
              {expense.monthlyData && expense.monthlyData.map(month => <td key={month}><input type="number"></input></td>)}
            </tr>)}
            <tr>
              <td>Total</td>
              {travelVehicleRelated.totalMonthly && travelVehicleRelated.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>

        <h3>Production Related</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th></th>
              <th></th>              
            </tr>
          </thead>
          <tbody>
            {productionRelated && productionRelated.map((item, index) => <tr>
              <td>{item.name}</td>
              <td>
                <table className="nested-table">
                  <thead>
                    <th></th>
                    {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
                  </thead>
                  <tbody>
                    {item.expensesList && item.expensesList.map(expense => 
                    <tr key={expense}>
                      <td>{expense.sourceName}</td>
                      {expense.monthlyData && expense.monthlyData.map(month => <td><input type="number"></input></td>)}
                    </tr>)}
                  </tbody>
                </table>                
              </td>    
            </tr>)}
          </tbody>
        </table>

        <h3>Other Expenses</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Expense Name</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {otherExpenses.expensesList && otherExpenses.expensesList.map(expense => <tr key={expense}>
              <td><input type="string"></input></td>
              {expense.monthlyData && expense.monthlyData.map(month => <td key={month}><input type="number"></input></td>)}
            </tr>)}
            <tr>
              <td>Total</td>
              {otherExpenses.totalMonthly && otherExpenses.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>

        <h2>Employee Related</h2>
        <h3>Salaried</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Description</th>
              <th>Monthly Salary</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {salariedWorkers.workersList && salariedWorkers.workersList.map(workers => <tr key={workers}>
              <td><input type="string"></input></td>
              <td><input type="number"></input></td>
              {workers.monthlyData && workers.monthlyData.map(month => <td key={month}><input type="number"></input></td>)}
            </tr>)}
            <tr>
              
              <td className="totalTD" colSpan={2}>Total</td>
              {salariedWorkers.totalMonthly && salariedWorkers.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>

        <h3>Hourly Full Time</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Description</th>
              <th>Monthly Salary</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {fullTimeWorkers.workersList && fullTimeWorkers.workersList.map(workers => <tr key={workers}>
              <td><input type="string"></input></td>
              <td><input type="number"></input></td>
              {workers.monthlyData && workers.monthlyData.map(month => <td key={month}><input type="number"></input></td>)}
            </tr>)}
            <tr>
              
              <td className="totalTD" colSpan={2}>Total</td>
              {fullTimeWorkers.totalMonthly && fullTimeWorkers.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>

        <h3>Hourly Part Time</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Description</th>
              <th>Monthly Salary</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {partTimeWorkers.workersList && partTimeWorkers.workersList.map(workers => <tr key={workers}>
              <td><input type="string"></input></td>
              <td><input type="number"></input></td>
              {workers.monthlyData && workers.monthlyData.map(month => <td key={month}><input type="number"></input></td>)}
            </tr>)}
            <tr>
              
              <td className="totalTD" colSpan={2}>Total</td>
              {partTimeWorkers.totalMonthly && partTimeWorkers.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>
        
        <br></br>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Description</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Founders Head Count</td>
              {workersHeadCount.foundersHeadCount && workersHeadCount.foundersHeadCount.map(month => <td key={month}>{month.amount}</td>)} 
            </tr>
            <tr>
              <td>Salaried Head Count</td>
              {workersHeadCount.salariedHeadCount && workersHeadCount.salariedHeadCount.map(month => <td key={month}>{month.amount}</td>)} 
            </tr>
            <tr>
              <td>Full Time Head Count</td>
              {workersHeadCount.fullTimeHeadCount && workersHeadCount.fullTimeHeadCount.map(month => <td key={month}>{month.amount}</td>)} 
            </tr>
            <tr>
              <td>Part Time Head Count</td>
              {workersHeadCount.partTimeHeadCount && workersHeadCount.partTimeHeadCount.map(month => <td key={month}>{month.amount}</td>)} 
            </tr>
            <tr>
              <td className="totalTD">Total</td>
              {workersHeadCount.totalMonthly && workersHeadCount.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
          </tbody>
        </table>
        <br></br>
        <label htmlFor="dropdown">Founder(s) Status:</label>
        <select id="dropdown" value={selectedValue} onChange={handleDropdownChange}>
          <option value="option0">-- Please select --</option>
          <option value="option1">Founder(s) NOT Taxed (in gray below)</option>
          <option value="option2">Founder(s) Are Taxed as Employees</option>
        </select>
        <br></br>

        <h3>Payroll Taxes and Benefits</h3>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {payRollTaxesAndBenefits.payrollList && payRollTaxesAndBenefits.payrollList.map(row_item => 
            <tr key={row_item}>
              <td>{row_item.sourceName}</td>
              <td><input type="number"></input></td>
              {row_item.monthlyData && row_item.monthlyData.map(month => <td key={month}>{month.amount}</td>)}
            </tr>)}
            <tr>
              <td className="totalTD" colSpan={2}>Total</td>
              {payRollTaxesAndBenefits.totalMonthly && payRollTaxesAndBenefits.totalMonthly.map(month => <td key={month}>{month.amount}</td>)}
            </tr>
            
          </tbody>
        </table>

        

        <button type="submit">Submit</button>
        </form>



      
    </div>
  );
};

export default Year1;