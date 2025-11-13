import { useState } from 'react';
import { User, Phone, Mail, Camera, Save, RotateCcw } from 'lucide-react';

export default function EditDataDiri() {
  const [formData, setFormData] = useState({
    nama: 'test provider',
    noTelepon: '+6281264996677',
    email: 'testprovider@gmail.com'
  });
  
  const [avatar, setAvatar] = useState('https://ui-avatars.com/api/?name=Test+Provider&background=4F46E5&color=fff&size=200');
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({
      nama: 'test provider',
      noTelepon: '+6281264996677',
      email: 'testprovider@gmail.com'
    });
    setPreviewImage(null);
  };

  const handleSubmit = () => {
    console.log('Saving data:', formData);
    alert('Data berhasil disimpan!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-700">Edit Profile</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3"></div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Avatar Section */}
              <div className="lg:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg ring-4 ring-blue-100 transition-all duration-300 group-hover:ring-blue-300">
                      <img
                        src={previewImage || avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <div className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-110">
                        <Camera className="w-5 h-5" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Upload a different photo...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG or GIF (max. 2MB)
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Nama Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User className="w-4 h-4 text-blue-600" />
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                {/* No Telepon Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Phone className="w-4 h-4 text-green-600" />
                    No telepon
                  </label>
                  <input
                    type="tel"
                    name="noTelepon"
                    value={formData.noTelepon}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300"
                    placeholder="+62..."
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Mail className="w-4 h-4 text-red-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-blue-300"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Tips:</span> Pastikan informasi yang Anda masukkan akurat dan terkini untuk memudahkan komunikasi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 bg-gray-700 hover:bg-green-500 text-white text-sm px-3 py-1.5 rounded-md shadow transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-1 bg-red-700 hover:bg-red-500 text-white text-sm px-3 py-1.5 rounded-md shadow transition-all"
            >
              <Save className="w-4 h-4" />
              Simpan
            </button>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Updates</p>
                <p className="text-xl font-bold text-gray-800">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Verified</p>
                <p className="text-xl font-bold text-gray-800">Yes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Login</p>
                <p className="text-sm font-semibold text-gray-800">Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}