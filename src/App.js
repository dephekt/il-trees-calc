import './App.css'
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
    const totalWithTaxes = () => {
        return amountAfterDiscount + totalTax;
    }

    return (
        <div className="app-container">
            <div className="input-section">
                <input
                    type="number"
                    value={preTaxAmount}
                    onChange={(e) => setPreTaxAmount(e.target.value)}
                    placeholder="Enter pre-tax amount"
                    className="input-field"
                />
                <label className="discount-checkbox">
                    <input
                        type="checkbox"
                        checked={isEarlyBirdSpecial}
                        onChange={(e) => setIsEarlyBirdSpecial(e.target.checked)}
                    />
                    Early Bird Special (15% discount)
                </label>
            </div>
            <h3>Tax Breakdown:</h3>
            <div className="tax-details">
                {Object.entries(taxDetails).map(([taxName, taxAmount]) => (
                    <div key={taxName} className="tax-item">
                        {`${taxName}: `}
                        <span className="tax-amount">${taxAmount.toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="total-section">
                <h3>Taxes Total:</h3>
                <div className="total-tax-amount">${totalTax.toFixed(2)}</div>
            </div>
            <div className="discounts-section">
                <h3>Discounts:</h3>
                {isEarlyBirdSpecial && (
                    <div className="discount-item">
                        Early Bird Discount:
                        <span className="discount-amount">-${(totalWithTaxes() * 0.15).toFixed(2)}</span>
                    </div>
                )}
            </div>
            <div className="grand-total-section">
                <h3>Grand Total:</h3>
                <div className="total-amount">${totalWithTaxes().toFixed(2)}</div>
            </div>
        </div>
    );
};

export default App;
