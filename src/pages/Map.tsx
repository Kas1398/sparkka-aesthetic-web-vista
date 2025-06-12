
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../contexts/LanguageContext';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = () => {
  const { t } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Company coordinates: Laajavuorenkuja 1 H 128, 01620 Vantaa, Finland
    const companyLat = 60.294;
    const companyLng = 24.963;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([companyLat, companyLng], 15);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.current);

    // Add marker for company location
    const marker = L.marker([companyLat, companyLng]).addTo(map.current);
    
    marker.bindPopup(`
      <div class="text-center p-2">
        <h3 class="font-bold text-lg mb-2">Sparkka Oy</h3>
        <p class="text-sm text-gray-600 mb-1">Y-tunnus: 3344388-7</p>
        <p class="text-sm text-gray-600">Laajavuorenkuja 1 H 128<br>01620 Vantaa, Finland</p>
      </div>
    `);

    // Open popup by default
    marker.openPopup();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            {t('mapTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            {t('mapSubtitle')}
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
          <div ref={mapContainer} className="h-96 lg:h-[600px] w-full" />
        </div>

        {/* Contact Info */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('address')}</h3>
            <p className="text-gray-600">
              Laajavuorenkuja 1 H 128<br />
              01620 Vantaa, Finland
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('phone')}</h3>
            <p className="text-gray-600">+358 40 123 4567</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('email')}</h3>
            <p className="text-gray-600">info@sparkka.fi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
