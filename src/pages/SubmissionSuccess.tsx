import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Info } from 'lucide-react';

interface SubmissionSuccessProps {
  user: any;
}

export default function SubmissionSuccess({ user }: SubmissionSuccessProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to bookings page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/my-submissions');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 backdrop-blur-lg border border-blue-500/30 rounded-full mb-6">
              <Info className="text-blue-300" size={40} />
            </div>

            <h1 className="text-white mb-4">Redirecting...</h1>
            
            <p className="text-gray-200 mb-8 text-lg">
              This page is being redirected to your bookings page.
            </p>

            <div className="bg-blue-500/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-4 mb-8">
              <p className="text-blue-200 text-sm">
                You'll be automatically redirected to your bookings in a moment, or you can click the button below.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                to="/my-submissions"
                className="block w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl"
              >
                View My Bookings
              </Link>

              <Link
                to="/dashboard"
                className="block w-full py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}