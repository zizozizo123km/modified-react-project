import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginPageProps {
  onLogin: () => void;
}

const REQUIRED_USER = "zinozino";
const REQUIRED_PASS = "zizozizo";

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === REQUIRED_USER && password === REQUIRED_PASS) {
      onLogin();
    } else {
      setError("البريد الإلكتروني أو كلمة السر التي أدخلتها غير صحيحة.");
      setIsLoading(false);
    }
  };

  return (
    // Facebook Style: Light gray background, LTR structure for layout purposes, RTL for text
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="rtl">
      
      {/* Remove animated backgrounds and particles */}

      <div className="w-full max-w-lg relative z-10 mx-auto"> 
        
        {/* Facebook Branding */}
        <div className="text-center mb-6 lg:mb-10">
          <h1 className="text-6xl font-black text-blue-600 tracking-tighter">
            facebook
          </h1>
          <p className="text-xl text-gray-700 mt-2 hidden lg:block">
            Facebook يساعدك على التواصل ومشاركة اللحظات مع الأشخاص في حياتك.
          </p>
        </div>

        {/* Login Card - Simple White Box with Shadow */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          
          {/* Remove custom corner decorations/accents */}
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email/Phone Input */}
            <Input 
              type="text" 
              placeholder="البريد الإلكتروني أو رقم الهاتف" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // Standard Facebook input styling: light border
              className="text-right h-12 border border-gray-300 focus:border-blue-500 focus:ring-0 text-base"
            />

            {/* Password Input */}
            <Input 
              type="password" 
              placeholder="كلمة السر" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-right h-12 border border-gray-300 focus:border-blue-500 focus:ring-0 text-base"
            />
            
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">
                {error}
              </p>
            )}
            
            {/* Login Button (Facebook Blue) */}
            <Button 
              type="submit" 
              // Overriding previous variant with direct blue styling
              className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  جاري تسجيل الدخول...
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
            
            {/* Forgot Password Link */}
            <div className="text-center pt-2">
              <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                هل نسيت كلمة السر؟
              </a>
            </div>

            {/* Separator line */}
            <div className="flex items-center py-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">أو</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Create New Account Button (Facebook Green) */}
            <div className="text-center">
                <Button 
                    // Green button for secondary action
                    className="h-12 px-6 text-base font-bold bg-green-500 hover:bg-green-600 text-white transition-colors rounded-lg"
                    onClick={() => alert("Redirecting to signup...")}
                    type="button" 
                >
                    إنشاء حساب جديد
                </Button>
            </div>
          </form>

        </div>
        
        {/* Footer/Extra text below the card */}
        <p className="text-center text-xs text-gray-600 mt-6">
          <a href="#" className="font-semibold hover:underline">إنشاء صفحة</a> لشخص مشهور أو علامة تجارية أو نشاط تجاري.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;