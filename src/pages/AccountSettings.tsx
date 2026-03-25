import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { User, Mail, Lock, Camera, Sparkles } from 'lucide-react';
import { supabase, hashPassword } from '../utils/supabaseClient';
import { getUserDisplayName, getUserInitial } from '../utils/appData';

interface AccountSettingsProps {
  user: any;
  onLogout: () => void;
  onUpdateUser: (user: any) => void;
}

export default function AccountSettings({ user, onLogout, onUpdateUser }: AccountSettingsProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    category: user.category || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const categories = ['Art', 'Dance', 'Music', 'Writing', 'Photography', 'Film'];

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (supabase && user?.id) {
        const { error } = await supabase
          .from('users')
          .update({
            name: formData.name,
            email: formData.email,
            category: formData.category || null,
          })
          .eq('id', user.id);

        if (error) {
          throw error;
        }
      }

      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        category: formData.category,
      };

      onUpdateUser(updatedUser);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    try {
      if (!supabase || !user?.email) {
        setMessage('Password updates are unavailable right now');
        return;
      }

      const { data: loginRecord, error: loginError } = await supabase
        .from('users_login')
        .select('id, password_hash')
        .eq('email', user.email)
        .single();

      if (loginError || !loginRecord) {
        setMessage('Could not verify your current password');
        return;
      }

      const currentPasswordHash = await hashPassword(formData.currentPassword);
      if (currentPasswordHash !== loginRecord.password_hash) {
        setMessage('Current password is incorrect');
        return;
      }

      const newPasswordHash = await hashPassword(formData.newPassword);
      const { error: updateError } = await supabase
        .from('users_login')
        .update({ password_hash: newPasswordHash })
        .eq('id', loginRecord.id);

      if (updateError) {
        throw updateError;
      }

      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      setMessage('Password updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Failed to update password. Please try again.');
    }
  };

  const cardClass =
    'rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl';
  const inputClass =
    'w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-purple-200/60 focus:outline-none focus:ring-2 focus:ring-purple-400';
  const labelClass = 'mb-2 block text-sm text-purple-200';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} onLogout={onLogout} />

      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
            <div>
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-purple-200">
                  <Sparkles size={16} />
                  Personal settings
                </div>
                <h1 className="text-3xl text-white">Account Settings</h1>
                <p className="mt-2 text-purple-200">
                  Update your profile details, password, and keep your account information current.
                </p>
              </div>
            </div>
          </div>

          {message && (
            <div className="mb-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 p-4 text-emerald-100 backdrop-blur-xl">
              {message}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
            <div className="space-y-6">
              <div className={cardClass}>
                <h2 className="mb-6 text-white">Profile Picture</h2>

                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-3xl text-white shadow-lg">
                    {getUserInitial(user)}
                  </div>
                  <div>
                    <button className="mb-2 flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-2 text-white transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600">
                      <Camera size={16} />
                      Change Photo
                    </button>
                    <p className="text-sm text-purple-200">JPG, PNG or GIF. Max size 2MB</p>
                  </div>
                </div>
              </div>

              <div className={cardClass}>
                <h2 className="mb-6 text-white">Quick Profile</h2>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-purple-300">Name</p>
                    <p className="mt-1 text-white">{getUserDisplayName(user)}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-purple-300">Email</p>
                    <p className="mt-1 text-white">{user.email}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-purple-300">Category of Interest</p>
                    <p className="mt-1 text-white">{formData.category || 'Not selected yet'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className={cardClass}>
                <h2 className="mb-6 text-white">Profile Information</h2>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      <span className="flex items-center gap-2">
                        <User size={16} />
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      <span className="flex items-center gap-2">
                        <Mail size={16} />
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className={labelClass}>
                      Category of Interest
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" className="text-gray-900">
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="text-gray-900">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-white transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
                  >
                    Update Profile
                  </button>
                </form>
              </div>

              <div className={cardClass}>
                <h2 className="mb-6 text-white">Change Password</h2>

                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className={labelClass}>
                      <span className="flex items-center gap-2">
                        <Lock size={16} />
                        Current Password
                      </span>
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      required
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className={labelClass}>
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      required
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-white transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
