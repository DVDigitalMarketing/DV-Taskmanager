import { useState } from 'react';
import { Bell, Settings, Users, Calendar, CheckSquare, MoreVertical, ChevronDown } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  category: 'Today' | 'Tomorrow' | 'Overdue';
}

interface Employee {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'overloaded';
  nextFree?: string;
}

interface DashboardPageProps {
  onNavigate: (page: string, taskId?: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Update client proposal',
      description: 'Revise and finalize the Q4 proposal',
      assignedTo: 'Sarah Chen',
      priority: 'High',
      dueDate: '2025-11-27',
      category: 'Today',
    },
    {
      id: '2',
      title: 'Review design mockups',
      description: 'Check the new dashboard designs',
      assignedTo: 'Michael Johnson',
      priority: 'Medium',
      dueDate: '2025-11-27',
      category: 'Today',
    },
    {
      id: '3',
      title: 'Team meeting prep',
      description: 'Prepare slides for tomorrow\'s standup',
      assignedTo: 'Emma Rodriguez',
      priority: 'Medium',
      dueDate: '2025-11-28',
      category: 'Tomorrow',
    },
    {
      id: '4',
      title: 'Fix critical bug',
      description: 'Resolve login authentication issue',
      assignedTo: 'James Wilson',
      priority: 'High',
      dueDate: '2025-11-26',
      category: 'Overdue',
    },
  ]);

  const [employees] = useState<Employee[]>([
    { id: '1', name: 'Sarah Chen', status: 'available', nextFree: 'Now' },
    { id: '2', name: 'Michael Johnson', status: 'busy', nextFree: 'In 2 hours' },
    { id: '3', name: 'Emma Rodriguez', status: 'overloaded', nextFree: 'Tomorrow 10am' },
    { id: '4', name: 'James Wilson', status: 'available', nextFree: 'Now' },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    priority: 'Medium',
  });

  const todayCount = tasks.filter((t) => t.category === 'Today').length;
  const tomorrowCount = tasks.filter((t) => t.category === 'Tomorrow').length;
  const overdueCount = tasks.filter((t) => t.category === 'Overdue').length;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title && newTask.dueDate && newTask.assignedTo) {
      const newTaskObj: Task = {
        id: String(tasks.length + 1),
        title: newTask.title,
        description: newTask.description,
        assignedTo: newTask.assignedTo,
        priority: newTask.priority as 'Low' | 'Medium' | 'High',
        dueDate: newTask.dueDate,
        category: 'Today',
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask({ title: '', description: '', dueDate: '', assignedTo: '', priority: 'Medium' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'overloaded':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEmployeeInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const tasksByCategory = {
    Today: tasks.filter((t) => t.category === 'Today'),
    Tomorrow: tasks.filter((t) => t.category === 'Tomorrow'),
    Overdue: tasks.filter((t) => t.category === 'Overdue'),
  };

  return (
    <div className="min-h-screen bg-[#F1F3F7] flex" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
      {/* Left Sidebar */}
      <div className="w-64 bg-white rounded-r-3xl shadow-lg p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <CheckSquare size={32} className="text-[#004CFF]" />
          <h1 className="text-xl font-[800] text-[#1A1A1A]">Task Manager</h1>
        </div>

        <nav className="flex flex-col gap-3">
          <div className="px-4 py-3 rounded-2xl bg-[#004CFF] text-white font-[600] flex items-center gap-3">
            <CheckSquare size={20} />
            Dashboard
          </div>
          <div className="px-4 py-3 rounded-2xl text-[#6D6D6D] font-[500] flex items-center gap-3 hover:bg-[#F1F3F7] transition-colors cursor-pointer">
            <CheckSquare size={20} />
            My Tasks
          </div>
          <div className="px-4 py-3 rounded-2xl text-[#6D6D6D] font-[500] flex items-center gap-3 hover:bg-[#F1F3F7] transition-colors cursor-pointer">
            <Users size={20} />
            Employees
          </div>
          <div className="px-4 py-3 rounded-2xl text-[#6D6D6D] font-[500] flex items-center gap-3 hover:bg-[#F1F3F7] transition-colors cursor-pointer">
            <Calendar size={20} />
            Calendar
          </div>
          <div className="px-4 py-3 rounded-2xl text-[#6D6D6D] font-[500] flex items-center gap-3 hover:bg-[#F1F3F7] transition-colors cursor-pointer">
            <Settings size={20} />
            Settings
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-[#E5E7EB] px-8 py-5 flex items-center justify-between">
          <h2 className="text-3xl font-[800] text-[#1A1A1A]">Dashboard</h2>
          <div className="flex items-center gap-6">
            <Bell size={24} className="text-[#6D6D6D] cursor-pointer hover:text-[#004CFF] transition-colors" />
            <div className="w-10 h-10 rounded-full bg-[#004CFF] text-white flex items-center justify-center font-[700] cursor-pointer">
              U
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="px-8 py-8 grid grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-6 border-l-4 border-[#004CFF]">
            <p className="text-[#6D6D6D] font-[500] text-sm">Today</p>
            <p className="text-4xl font-[800] text-[#1A1A1A] mt-2">{todayCount}</p>
          </div>
          <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-6 border-l-4 border-[#FF8A34]">
            <p className="text-[#6D6D6D] font-[500] text-sm">Tomorrow</p>
            <p className="text-4xl font-[800] text-[#1A1A1A] mt-2">{tomorrowCount}</p>
          </div>
          <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-6 border-l-4 border-red-500">
            <p className="text-[#6D6D6D] font-[500] text-sm">Overdue</p>
            <p className="text-4xl font-[800] text-[#1A1A1A] mt-2">{overdueCount}</p>
          </div>
        </div>

        {/* Bottom Content - Two Columns */}
        <div className="px-8 pb-8 grid grid-cols-3 gap-6 flex-1">
          {/* Left Column - Team Availability & Task Form */}
          <div className="col-span-1 flex flex-col gap-6">
            {/* Team Availability */}
            <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-6">
              <h3 className="text-lg font-[700] text-[#1A1A1A] mb-4">Team Availability</h3>
              <div className="flex flex-col gap-4">
                {employees.map((emp) => (
                  <div key={emp.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#004CFF] text-white flex items-center justify-center font-[700] text-sm">
                      {getEmployeeInitials(emp.name)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-[600] text-[#1A1A1A]">{emp.name}</p>
                      <p className="text-xs text-[#6D6D6D]">{emp.nextFree}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(emp.status)}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assign New Task Form */}
            <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-6">
              <h3 className="text-lg font-[700] text-[#1A1A1A] mb-4">Assign New Task</h3>
              <form onSubmit={handleAddTask} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors text-sm"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors text-sm resize-none h-20"
                />
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors text-sm"
                  required
                />
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors text-sm"
                  required
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.name}>
                      {emp.name}
                    </option>
                  ))}
                </select>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors text-sm"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-[#004CFF] text-white font-[600] text-base px-9 py-4 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200 hover:bg-[#0040CC] hover:shadow-[0_12px_32px_rgba(0,76,255,0.2)]"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Tasks */}
          <div className="col-span-2 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-380px)]">
            {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-[700] text-[#1A1A1A]">{category}</h3>
                  <span className="text-sm font-[600] text-[#6D6D6D] bg-[#F1F3F7] px-3 py-1 rounded-full">
                    {categoryTasks.length}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {categoryTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onNavigate('taskDetails', task.id)}
                      className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all cursor-pointer border-l-4 border-[#004CFF]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-[600] text-[#1A1A1A] text-base flex-1">{task.title}</h4>
                        <MoreVertical size={18} className="text-[#6D6D6D] hover:text-[#004CFF] transition-colors" />
                      </div>
                      <p className="text-sm text-[#6D6D6D] mb-4">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#FF8A34] text-white flex items-center justify-center font-[700] text-xs">
                            {getEmployeeInitials(task.assignedTo)}
                          </div>
                          <span className="text-sm font-[500] text-[#1A1A1A]">{task.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-[600] px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-[#6D6D6D]">{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
