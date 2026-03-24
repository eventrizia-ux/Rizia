import { Users, Shield, Home, UserPlus, LogIn, LayoutDashboard, Trophy, FileText, CheckCircle, Settings } from 'lucide-react';

export function WorkflowDiagram() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-gray-900 mb-8 text-center">Platform Workflow</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* User Flow */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-600">
            <Users className="text-blue-600" size={28} />
            <h3 className="text-blue-900">User Flow</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">1</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <Home size={16} />
                  <span>Landing Page</span>
                </div>
                <p className="text-sm text-gray-600">Browse active competitions & platform features</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">2</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <UserPlus size={16} />
                  <span>Sign Up / Login</span>
                </div>
                <p className="text-sm text-gray-600">Create account or login as user</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">3</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <LayoutDashboard size={16} />
                  <span>User Dashboard</span>
                </div>
                <p className="text-sm text-gray-600">View registrations, submissions & deadlines</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">4</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <Trophy size={16} />
                  <span>Browse Competitions</span>
                </div>
                <p className="text-sm text-gray-600">Filter by category, view details & register</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">5</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <CheckCircle size={16} />
                  <span>Register & Confirm</span>
                </div>
                <p className="text-sm text-gray-600">Register for competition & get confirmation</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">6</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <FileText size={16} />
                  <span>Submit Work</span>
                </div>
                <p className="text-sm text-gray-600">Upload files, add title & description</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">7</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <FileText size={16} />
                  <span>My Submissions</span>
                </div>
                <p className="text-sm text-gray-600">Track status, edit or delete submissions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">8</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <Settings size={16} />
                  <span>Account Settings</span>
                </div>
                <p className="text-sm text-gray-600">Update profile, password & preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Flow */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-600">
            <Shield className="text-purple-600" size={28} />
            <h3 className="text-purple-900">Admin Flow</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex-shrink-0">1</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <LogIn size={16} />
                  <span>Admin Login</span>
                </div>
                <p className="text-sm text-gray-600">Login with admin credentials</p>
                <div className="mt-2 p-2 bg-purple-50 rounded text-xs">
                  <p className="text-purple-800">Email: admin@rizia.com</p>
                  <p className="text-purple-800">Password: admin123</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex-shrink-0">2</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <LayoutDashboard size={16} />
                  <span>Admin Dashboard</span>
                </div>
                <p className="text-sm text-gray-600">View statistics, participants & submissions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex-shrink-0">3</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <Trophy size={16} />
                  <span>Manage Competitions</span>
                </div>
                <p className="text-sm text-gray-600">Create, edit, delete competitions & set deadlines</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex-shrink-0">4</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <FileText size={16} />
                  <span>Review Submissions</span>
                </div>
                <p className="text-sm text-gray-600">View all submissions for each competition</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex-shrink-0">5</div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 mb-1">
                  <CheckCircle size={16} />
                  <span>Approve / Reject</span>
                </div>
                <p className="text-sm text-gray-600">Review, approve or reject submissions with comments</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-gray-900 mb-2">Admin Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Total participant tracking</li>
                <li>• Submission management</li>
                <li>• Competition lifecycle control</li>
                <li>• Pending reviews monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}