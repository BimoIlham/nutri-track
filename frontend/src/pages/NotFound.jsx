import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-8xl font-bold text-green-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Halaman Tidak Ditemukan
      </h2>
      <p className="mt-2 text-gray-500 max-w-md">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link to="/" className="mt-6">
        <Button>Kembali ke Beranda</Button>
      </Link>
    </div>
  );
}
