import React, { useState } from 'react';
import { Copy, CheckCircle2, CreditCard, Wallet2, ChevronLeft, Shield, Lock, Sparkles, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const MY_WALLET = "TYu89XpQzL1mK9vN2bR5sW7tE4yG6hJ3fA";

type PaymentMethod = 'usdt' | 'paypal' | 'card';

const WalletTab: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [amount, setAmount] = useState('50');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MY_WALLET);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ عنوان المحفظة بنجاح",
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate Facebook/Meta Pay initiation or platform callback delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    toast({
      title: "تم استلام طلبك!",
      description: "سيتم تفعيل حسابك خلال دقائق",
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // --- UI Styling Constants for Facebook Look ---
  const PRIMARY_BLUE = 'bg-blue-500 hover:bg-blue-600 text-white';
  const PRIMARY_ACCENT_COLOR = 'text-blue-600';
  const CONTAINER_STYLE = 'bg-white rounded-xl shadow-md p-5';

  if (!selectedMethod) {
    return (
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg animate-scale-in">
        {/* Header - Simplified Facebook style */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
            <Facebook size={32} className={PRIMARY_ACCENT_COLOR} />
          </div>
          <h2 className={`text-2xl font-bold ${PRIMARY_ACCENT_COLOR}`}>إيداع الأموال</h2>
          <p className="text-gray-500 mt-1">اختر الطريقة المناسبة لإيداع الأموال</p>
        </div>

        {/* Amount Selection */}
        <div className={`${CONTAINER_STYLE}`}>
          <label className="block text-sm font-semibold text-gray-700 mb-3">المبلغ المراد إيداعه (USD)</label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {['50', '100', '500', '1000'].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`py-2 rounded-lg font-semibold transition-all border ${
                  amount === val 
                    ? PRIMARY_BLUE + ' border-blue-500'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-800'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="أو أدخل مبلغ مخصص"
            className="text-center text-lg font-bold border-gray-300 focus:ring-blue-500 h-10"
          />
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          {/* USDT */}
          <button
            onClick={() => setSelectedMethod('usdt')}
            className={`w-full ${CONTAINER_STYLE} flex items-center gap-4 hover:border-blue-300 transition-all border border-transparent`}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-xl font-black text-white">₮</span>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-base font-semibold text-gray-800">USDT (TRC20)</h3>
              <p className="text-xs text-gray-500">تحويل فوري • بدون رسوم</p>
            </div>
            <ChevronLeft className="text-gray-400" />
          </button>

          {/* PayPal - Simplified to look like a Facebook option */}
          <button
            onClick={() => setSelectedMethod('paypal')}
            className={`w-full ${CONTAINER_STYLE} flex items-center gap-4 hover:border-blue-300 transition-all border border-transparent`}
          >
            <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-xl font-black text-white">P</span>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-base font-semibold text-gray-800">PayPal / Meta Pay</h3>
              <p className="text-xs text-gray-500">آمن وسريع • مدعوم من Meta</p>
            </div>
            <ChevronLeft className="text-gray-400" />
          </button>

          {/* Credit Card - Simplified to look like a Facebook option */}
          <button
            onClick={() => setSelectedMethod('card')}
            className={`w-full ${CONTAINER_STYLE} flex items-center gap-4 hover:border-blue-300 transition-all border border-transparent`}
          >
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center shadow-sm">
              <CreditCard className="text-gray-700" size={24} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-base font-semibold text-gray-800">بطاقة ائتمان</h3>
              <p className="text-xs text-gray-500">Visa / MasterCard</p>
            </div>
            <ChevronLeft className="text-gray-400" />
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Shield size={14} className="text-green-500" />
            <span>دفع آمن</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Lock size={14} className={PRIMARY_ACCENT_COLOR} />
            <span>تشفير SSL</span>
          </div>
        </div>
      </div>
    );
  }

  // USDT Payment
  if (selectedMethod === 'usdt') {
    return (
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-md animate-scale-in">
        <button 
          onClick={() => setSelectedMethod(null)}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors text-sm"
        >
          <ChevronLeft size={18} />
          <span>العودة لطرق الدفع</span>
        </button>

        <div className="text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-black text-white">₮</span>
          </div>
          <h2 className="text-xl font-bold mb-1 text-gray-800">
            إيداع USDT (TRC20)
          </h2>
          <p className={`${PRIMARY_ACCENT_COLOR} text-3xl font-bold mb-6`}>${amount}</p>
          
          {/* QR Code placeholder */}
          <div className="bg-gray-50 p-4 rounded-lg inline-block mb-6 border border-gray-200">
            <div className="w-40 h-40 bg-white flex items-center justify-center rounded-md border border-gray-300">
              <div className="text-center">
                {/* Simplified QR Placeholder Grid */}
                <div className="grid grid-cols-5 gap-[2px] p-2">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-transparent'}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-500 mt-1 block">USDT TRC20</span>
              </div>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3 mb-6 border border-gray-200">
            <Button 
              onClick={handleCopy}
              className={`shrink-0 ${PRIMARY_BLUE} h-8 w-8 p-0`}
            >
              <Copy size={16} />
            </Button>
            <span className="text-[10px] md:text-xs font-mono break-all text-gray-700 flex-1 text-left">
              {MY_WALLET}
            </span>
          </div>

          {/* Instructions */}
          <div className="space-y-2 text-sm text-right bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="flex items-center gap-2 font-semibold text-gray-800">
              <CheckCircle2 className={PRIMARY_ACCENT_COLOR + ' shrink-0'} size={18} /> 
              أرسل ${amount} USDT للعنوان أعلاه
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <CheckCircle2 className="text-gray-400 shrink-0" size={18} /> 
              سيتم تفعيل حسابك تلقائياً (1-3 دقائق)
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <CheckCircle2 className="text-gray-400 shrink-0" size={18} /> 
              تأكد من اختيار شبكة TRC20
            </p>
          </div>
        </div>
        
        <Button className={`w-full h-12 text-base ${PRIMARY_BLUE}`} onClick={handlePayment}>
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              جاري التحقق...
            </span>
          ) : (
            'لقد قمت بالدفع، تحقق الآن'
          )}
        </Button>
      </div>
    );
  }

  // PayPal Payment (Now genericized/Meta styled)
  if (selectedMethod === 'paypal') {
    return (
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-md animate-scale-in">
        <button 
          onClick={() => setSelectedMethod(null)}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors text-sm"
        >
          <ChevronLeft size={18} />
          <span>العودة لطرق الدفع</span>
        </button>

        <div className="p-4">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
              <Facebook className="text-white" size={28} /> {/* Using Facebook icon for Meta integration feel */}
            </div>
            <h2 className="text-xl font-bold text-gray-800">الدفع عبر PayPal / Meta Pay</h2>
            <p className={`${PRIMARY_ACCENT_COLOR} text-3xl font-bold mt-2`}>${amount}</p>
            <p className="text-gray-500 text-xs mt-1">+ رسوم 2% = ${(parseFloat(amount) * 1.02).toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني PayPal</label>
              <Input
                type="email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                placeholder="example@email.com"
                className="text-left h-10 border-gray-300"
                dir="ltr"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles size={16} className={PRIMARY_ACCENT_COLOR} />
                سيتم إرسال رابط الدفع إلى بريدك الإلكتروني
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} className="text-green-500" />
                محمي بحماية Meta للدفع
              </p>
            </div>
          </div>
        </div>

        <Button 
          className={`w-full h-12 text-base ${PRIMARY_BLUE}`} 
          onClick={handlePayment}
          disabled={!paypalEmail || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              جاري المعالجة...
            </span>
          ) : (
            'متابعة الدفع'
          )}
        </Button>
      </div>
    );
  }

  // Credit Card Payment (Now genericized/Meta styled)
  if (selectedMethod === 'card') {
    return (
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-md animate-scale-in">
        <button 
          onClick={() => setSelectedMethod(null)}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors text-sm"
        >
          <ChevronLeft size={18} />
          <span>العودة لطرق الدفع</span>
        </button>

        <div className="p-4">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
              <CreditCard className="text-gray-700" size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">الدفع ببطاقة ائتمان</h2>
            <p className={`${PRIMARY_ACCENT_COLOR} text-3xl font-bold mt-2`}>${amount}</p>
            <p className="text-gray-500 text-xs mt-1">+ رسوم 3% = ${(parseFloat(amount) * 1.03).toFixed(2)}</p>
          </div>

          {/* Card Input Forms - Simplified styling */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">رقم البطاقة</label>
              <Input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="text-left h-10 font-mono border-gray-300"
                dir="ltr"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">تاريخ الانتهاء</label>
                <Input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="text-center h-10 font-mono border-gray-300"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                <Input
                  type="password"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="•••"
                  maxLength={3}
                  className="text-center h-10 font-mono border-gray-300"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-70" />
            </div>
          </div>
        </div>

        <Button 
          className={`w-full h-12 text-base ${PRIMARY_BLUE}`} 
          onClick={handlePayment}
          disabled={!cardNumber || !cardExpiry || !cardCvv || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              جاري المعالجة...
            </span>
          ) : (
            `دفع $${(parseFloat(amount) * 1.03).toFixed(2)}`
          )}
        </Button>

        <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
          <Lock size={12} className="text-gray-400" />
          بياناتك محمية بتشفير 256-bit SSL
        </p>
      </div>
    );
  }

  return null;
};

export default WalletTab;