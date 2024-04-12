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
  const [additionalRevenue, setAdditionalRevenue] = useState([]);
  const [fundingInvestment, setFundingInv] = useState([]);
  const [totalAllIncome, setTotalIncome] = useState([]);
  const [Distributions, setDistributions] = useState([]);
  const [cashOnHand, setCashOnHand] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
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

  
 
  // Effect to update customerSegments when objectList prop changes
  useEffect(() => {
    // Check if objectList is not empty
    const generateRevenueSources = (length, monthlyData) => ({
      sourceNames: Array.from({ length }, () => ({ sourceName: 'Source Name' })),
      sources: Array.from({ length }, () => _.cloneDeep(monthlyData))
    });
    if (objectListTest.length > 0) {
      console.log("yea Making it baby!")
      const initialMonthData = {
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
        monthlyData: Array.from({ length: 34 }, () => ({ ...initialMonthData }))
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
    const constNumberOfSources = 5;
    const newAdditionalRevenue = {
      sourceNames: Array.from({length: constNumberOfSources}, () => ({sourceName: 'John'})),
      sources: Array.from({length: constNumberOfSources}, () => _.cloneDeep(initialMonthlyData)),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setAdditionalRevenue(newAdditionalRevenue);

    const newFundingInv = {
      sourceNames: Array.from({length: constNumberOfSources}, () => ({sourceName: 'John'})),
      sources: Array.from({length: constNumberOfSources}, () => _.cloneDeep(initialMonthlyData)),
      totalMonthly: _.cloneDeep(initialMonthlyData)
    }
    setFundingInv(newFundingInv);
    setTotalIncome(initialMonthlyData);

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

    const newTotalExpenses = _.cloneDeep(initialMonthlyData);
    setTotalExpenses(newTotalExpenses);


    const newFoundersDraw = {
      numberOfFounders: 1,
      foundersDrawPayArray: Array.from({length: 1}, () => _.cloneDeep(initialMonthlyData)) 
    }
    setFoundersDraw(newFoundersDraw);

    const newMarketingExpenses = {
      numberOfExpenses: 15,
      marketingList: Array.from({length: 15}, () => ({sourceName: 'source', monthlyData: _.cloneDeep(initialMonthlyData)})),
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
        <h2>Additional Revenue</h2>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Sources</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
          {additionalRevenue.sources && additionalRevenue.sourceNames && additionalRevenue.sources.map((source, index) => (
            <tr key={index}>
              <td><input type="string"></input></td>
                {Array.isArray(source) && source.map((month, indexM) => (
              <td key={indexM}>$<input type="number"></input></td>
              ))}
            </tr>
          ))}
      
          </tbody>
        </table>
        <h2>Funding/Investment</h2>
        <table class="tableizer-table2">
          <thead>
            <tr>
              <th>Sources</th>
              {monthsOnly.map(month => <th className="monthHeader" key={month}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
          {fundingInvestment.sources && fundingInvestment.sourceNames && fundingInvestment.sources.map((source, index) => (
            <tr key={index}>
              <td><input type="string"></input></td>
                {Array.isArray(source) && source.map((month, indexM) => (
              <td key={indexM}>$<input type="number"></input></td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
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
        <select id="dropdown" value={selectedValue} onChange={handleChange}>
          <option value="">-- Please select --</option>
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



      {/*
     

    
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