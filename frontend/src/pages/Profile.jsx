import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import AlertModal from '../components/common/AlertModal';
import { FiUser, FiMail, FiCalendar, FiArrowUp, FiClock, FiEdit2, FiCheck, FiX, FiActivity } from 'react-icons/fi';
import { GiWeightScale } from 'react-icons/gi';

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50">
      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-emerald-600" />
      </div>
      <div>
        <p className="text-xs text-emerald-600/80 uppercase tracking-wider font-bold">{label}</p>
        <p className="text-sm font-semibold text-emerald-950">{value || '-'}</p>
      </div>
    </div>
  );
}

const STATUS_LABELS = {
  Insufficient_Weight: '⚠️ Berat Badan Kurang',
  Normal_Weight: '✅ Normal',
  Overweight_Level_I: '⚠️ Overweight I',
  Overweight_Level_II: '⚠️ Overweight II',
  Obesity_Type_I: '🔴 Obesitas I',
  Obesity_Type_II: '🔴 Obesitas II',
  Obesity_Type_III: '🚨 Obesitas III',
};

const calculateBMI = (weight, height) => {
  if (!weight || !height) return null;
  const hMeters = height / 100;
  const bmi = weight / (hMeters * hMeters);
  const status = bmi < 18.5 ? 'Kurus' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Berlebih' : 'Obesitas';
  return { value: bmi.toFixed(1), status };
};

const getProfileForm = (user) => ({
  name: user?.name || '',
  age: user?.age || '',
  gender: user?.gender || '',
  weight: user?.weight || '',
  height: user?.height || '',
});

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(() => getProfileForm(user));
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, title: '', message: '', type: 'success' });

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data } = await api.get('/obesity/history');
        setHistory(data.predictions || data || []);
      } catch { setHistory([]); }
      finally { setLoadingHistory(false); }
    }
    fetchHistory();
  }, []);

  const handleEditChange = (field) => (e) => {
    setEditForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleStartEditing = () => {
    setEditForm(getProfileForm(user));
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    if (!editForm.name) {
      setAlert({ isOpen: true, title: 'Validasi Gagal', message: 'Nama tidak boleh kosong.', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        name: editForm.name,
        age: Number(editForm.age) || null,
        gender: editForm.gender,
        weight: Number(editForm.weight) || null,
        height: Number(editForm.height) || null,
      });
      setIsEditing(false);
      setAlert({ isOpen: true, title: 'Berhasil', message: 'Profil Anda berhasil diperbarui!', type: 'success' });
    } catch (err) {
      setAlert({ isOpen: true, title: 'Gagal', message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const bmiData = calculateBMI(user?.weight, user?.height);
  const displayGender = user?.gender === 'L' ? 'Laki-Laki' : user?.gender === 'P' ? 'Perempuan' : undefined;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in min-h-[90vh]">
      <AlertModal 
        isOpen={alert.isOpen} 
        onClose={() => setAlert({ ...alert, isOpen: false })} 
        title={alert.title} 
        message={alert.message} 
        type={alert.type} 
      />

      {/* User Info Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/30">
              <FiUser className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">{user?.name || 'User'}</h1>
              <p className="text-emerald-100 font-medium mt-1 flex items-center gap-2">
                <FiMail /> {user?.email}
              </p>
              {bmiData && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold border border-white/30">
                  <FiActivity className="w-4 h-4" /> BMI: {bmiData.value} ({bmiData.status})
                </div>
              )}
            </div>
          </div>
          
          {!isEditing ? (
            <button 
              onClick={handleStartEditing}
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full font-bold backdrop-blur-sm transition-all flex items-center gap-2 self-start sm:self-auto border border-white/30"
            >
              <FiEdit2 className="w-4 h-4" /> Edit Profil
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full font-bold backdrop-blur-sm transition-all flex items-center gap-2 self-start sm:self-auto border border-white/30"
            >
              <FiX className="w-4 h-4" /> Batal Edit
            </button>
          )}
        </div>

        <div className="p-6 sm:p-8">
          {isEditing ? (
            <div className="animate-fade-in bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
              <h3 className="text-lg font-bold text-emerald-950 mb-6">Ubah Data Profil</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="sm:col-span-2 lg:col-span-1">
                  <Input label="Nama Lengkap" id="edit-name" icon={FiUser} value={editForm.name} onChange={handleEditChange('name')} />
                </div>
                <Input label="Usia" id="edit-age" type="number" icon={FiCalendar} value={editForm.age} onChange={handleEditChange('age')} />
                <Input 
                  label="Jenis Kelamin" 
                  id="edit-gender" 
                  type="select" 
                  icon={FiUser} 
                  value={editForm.gender} 
                  onChange={handleEditChange('gender')} 
                  options={[{ label: 'Laki-Laki', value: 'L' }, { label: 'Perempuan', value: 'P' }]}
                />
                <Input label="Berat (kg)" id="edit-weight" type="number" icon={GiWeightScale} value={editForm.weight} onChange={handleEditChange('weight')} />
                <Input label="Tinggi (cm)" id="edit-height" type="number" icon={FiArrowUp} value={editForm.height} onChange={handleEditChange('height')} />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} loading={saving} className="bg-emerald-600 hover:bg-emerald-700">
                  <FiCheck className="w-5 h-5 mr-2" /> Simpan Perubahan
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-in">
              <InfoItem icon={FiUser} label="Nama" value={user?.name} />
              <InfoItem icon={FiUser} label="Gender" value={displayGender} />
              <InfoItem icon={FiCalendar} label="Usia" value={user?.age ? `${user.age} tahun` : undefined} />
              <InfoItem icon={GiWeightScale} label="Berat" value={user?.weight ? `${user.weight} kg` : undefined} />
              <InfoItem icon={FiArrowUp} label="Tinggi" value={user?.height ? `${user.height} cm` : undefined} />
            </div>
          )}
        </div>
      </div>

      {/* Prediction History */}
      <div className="mt-8 bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-emerald-950 mb-6 flex items-center gap-2">
          <FiClock className="w-6 h-6 text-emerald-500" /> Riwayat Prediksi
        </h2>

        {loadingHistory ? (
          <div className="text-center py-12 text-emerald-800/60 font-medium">Memuat riwayat...</div>
        ) : history.length === 0 ? (
          <div className="text-center py-12 bg-emerald-50/50 rounded-2xl border border-emerald-100 border-dashed">
            <p className="text-emerald-800 font-bold mb-2">Belum ada riwayat prediksi.</p>
            <p className="text-sm text-emerald-600">Lakukan cek obesitas untuk melihat hasilnya di sini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-emerald-100">
            <table className="w-full text-sm text-left">
              <thead className="bg-emerald-50 text-emerald-800">
                <tr>
                  <th className="py-4 px-5 font-bold rounded-tl-xl">No</th>
                  <th className="py-4 px-5 font-bold">Tanggal</th>
                  <th className="py-4 px-5 font-bold">Hasil</th>
                  <th className="py-4 px-5 font-bold rounded-tr-xl">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {history.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-4 px-5 text-emerald-900 font-medium">{idx + 1}</td>
                    <td className="py-4 px-5 text-emerald-700">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="py-4 px-5 font-bold text-emerald-950">
                      {STATUS_LABELS[item.prediction] || item.prediction}
                    </td>
                    <td className="py-4 px-5 text-emerald-700">
                      {item.confidence ? `${(item.confidence * 100).toFixed(1)}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
