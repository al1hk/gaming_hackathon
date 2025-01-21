"use client";
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePDF = (orderDetails: CustomerDetails) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Order Receipt', pageWidth / 2, 20, { align: 'center' });
    
    // Add customer details
    doc.setFontSize(12);
    doc.text('Customer Details:', 20, 40);
    doc.text(`Name: ${orderDetails.firstName} ${orderDetails.lastName}`, 20, 50);
    doc.text(`Email: ${orderDetails.email}`, 20, 60);
    doc.text(`Phone: ${orderDetails.phone}`, 20, 70);
    doc.text(`Address: ${orderDetails.address}`, 20, 80);
    doc.text(`City: ${orderDetails.city}`, 20, 90);
    doc.text(`Country: ${orderDetails.country}`, 20, 100);
    doc.text(`Zip Code: ${orderDetails.zipCode}`, 20, 110);

    // Add order items
    doc.text('Order Items:', 20, 130);
    const tableData = items.map(item => [
      item.name,
      item.quantity.toString(),
      `$${(item.price * (1 - (item.discountPercentage ?? 0) / 100)).toFixed(2)}`,
      `$${(item.price * item.quantity * (1 - (item.discountPercentage ?? 0) / 100)).toFixed(2)}`// Removed extra space before closing parenthesis
    ]);

    (doc as any).autoTable({
      startY: 140,
      head: [['Product', 'Quantity', 'Price', 'Total']],
      body: tableData,
    });

    // Add total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(`Total Amount: $${totalPrice.toFixed(2)}`, pageWidth - 60, finalY);

    // Save the PDF
    doc.save('order-receipt.pdf');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the order to your backend
    // For now, we'll just generate the PDF and show success
    generatePDF(customerDetails);
    
    // Clear cart and redirect to success page
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900 rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={customerDetails.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={customerDetails.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={customerDetails.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={customerDetails.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={customerDetails.address}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={customerDetails.city}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={customerDetails.country}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  value={customerDetails.zipCode}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600 transition-colors"
              >
                Complete Order
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900 rounded-lg p-6 h-fit lg:sticky lg:top-24"
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <span className="text-gray-400">{item.quantity}x</span>
                  <span className="flex-grow">{item.name}</span>
                  <span>
                    ${(item.price * (1 - (item.discountPercentage ?? 0) / 100)).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-800 pt-4 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-green-500">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
