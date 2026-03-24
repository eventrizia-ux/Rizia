import { Link } from 'react-router';
import { Shield, LogOut, ArrowLeft } from 'lucide-react';
import { WorkflowDiagram } from '../../components/WorkflowDiagram';

interface WorkflowGuideProps {
  onLogout: () => void;
}

export default function WorkflowGuide({ onLogout }: WorkflowGuideProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={32} />
            <div>
              <h1 className="text-white">Admin Portal</h1>
              <p className="text-sm text-gray-400">Platform Workflow Guide</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>

          <div className="mb-12">
            <WorkflowDiagram />
          </div>

          {/* Detailed Documentation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Journey Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-gray-900 mb-6">User Journey Details</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-2">1. Landing Page</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Users arrive at the homepage where they can:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• View active competitions</li>
                    <li>• Browse competition categories</li>
                    <li>• Access login/signup options</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">2. Registration & Login</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    New users sign up with:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Name, Email, Password</li>
                    <li>• Optional: Category of interest</li>
                    <li>• Existing users can login directly</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">3. User Dashboard</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    After login, users see:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Registered competitions</li>
                    <li>• Pending submission alerts</li>
                    <li>• Submission statistics</li>
                    <li>• Quick action links</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">4. Competition Browsing</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Users can:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Filter by category</li>
                    <li>• Sort by deadline</li>
                    <li>• View detailed competition info</li>
                    <li>• Check rules and requirements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">5. Registration Process</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    To register:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Click "Register" on competition page</li>
                    <li>• Receive confirmation message</li>
                    <li>• Competition added to dashboard</li>
                    <li>• Can proceed to submit work</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">6. Submission Process</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Submit work by:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Uploading required file type</li>
                    <li>• Adding submission title</li>
                    <li>• Optional: Add description</li>
                    <li>• Receive success confirmation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">7. Tracking Submissions</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    In "My Submissions" page:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• View all submissions</li>
                    <li>• Check status (Submitted/Review/Accepted/Rejected)</li>
                    <li>• Edit before deadline</li>
                    <li>• Delete if needed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">8. Account Management</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Users can update:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Profile information</li>
                    <li>• Email address</li>
                    <li>• Password</li>
                    <li>• Category preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Admin Journey Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-gray-900 mb-6">Admin Journey Details</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-2">1. Admin Login</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Admins access the platform via:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Login page with "Admin" option selected</li>
                    <li>• Demo credentials provided</li>
                    <li>• Redirected to admin dashboard</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">2. Admin Dashboard</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Overview includes:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Total participants count</li>
                    <li>• Total submissions count</li>
                    <li>• Active competitions</li>
                    <li>• Pending reviews count</li>
                    <li>• Quick access to all admin functions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">3. Competition Management</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Admins can:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Create new competitions</li>
                    <li>• Set title, category, description</li>
                    <li>• Define rules and requirements</li>
                    <li>• Set deadlines and prizes</li>
                    <li>• Edit existing competitions</li>
                    <li>• Delete competitions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">4. Submission Review</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    For each competition:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• View all submissions</li>
                    <li>• See participant details</li>
                    <li>• Review submission files</li>
                    <li>• Track submission dates</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-2">5. Approval Process</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    When reviewing:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Click "Review" on submission</li>
                    <li>• View submission details</li>
                    <li>• Add optional comments/feedback</li>
                    <li>• Approve or Reject</li>
                    <li>• Status updates automatically</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="text-purple-900 mb-2">Admin Best Practices</h3>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Review submissions promptly</li>
                    <li>• Provide constructive feedback</li>
                    <li>• Set realistic deadlines</li>
                    <li>• Keep competition details clear</li>
                    <li>• Monitor pending reviews regularly</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-blue-900 mb-2">Platform Statistics</h3>
                  <p className="text-sm text-blue-800 mb-2">
                    Dashboard provides real-time insights:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Participant growth tracking</li>
                    <li>• Submission trends</li>
                    <li>• Category popularity</li>
                    <li>• Competition performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Summary */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-white mb-6 text-center">Key Platform Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-white mb-3">For Users</h3>
                <ul className="text-sm text-blue-100 space-y-2">
                  <li>✓ Easy registration process</li>
                  <li>✓ Competition discovery</li>
                  <li>✓ Simple submission workflow</li>
                  <li>✓ Status tracking</li>
                  <li>✓ Profile management</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white mb-3">For Admins</h3>
                <ul className="text-sm text-blue-100 space-y-2">
                  <li>✓ Competition lifecycle management</li>
                  <li>✓ Submission review system</li>
                  <li>✓ Participant tracking</li>
                  <li>✓ Analytics dashboard</li>
                  <li>✓ Approval workflow</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white mb-3">Platform Benefits</h3>
                <ul className="text-sm text-blue-100 space-y-2">
                  <li>✓ Streamlined competition management</li>
                  <li>✓ Transparent submission process</li>
                  <li>✓ Real-time status updates</li>
                  <li>✓ User-friendly interface</li>
                  <li>✓ Comprehensive tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}