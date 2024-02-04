import React, { useState } from 'react';

const App = () => {
    const [preTaxAmount, setPreTaxAmount] = useState('');
    const [isEarlyBirdSpecial, setIsEarlyBirdSpecial] = useState(false);

    const taxRates = {
        countySalesFacilityTax: 0.01,
        homeRuleTax: 0.0075,
        countyCannabisTax: 0.03,
        municipalCannabisTax: 0.03,
        recreationalCannabisExciseTax: 0.25, // 25%
        stateSalesTax: 0.0625 // 6.25%
    };

    // Calculate discount
    const discount = isEarlyBirdSpecial ? parseFloat(preTaxAmount) * 0.15 : 0;
    const amountAfterDiscount = parseFloat(preTaxAmount) - discount;

    // Calculate taxes
    const taxDetails = {
        countySalesFacilityTax: amountAfterDiscount * taxRates.countySalesFacilityTax,
        homeRuleTax: amountAfterDiscount * taxRates.homeRuleTax,
        countyCannabisTax: amountAfterDiscount * taxRates.countyCannabisTax,
        municipalCannabisTax: amountAfterDiscount * taxRates.municipalCannabisTax,
        recreationalCannabisExciseTax: amountAfterDiscount * taxRates.recreationalCannabisExciseTax,
        stateSalesTax: amountAfterDiscount * taxRates.stateSalesTax,
    };

    // Calculate total tax
    const totalTax = Object.values(taxDetails).reduce((acc, tax) => acc + tax, 0);

    // Calculate total amount (after discount and including taxes)
    const totalWithTaxes = amountAfterDiscount + totalTax;

    return (
        <div>
            <input
                type="number"
                value={preTaxAmount}
                onChange={(e) => setPreTaxAmount(e.target.value)}
                placeholder="Enter pre-tax amount"
            />
            <label>
                <input
                    type="checkbox"
                    checked={isEarlyBirdSpecial}
                    onChange={(e) => setIsEarlyBirdSpecial(e.target.checked)}
                />
                Early Bird Special (15% discount)
            </label>
            <div>
                <h3>Tax Details</h3>
                {Object.entries(taxDetails).map(([taxName, taxAmount]) => (
                    <div key={taxName}>{`${taxName}: $${taxAmount.toFixed(2)}`}</div>
                ))}
                {isEarlyBirdSpecial && (
                    <div>Early Bird Discount: -${discount.toFixed(2)}</div>
                )}
            </div>
            <div>
                <h3>Total Amount (Including Taxes)</h3>
                <div>${totalWithTaxes.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default App;
