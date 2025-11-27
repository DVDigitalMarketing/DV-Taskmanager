import { ArrowLeft, Trash2, Edit, Clock, User, Tag } from 'lucide-react';

interface TaskDetailsPageProps {
  taskId?: string;
  onNavigate: (page: string) => void;
}

export function TaskDetailsPage({ taskId, onNavigate }: TaskDetailsPageProps) {
  const tasks: Record<string, any> = {
    '1': {
      id: '1',
      title: 'Update client proposal',
      description: 'Revise and finalize the Q4 proposal for stakeholder review. Include updated market analysis and budget projections.',
      assignedTo: 'Sarah Chen',
      priority: 'High',
      dueDate: '2025-11-27',
      category: 'Today',
      status: 'In Progress',
      createdDate: '2025-11-20',
      attachments: ['proposal_v2.pdf', 'market_analysis.xlsx'],
      comments: [
        { author: 'Michael Johnson', text: 'Great work on the analysis section!', time: '2 hours ago' },
        { author: 'You', text: 'Thanks! Updated with client feedback.', time: '1 hour ago' },
      ],
    },
    '2': {
      id: '2',
      title: 'Review design mockups',
      description: 'Check the new dashboard designs for the mobile app redesign project.',
      assignedTo: 'Michael Johnson',
      priority: 'Medium',
      dueDate: '2025-11-27',
      category: 'Today',
      status: 'Pending Review',
      createdDate: '2025-11-21',
      attachments: ['mockups.figma'],
      comments: [],
    },
    '3': {
      id: '3',
      title: 'Team meeting prep',
      description: 'Prepare slides for tomorrow\'s standup meeting.',
      assignedTo: 'Emma Rodriguez',
      priority: 'Medium',
      dueDate: '2025-11-28',
      category: 'Tomorrow',
      status: 'Not Started',
      createdDate: '2025-11-22',
      attachments: [],
      comments: [],
    },
    '4': {
      id: '4',
      title: 'Fix critical bug',
      description: 'Resolve login authentication issue affecting users in production.',
      assignedTo: 'James Wilson',
      priority: 'High',
      dueDate: '2025-11-26',
      category: 'Overdue',
      status: 'In Progress',
      createdDate: '2025-11-18',
      attachments: ['bug_report.md'],
      comments: [
        { author: 'Sarah Chen', text: 'This is blocking our deployment. High priority!', time: '3 hours ago' },
      ],
    },
  };

  const task = tasks[taskId || '1'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-[#004CFF] border-[#004CFF]';
      case 'Pending Review':
        return 'bg-orange-100 text-[#FF8A34] border-[#FF8A34]';
      case 'Not Started':
        return 'bg-gray-100 text-[#6D6D6D] border-[#6D6D6D]';
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F7] p-8" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-[#004CFF] font-[600] hover:text-[#0040CC] transition-colors"
        >
          <ArrowLeft size={24} />
          Back to Dashboard
        </button>
        <div className="flex items-center gap-4">
          <button className="p-3 rounded-2xl bg-white hover:bg-[#F1F3F7] transition-colors text-[#6D6D6D] hover:text-[#004CFF]">
            <Edit size={20} />
          </button>
          <button className="p-3 rounded-2xl bg-white hover:bg-red-50 transition-colors text-[#6D6D6D] hover:text-red-500">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Task Details */}
        <div className="col-span-2 flex flex-col gap-8">
          {/* Task Header Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-[800] text-[#1A1A1A] flex-1">{task.title}</h1>
            </div>
            <p className="text-base text-[#6D6D6D] leading-relaxed mb-6">{task.description}</p>

            {/* Status and Priority Tags */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-sm font-[600] px-4 py-2 rounded-full border-2 ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              <span className={`text-sm font-[600] px-4 py-2 rounded-full border-2 ${getPriorityColor(task.priority)}`}>
                {task.priority} Priority
              </span>
            </div>

            {/* Task Meta Information */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#E5E7EB]">
              <div>
                <p className="text-xs font-[600] text-[#6D6D6D] uppercase tracking-wide mb-2">Assigned To</p>
                <p className="text-lg font-[600] text-[#1A1A1A]">{task.assignedTo}</p>
              </div>
              <div>
                <p className="text-xs font-[600] text-[#6D6D6D] uppercase tracking-wide mb-2">Due Date</p>
                <p className="text-lg font-[600] text-[#1A1A1A]">{task.dueDate}</p>
              </div>
              <div>
                <p className="text-xs font-[600] text-[#6D6D6D] uppercase tracking-wide mb-2">Created</p>
                <p className="text-lg font-[600] text-[#1A1A1A]">{task.createdDate}</p>
              </div>
              <div>
                <p className="text-xs font-[600] text-[#6D6D6D] uppercase tracking-wide mb-2">Category</p>
                <p className="text-lg font-[600] text-[#1A1A1A]">{task.category}</p>
              </div>
            </div>
          </div>

          {/* Attachments */}
          {task.attachments.length > 0 && (
            <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-8">
              <h2 className="text-xl font-[700] text-[#1A1A1A] mb-4">Attachments</h2>
              <div className="flex flex-col gap-3">
                {task.attachments.map((attachment: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-[#F1F3F7] hover:bg-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    <Tag size={20} className="text-[#6D6D6D]" />
                    <span className="font-[500] text-[#1A1A1A]">{attachment}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-8">
            <h2 className="text-xl font-[700] text-[#1A1A1A] mb-6">Comments</h2>
            {task.comments.length > 0 ? (
              <div className="flex flex-col gap-6 mb-6">
                {task.comments.map((comment: any, idx: number) => (
                  <div key={idx} className="pb-6 border-b border-[#E5E7EB] last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#004CFF] text-white flex items-center justify-center font-[700] text-xs">
                        {comment.author.split(' ')[0][0]}
                      </div>
                      <p className="font-[600] text-[#1A1A1A]">{comment.author}</p>
                      <span className="text-sm text-[#6D6D6D]">{comment.time}</span>
                    </div>
                    <p className="text-[#6D6D6D] ml-11">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#6D6D6D] mb-6">No comments yet.</p>
            )}

            {/* Add Comment */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors text-sm"
              />
              <button className="bg-[#004CFF] text-white font-[600] px-6 py-3 rounded-2xl hover:bg-[#0040CC] transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="col-span-1">
          {/* Activity Timeline */}
          <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-6">
            <h3 className="text-lg font-[700] text-[#1A1A1A] mb-4">Activity</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="w-1 bg-[#004CFF] rounded-full"></div>
                <div>
                  <p className="text-sm font-[600] text-[#1A1A1A]">Status changed to In Progress</p>
                  <p className="text-xs text-[#6D6D6D]">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-[#FF8A34] rounded-full"></div>
                <div>
                  <p className="text-sm font-[600] text-[#1A1A1A]">Assigned to {task.assignedTo}</p>
                  <p className="text-xs text-[#6D6D6D]">1 day ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-[600] text-[#1A1A1A]">Task created</p>
                  <p className="text-xs text-[#6D6D6D]">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
