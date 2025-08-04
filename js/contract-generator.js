/**
 * CodeWithTy Contract Generator
 * Professional contract template generator for tech services
 *
 * @version 2.0.0
 * @author CodeWithTy Team
 * @license MIT
 */

class ContractGenerator {
  constructor() {
    this.currentContractType = "development";
    this.contractTemplates = {
      development: {
        title: "SOFTWARE DEVELOPMENT AGREEMENT",
        scope:
          "The Contractor agrees to develop, design, and deliver software solutions including but not limited to web applications, mobile applications, APIs, and related technical documentation as specified in the project requirements.",
        deliverables:
          "Complete source code, documentation, deployment guides, and testing reports. All code will be delivered via version control systems with proper documentation and comments.",
      },
      design: {
        title: "UI/UX DESIGN SERVICES AGREEMENT",
        scope:
          "The Contractor agrees to provide user interface and user experience design services including wireframes, mockups, prototypes, design systems, and visual assets as specified in the project requirements.",
        deliverables:
          "Design files in industry-standard formats (Figma, Sketch, Adobe XD), style guides, component libraries, and design documentation. All assets will be provided in high-resolution formats suitable for development.",
      },
      consulting: {
        title: "TECHNOLOGY CONSULTING AGREEMENT",
        scope:
          "The Contractor agrees to provide expert technology consulting services including strategy development, technical audits, architecture planning, and advisory services as specified in the project requirements.",
        deliverables:
          "Comprehensive reports, strategic recommendations, technical documentation, implementation roadmaps, and consultation sessions as outlined in the project scope.",
      },
      product: {
        title: "PRODUCT MANAGEMENT SERVICES AGREEMENT",
        scope:
          "The Contractor agrees to provide product management services including market research, product strategy, roadmap development, user story creation, and project coordination as specified in the project requirements.",
        deliverables:
          "Product roadmaps, user stories, market analysis reports, competitive analysis, product specifications, and regular progress reports.",
      },
      custom: {
        title: "CUSTOM SERVICES AGREEMENT",
        scope:
          "The Contractor agrees to provide specialized services as defined by the custom service type and scope outlined in this agreement.",
        deliverables:
          "Deliverables as specified in the custom deliverables section of this agreement.",
      },
    };

    this.init();
  }

  /**
   * Initialize the contract generator
   */
  init() {
    this.setupEventListeners();
    this.updatePreview();
    this.addSmoothScrolling();
  }

  /**
   * Set up all event listeners
   */
  setupEventListeners() {
    // Contract type selection
    document.querySelectorAll(".contract-type").forEach((type) => {
      type.addEventListener("click", (e) => this.handleContractTypeChange(e));
    });

    // Form inputs
    const inputIds = [
      "freelancerName",
      "clientName",
      "projectDescription",
      "projectValue",
      "timeline",
      "reviewPeriod",
      "paymentTerms",
      "revisions",
      "governingLaw",
      "customContractTitle",
      "customServiceType",
      "customScope",
      "customDeliverables",
    ];

    inputIds.forEach((inputId) => {
      const element = document.getElementById(inputId);
      if (element) {
        element.addEventListener("input", () => this.updatePreview());
        element.addEventListener("change", () => this.updatePreview());
      }
    });

    // Add input animations
    this.addInputAnimations();
  }

  /**
   * Handle contract type selection
   * @param {Event} e - Click event
   */
  handleContractTypeChange(e) {
    const clickedType = e.currentTarget;

    // Update active state
    document.querySelectorAll(".contract-type").forEach((type) => {
      type.classList.remove(
        "active",
        "border-blue-200",
        "bg-gradient-to-br",
        "from-blue-50",
        "to-indigo-50"
      );
      type.classList.add("border-gray-200");
    });

    clickedType.classList.add(
      "active",
      "border-blue-200",
      "bg-gradient-to-br",
      "from-blue-50",
      "to-indigo-50"
    );
    clickedType.classList.remove("border-gray-200");

    this.currentContractType = clickedType.dataset.type;

    // Show/hide custom fields with animation
    const customFields = document.getElementById("customContractFields");
    if (this.currentContractType === "custom") {
      customFields.classList.remove("hidden");
      customFields.classList.add("animate-fade-in");
    } else {
      customFields.classList.add("hidden");
      customFields.classList.remove("animate-fade-in");
    }

    this.updatePreview();
  }

