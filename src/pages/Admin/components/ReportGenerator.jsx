import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import { FaDownload } from "react-icons/fa";

const ReportGenerator = () => {
  const [loading, setLoading] = useState(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/generate-full-report");
      const data = await response.json();
      generatePDF(data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (data) => {
    const doc = new jsPDF("p", "mm", "a4");

    const redColor = [255, 0, 0];
    const blackColor = [0, 0, 0];
    const grayColor = [100, 100, 100];
    const fontSizeHeading = 18;
    const fontSizeSubheading = 14;
    const fontSizeBody = 12;
    let yOffset = 20;

    doc.setFontSize(fontSizeHeading);
    doc.setTextColor(...redColor);
    doc.text("Full Summary Report", 105, yOffset, { align: "center" });

    yOffset += 10;
    doc.setFontSize(fontSizeSubheading);
    doc.setTextColor(...redColor);
    doc.text("Serendib Savor", 105, yOffset, { align: "center" });

    yOffset += 10;
    doc.setFontSize(fontSizeBody);
    doc.setTextColor(...grayColor);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, yOffset, {
      align: "center",
    });

    yOffset += 15;
    doc.setLineWidth(0.5);
    doc.setDrawColor(...redColor);
    doc.line(10, yOffset, 200, yOffset);
    yOffset += 10;

    doc.setFontSize(fontSizeHeading);
    doc.setTextColor(...redColor);
    doc.text("Revenue by Day", 10, yOffset);
    yOffset += 10;
    doc.setFontSize(fontSizeBody);
    doc.setTextColor(...blackColor);
    data.revenueByDay.forEach((day) => {
      doc.text(
        `Date: ${day._id} - Total Revenue: LKR ${day.totalRevenue}`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    yOffset += 10;

    doc.setFontSize(fontSizeHeading);
    doc.setTextColor(...redColor);
    doc.text("Orders by Status", 10, yOffset);
    yOffset += 10;
    doc.setFontSize(fontSizeBody);
    doc.setTextColor(...blackColor);
    data.ordersByStatus.forEach((status) => {
      doc.text(`Status: ${status._id} - Count: ${status.count}`, 10, yOffset);
      yOffset += 10;
    });

    yOffset += 10;

    doc.setFontSize(fontSizeHeading);
    doc.setTextColor(...redColor);
    doc.text("Overall Summary", 10, yOffset);
    yOffset += 10;
    doc.setFontSize(fontSizeBody);
    doc.setTextColor(...blackColor);
    doc.text(`Total Revenue: LKR ${data.totalRevenue}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Total Orders: ${data.totalOrders}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Average Order Value: LKR ${data.avgOrderValue}`, 10, yOffset);

    yOffset += 20;

    doc.setFontSize(fontSizeHeading);
    doc.setTextColor(...redColor);
    doc.text("Top Items", 10, yOffset);
    yOffset += 10;
    doc.setFontSize(fontSizeBody);
    doc.setTextColor(...blackColor);
    data.topItems.forEach((item) => {
      doc.text(
        `Item: ${item.name} - Quantity: ${item.totalQuantity}`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    yOffset += 20;
    doc.setFontSize(fontSizeHeading);
    doc.setTextColor(...redColor);
    doc.text("Recent Orders", 10, yOffset);

    const tableData = data.recentOrders.map((order) => [
      order.orderId,
      order.name,
      `LKR ${order.totalPrice}`,
      order.status,
    ]);

    doc.autoTable({
      startY: yOffset + 10,
      head: [["Order ID", "Name", "Total Price", "Status"]],
      body: tableData,
      styles: { fontSize: 10 },
    });

    yOffset = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(fontSizeHeading);
    doc.setTextColor(...redColor);
    doc.text("User Activity", 10, yOffset);
    yOffset += 10;
    doc.setFontSize(fontSizeBody);
    doc.setTextColor(...blackColor);
    doc.text(`New Users: ${data.userActivity.newUsers}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Active Users: ${data.userActivity.activeUsers}`, 10, yOffset);

    yOffset += 20;

 
    doc.setFontSize(fontSizeHeading);
    doc.setTextColor(...redColor);
    doc.text("Sales Summary", 10, yOffset);
    yOffset += 10;
    doc.setFontSize(fontSizeBody);
    doc.setTextColor(...blackColor);
    data.salesSummary.forEach((summary) => {
      doc.text(
        `Date: ${summary._id} - Total Revenue: LKR ${summary.totalRevenue} - Total Orders: ${summary.totalOrders}`,
        10,
        yOffset
      );
      yOffset += 10;
    });
    doc.save("FullReport.pdf");
  };

  return (
    <div className="flex items-center bg-green-400 text-white p-2 font-bold">
      <button onClick={fetchReportData} disabled={loading}>
        {loading ? "Downloading Report..." : "Download Report"}
      </button>
      <FaDownload className="ml-2" />
    </div>
  );
};

export default ReportGenerator;
