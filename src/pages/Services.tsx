
import React, { useState, useEffect } from 'react';
import { Zap, Shield, Settings, Users, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  imagePrompt: string;
  generatedImage?: string;
}

const Services = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageGenerationKey, setImageGenerationKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  const servicePrompts = {
    laser: "A sleek, modern medical laser machine in a clean, high-tech aesthetic clinic, with a focus on advanced technology, blue and white color scheme, soft lighting, and a professional atmosphere. Include subtle details like a touchscreen interface and medical tools in the background.",
    dermatology: "A professional dermatology device in a sterile clinic setting, featuring a high-quality skin treatment machine with a sleek design, green and white tones, surrounded by skincare products and a calm, medical environment with soft natural light.",
    installation: "A team of expert technicians installing a medical laser device in a clinic, with tools and equipment neatly arranged, a bright and organized workspace, blue and gray color scheme, and a focus on precision and professionalism.",
    maintenance: "A technician performing maintenance on a dermatology machine in a clean workshop, with diagnostic tools and spare parts visible, using a green and white color scheme, bright lighting, and a focus on detailed care and expertise."
  };

  const generateImage = async (prompt: string): Promise<string> => {
    if (!imageGenerationKey) {
      return '/placeholder.svg';
    }

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${imageGenerationKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          quality: 'standard',
          style: 'natural'
        }),
      });

      if (!response.ok) {
        console.error('Image generation failed:', response.statusText);
        return '/placeholder.svg';
      }

      const data = await response.json();
      return data.data[0]?.url || '/placeholder.svg';
    } catch (error) {
      console.error('Error generating image:', error);
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
          imagePrompt: servicePrompts.laser,
        },
        {
          id: 2,
          title: t('dermatologyEquipment'),
          description: t('dermatologyDescription'),
          icon: Shield,
          imagePrompt: servicePrompts.dermatology,
        },
        {
          id: 3,
          title: t('installationServices'),
          description: t('installationDescription'),
          icon: Settings,
          imagePrompt: servicePrompts.installation,
        },
        {
          id: 4,
          title: t('maintenanceServices'),
          description: t('maintenanceDescription'),
          icon: Users,
          imagePrompt: servicePrompts.maintenance,
        },
      ];

      // Generate images for each service
      const servicesWithImages = await Promise.all(
        mockServices.map(async (service) => ({
          ...service,
          generatedImage: await generateImage(service.imagePrompt),
        }))
      );
      
      setServices(servicesWithImages);
      setLoading(false);
    };

    fetchServices();
  }, [t, imageGenerationKey]);

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowKeyInput(false);
    // Trigger re-fetch of services with new key
    window.location.reload();
  };

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
          
          {/* AI Image Generation Key Input */}
          {!imageGenerationKey && (
            <div className="mt-8">
              {!showKeyInput ? (
                <button
                  onClick={() => setShowKeyInput(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Enable AI Image Generation
                </button>
              ) : (
                <form onSubmit={handleKeySubmit} className="max-w-md mx-auto">
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter OpenAI API Key"
                      value={imageGenerationKey}
                      onChange={(e) => setImageGenerationKey(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Your API key is stored locally and used only for image generation
                  </p>
                </form>
              )}
            </div>
          )}
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
                  {service.generatedImage && service.generatedImage !== '/placeholder.svg' ? (
                    <img 
                      src={service.generatedImage} 
                      alt={service.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500">Equipment Image Placeholder</span>
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