  /**
   * Update the contract preview
   */
  updatePreview() {
    let template = this.contractTemplates[this.currentContractType];

    // Handle custom contract type
    if (this.currentContractType === "custom") {
      const customTitle = this.getInputValue("customContractTitle");
      const customScope = this.getInputValue("customScope");
      const customDeliverables = this.getInputValue("customDeliverables");
      const customServiceType = this.getInputValue("customServiceType");

      template = {
        title: customTitle || "CUSTOM SERVICES AGREEMENT",
        scope:
          customScope ||
          `The Contractor agrees to provide ${
            customServiceType || "specialized"
          } services as defined in this agreement and project requirements.`,
        deliverables:
          customDeliverables ||
          "Deliverables as specified in the project requirements and agreed upon during project planning.",
      };
    }

    const contractData = this.getContractData();
    const contractHTML = this.generateContractHTML(template, contractData);

    document.getElementById("contractPreview").innerHTML = contractHTML;
  }

  /**
   * Get contract data from form inputs
   * @returns {Object} Contract data object
   */
  getContractData() {
    return {
      freelancerName:
        this.getInputValue("freelancerName") || "[Your Name/Company]",
      clientName: this.getInputValue("clientName") || "[Client Name/Company]",
      projectDescription:
        this.getInputValue("projectDescription") || "[Project Description]",
      projectValue: this.getInputValue("projectValue") || "[Project Value]",
      timeline: this.getInputValue("timeline") || "[Timeline]",
      reviewPeriod: this.getInputValue("reviewPeriod"),
      paymentTerms: this.getInputValue("paymentTerms"),
      revisions: this.getInputValue("revisions"),
      governingLaw:
        this.getInputValue("governingLaw") || "[Your State/Country]",
    };
  }

  /**
   * Get input value safely
   * @param {string} id - Input element ID
   * @returns {string} Input value
   */
  getInputValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : "";
  }

  /**
   * Generate contract HTML
   * @param {Object} template - Contract template
   * @param {Object} data - Contract data
   * @returns {string} Generated HTML
   */
  generateContractHTML(template, data) {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return `
            <div class="contract-document bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 class="text-2xl font-bold text-center text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
                    ${template.title}
                </h1>
                
                <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p class="font-semibold text-gray-700 mb-2">Contract Details:</p>
                    <p class="text-sm text-gray-600"><strong>Date:</strong> ${currentDate}</p>
                    <p class="text-sm text-gray-600"><strong>Between:</strong> ${
                      data.freelancerName
                    } (Contractor) and ${data.clientName} (Client)</p>
                </div>
                
                <div class="space-y-6">
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">1. PROJECT SCOPE</h2>
                        <p class="text-gray-700 mb-3">${template.scope}</p>
                        <p class="text-gray-700"><strong>Specific Project:</strong> ${
                          data.projectDescription
                        }</p>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">2. DELIVERABLES</h2>
                        <p class="text-gray-700">${template.deliverables}</p>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">3. TIMELINE AND MILESTONES</h2>
                        <p class="text-gray-700">The project is expected to be completed within <strong>${
                          data.timeline
                        } weeks</strong> from the contract start date. Specific milestones and deadlines will be communicated and agreed upon during the project kickoff.</p>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">4. COMPENSATION</h2>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <p class="text-gray-700 mb-2">Total project value: <strong class="text-blue-600">$${
                              data.projectValue
                            }</strong></p>
                            <p class="text-gray-700 mb-2">Payment terms: <strong>${this.getPaymentTermsText(
                              data.paymentTerms
                            )}</strong></p>
                            <p class="text-sm text-gray-600">Late payments may incur a 2% monthly service charge.</p>
                        </div>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">5. REVISIONS AND FEEDBACK</h2>
                        <p class="text-gray-700 mb-2">This contract includes <strong>${this.getRevisionsText(
                          data.revisions
                        )}</strong>. Additional revisions beyond the included amount will be charged at an hourly rate of $75/hour.</p>
                        <p class="text-gray-700">The Client has <strong>${
                          data.reviewPeriod
                        } days</strong> to review deliverables and provide feedback. Failure to provide feedback within this period will be considered acceptance of the deliverable.</p>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">6. INTELLECTUAL PROPERTY</h2>
                        <p class="text-gray-700">Upon full payment, all rights, title, and interest in the work product shall transfer to the Client. The Contractor retains the right to showcase the work in their portfolio and use general methodologies developed during the project.</p>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">7. CONFIDENTIALITY</h2>
                        <p class="text-gray-700">Both parties agree to maintain confidentiality of proprietary information shared during the course of this project. This obligation shall survive the termination of this agreement.</p>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">8. TERMINATION</h2>
                        <p class="text-gray-700">Either party may terminate this agreement with 7 days written notice. Upon termination, the Client shall pay for all work completed up to the termination date.</p>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">9. LIABILITY AND WARRANTIES</h2>
                        <p class="text-gray-700">The Contractor's liability shall not exceed the total contract value. The work is provided "as is" with no warranties beyond those explicitly stated in this agreement.</p>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">10. COMMUNICATION AND PROJECT MANAGEMENT</h2>
                        <p class="text-gray-700">Regular progress updates will be provided weekly via email or agreed-upon project management tools. Response time for communications will be within 24 hours during business days.</p>
                    </section>
                    
                    <section>
                        <h2 class="text-lg font-bold text-gray-800 mb-3">11. GOVERNING LAW</h2>
                        <p class="text-gray-700">This agreement shall be governed by the laws of <strong>${
                          data.governingLaw
                        }</strong>. Any disputes shall be resolved through binding arbitration.</p>
                    </section>
                    
                    <div class="signature-section mt-12 pt-8 border-t-2 border-gray-200">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="text-center">
                                <div class="border-b-2 border-gray-400 mb-2 h-12"></div>
                                <p class="font-semibold text-gray-800">${
                                  data.freelancerName
                                }</p>
                                <p class="text-sm text-gray-600">Contractor</p>
                                <p class="text-sm text-gray-600 mt-2">Date: _____________</p>
                            </div>
                            <div class="text-center">
                                <div class="border-b-2 border-gray-400 mb-2 h-12"></div>
                                <p class="font-semibold text-gray-800">${
                                  data.clientName
                                }</p>
                                <p class="text-sm text-gray-600">Client</p>
                                <p class="text-sm text-gray-600 mt-2">Date: _____________</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  /**
   * Get payment terms display text
   * @param {string} terms - Payment terms value
   * @returns {string} Display text
   */
  getPaymentTermsText(terms) {
    const termMap = {
      "50-50": "50% upfront, 50% upon completion",
      "30-70": "30% upfront, 70% upon completion",
      milestone: "Milestone-based payments as agreed",
      net30: "Net 30 days from invoice date",
    };
    return termMap[terms] || terms;
  }

  /**
   * Get revisions display text
   * @param {string} revisions - Revisions value
   * @returns {string} Display text
   */
  getRevisionsText(revisions) {
    return revisions === "unlimited"
      ? "unlimited revisions"
      : `${revisions} rounds of revisions`;
  }

  /**
   * Add input animations and enhancements
   */
  addInputAnimations() {
    const inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        e.target.classList.add("transform", "scale-105", "shadow-lg");
      });

      input.addEventListener("blur", (e) => {
        e.target.classList.remove("transform", "scale-105", "shadow-lg");
      });
    });
  }

  /**
   * Add smooth scrolling behavior
   */
  addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = "smooth";
  }

  /**
   * Show/hide loading state
   * @param {boolean} show - Whether to show loading
   */
  showLoading(show) {
    const loading = document.getElementById("loading");
    if (show) {
      loading.classList.remove("hidden");
      loading.classList.add("flex");
    } else {
      loading.classList.add("hidden");
      loading.classList.remove("flex");
    }
  }

  /**
   * Download contract as PDF
   */
  async downloadPDF() {
    this.showLoading(true);

    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");

      const contractElement = document.getElementById("contractPreview");
      const canvas = await html2canvas(contractElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${this.currentContractType}_contract_${Date.now()}.pdf`;
      pdf.save(fileName);

      this.showSuccessMessage("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      this.showErrorMessage("Error generating PDF. Please try again.");
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Download contract as DOCX
   */
  async downloadDOCX() {
    this.showLoading(true);

    try {
      const template = this.contractTemplates[this.currentContractType];
      const data = this.getContractData();
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Create DOCX content as HTML that can be converted
      const docContent = this.generateDOCXContent(template, data, currentDate);

      // Create a simple DOCX-like structure
      const docxContent = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <title>Contract</title>
                    <style>
                        body { font-family: 'Times New Roman', serif; line-height: 1.6; margin: 40px; }
                        h1 { text-align: center; font-size: 18pt; font-weight: bold; margin-bottom: 20pt; }
                        h2 { font-size: 14pt; font-weight: bold; margin-top: 16pt; margin-bottom: 8pt; }
                        p { font-size: 12pt; margin-bottom: 8pt; text-align: justify; }
                        .contract-header { background-color: #f0f0f0; padding: 12pt; margin-bottom: 16pt; }
                        .signature-section { margin-top: 40pt; }
                        .signature-block { display: inline-block; width: 45%; text-align: center; margin: 0 2.5%; }
                        .signature-line { border-bottom: 1px solid black; height: 40pt; margin-bottom: 8pt; }
                        strong { font-weight: bold; }
                    </style>
                </head>
                <body>${docContent}</body>
                </html>
            `;

      // Create blob and download
      const blob = new Blob([docxContent], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const fileName = `${
        this.currentContractType
      }_contract_${Date.now()}.docx`;
      saveAs(blob, fileName);

      this.showSuccessMessage("DOCX downloaded successfully!");
    } catch (error) {
      console.error("Error generating DOCX:", error);
      this.showErrorMessage("Error generating DOCX. Please try again.");
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Generate DOCX content
   * @param {Object} template - Contract template
   * @param {Object} data - Contract data
   * @param {string} currentDate - Current date
   * @returns {string} DOCX content
   */
  generateDOCXContent(template, data, currentDate) {
    return `
            <h1>${template.title}</h1>
            
            <div class="contract-header">
                <p><strong>Date:</strong> ${currentDate}</p>
                <p><strong>Between:</strong> ${
                  data.freelancerName
                } (Contractor) and ${data.clientName} (Client)</p>
            </div>
            
            <h2>1. PROJECT SCOPE</h2>
            <p>${template.scope}</p>
            <p><strong>Specific Project:</strong> ${data.projectDescription}</p>
            
            <h2>2. DELIVERABLES</h2>
            <p>${template.deliverables}</p>
            
            <h2>3. TIMELINE AND MILESTONES</h2>
            <p>The project is expected to be completed within <strong>${
              data.timeline
            } weeks</strong> from the contract start date. Specific milestones and deadlines will be communicated and agreed upon during the project kickoff.</p>
            
            <h2>4. COMPENSATION</h2>
            <p>Total project value: <strong>${data.projectValue}</strong></p>
            <p>Payment terms: <strong>${this.getPaymentTermsText(
              data.paymentTerms
            )}</strong></p>
            <p>Late payments may incur a 2% monthly service charge.</p>
            
            <h2>5. REVISIONS AND FEEDBACK</h2>
            <p>This contract includes <strong>${this.getRevisionsText(
              data.revisions
            )}</strong>. Additional revisions beyond the included amount will be charged at an hourly rate of $75/hour.</p>
            <p>The Client has <strong>${
              data.reviewPeriod
            } days</strong> to review deliverables and provide feedback. Failure to provide feedback within this period will be considered acceptance of the deliverable.</p>
            
            <h2>6. INTELLECTUAL PROPERTY</h2>
            <p>Upon full payment, all rights, title, and interest in the work product shall transfer to the Client. The Contractor retains the right to showcase the work in their portfolio and use general methodologies developed during the project.</p>
            
            <h2>7. CONFIDENTIALITY</h2>
            <p>Both parties agree to maintain confidentiality of proprietary information shared during the course of this project. This obligation shall survive the termination of this agreement.</p>
            
            <h2>8. TERMINATION</h2>
            <p>Either party may terminate this agreement with 7 days written notice. Upon termination, the Client shall pay for all work completed up to the termination date.</p>
            
            <h2>9. LIABILITY AND WARRANTIES</h2>
            <p>The Contractor's liability shall not exceed the total contract value. The work is provided "as is" with no warranties beyond those explicitly stated in this agreement.</p>
            
            <h2>10. COMMUNICATION AND PROJECT MANAGEMENT</h2>
            <p>Regular progress updates will be provided weekly via email or agreed-upon project management tools. Response time for communications will be within 24 hours during business days.</p>
            
            <h2>11. GOVERNING LAW</h2>
            <p>This agreement shall be governed by the laws of <strong>${
              data.governingLaw
            }</strong>. Any disputes shall be resolved through binding arbitration.</p>
            
            <div class="signature-section">
                <div class="signature-block">
                    <div class="signature-line"></div>
                    <p><strong>${
                      data.freelancerName
                    }</strong><br>Contractor<br>Date: _____________</p>
                </div>
                <div class="signature-block">
                    <div class="signature-line"></div>
                    <p><strong>${
                      data.clientName
                    }</strong><br>Client<br>Date: _____________</p>
                </div>
            </div>
        `;
  }

  /**
   * Show success message
   * @param {string} message - Success message
   */
  showSuccessMessage(message) {
    this.showNotification(message, "success");
  }

  /**
   * Show error message
   * @param {string} message - Error message
   */
  showErrorMessage(message) {
    this.showNotification(message, "error");
  }

  /**
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success/error)
   */
  showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
      type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("opacity-0", "translate-x-full");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Global functions for backward compatibility
window.downloadPDF = () => contractGenerator.downloadPDF();
window.downloadDOCX = () => contractGenerator.downloadDOCX();

// Initialize the contract generator when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.contractGenerator = new ContractGenerator();
});

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = ContractGenerator;
}
