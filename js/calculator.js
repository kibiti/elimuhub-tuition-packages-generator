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
        this.currentCalculation = null;
    }

    // Calculate cost for a single subject
    calculateSubjectCost(packageType, sessionDuration, subjectDays) {
        const hourlyRate = this.rates[packageType];
        const dailyCost = hourlyRate * sessionDuration;
        const weeklyCost = dailyCost * subjectDays;
        
        return {
            daily: dailyCost,
            weekly: weeklyCost,
            hourly: hourlyRate
        };
    }

    // Calculate complete package costs
    calculatePackageCost(packageType, subjects, sessionDuration) {
        let totalDailyCost = 0;
        let totalWeeklyCost = 0;
        const subjectBreakdown = [];
        
        // Calculate costs for each subject
        subjects.forEach(subject => {
            const subjectCost = this.calculateSubjectCost(
                packageType, 
                sessionDuration, 
                subject.daysPerWeek
            );
            
            totalDailyCost += subjectCost.daily;
            totalWeeklyCost += subjectCost.weekly;
            
            subjectBreakdown.push({
                name: subject.name,
                daysPerWeek: subject.daysPerWeek,
                ...subjectCost
            });
        });

        const firstWeekCost = totalWeeklyCost + this.serviceFee;
        const packageDays = this.daysPerWeek[packageType];

        this.currentCalculation = {
            packageType,
            sessionDuration,
            totalDailyCost,
            totalWeeklyCost,
            firstWeekCost,
            serviceFee: this.serviceFee,
            packageDays,
            subjectBreakdown,
            perHourRate: this.rates[packageType]
        };

        return this.currentCalculation;
    }

    // Calculate per-day breakdown
    getDailyBreakdown(subjects, packageType) {
        const packageDays = this.daysPerWeek[packageType];
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        
        const breakdown = {};
        days.slice(0, packageDays).forEach(day => {
            breakdown[day] = {
                subjects: [],
                dailyTotal: 0
            };
        });

        // Distribute subjects across days (simplified - in real app would use actual schedule)
        subjects.forEach((subject, index) => {
            const subjectDays = Math.min(subject.daysPerWeek, packageDays);
            const dailyCost = this.rates[packageType] * this.currentCalculation.sessionDuration;
            
            for (let i = 0; i < subjectDays; i++) {
                const dayIndex = (index + i) % packageDays;
                const day = days[dayIndex];
                
                breakdown[day].subjects.push({
                    name: subject.name,
                    cost: dailyCost
                });
                breakdown[day].dailyTotal += dailyCost;
            }
        });

        return breakdown;
    }

    // Validate package configuration
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

    // Format currency for display
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Get package details
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

    // Get calculation summary for display
    getCalculationSummary() {
        if (!this.currentCalculation) return null;
        
        return {
            perDay: this.currentCalculation.totalDailyCost,
            perWeek: this.currentCalculation.totalWeeklyCost,
            firstWeek: this.currentCalculation.firstWeekCost,
            hourlyRate: this.currentCalculation.perHourRate,
            serviceFee: this.serviceFee
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PackageCalculator;
}