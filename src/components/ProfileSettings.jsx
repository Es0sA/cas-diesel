import React, { useState, useEffect } from 'react';
import { Settings, Save, AlertCircle, ArrowLeft } from 'lucide-react';
import { api } from '../api';

export default function ProfileSettings({ user, onBack }) {
  const [formData, setFormData] = useState({
    companyName: '',
    businessAddress: '',
    contactPhone: '',
    pricePerLitre: '',
    availableLitres: '',
    firstName: '',
    lastName: '',
    truckPlateNumber: '',
    truckCapacityLiters: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const role = (user?.role || '').toUpperCase();
  const isDriver = role === 'DRIVER';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!isDriver) {
          const res = await api.companies.getProfile();
          setFormData(prev => ({ ...prev, ...res }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [isDriver]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (isDriver) {
        await api.drivers.editProfile(formData);
      } else {
        await api.companies.editProfile(formData);
      }
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-cas-amber border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cas-muted hover:text-cas-slate mb-6 transition-colors font-semibold text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-2xl border border-cas-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-cas-border flex items-center gap-3">
          <div className="w-10 h-10 bg-cas-amberLight rounded-lg flex items-center justify-center text-cas-amberDark">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-cas-slate">Profile Settings</h2>
            <p className="text-sm text-cas-muted">Manage your account information</p>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-start gap-3 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-cas-green/10 text-cas-green rounded-lg flex items-start gap-3 border border-cas-green/20">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="text-sm font-medium">Profile updated successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isDriver && (
              <>
                <div>
                  <label className="block text-sm font-bold text-cas-slate mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-cas-border focus:border-cas-amber focus:ring-1 focus:ring-cas-amber outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-cas-slate mb-1">Business Address</label>
                  <input
                    type="text"
                    name="businessAddress"
                    value={formData.businessAddress || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-cas-border focus:border-cas-amber focus:ring-1 focus:ring-cas-amber outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-cas-slate mb-1">Contact Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-cas-border focus:border-cas-amber focus:ring-1 focus:ring-cas-amber outline-none transition-all text-sm"
                  />
                </div>

                {role === 'SUPPLIER' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-cas-slate mb-1">Price Per Litre (₦)</label>
                      <input
                        type="number"
                        name="pricePerLitre"
                        value={formData.pricePerLitre || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-cas-border focus:border-cas-amber focus:ring-1 focus:ring-cas-amber outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-cas-slate mb-1">Available Litres</label>
                      <input
                        type="number"
                        name="availableLitres"
                        value={formData.availableLitres || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-cas-border focus:border-cas-amber focus:ring-1 focus:ring-cas-amber outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {isDriver && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-cas-slate mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-cas-border focus:border-cas-amber focus:ring-1 focus:ring-cas-amber outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-cas-slate mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-cas-border focus:border-cas-amber focus:ring-1 focus:ring-cas-amber outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-cas-slate mb-1">Truck Plate Number</label>
                  <input
                    type="text"
                    name="truckPlateNumber"
                    value={formData.truckPlateNumber || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-cas-border focus:border-cas-amber focus:ring-1 focus:ring-cas-amber outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-cas-slate mb-1">Truck Capacity (Liters)</label>
                  <input
                    type="number"
                    name="truckCapacityLiters"
                    value={formData.truckCapacityLiters || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-cas-border focus:border-cas-amber focus:ring-1 focus:ring-cas-amber outline-none transition-all text-sm"
                  />
                </div>
              </>
            )}

            <div className="pt-4 mt-6 border-t border-cas-border flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-cas-amber hover:bg-cas-amberDark text-slate-900 font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
