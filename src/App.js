import './App.css'
import React, { useState } from 'react';

const App = () => {
    const [preTaxAmount, setPreTaxAmount] = useState('');
    const [isEarlyBirdSpecial, setIsEarlyBirdSpecial] = useState(false);
    const [productType, setProductType] = useState('highTHC');

    const taxRates = {
        countySalesFacilityTax: 0.01,
        homeRuleTax: 0.0075,
        countyCannabisTax: 0.03,
        municipalCannabisTax: 0.03,
        stateSalesTax: 0.0625 // 6.25%
    };

    const recreationalCannabisExciseTaxRates = {
        highTHC: 0.25, // 25%
        lowTHC: 0.10, // 10%
        infused: 0.20 // 20%
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
        recreationalCannabisExciseTax: amountAfterDiscount * recreationalCannabisExciseTaxRates[productType],
        stateSalesTax: amountAfterDiscount * taxRates.stateSalesTax,
    };

    // Calculate total tax
    const totalTax = Object.values(taxDetails).reduce((acc, tax) => acc + tax, 0);

    // Calculate total amount (after discount and including taxes)
    const totalWithTaxes = () => {
        return amountAfterDiscount + totalTax;
    }

    const formatCurrency = (amount) => {
        return isNaN(amount) ? '0.00' : amount.toFixed(2);
    };

    return (
        <div className="app-container">
            <div className="input-section">
                <h3 className="section-titles">Pre-Tax Price:</h3>
                <input
                    type="number"
                    value={preTaxAmount}
                    onChange={(e) => setPreTaxAmount(e.target.value)}
                    placeholder="Enter pre-tax amount"
                    className="input-field"
                />
                <div className="product-type-section">
                    <h3 className="section-titles">Excise Tax</h3>
                    <p>The IL Cannabis Purchaser Excise Tax rate depends on the type of the product in question:</p>
                    <ul>
                        <li>10%: Low THC (35% or less)</li>
                        <li>20%: Infused (tinctures, edibles, topicals, etc.)</li>
                        <li>25%: High THC (>35%)</li>
                    </ul>
                    <label>
                        <input
                            type="radio"
                            value="highTHC"
                            checked={productType === 'highTHC'}
                            onChange={(e) => setProductType(e.target.value)}
                        />
                        High THC (>35%)
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="lowTHC"
                            checked={productType === 'lowTHC'}
                            onChange={(e) => setProductType(e.target.value)}
                        />
                        Low THC (≤35%)
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="infused"
                            checked={productType === 'infused'}
                            onChange={(e) => setProductType(e.target.value)}
                        />
                        Infused
                    </label>
                    <h3 className="section-titles">Discounts:</h3>
                    <label className="discount-checkbox">
                        <input
                            type="checkbox"
                            checked={isEarlyBirdSpecial}
                            onChange={(e) => setIsEarlyBirdSpecial(e.target.checked)}
                        />
                        Apply Early Bird Discount (15%)
                        {isEarlyBirdSpecial && preTaxAmount && (
                            <div className="discount-item">-${formatCurrency(discount)}</div>
                        )}
                    </label>
                </div>
            </div>
           <div className="tax-details">
                <h3 className="section-titles">Taxes:</h3>
                {Object.entries(taxDetails).map(([taxName, taxAmount]) => (
                    <div key={taxName} className="tax-item">
                        {`${taxName}: `}
                        <span className="tax-amount">
                            ${formatCurrency(taxAmount)}
                        </span>
                    </div>
                ))}
                <div className="tax-total">
                    Total: <span className="tax-total-amount">${formatCurrency(totalTax)}</span>
                </div>
            </div>
            <div className="grand-total-section">
                <h3>Grand Total:</h3>
                <div className="total-amount">
                    ${formatCurrency(totalWithTaxes())}
                </div>
            </div>
        </div>
    );
};

export default App;
