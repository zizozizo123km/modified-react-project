import React from 'react';
import { Zap, Users, ArrowRightLeft, TrendingUp, Star, Sparkles, Shield, Clock, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/StatCard';
import ReviewCard from '@/components/ReviewCard';

interface HomeTabProps {
  onNavigate: (tab: string) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen animate-fade-in">
      
      {/* Facebook Style Announcement Post (Hero) */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
        
        {/* Post Header */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-800 flex items-center">
                Cloud Miner Pro <span className="text-xs font-normal text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded ml-2 rtl:mr-2">صفحة موثقة</span>
            </p>
            <p className="text-xs text-gray-500">منذ دقيقة واحدة · <Clock size={10} className="inline ml-1 rtl:mr-1" /> عرض ممول</p>
          </div>
        </div>

        <div className="pt-2">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 leading-snug">
              📣 عرض الترحيب <span className="text-blue-600">المحدود!</span>
            </h2>
            <p className="text-gray-700 mb-6 text-md">
              فرصة لا تعوض! ادفع <span className="font-extrabold text-lg text-red-600">$50</span> واحصل على <span className="font-extrabold text-lg text-red-600">$500</span> خلال 24 ساعة فقط!
            </p>
            
            <Button 
              onClick={() => onNavigate('wallet')} 
              size="lg"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-none h-12 text-md font-bold"
            >
              استثمر وابدأ التعدين <Zap size={18} className="fill-current mr-2 rtl:ml-2" />
            </Button>
        </div>

        {/* Post Footer - Likes/Comments */}
        <div className="flex justify-between text-xs text-gray-500 mt-4 border-t pt-3 border-gray-100">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <p className="flex items-center text-blue-600 font-medium">
                    <ThumbsUp size={14} className="fill-blue-600 text-blue-600 ml-1 rtl:mr-1" />
                    2.5K
                </p>
                <span className="mx-1">•</span>
                <p>400 مشاركة</p>
            </div>
            <p className="hover:underline cursor-pointer">اكتب تعليقاً</p>
        </div>
      </div>

      {/* Live Stats - Info Blocks */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          label="أعضاء المجتمع" 
          value="+45,201" 
          icon={<Users className="text-blue-600" size={28} />}
          trend="+12%"
          className="bg-white shadow-sm rounded-xl"
        />
        <StatCard 
          label="إجمالي الأرباح" 
          value="$2.4M" 
          icon={<ArrowRightLeft className="text-green-500" size={28} />}
          trend="+8%"
          className="bg-white shadow-sm rounded-xl"
        />
      </div>

      {/* Features - Quick Links/Info */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shield size={20} className="text-blue-600" />
          </div>
          <p className="text-xs font-medium text-gray-700">أمان موثوق</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Zap size={20} className="text-green-600" />
          </div>
          <p className="text-xs font-medium text-gray-700">سحب فوري</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Sparkles size={20} className="text-purple-600" />
          </div>
          <p className="text-xs font-medium text-gray-700">دعم 24/7</p>
        </div>
      </div>

      {/* Reviews Section - Community Comments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
            <Star className="text-yellow-400 fill-yellow-400" size={20} /> 
            آراء المجتمع والتقييمات
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">+2,340 تقييم</span>
        </div>
        <div className="space-y-3">
          {/* ReviewCard now styled to look like a Facebook comment/short post */}
          <ReviewCard 
            name="محمد العتيبي" 
            text="والله كنت شاك في البداية، لكن جربت الـ 50 دولار وفعلاً وصلتني 500 دولار في المحفظة بعد يوم واحد. شكراً للقائمين على الموقع!" 
            stars={5} 
            img="https://i.pravatar.cc/150?u=a1"
            date="منذ 2 ساعة"
            verified
            className="bg-white p-4 rounded-lg shadow-sm"
          />
          <ReviewCard 
            name="سارة الهاشم" 
            text="أفضل منصة تعدين استخدمتها، نظام الـ VIP 3 خيالي والأرباح يومية. أنصح الجميع بالبدء فوراً." 
            stars={5} 
            img="https://i.pravatar.cc/150?u=a2"
            date="منذ 5 ساعات"
            verified
            className="bg-white p-4 rounded-lg shadow-sm"
          />
          <ReviewCard 
            name="ياسين من المغرب" 
            text="خدمة دعم ممتازة وأرباح حقيقية. تم ترقية حسابي لـ VIP 1 والآن دخلي الشهري تضاعف." 
            stars={4} 
            img="https://i.pravatar.cc/150?u=a3"
            date="منذ يوم"
            verified
            className="bg-white p-4 rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeTab;