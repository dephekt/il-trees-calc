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

    const taxNameMapping = {
        countySalesFacilityTax: 'County Sales Facility Tax',
        homeRuleTax: 'Home Rule Tax',
        countyCannabisTax: 'County Cannabis Tax',
        municipalCannabisTax: 'Municipal Cannabis Tax',
        recreationalCannabisExciseTax: 'Recreational Cannabis Excise Tax',
        stateSalesTax: 'State Sales Tax',
    }

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
                <p className="notice-info">The tax is different for different types of products.
                    If your total includes e.g. an edible and a live rosin concentrate, this
                    calculator doesn't yet handle the nuance of charging 20% for the edible and
                    25% for the concentrate.</p>
                <h3 className="section-titles">Pre-Tax Price:</h3>
                <p>Enter the pre-tax price.</p>
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
                    <div className="radio-options">
                        <div className="radio-option">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="highTHC"
                                    checked={productType === 'highTHC'}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                                25% - High THC (&gt;35%)
                            </label>
                        </div>
                        <div className="radio-option">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="infused"
                                    checked={productType === 'infused'}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                                20% - Infused
                            </label>
                        </div>
                        <div className="radio-option">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="lowTHC"
                                    checked={productType === 'lowTHC'}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                                10% - Low THC (&le;35%)
                            </label>
                        </div>
                        <p className="notice-info">Cannabis-infused products are non-vaporized like tinctures, edibles,
                            topicals; regardless of THC level. Common high THC products are concentrates and cartridges.
                            The most common low THC example would be dried flower, trim, etc.</p>
                        <h3 className="section-titles">Discounts:</h3>
                        <label className="discount-checkbox">
                            <input
                                type="checkbox"
                                checked={isEarlyBirdSpecial}
                                onChange={(e) => setIsEarlyBirdSpecial(e.target.checked)}
                            />
                            Apply Early Bird Discount (15%)
                        </label>
                        <div className="discount-placeholder">
                            {isEarlyBirdSpecial && preTaxAmount && (
                                <div className="discount-item">-${formatCurrency(discount)}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="tax-details">
                <h3 className="section-titles">Taxes:</h3>
                {Object.entries(taxDetails).map(([taxName, taxAmount]) => (
                    <div key={taxName} className="tax-item">
                        {`${taxNameMapping[taxName] || taxName}: `}
                        <span className="tax-amount">${formatCurrency(taxAmount)}</span>
                    </div>
                ))}
                <div className="tax-total">
                <span className="tax-total-amount">${formatCurrency(totalTax)}</span>
                </div>
            </div>
            <div className="grand-total-section">
                <h3 className="section-titles">Grand Total:</h3>
                <div className="total-amount">
                    ${formatCurrency(totalWithTaxes())}
                </div>
            </div>
        </div>
    );
};

export default App;
