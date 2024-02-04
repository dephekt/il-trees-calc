import React, { useState } from 'react';

const App = () => {
    const [preTaxAmount, setPreTaxAmount] = useState('');
    const [taxDetails, setTaxDetails] = useState({});

    const taxRates = {
        countySalesFacilityTax: 0.01,
        homeRuleTax: 0.0075,
        countyCannabisTax: 0.03,
        municipalCannabisTax: 0.03,
        recreationalCannabisExciseTax: 0.25, // 25%
        stateSalesTax: 0.0625 // 6.25%
    };

    const calculateTaxes = () => {
        const amount = parseFloat(preTaxAmount);
        if (isNaN(amount)) {
            return;
        }

        const calculatedTaxes = {
            countySalesFacilityTax: amount * taxRates.countySalesFacilityTax,
            homeRuleTax: amount * taxRates.homeRuleTax,
            countyCannabisTax: amount * taxRates.countyCannabisTax,
            municipalCannabisTax: amount * taxRates.municipalCannabisTax,
            recreationalCannabisExciseTax: amount * taxRates.recreationalCannabisExciseTax,
            stateSalesTax: amount * taxRates.stateSalesTax,
        };

        setTaxDetails(calculatedTaxes);
    };

    const totalWithTaxes = () => {
        const totalTax = Object.values(taxDetails).reduce((acc, tax) => acc + tax, 0);
        return parseFloat(preTaxAmount) + totalTax;
    };

    return (
        <div>
            <input
                type="number"
                value={preTaxAmount}
                onChange={(e) => setPreTaxAmount(e.target.value)}
                placeholder="Enter pre-tax amount"
            />
            <button onClick={calculateTaxes}>Calculate Taxes</button>
            <div>
                <h3>Tax Details</h3>
                {Object.entries(taxDetails).map(([taxName, taxAmount]) => (
                    <div key={taxName}>{`${taxName}: $${taxAmount.toFixed(2)}`}</div>
                ))}
            </div>
            <div>
                <h3>Total Amount (Including Taxes)</h3>
                <div>${totalWithTaxes().toFixed(2)}</div>
            </div>
        </div>
    );
};

export default App;
