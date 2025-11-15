# 📚 ElimuHub Tuition Packages Documentation

## Overview
This documentation covers the tuition package structure, pricing, and configuration options available in the ElimuHub Tuition Packages Generator.

## Package Types

### Comprehensive Package (5 Days/Week)
- **Rate**: KSh 600 per hour per subject
- **Ideal for**: Intensive curriculum coverage & exam preparation
- **Features**: Maximum consistency, balanced subject rotation

### Standard Package (4 Days/Week)
- **Rate**: KSh 700 per hour per subject  
- **Ideal for**: Balanced learning with flexibility
- **Features**: Optimal cost-value balance

### Compact Package (3 Days/Week)
- **Rate**: KSh 800 per hour per subject
- **Ideal for**: Focused subject support
- **Features**: Budget-friendly option

## Subject Combinations

### Core Academic Streams
- **STEM**: Mathematics, Physics, Chemistry, Biology, Computer Science
- **Languages**: English, Kiswahili, French, German, Arabic
- **Humanities**: History, Geography, Social Studies, IRE, CRE
- **Creative**: Art, Music, Home Science, Agriculture, Business

### Combination Rules
1. Minimum 1 subject per package
2. Maximum 6 subjects per package
3. Flexible days allocation per subject
4. Tutor specialization matching based on subject combinations

## Pricing Calculation

### Formula
```javascript
weeklyCost = sum(subject.daysPerWeek * sessionDuration * hourlyRate)
firstWeekCost = weeklyCost + serviceFee(1000)
```

Example Calculation

Standard Package (4 days) - 2 Subjects

· Mathematics: 4 days × 1.5 hours × KSh 700 = KSh 4,200
· Chemistry: 3 days × 1.5 hours × KSh 700 = KSh 3,150
· Weekly Total: KSh 7,350
· First Week: KSh 8,350 (including service fee)

Payment Structure

Terms

· Weekly billing every Friday
· First payment due upon teacher deployment
· Service fee: KSh 1,000 (one-time, included in first payment)
· Payment methods: Airtel Money, M-Pesa, Bank Transfer

Billing Cycle

1. Week 1: Weekly cost + service fee
2. Week 2+: Weekly cost only
3. Payment Day: Every Friday
4. Method: Airtel Money (0731 838387)

Curriculum Support

CBC (Competency Based Curriculum)

· All grades (1-12)
· All learning areas
· Assessment preparation
· Project-based learning support

8-4-4 System

· Primary (Class 1-8)
· Secondary (Form 1-4)
· KCPE/KCSE preparation
· Practical subjects support

International Curricula

· IGCSE (Years 7-13)
· A-Levels
· IB Diploma
· American Curriculum

Technical Implementation

File Structure

```
js/
├── app.js          # Main application controller
├── calculator.js   # Package calculations and validation
└── exporter.js     # PDF generation and printing
```

Key Classes

· PackageCalculator: Handles all cost calculations
· ProposalExporter: Manages PDF and print functionality
· TuitionPackagesApp: Main application controller

Data Flow

1. User selects package and configures subjects
2. Calculator validates and computes costs
3. Real-time summary updates
4. Proposal generation with professional formatting
5. Export options (Print/PDF)

Customization Guide

Adding New Subjects

1. Update subject list in index.html
2. Add to validation in app.js
3. Update rate calculations if needed

Modifying Rates

1. Update rates object in calculator.js
2. Update package descriptions in UI
3. Test calculations across all packages

Adding New Curricula

1. Add to curriculum dropdown in HTML
2. Update validation logic
3. Add any curriculum-specific pricing

Support & Maintenance

Regular Updates

· Review and update rates quarterly
· Monitor curriculum changes
· Update subject combinations based on demand

Quality Assurance

· Test calculations across different scenarios
· Verify print/PDF output quality
· Ensure mobile responsiveness

Client Support

· Provide clear documentation
· Offer training on system usage
· Gather feedback for improvements

```

## 🚀 Deployment Instructions

1. **Clone or download** all files into a single directory
2. **Ensure file structure** matches exactly as shown above
3. **Open `index.html`** in a web browser to start using the application
4. **For web deployment**, upload all files to your web server
5. **For GitHub Pages**, push to a repository and enable GitHub Pages in settings

The application is completely self-contained and requires no server-side processing. All calculations happen in the browser using vanilla JavaScript.

## 🎯 Key Features Implemented

✅ **Interactive Package Configuration**  
✅ **Real-time Cost Calculations**  
✅ **Professional Proposal Generation**  
✅ **Print & PDF Export**  
✅ **Mobile-Responsive Design**  
✅ **Form Validation**  
✅ **Subject Combination Management**  
✅ **Payment Terms Integration**  
✅ **Brand-Compliant Styling**  

# The application is now ready for production use by ElimuHub Education Consultants!
