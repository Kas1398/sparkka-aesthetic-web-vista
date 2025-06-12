
import React, { useState, useEffect } from 'react';
import { Check, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PricingItem {
  id: number;
  service: string;
  description: string;
  price: string;
  features: string[];
}

const Pricing = () => {
  const { t } = useLanguage();
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock pricing data
    const fetchPricing = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPricing: PricingItem[] = [
        {
          id: 1,
          service: t('laserEquipment'),
          description: t('laserEquipmentPrice'),
          price: '€10,000+',
          features: ['Professional grade equipment', 'Multiple treatment modes', '2-year warranty', 'Training included'],
        },
        {
          id: 2,
          service: t('dermatologyEquipment'),
          description: 'Advanced dermatology systems',
          price: '€8,000+',
          features: ['Medical grade quality', 'FDA approved', '3-year warranty', 'Ongoing support'],
        },
        {
          id: 3,
          service: t('installationServices'),
          description: t('installationPrice'),
          price: '€2,000',
          features: ['Professional installation', 'Equipment setup', 'Staff training', 'Safety certification'],
        },
        {
          id: 4,
          service: t('maintenanceServices'),
          description: t('maintenancePrice'),
          price: '€1,500/year',
          features: ['Regular maintenance', '24/7 support', 'Parts replacement', 'Performance optimization'],
        },
      ];
      
      setPricing(mockPricing);
      setLoading(false);
    };

    fetchPricing();
  }, [t]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            {t('pricingTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            {t('pricingSubtitle')}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricing.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.service}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="text-3xl font-bold text-blue-600">{item.price}</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {item.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Quote
              </button>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-center text-white animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Custom Solutions Available</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Need a custom package or have specific requirements? Our team can create a tailored solution for your needs.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {t('contact')} for Custom Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
