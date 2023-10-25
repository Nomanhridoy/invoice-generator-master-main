import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import image from '../assets/images/FlipperLogo-1_1.png'

export class HomePage extends React.Component {
  // Add a new method to handle the "Remove" button click
  handleRemoveProductClick = (event) => {
    const productSection = event.target.closest(".product-input");
    if (productSection) {
      document.getElementById("productInputs").removeChild(productSection);
    }
  };

  render() {
    return (
      <div className="invoice-generator">
        <div className="header">
          <h1>Flipper Invoice</h1>
        </div>
        <div className="customer-details">
          <h2>Customer Details</h2>
          <input type="text" id="customerName" placeholder="Customer Name" />
          <input
            type="text"
            id="customerNumber"
            placeholder="Customer Number"
          />
          <input
            type="text"
            id="customerAddress"
            placeholder="Address (Optional)"
          />
        </div>
        <div className="product-inputs">
          <h2>Invoice Items</h2>
          <div id="productInputs">
            {/* First product section always visible */}
            <div className="product-input">
              <input
                type="text"
                className="item-description"
                placeholder="Description"
              />
              <input type="number" className="item-unit" placeholder="Unit" />
              <input
                type="number"
                className="item-unit-price"
                placeholder="Unit Price"
              />
              {/* Remove button for the first product section is hidden */}
              <button className="remove-product" style={{ display: "none" }}>
                Remove
              </button>
            </div>
            {/* Additional product sections will be added here */}
          </div>
          {/* "Add Another Product" and "Add Item" buttons side by side */}
          <div className="buttons-container">
          <button id="addProduct" onClick={this.handleAddProductClick}>
            Add Another Product
          </button>
            <button id="addItemButton" onClick={this.addItemButtonClick}>Add Item</button>
          </div>
        </div>
        
        {/* Invoice Preview Section */}
        <div className="invoice-preview hidden" id="invoicePreview">
          <div className="invoice-title">
            <h2>Invoice</h2>
          </div>
          <div className="preview-top">
            <div className="left-top">
              {/* Customer Information */}
              <div className="customer-info">
                <p>
                  <strong>Customer Name:</strong>{" "}
                  <span id="customerNamePreview"></span>
                </p>
                <p>
                  <strong>Customer Number:</strong>{" "}
                  <span id="customerNumberPreview"></span>
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  <span id="customerAddressPreview"></span>
                </p>
              </div>
            </div>
            <div className="right-top">
              {/* Logo and Address */}
              <div className="logo-address">
                <img src={image} alt="Your Logo" id="companyLogo" />
                <p>House no 3/1, Road No. 8,</p>
                <p>Dhanmondi, Dhaka - 1205</p>
                <p>Email: hello@flipper.com.bd</p>
                <p>Phone: +88 01400 554466</p>
              </div>
            </div>
          </div>
          {/* Invoice Items Table */}
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Unit Price (Tk)</th>
                <th>Amount (Tk)</th>
              </tr>
            </thead>
            <tbody id="invoiceItemsPreview">
              {/* Invoice items will be dynamically added here */}
            </tbody>
          </table>
          {/* Total Amount and In Words */}
          <div className="total-section">
            <p>
              <strong>Total Amount:</strong> <span id="totalAmount"></span>
            </p>
            <p>
              <strong>Total in Words:</strong> <span id="totalInWords"></span>{" "}
            </p>
          </div>
          <div className="policy">
            <h3>Flipper Policy:</h3>
            <ol type="I">
              {" "}
              {/*Use Roman numerals*/}
              <li>
                <p>10 Days Replacement:</p>
                <ul>
                  <li>
                    Customer encountering any issue with a purchased product
                    within 10 days from the date of purchase can return it to us
                    for a replacement. Replacement will be subject to product
                    availability. If the same product is not available, we will
                    offer a similar product of equal value or provide a refund.
                  </li>
                </ul>
              </li>
              <li>
                <p>1-Year Service Warranty:</p>
                <ul>
                  <li>
                    All our products come with a 1-year service warranty, which
                    means we will provide service only from the date of
                    purchase.
                  </li>
                  <li>
                    During this period, the customer will be responsible for any
                    parts costs.
                  </li>
                  <li>Phone displays are not covered by warranty.</li>
                </ul>
              </li>
              <li>
                <p>Exchange:</p>
                <ul>
                  <li>
                    Customers can exchange their old devices through our
                    “FLIPPER” Apps only.
                  </li>
                </ul>
              </li>
              <li>
                <p>No Return & Refund:</p>
                <ul>
                  <li>
                    Sold-out goods with no issues are not returnable or
                    refundable. If any customer insists on a refund or return,
                    Flipper has the full authority to deduct 20% - 30% of the
                    product's purchase price.
                  </li>
                </ul>
              </li>
            </ol>
            <p>
              <b>
                Please keep the original purchase invoice as proof of purchase;
                it will be required for any returns or warranty claims.
              </b>
            </p>
          </div>
        </div>

        {/* Print and Download Buttons */}
        <div className="print-download-buttons hidden">
          <button id="printInvoice" onClick={this.printInvoice}>Print </button>
          <button id="printInvoicePDF" onClick={this.printInvoicePDF}>Download PDF</button>
        </div>
      </div>
    );
  }

  // Function to calculate the total amount for a product
  calculateProductAmount = (unit, unitPrice) => {
    return unit * unitPrice;
  };

  convertToWords = (num) => {
    if (num === 0) return "Zero";

    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousands = ["", "Thousand", "Million", "Billion"];

    function convertLessThanThousand(number) {
      if (number === 0) return "";
      if (number < 10) return units[number];
      if (number < 20) return teens[number - 10];
      const ten = Math.floor(number / 10);
      const unit = number % 10;
      return (ten > 0 ? tens[ten] + " " : "") + (unit > 0 ? units[unit] : "");
    }

    function convertThreeDigits(number, index) {
      if (number === 0) return "";
      const hundreds = Math.floor(number / 100);
      const remainder = number % 100;
      let result = "";
      if (hundreds > 0) {
        result += units[hundreds] + " Hundred ";
      }
      if (remainder > 0) {
        if (result !== "") result += "and ";
        result += convertLessThanThousand(remainder);
      }
      if (index > 0 && result !== "") {
        result += thousands[index] + " ";
      }
      return result;
    }

    let result = "";
    let index = 0;
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk > 0) {
        result = convertThreeDigits(chunk, index) + result;
      }
      num = Math.floor(num / 1000);
      index++;
    }

    return result.trim();
  };
  
    // Add a new method to handle the "Add Another Product" button click
  handleAddProductClick = () => {
    const productSection = document.querySelector(".product-input");
    const newProductSection = productSection.cloneNode(true);

    const inputFields = newProductSection.querySelectorAll("input");
    inputFields.forEach((input) => {
      input.value = '';
    });

    const removeButton = newProductSection.querySelector(".remove-product");
    removeButton.style.display = "block"; // Make the "Remove" button visible

    removeButton.addEventListener("click", this.handleRemoveProductClick); // Add a click event listener for the "Remove" button

    document.getElementById("productInputs").appendChild(newProductSection);
  };

  // Function to update the invoice preview
  updateInvoicePreview(){
    // Get customer information from input fields
    const customerName = document.getElementById("customerName").value;
    const customerNumber = document.getElementById("customerNumber").value;
    const customerAddress = document.getElementById("customerAddress").value;

    // Update customer information in the preview
    document.getElementById("customerNamePreview").textContent = customerName;
    document.getElementById("customerNumberPreview").textContent =
      customerNumber;
    document.getElementById("customerAddressPreview").textContent =
      customerAddress;

    // Get all product input fields
    const itemDescriptions = document.querySelectorAll(".item-description");
    const itemUnits = document.querySelectorAll(".item-unit");
    const itemUnitPrices = document.querySelectorAll(".item-unit-price");

    // Initialize variables for total amount calculation
    let totalAmount = 0;

    // Clear the existing items in the preview
    const invoiceItemsPreview = document.getElementById("invoiceItemsPreview");
    invoiceItemsPreview.innerHTML = "";

    // Loop through each product input field
    itemDescriptions.forEach((itemDescription, index) => {
      const unit = parseFloat(itemUnits[index].value);
      const unitPrice = parseFloat(itemUnitPrices[index].value);

      if (!isNaN(unit) && !isNaN(unitPrice)) {
        const amount = this.calculateProductAmount(unit, unitPrice);

        // Create a new row for the item in the preview table
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${index + 1}</td>
                <td>${itemDescription.value}</td>
                <td>${unit}</td>
                <td>${unitPrice.toFixed(2)}</td>
                <td>${amount.toFixed(2)}</td>
            `;
        invoiceItemsPreview.appendChild(row);

        // Add the item's amount to the total amount
        totalAmount += amount;
      }
    });

    // Update the total amount in the preview
    document.getElementById(
      "totalAmount"
    ).textContent = `Tk ${totalAmount.toFixed(2)}`;

    // Convert the total amount to words
    const totalAmountWords = this.convertToWords(totalAmount);
    document.getElementById("totalInWords").textContent =
      totalAmountWords + " Taka Only"; // Update the total in words
  };

  // Function to print the invoice
  printInvoice() {
    // Hide the buttons before printing
    const printButtonContainer = document.querySelector(".print-download-buttons");
    if (printButtonContainer) {
      printButtonContainer.style.display = "none";
    }

    const invoicePreview = document.getElementById("invoicePreview").cloneNode(true);

    // Get the logo image
    const companyLogo = document.getElementById("companyLogo");
    if (companyLogo) {
      const clonedLogo = companyLogo.cloneNode(true);
      invoicePreview.querySelector(".logo-address").appendChild(clonedLogo);
    }

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Invoice</title><style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }</style></head><body style="font-family: Arial, sans-serif;">');

    // Apply inline styles to match the preview styling
    invoicePreview.querySelectorAll("table").forEach((table) => {
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";
    });

    invoicePreview.querySelectorAll("th, td").forEach((cell) => {
      cell.style.border = "1px solid #ddd";
      cell.style.padding = "8px";
      cell.style.textAlign = "left";
    });

    printWindow.document.write(invoicePreview.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
    printWindow.close();

    // Restore the buttons after printing
    if (printButtonContainer) {
      printButtonContainer.style.display = "block";
    }
  }

  printInvoicePDF() {
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'pt', 'a2'); // Use 'a2' as page size

    // Define the source element
    const source = document.getElementById("invoicePreview");

    // Set the title for the PDF
    pdf.setProperties({
      title: "Invoice",
    });

    // Calculate the horizontal center position for the content
    const centerPos = (pdf.internal.pageSize.width - source.offsetWidth) / 2;

    // Use a callback to ensure proper rendering
    pdf.html(source, {
      callback: function (pdf) {
        // Save the PDF after rendering is complete
        pdf.save("invoice.pdf");
      },
      x: centerPos, // Set the horizontal center position
      y: 15,
      width: 1366, // Set the width to match the A2 page size (in pt)
      elementHandlers: {
        // Define special handlers as needed
        '#ignorePDF': function (element, renderer) {
          return true;
        },
      },
    });

    // Apply inline styles to the generated PDF
    pdf.autoTable({
      html: "#invoiceItemsPreview",
      theme: "grid",
      styles: {
        overflow: 'linebreak',
        fontSize: 12, // Adjust the font size as needed
        cellPadding: 2, // Adjust cell padding as needed
      },
      margin: { left: 15 },
      columnStyles: {
        0: { cellWidth: 40 }, // Adjust the width of cell 0
        1: { cellWidth: 300 }, // Adjust the width of cell 1
        2: { cellWidth: 80 }, // Adjust the width of cell 2
        3: { cellWidth: 100 }, // Adjust the width of cell 3
        4: { cellWidth: 80 }, // Adjust the width of cell 4
      },
    });
  }

  addItemButtonClick = () => {
    this.updateInvoicePreview(); // Update the preview when the "Add Item" button is clicked
    const invoicePreview = document.getElementById("invoicePreview");

    // Check if there are any products added
    const productInputs = document.querySelectorAll(".product-input");
    if (productInputs.length > 0) {
        invoicePreview.style.display = "block"; // Show the invoice preview

        // Show the print and download buttons
        const printDownloadButtons = document.querySelector(".print-download-buttons");
        printDownloadButtons.classList.remove("hidden");
    } else {
        // If no products are added, show a message or perform another action as needed
        alert("Please add at least one product.");
    }
  }
}