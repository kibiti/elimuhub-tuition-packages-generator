class ProposalExporter {
    constructor() {
        this.pdfjsLib = window.pdfjsLib;
    }

    async exportToPDF(proposalElement, filename = 'elimuhub-proposal.pdf') {
        try {
            // Create a clone of the proposal for printing
            const printElement = proposalElement.cloneNode(true);
            
            // Add print-specific styles
            this.prepareForPrint(printElement);
            
            // Create a new window for printing
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>ElimuHub Tuition Proposal</title>
                    <style>
                        ${this.getPrintStyles()}
                    </style>
                </head>
                <body>
                    ${printElement.outerHTML}
                </body>
                </html>
            `);
            
            printWindow.document.close();
            
            // Wait for content to load
            printWindow.onload = () => {
                printWindow.print();
                // Close window after printing
                setTimeout(() => {
                    printWindow.close();
                }, 500);
            };
            
        } catch (error) {
            console.error('PDF export error:', error);
            this.fallbackPrint(proposalElement);
        }
    }

    prepareForPrint(element) {
        // Remove interactive elements
        const buttons = element.querySelectorAll('button, input, select, textarea');
        buttons.forEach(btn => btn.remove());
        
        // Add print-specific classes
        element.classList.add('print-version');
        
        // Ensure proper page breaks
        const sections = element.querySelectorAll('.form-section, table');
        sections.forEach((section, index) => {
            if (index > 0 && index % 3 === 0) {
                section.classList.add('page-break-before');
            }
        });
    }

    getPrintStyles() {
        return `
            @media print {
                @page {
                    margin: 0.5in;
                    size: letter;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 12pt;
                    line-height: 1.4;
                    color: #000;
                    background: white;
                }
                
                .print-version {
                    max-width: 100%;
                    margin: 0;
                    padding: 0;
                }
                
                .page-break-before {
                    page-break-before: always;
                }
                
                table {
                    page-break-inside: avoid;
                }
                
                h1, h2, h3 {
                    page-break-after: avoid;
                }
            }
            
            @media screen {
                body {
                    padding: 20px;
                    background: #f5f5f5;
                }
                
                .print-version {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
            }
        `;
    }

    fallbackPrint(element) {
        const printContent = element.innerHTML;
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        
        // Reload the page to restore functionality
        window.location.reload();
    }

    exportToText(proposalData) {
        const lines = [];
        
        lines.push('ELIMUHUB EDUCATION CONSULTANTS');
        lines.push('TUITION PROPOSAL');
        lines.push('='.repeat(50));
        lines.push('');
        
        // Student Information
        lines.push('STUDENT INFORMATION:');
        lines.push(`Name: ${proposalData.studentName}`);
        lines.push(`Grade: ${proposalData.gradeLevel}`);
        lines.push(`Location: ${proposalData.location}`);
        lines.push(`Curriculum: ${proposalData.curriculum}`);
        lines.push('');
        
        // Package Details
        lines.push('PACKAGE DETAILS:');
        lines.push(`Package: ${proposalData.packageDetails.name}`);
        lines.push(`Session Duration: ${proposalData.sessionDuration} hours`);
        lines.push('');
        
        // Subjects
        lines.push('SUBJECTS:');
        proposalData.subjects.forEach(subject => {
            lines.push(`- ${subject.name} (${subject.daysPerWeek} days/week)`);
        });
        lines.push('');
        
        // Cost Summary
        lines.push('COST SUMMARY:');
        lines.push(`Weekly Cost: ${proposalData.costSummary.weeklyCost}`);
        lines.push(`First Week Total: ${proposalData.costSummary.firstWeekCost}`);
        lines.push(`Service Fee: ${proposalData.costSummary.serviceFee}`);
        lines.push('');
        
        // Payment Terms
        lines.push('PAYMENT TERMS:');
        lines.push('- Weekly payments every Friday');
        lines.push('- First payment due upon teacher deployment');
        lines.push('- Service fee: KSh 1,000 (one-time)');
        lines.push('- Payment: Airtel Money (0731 838387)');
        
        return lines.join('\n');
    }
}
