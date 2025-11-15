class PackageCalculator {
    constructor() {
        this.rates = {
            comprehensive: 600,
            standard: 700,
            compact: 800
        };
        
        this.daysPerWeek = {
            comprehensive: 5,
            standard: 4,
            compact: 3
        };
        
        this.serviceFee = 1000;
    }

    calculateSubjectCost(packageType, sessionDuration, daysPerWeek) {
        const hourlyRate = this.rates[packageType];
        return hourlyRate * sessionDuration * daysPerWeek;
    }

    calculatePackageCost(packageType, subjects, sessionDuration) {
        const weeklyCost = subjects.reduce((total, subject) => {
            return total + this.calculateSubjectCost(
                packageType, 
                sessionDuration, 
                subject.daysPerWeek
            );
        }, 0);

        const firstWeekCost = weeklyCost + this.serviceFee;

        return {
            weeklyCost,
            firstWeekCost,
            serviceFee: this.serviceFee,
            perSubjectCost: subjects.map(subject => ({
                name: subject.name,
                cost: this.calculateSubjectCost(packageType, sessionDuration, subject.daysPerWeek)
            }))
        };
    }

    validatePackage(subjects, packageType) {
        const errors = [];

        if (!subjects || subjects.length === 0) {
            errors.push('At least one subject is required');
        }

        if (!packageType) {
            errors.push('Package type is required');
        }

        // Check if subject days exceed package days
        subjects.forEach(subject => {
            if (subject.daysPerWeek > this.daysPerWeek[packageType]) {
                errors.push(
                    `${subject.name}: Days per week (${subject.daysPerWeek}) ` +
                    `exceeds package maximum (${this.daysPerWeek[packageType]})`
                );
            }
        });

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    getPackageDetails(packageType) {
        const packages = {
            comprehensive: {
                name: 'Comprehensive',
                days: 5,
                rate: 600,
                description: 'Ideal for intensive curriculum coverage & exam preparation'
            },
            standard: {
                name: 'Standard',
                days: 4,
                rate: 700,
                description: 'Ideal for balanced learning with flexibility'
            },
            compact: {
                name: 'Compact',
                days: 3,
                rate: 800,
                description: 'Ideal for focused subject support'
            }
        };

        return packages[packageType];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PackageCalculator;
}
