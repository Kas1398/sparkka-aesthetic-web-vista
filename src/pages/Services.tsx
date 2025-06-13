
import React, { useState, useEffect } from 'react';
import { Zap, Shield, Settings, Users, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  searchTerm: string;
  imageUrl?: string;
}

const Services = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImageFromUnsplash = async (searchTerm: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=1&client_id=demo`
      );
      
      if (!response.ok) {
        console.warn(`Failed to fetch image for ${searchTerm}, using placeholder`);
        return '/placeholder.svg';
      }

      const data = await response.json();
      return data.results[0]?.urls?.regular || '/placeholder.svg';
    } catch (error) {
      console.error('Error fetching image:', error);
      return '/placeholder.svg';
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      
      const mockServices: Service[] = [
        {
          id: 1,
          title: t('laserEquipment'),
          description: t('laserDescription'),
          icon: Zap,
          searchTerm: 'medical laser equipment',
        },
        {
          id: 2,
          title: t('dermatologyEquipment'),
          description: t('dermatologyDescription'),
          icon: Shield,
          searchTerm: 'dermatology device skincare',
        },
        {
          id: 3,
          title: t('installationServices'),
          description: t('installationDescription'),
          icon: Settings,
          searchTerm: 'medical equipment installation',
        },
        {
          id: 4,
          title: t('maintenanceServices'),
          description: t('maintenanceDescription'),
          icon: Users,
          searchTerm: 'equipment maintenance tools',
        },
      ];

      // Fetch images for each service
      const servicesWithImages = await Promise.all(
        mockServices.map(async (service) => ({
          ...service,
          imageUrl: await fetchImageFromUnsplash(service.searchTerm),
        }))
      );
      
      setServices(servicesWithImages);
      setLoading(false);
    };

    fetchServices();
  }, [t]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading services...</p>
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
            {t('servicesTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            {t('servicesSubtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-xl flex items-center justify-center mr-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center overflow-hidden">
                  {service.imageUrl && service.imageUrl !== '/placeholder.svg' ? (
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<span class="text-gray-500">Equipment Image</span>';
                      }}
                    />
                  ) : (
                    <span className="text-gray-500">Equipment Image</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Support
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Our team of certified technicians provides comprehensive support for all equipment installations, 
            training, and ongoing maintenance to ensure optimal performance.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ Certified Technicians</span>
            <span>✓ 24/7 Support</span>
            <span>✓ Training Included</span>
            <span>✓ Warranty Coverage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
