class TuitionPackagesApp {
    constructor() {
        this.calculator = new PackageCalculator();
        this.exporter = new ProposalExporter();
        this.currentProposal = null;
        
        this.initializeEventListeners();
        this.setDefaultDates();
    }

    initializeEventListeners() {
        // Package type selection
        document.querySelectorAll('.package-option input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.updateCostSummary();
                this.updateSubjectDaysLimit(e.target.value);
            });
        });

        // Subject management
        document.getElementById('addSubject').addEventListener('click', () => {
            this.addSubjectEntry();
        });

        // Form inputs
        document.getElementById('sessionDuration').addEventListener('change', () => {
            this.updateCostSummary();
        });

        // Generate proposal
        document.getElementById('generateProposal').addEventListener('click', () => {
            this.generateProposal();
        });

        // Export buttons
        document.getElementById('printProposal').addEventListener('click', () => {
            this.printProposal();
        });

        document.getElementById('exportPDF').addEventListener('click', () => {
            this.exportToPDF();
        });

        // Form reset
        document.querySelector('form').addEventListener('reset', () => {
            this.resetApplication();
        });
    }

    setDefaultDates() {
        const today = new Date();
        const nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + (1 + 7 - today.getDay()) % 7);
        
        document.getElementById('startDate').valueAsDate = nextMonday;
    }

    addSubjectEntry() {
        const container = document.getElementById('subjectsContainer');
        const subjectCount = container.children.length;
        
        if (subjectCount >= 6) {
            alert('Maximum of 6 subjects allowed per package');
            return;
        }

        const newEntry = document.createElement('div');
        newEntry.className = 'subject-entry';
        newEntry.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label>Subject</label>
                    <select class="subject-select">
                        <option value="">Select Subject</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="english">English</option>
                        <option value="kiswahili">Kiswahili</option>
                        <option value="science">Science</option>
                        <option value="chemistry">Chemistry</option>
                        <option value="biology">Biology</option>
                        <option value="physics">Physics</option>
                        <option value="history">History</option>
                        <option value="geography">Geography</option>
                        <option value="social_studies">Social Studies</option>
                        <option value="french">French</option>
                        <option value="ire">IRE</option>
                        <option value="home_science">Home Science</option>
                        <option value="agriculture">Agriculture</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Days per Week</label>
                    <select class="days-select">
                        <option value="3">3 days</option>
                        <option value="4">4 days</option>
                        <option value="5">5 days</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Action</label>
                    <button type="button" class="btn-remove-subject">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        container.appendChild(newEntry);

        // Add event listener to remove button
        const removeBtn = newEntry.querySelector('.btn-remove-subject');
        removeBtn.addEventListener('click', () => {
            if (container.children.length > 1) {
                container.removeChild(newEntry);
                this.updateCostSummary();
            }
        });

        // Add event listeners to new selects
        newEntry.querySelector('.subject-select').addEventListener('change', () => {
            this.updateCostSummary();
        });
        newEntry.querySelector('.days-select').addEventListener('change', () => {
            this.updateCostSummary();
        });

        // Enable remove button if this isn't the first entry
        if (container.children.length > 1) {
            container.querySelector('.btn-remove-subject').disabled = false;
        }
    }

    updateSubjectDaysLimit(packageType) {
        const maxDays = this.calculator.daysPerWeek[packageType];
        const daySelects = document.querySelectorAll('.days-select');
        
        daySelects.forEach(select => {
            Array.from(select.options).forEach(option => {
                const days = parseInt(option.value);
                option.disabled = days > maxDays;
                if (days > maxDays) {
                    option.textContent = `${days} days (Exceeds package limit)`;
                }
            });
            
            // Ensure current selection is valid
            if (parseInt(select.value) > maxDays) {
                select.value = maxDays.toString();
            }
        });
        
        this.updateCostSummary();
    }

    updateCostSummary() {
        const packageType = document.querySelector('input[name="packageType"]:checked')?.value;
        const sessionDuration = parseFloat(document.getElementById('sessionDuration').value);
        const subjects = this.getSelectedSubjects();

        if (!packageType || subjects.length === 0) {
            this.showCostSummaryPlaceholder();
            return;
        }

        const costSummary = this.calculator.calculatePackageCost(packageType, subjects, sessionDuration);
        this.renderCostSummary(costSummary, packageType);
    }

    getSelectedSubjects() {
        const subjects = [];
        const subjectEntries = document.querySelectorAll('.subject-entry');
        
        subjectEntries.forEach(entry => {
            const subjectSelect = entry.querySelector('.subject-select');
            const daysSelect = entry.querySelector('.days-select');
            
            if (subjectSelect.value) {
                subjects.push({
                    name: subjectSelect.options[subjectSelect.selectedIndex].text,
                    daysPerWeek: parseInt(daysSelect.value)
                });
            }
        });
        
        return subjects;
    }

    showCostSummaryPlaceholder() {
        const summaryElement = document.getElementById('costSummary');
        summaryElement.innerHTML = `
            <div class="summary-placeholder">
                <p>Select a package and subjects to see cost breakdown</p>
            </div>
        `;
    }

    renderCostSummary(costSummary, packageType) {
        const packageDetails = this.calculator.getPackageDetails(packageType);
        const summaryElement = document.getElementById('costSummary');
        
        let html = `
            <div class="summary-item">
                <span>Package:</span>
                <span>${packageDetails.name}</span>
            </div>
            <div class="summary-item">
                <span>Session Duration:</span>
                <span>${document.getElementById('sessionDuration').value} hours</span>
            </div>
            <div class="summary-item">
                <span>Subjects:</span>
                <span>${costSummary.perSubjectCost.length}</span>
            </div>
        `;

        // Per subject costs
        costSummary.perSubjectCost.forEach(subject => {
            html += `
                <div class="summary-item">
                    <span>${subject.name}:</span>
                    <span>${this.calculator.formatCurrency(subject.cost)}/week</span>
                </div>
            `;
        });

        // Totals
        html += `
            <div class="summary-item highlight">
                <span>Weekly Total:</span>
                <span>${this.calculator.formatCurrency(costSummary.weeklyCost)}</span>
            </div>
            <div class="summary-item">
                <span>Service Fee:</span>
                <span>${this.calculator.formatCurrency(costSummary.serviceFee)}</span>
            </div>
            <div class="summary-item summary-total">
                <span>First Week Total:</span>
                <span>${this.calculator.formatCurrency(costSummary.firstWeekCost)}</span>
            </div>
        `;

        summaryElement.innerHTML = html;
    }

    generateProposal() {
        // Validate form
        if (!this.validateForm()) {
            return;
        }

        // Collect form data
        const formData = this.collectFormData();
        
        // Calculate costs
        const costSummary = this.calculator.calculatePackageCost(
            formData.packageType,
            formData.subjects,
            formData.sessionDuration
        );

        // Create proposal object
        this.currentProposal = {
            ...formData,
            costSummary,
            packageDetails: this.calculator.getPackageDetails(formData.packageType),
            generatedDate: new Date().toLocaleDateString('en-GB')
        };

        // Render proposal
        this.renderProposal(this.currentProposal);
        
        // Enable export buttons
        document.getElementById('printProposal').disabled = false;
        document.getElementById('exportPDF').disabled = false;

        // Show success message
        this.showNotification('Proposal generated successfully!', 'success');
    }

    validateForm() {
        const requiredFields = [
            'studentName', 'gradeLevel', 'location', 'curriculum'
        ];

        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                this.showNotification(`Please fill in ${field.labels[0].textContent}`, 'error');
                field.focus();
                return false;
            }
        }

        const packageType = document.querySelector('input[name="packageType"]:checked');
        if (!packageType) {
            this.showNotification('Please select a package type', 'error');
            return false;
        }

        const subjects = this.getSelectedSubjects();
        if (subjects.length === 0) {
            this.showNotification('Please add at least one subject', 'error');
            return false;
        }

        return true;
    }

    collectFormData() {
        const packageType = document.querySelector('input[name="packageType"]:checked').value;
        const subjects = this.getSelectedSubjects();
        
        return {
            studentName: document.getElementById('studentName').value,
            gradeLevel: document.getElementById('gradeLevel').value,
            location: document.getElementById('location').value,
            curriculum: document.getElementById('curriculum').value,
            packageType: packageType,
            sessionDuration: parseFloat(document.getElementById('sessionDuration').value),
            subjects: subjects,
            startDate: document.getElementById('startDate').value,
            preferredDays: Array.from(document.getElementById('preferredDays').selectedOptions)
                .map(option => option.value),
            specialRequirements: document.getElementById('specialRequirements').value
        };
    }

    renderProposal(proposal) {
        const previewElement = document.getElementById('proposalPreview');
        
        previewElement.innerHTML = `
            <div class="proposal-content">
                ${this.renderProposalHeader(proposal)}
                ${this.renderStudentInfo(proposal)}
                ${this.renderPackageDetails(proposal)}
                ${this.renderCostSummaryTable(proposal)}
                ${this.renderPaymentTerms()}
                ${this.renderComplianceNotes()}
                ${this.renderConfirmationSections(proposal)}
            </div>
        `;
    }

    renderProposalHeader(proposal) {
        return `
            <div class="proposal-header">
                <h1>ELIMUHUB EDUCATION CONSULTANTS</h1>
                <p class="subtitle">Custom Tuition Package Proposal</p>
                <p>Generated on: ${proposal.generatedDate}</p>
            </div>
        `;
    }

    renderStudentInfo(proposal) {
        return `
            <div class="info-section">
                <div>
                    <p><strong>Student Name:</strong> ${proposal.studentName}</p>
                    <p><strong>Grade Level:</strong> ${proposal.gradeLevel}</p>
                    <p><strong>Curriculum:</strong> ${proposal.curriculum}</p>
                </div>
                <div>
                    <p><strong>Location:</strong> ${proposal.location}</p>
                    <p><strong>Start Date:</strong> ${proposal.startDate}</p>
                    <p><strong>Preferred Days:</strong> ${proposal.preferredDays.join(', ') || 'Flexible'}</p>
                </div>
            </div>
        `;
    }

    renderPackageDetails(proposal) {
        const packageInfo = proposal.packageDetails;
        
        let subjectsHtml = proposal.subjects.map(subject => `
            <tr>
                <td>${subject.name}</td>
                <td>${subject.daysPerWeek} days/week</td>
                <td class="amount">${this.calculator.formatCurrency(
                    this.calculator.calculateSubjectCost(
                        proposal.packageType,
                        proposal.sessionDuration,
                        subject.daysPerWeek
                    )
                )}</td>
            </tr>
        `).join('');

        return `
            <div class="form-section">
                <h3><i class="fas fa-box-open"></i> Package Details</h3>
                <div class="info-section">
                    <div>
                        <p><strong>Package Type:</strong> ${packageInfo.name}</p>
                        <p><strong>Days per Week:</strong> ${packageInfo.days}</p>
                        <p><strong>Rate:</strong> ${this.calculator.formatCurrency(packageInfo.rate)}/hour per subject</p>
                    </div>
                    <div>
                        <p><strong>Session Duration:</strong> ${proposal.sessionDuration} hours</p>
                        <p><strong>Total Subjects:</strong> ${proposal.subjects.length}</p>
                        <p><strong>Description:</strong> ${packageInfo.description}</p>
                    </div>
                </div>
                
                <h4>Subject Breakdown</h4>
                <table class="cost-summary-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Frequency</th>
                            <th class="amount">Weekly Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subjectsHtml}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderCostSummaryTable(proposal) {
        const cost = proposal.costSummary;
        
        return `
            <div class="form-section">
                <h3><i class="fas fa-calculator"></i> Cost Summary</h3>
                <table class="cost-summary-table">
                    <tbody>
                        <tr>
                            <td>Weekly Tuition Cost</td>
                            <td class="amount">${this.calculator.formatCurrency(cost.weeklyCost)}</td>
                        </tr>
                        <tr>
                            <td>Service & Confirmation Fee</td>
                            <td class="amount">${this.calculator.formatCurrency(cost.serviceFee)}</td>
                        </tr>
                        <tr class="highlight">
                            <td><strong>First Week Total (Due Upon Start)</strong></td>
                            <td class="amount"><strong>${this.calculator.formatCurrency(cost.firstWeekCost)}</strong></td>
                        </tr>
                        <tr>
                            <td>Subsequent Weekly Payments</td>
                            <td class="amount">${this.calculator.formatCurrency(cost.weeklyCost)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    renderPaymentTerms() {
        return `
            <div class="form-section">
                <h3><i class="fas fa-money-bill-wave"></i> Payment Terms</h3>
                <div class="notes-section">
                    <ul>
                        <li>Payment is made <strong>weekly every Friday</strong> through ElimuHub Education Consultants</li>
                        <li><strong>First payment</strong> (first week) is due <strong>upfront upon teachers reporting</strong></li>
                        <li><strong>KSh 1,000 service/confirmation fee</strong> included in first payment for quality assurance</li>
                        <li><strong>Payment Method:</strong> Airtel Money — 0731 838387 (James Kibiti)</li>
                        <li>Clients should <strong>not renegotiate rates</strong> directly with tutors</li>
                    </ul>
                </div>
            </div>
        `;
    }

    renderComplianceNotes() {
        return `
            <div class="form-section">
                <h3><i class="fas fa-clipboard-check"></i> Compliance Notes</h3>
                <div class="notes-section">
                    <ul>
                        <li>Payment is released only after client confirms satisfactory attendance & performance</li>
                        <li>All payments must be processed exclusively through ElimuHub</li>
                        <li>Any direct deals with clients lead to immediate termination and forfeiture of arrangements</li>
                        <li>Schedule adjustments require 24 hours notice</li>
                        <li>Package modifications can be requested through ElimuHub administration</li>
                    </ul>
                </div>
            </div>
        `;
    }

    renderConfirmationSections(proposal) {
        return `
            <div class="confirmation-section">
                <div class="prepared-by">
                    <h4>Prepared By:</h4>
                    <p>ElimuHub Education Consultants – Administration</p>
                    <div class="contact-info">
                        <p>📞 0731 838387</p>
                        <p>✉️ elimuhubconsultant@gmail.com</p>
                        <p>🌐 elimuhub.simdif.com</p>
                    </div>
                    <div class="signature-line">
                        <p>Signature: ____________________</p>
                        <p>Date: ${proposal.generatedDate}</p>
                    </div>
                </div>
                
                <div class="client-acknowledgment">
                    <h4>Client Acceptance:</h4>
                    <p>I confirm acceptance of this tuition package proposal and agree to the terms outlined above.</p>
                    <div class="signature-line">
                        <p>Client Signature: ____________________</p>
                        <p>Date: ____________________</p>
                    </div>
                </div>
            </div>
        `;
    }

    printProposal() {
        window.print();
    }

    async exportToPDF() {
        const proposalElement = document.getElementById('proposalPreview');
        await this.exporter.exportToPDF(
            proposalElement, 
            `elimuhub-proposal-${this.currentProposal.studentName}.pdf`
        );
    }

    resetApplication() {
        this.currentProposal = null;
        document.getElementById('proposalPreview').innerHTML = `
            <div class="preview-placeholder">
                <i class="fas fa-file-alt"></i>
                <h3>Proposal Preview</h3>
                <p>Configure your package and click "Generate Proposal" to see the preview here.</p>
            </div>
        `;
        
        document.getElementById('printProposal').disabled = true;
        document.getElementById('exportPDF').disabled = true;
        
        this.showCostSummaryPlaceholder();
        this.setDefaultDates();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TuitionPackagesApp();
});
