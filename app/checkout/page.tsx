"use client"
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation'; // Modified import for SPA compatibility
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ShieldCheck, CreditCard, Terminal, Cpu, Zap, ShoppingCart } from 'lucide-react';
import { CustomerDetails } from '../types';

type CyberInputProps = {
  label: string;
  name: keyof CustomerDetails;
  type?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CyberInput = ({
  label,
  name,
  type = 'text',
  value,
  required = true,
  placeholder = '',
  onChange,
}: CyberInputProps) => (
  <div className="relative group">
    <label className="block text-xs font-mono text-green-500/70 mb-1 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-black/50 border border-green-900/50 rounded-none px-4 py-3 text-green-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all font-mono placeholder-green-900/50"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
        }}
      />
      {/* Decorative corner accent */}
      <div
        className="absolute bottom-0 right-0 w-2 h-2 bg-green-500/20 pointer-events-none"
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
      />
    </div>
  </div>
);

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
    
    // Aesthetic: Green color for PDF text
    doc.setTextColor(0, 100, 0); 
    
    // Add header
    doc.setFontSize(22);
    doc.text('NEURO-MARKET RECEIPT', pageWidth / 2, 20, { align: 'center' });
    
    doc.setTextColor(0, 0, 0); // Reset for body
    
    // Add customer details
    doc.setFontSize(12);
    doc.text('Customer Identity:', 20, 40);
    doc.setFontSize(10);
    doc.text(`Name: ${orderDetails.firstName} ${orderDetails.lastName}`, 20, 50);
    doc.text(`Email: ${orderDetails.email}`, 20, 60);
    doc.text(`Comms: ${orderDetails.phone}`, 20, 70);
    doc.text(`Location: ${orderDetails.address}, ${orderDetails.city}`, 20, 80);
    doc.text(`Region: ${orderDetails.country} [${orderDetails.zipCode}]`, 20, 90);

    // Add order items
    doc.setFontSize(12);
    doc.text('Acquired Assets:', 20, 120);
    const tableData = items.map(item => [
      item.name,
      item.quantity.toString(),
      `$${(item.price * (1 - (item.discountPercentage ?? 0) / 100)).toFixed(2)}`,
      `$${(item.price * item.quantity * (1 - (item.discountPercentage ?? 0) / 100)).toFixed(2)}`
    ]);

    (doc as any).autoTable({
      startY: 130,
      head: [['Asset', 'Qty', 'Unit Cost', 'Subtotal']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [0, 50, 0] }, // Dark Green header
    });

    // Add total
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text(`Total Credits Deducted: $${totalPrice.toFixed(2)}`, pageWidth - 80, finalY);

    // Save the PDF
    doc.save('neuro-market-receipt.pdf');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate PDF
    generatePDF(customerDetails);
    
    // Clear cart and redirect
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 relative overflow-hidden selection:bg-green-500 selection:text-black">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: `linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 border-b border-green-900/50 pb-6 flex items-end justify-between"
        >
          <div>
            <h1 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 tracking-tighter uppercase mb-2">
              Secure Checkout
            </h1>
            <p className="text-green-500/60 font-mono text-sm tracking-widest flex items-center gap-2">
              <Terminal size={14} /> SYSTEM.SECURE_CONNECTION_ESTABLISHED
            </p>
          </div>
          <div className="hidden md:block text-right">
             <div className="text-xs font-mono text-green-700">SESSION ID</div>
             <div className="text-green-400 font-mono">0x4F92-A7</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Customer Details Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 bg-zinc-950/80 border border-green-900/30 p-1 relative backdrop-blur-sm"
          >
            {/* Cyberpunk Decorative Borders */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-50"></div>
            <div className="absolute -left-1 top-10 w-1 h-20 bg-green-700"></div>
            
            <div className="p-8">
                <div className="flex items-center gap-3 mb-8 border-b border-green-900/30 pb-4">
                    <ShieldCheck className="text-green-500" />
                    <h2 className="text-2xl font-display uppercase tracking-wide text-green-100">Identity Verification</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <CyberInput label="First Name" name="firstName" value={customerDetails.firstName} onChange={handleInputChange} />
                    <CyberInput label="Last Name" name="lastName" value={customerDetails.lastName} onChange={handleInputChange} />
                </div>

                <CyberInput label="Email Protocol" name="email" type="email" value={customerDetails.email} onChange={handleInputChange} />
                <CyberInput label="Comms Frequency" name="phone" type="tel" value={customerDetails.phone} onChange={handleInputChange} />

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-green-900/30"></div>
                    </div>
                    <div className="relative flex justify-center">
                    <span className="bg-black px-2 text-xs font-mono text-green-700 uppercase">Delivery Coordinates</span>
                    </div>
                </div>

                <CyberInput label="Sector Address" name="address" value={customerDetails.address} onChange={handleInputChange} />

                <div className="grid grid-cols-2 gap-6">
                    <CyberInput label="City Block" name="city" value={customerDetails.city} onChange={handleInputChange} />
                    <CyberInput label="Zone / Country" name="country" value={customerDetails.country} onChange={handleInputChange} />
                </div>

                <CyberInput label="Zone Code" name="zipCode" value={customerDetails.zipCode} onChange={handleInputChange} />

                <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(22, 163, 74, 1)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-green-600 text-black font-bold py-4 mt-8 uppercase tracking-[0.2em] font-display relative overflow-hidden group"
                    style={{
                        clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                    }}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <Zap size={20} className="fill-current" /> Initialize Transaction
                    </span>
                    {/* Button Glitch Effect Overlay */}
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                </motion.button>
                </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-zinc-950 border border-green-800 p-6 relative lg:sticky lg:top-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                 {/* Decorative Corner lines */}
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500"></div>
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500"></div>

                <h2 className="text-xl font-display uppercase tracking-widest mb-6 flex items-center gap-3 text-green-400">
                    <Cpu className="animate-pulse" /> Data Cache
                </h2>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 cyber-scrollbar">
                {items.map((item) => (
                    <div key={item._id} className="group flex items-start gap-4 p-3 border border-transparent hover:border-green-900/50 bg-green-900/5 transition-all">
                        <div className="w-12 h-12 bg-black border border-green-900 flex items-center justify-center shrink-0">
                            <Terminal size={20} className="text-green-700" />
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-green-100 font-mono text-sm uppercase">{item.name}</span>
                                <span className="text-green-400 font-mono text-sm">
                                    ${(item.price * (1 - (item.discountPercentage ?? 0) / 100)).toFixed(2)}
                                </span>
                            </div>
                            <div className="text-xs text-green-600 font-mono mt-1 flex justify-between">
                                <span>QTY: {item.quantity}</span>
                                {item.discountPercentage && item.discountPercentage > 0 && (
                                    <span className="text-green-400 bg-green-900/30 px-1">-{item.discountPercentage}% OFF</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                </div>

                {items.length === 0 && (
                    <div className="text-center py-8 text-green-800 font-mono border border-dashed border-green-900">
                        <ShoppingCart className="mx-auto mb-2 opacity-50" />
                        CACHE_EMPTY
                    </div>
                )}

                <div className="border-t-2 border-green-900 mt-6 pt-6 space-y-2">
                    <div className="flex justify-between font-mono text-sm text-green-600">
                        <span>SUBTOTAL</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-mono text-sm text-green-600">
                        <span>NETWORK_FEE</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-display font-bold text-xl pt-4 text-green-400 mt-2 border-t border-green-900/30">
                        <span className="animate-pulse">TOTAL CREDITS</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-xs text-green-800 font-mono justify-center">
                    <CreditCard size={12} /> ENCRYPTED_TRANSACTION_PROTOCOL_V4
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}