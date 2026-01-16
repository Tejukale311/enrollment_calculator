// enroll.js - Debugged and Hardened Course Enrollment Calculator

/**
 * Calculates the final enrollment fee after discount with validation and early bird check.
 * @param {number} price - Original price (must be > 0)
 * @param {number} discount - Discount percentage (0-100)
 * @param {number} currentSeat - Current seat count (default 11)
 * @returns {string|number} Final fee or error message
 */
function calculateFee(price, discount, currentSeat = 11) {
    try {
        // Input validation
        if (isNaN(price) || isNaN(discount) || isNaN(currentSeat)) {
            throw new Error("Price, discount, and seat count must be numbers");
        }
        if (price <= 0) {
            throw new Error("Price must be positive");
        }
        if (discount < 0 || discount > 100) {
            throw new Error("Discount must be between 0 and 100");
        }
        if (currentSeat < 0) {
            throw new Error("Seat count cannot be negative");
        }

        // Calculate discounted price
        const finalFee = price - (price * discount / 100);

        // Early bird bonus check
        let message = "";
        if (currentSeat <= 10) {
            message = "Eligible for Early Bird Bonus!";
        }

        // Return result: fee with optional message
        if (message) {
            return finalFee + "\n" + message;
        }
        return finalFee;

    } catch (error) {
        return "Error: " + error.message;
    }
}

/**
 * Runs comprehensive test suite and logs results.
 */
function runTests() {
    const tests = [
        { input: [100, 20], expected: 80, desc: "Valid price and discount" },
        { input: [500, 10, 5], expected: "450\nEligible for Early Bird Bonus!", desc: "Early bird enrollment" },
        { input: [-50, 10], expected: "Error: Price must be positive", desc: "Negative price" },
        { input: [100, 150], expected: "Error: Discount must be between 0 and 100", desc: "Invalid discount range" },
        { input: ["free", 10], expected: "Error: Price, discount, and seat count must be numbers", desc: "Non-numeric price" },
        { input: [200, 0, 11], expected: 200, desc: "Zero discount, no early bird" }
    ];

    tests.forEach((test, index) => {
        const result = calculateFee(...test.input);
        const got = typeof result === "string" ? result : Math.round(result * 100) / 100; // Round for floating point
        const expectedStr = typeof test.expected === "string" ? test.expected : Math.round(test.expected * 100) / 100;
        const pass = got === expectedStr;
        console.log(`Test ${index + 1}: ${pass ? 'PASS' : 'FAIL'} | Expected: ${expectedStr} | Got: ${got}`);
    });
}

// Auto-run tests when script loads
runTests();
