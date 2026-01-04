import React, { useState } from 'react';
import { Home, Users, Bell, User, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import HomeTab from '@/components/tabs/HomeTab';
import VipTab from '@/components/tabs/VipTab';
import WalletTab from '@/components/tabs/WalletTab';

interface DashboardProps {
  onLogout: () => void;
}

// Define Facebook primary color for accents
const FACEBOOK_BLUE = 'rgb(24, 119, 242)';

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  // Removed notification state and useEffect logic (crypto specific)

  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية' }, // Mapped from Zap/Tad'een to Home/Feed
    { id: 'vip', icon: Users, label: 'المجموعات' }, // Mapped from Crown/VIP to Groups
    { id: 'wallet', icon: User, label: 'الملف الشخصي' }, // Mapped from Wallet to Profile
  ];

  // Component for the Facebook-style Header (Top Bar)
  const FacebookHeader = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="flex justify-between items-center h-14 px-4 max-w-4xl mx-auto">
        {/* Facebook Logo/Title */}
        <h1 className="text-3xl font-extrabold select-none" style={{ color: FACEBOOK_BLUE, fontFamily: 'Arial, sans-serif' }}>
          facebook
        </h1>
        {/* Actions (Search, Notifications, Messages) */}
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200"
            aria-label="Search"
          >
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200"
            aria-label="Messages"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4l2 3 2-3h4a2 2 0 0 0 2-2z"/></svg>
          </button>
        </div>
      </div>
    </header>
  );

  return (
    // Changed styling to light mode (bg-gray-50) and generic text color
    <div className="min-h-screen bg-gray-50 text-gray-900" dir="rtl">
      
      {/* Facebook Top Header */}
      <FacebookHeader />

      {/* Removed Background effects and Notification Toast */}

      {/* Content */}
      {/* Adjusted padding top (pt-16) to account for fixed header, 
          and adjusted padding bottom (pb-20) for fixed bottom nav */}
      <main className="pb-20 pt-16 px-0 max-w-4xl mx-auto relative">
        {/* The Tabs now represent Facebook features */}
        {activeTab === 'home' && <HomeTab onNavigate={setActiveTab} />}
        {activeTab === 'vip' && <VipTab onNavigate={setActiveTab} />} 
        {activeTab === 'wallet' && <WalletTab />}
      </main>

      {/* Bottom Navigation */}
      {/* BottomNav will now display Facebook-style tabs: Home, Groups, Profile */}
      <BottomNav 
        items={navItems} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={onLogout}
      />
    </div>
  );
};

export default Dashboard;