# 📚 ElimuHub Tuition Packages Generator

<div align="center">

![ElimuHub Logo](https://img.shields.io/badge/ElimuHub-Education%20Consultants-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

**Professional tuition package generator for ElimuHub Education Consultants**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Packages](#-package-options) • [Contributing](#-contributing)

</div>

---

## 🚀 Overview

The ElimuHub Tuition Packages Generator is a professional web application designed to streamline the creation of customized tuition packages for clients. Built with modern web technologies, it provides an intuitive interface for generating comprehensive tuition proposals with automatic calculations and professional formatting.

### 🎯 Key Features

- **📊 Interactive Package Calculator** - Real-time cost calculations for different package options
- **🎨 Professional Templates** - Clean, brand-consistent proposal designs
- **⚡ Automatic Calculations** - Instant pricing based on subjects, days, and package type
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🖨️ Print-Ready Output** - Optimized for printing and PDF export
- **🔧 Customizable Packages** - Flexible subject combinations and scheduling options

---

## 🛠️ Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML/CSS/JavaScript (for customization)

### Quick Start
1. Clone the repository:
```bash
git clone [https://github.com/elimuhub/tuition-packages-generator.git](https://github.com/kibiti/elimuhub-tuition-packages-generator.git)
```

1. Navigate to the project directory:

```bash
cd tuition-packages-generator
```

1. Open index.html in your web browser or deploy to your web server.

For GitHub Pages Deployment

1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. Access your application at https://github.com/kibiti/elimuhub-tuition-packages-generator.git

---

📖 Usage

Basic Workflow

1. Select Package Type - Choose between Comprehensive (5 days), Standard (4 days), or Compact (3 days)
2. Configure Subjects - Add subjects and select weekly frequency
3. Set Schedule - Define preferred days and session duration
4. Generate Proposal - Automatically create professional tuition package
5. Export/Print - Save as PDF or print for client presentation

Package Configuration Example

```javascript
// Example package configuration
const packageConfig = {
  type: 'standard', // comprehensive | standard | compact
  subjects: [
    { name: 'Mathematics', daysPerWeek: 4 },
    { name: 'Chemistry', daysPerWeek: 3 },
    { name: 'Biology', daysPerWeek: 3 }
  ],
  sessionDuration: 1.5, // hours
  startDate: '2025-03-01'
};
```

---

📦 Package Options

Pricing Structure

Package Days/Week Rate/Hour Best For
Comprehensive 5 days KSh 600 Intensive preparation
Standard 4 days KSh 700 Balanced learning
Compact 3 days KSh 800 Focused support

Calculation Formula

```javascript
// Weekly cost calculation
function calculateWeeklyCost(packageType, subjects, sessionDuration) {
  const rates = { comprehensive: 600, standard: 700, compact: 800 };
  const dailyRate = subjects.length * rates[packageType] * sessionDuration;
  const daysPerWeek = { comprehensive: 5, standard: 4, compact: 3 };
  return dailyRate * daysPerWeek[packageType];
}
```

---

🎓 Subject Combinations

Available Combinations

· STEM Focus: Mathematics, Physics, Chemistry, Biology
· Languages: English, Kiswahili, French, Literature
· Humanities: History, Geography, Social Studies, IRE
· Creative Arts: Art, Music, Home Science
· Custom Combinations: Mix and match as needed

Combination Rules

· Minimum 1 subject per package
· Maximum 4 subjects for optimal learning
· Flexible days allocation per subject
· Tutor specialization matching

---

💰 Payment Terms

Payment Structure

· Weekly billing every Friday
· First payment due upon teacher deployment
· Service fee: KSh 1,000 (one-time, included in first payment)
· Payment methods: Airtel Money, M-Pesa, Bank Transfer

Billing Example

```javascript
// Example billing calculation
const firstWeekPayment = weeklyCost + 1000; // Includes service fee
const subsequentWeeks = weeklyCost;
```

---

🔧 Technical Details

File Structure

```
tuition-packages-generator/
├── index.html              # Main application
├── css/
│   ├── style.css           # Main stylesheet
│   └── print.css           # Print optimization
├── js/
│   ├── app.js              # Main application logic
│   ├── calculator.js       # Package calculations
│   └── exporter.js         # PDF/Print functionality
├── docs/
│   └── packages.md         # Documentation
└── assets/
    └── images/             # Brand assets
```

Browser Support

· Chrome 90+
· Firefox 88+
· Safari 14+
· Edge 90+

---

🤝 Contributing

We welcome contributions from the community! Here's how you can help:

Reporting Issues

· Use GitHub Issues to report bugs or suggest features
· Include detailed descriptions and steps to reproduce

Development Workflow

1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit changes: git commit -m 'Add amazing feature'
4. Push to branch: git push origin feature/amazing-feature
5. Open a Pull Request

Code Standards

· Follow existing code style and formatting
· Include comments for complex logic
· Update documentation for new features
· Test across multiple browsers

---

📞 Support & Contact

Technical Support

· Documentation: GitHub Wiki
· Issues: GitHub Issues
· Email: elimuhubconsultant@gmail.com

ElimuHub Contacts

· Phone: 0731 838387
· Email: elimuhubconsultant@gmail.com
· Website: elimuhub.simdif.com

---
