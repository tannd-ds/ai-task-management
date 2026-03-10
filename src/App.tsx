/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard as DashboardIcon, 
  CheckSquare, 
  Users, 
  BrainCircuit, 
  TrendingUp as TrendingUpIcon, 
  TrendingDown as TrendingDownIcon, 
  AlertCircle,
  Clock,
  FileText,
  Terminal as TerminalIcon,
  MoreHorizontal,
  Search,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Folder,
  Calendar,
  Settings,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { TeamMembersPage } from './pages/TeamMembers';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const StatCard = ({ title, value, trend, trendValue, alert }: { 
  title: string, 
  value: string | number, 
  trend?: 'up' | 'down', 
  trendValue?: string,
  alert?: boolean
}) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
    {alert && (
      <div className="absolute top-0 right-0 p-3">
        <AlertCircle className="w-5 h-5 text-amber-500" />
      </div>
    )}
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <div className="flex items-end justify-between mt-2">
      <p className={cn("text-3xl font-bold", alert && "text-amber-500")}>{value}</p>
      {trend && (
        <span className={cn(
          "text-sm font-bold flex items-center gap-1",
          trend === 'up' ? "text-emerald-500" : "text-rose-500"
        )}>
          {trend === 'up' ? <TrendingUpIcon className="w-4 h-4" /> : <TrendingDownIcon className="w-4 h-4" />}
          {trendValue}
        </span>
      )}
      {alert && (
        <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
          Alert
        </span>
      )}
      {!trend && !alert && <span className="text-slate-400 text-sm font-medium">0%</span>}
    </div>
  </div>
);

const TaskItem = ({ icon: Icon, title, due, priority, statusColor, bgColor, iconColor }: {
  icon: any,
  title: string,
  due: string,
  priority: string,
  statusColor: string,
  bgColor: string,
  iconColor: string
}) => (
  <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
    <div className={cn("flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center", bgColor, iconColor)}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-xs text-slate-500">
        Due {due} • <span className="text-rose-500 font-medium">{priority}</span>
      </p>
    </div>
    <div className={cn("w-2.5 h-2.5 rounded-full", statusColor)}></div>
  </div>
);

const ReviewCard = ({ title, description, avatar, badge }: {
  title: string,
  description: string,
  avatar: string,
  badge: string
}) => (
  <div className="min-w-[280px] xl:min-w-0 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide">
        {badge}
      </span>
      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
        <img 
          src={avatar} 
          alt="Reviewer" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
    <h4 className="font-bold text-sm mb-1 text-slate-900">{title}</h4>
    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{description}</p>
    <button className="w-full py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all active:scale-95">
      Start Review
    </button>
  </div>
);

// --- Pages ---

const Dashboard = () => {
  const chartData = [
    { name: 'MON', value: 60 },
    { name: 'TUE', value: 45 },
    { name: 'WED', value: 75 },
    { name: 'THU', value: 40 },
    { name: 'FRI', value: 90 },
    { name: 'SAT', value: 30 },
    { name: 'SUN', value: 25 },
  ];

  return (
    <div className="p-10">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Overview</h2>
          <p className="text-slate-400 font-medium mt-1">Monday, Oct 23, 2023</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
            New Task
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Tasks" value="128" trend="up" trendValue="+5%" />
        <StatCard title="Tasks Pending Review" value="12" alert />
        <StatCard title="Available People" value="8" />
        <StatCard title="Completed Week" value="45" trend="down" trendValue="-2%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
          {/* High Priority Tasks */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-slate-900">High Priority Tasks</h3>
              <button className="text-primary text-sm font-bold hover:underline underline-offset-4">View All</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                <TaskItem 
                  icon={Clock} 
                  title="Update Project Documentation" 
                  due="Today" 
                  priority="High Priority"
                  statusColor="bg-emerald-500"
                  bgColor="bg-rose-50"
                  iconColor="text-rose-500"
                />
                <TaskItem 
                  icon={FileText} 
                  title="Q3 Financial Report Finalization" 
                  due="Tomorrow" 
                  priority="High Priority"
                  statusColor="bg-amber-500"
                  bgColor="bg-primary/10"
                  iconColor="text-primary"
                />
                <TaskItem 
                  icon={TerminalIcon} 
                  title="Security Patch Deployment" 
                  due="Oct 25" 
                  priority="High Priority"
                  statusColor="bg-slate-200"
                  bgColor="bg-indigo-50"
                  iconColor="text-indigo-600"
                />
              </div>
            </div>
          </section>

          {/* Chart */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-5">Task Completion Trend</h3>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? '#4848e5' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Needs Review */}
        <div className="xl:col-span-1">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-5">Needs Review</h3>
            <div className="flex xl:flex-col gap-5 overflow-x-auto xl:overflow-x-visible custom-scrollbar pb-6 xl:pb-0">
              <ReviewCard 
                badge="Review Now"
                title="UI Redesign Feedback"
                description="Initial mockups for the new mobile dashboard need your approval before handoff."
                avatar="https://picsum.photos/seed/user1/100/100"
              />
              <ReviewCard 
                badge="Review Now"
                title="API Integration Docs"
                description="The documentation for the payment gateway integration requires technical sign-off."
                avatar="https://picsum.photos/seed/user2/100/100"
              />
              <ReviewCard 
                badge="Review Now"
                title="Database Migration Plan"
                description="Final check on the migration script scheduled for the upcoming weekend maintenance."
                avatar="https://picsum.photos/seed/user3/100/100"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const TasksPage = () => {
  const tasks = [
    { id: 'PROJ-1204', title: 'API Endpoint Authentication Refactor', assignee: 'Sarah Chen', status: 'In Progress', priority: 'High', due: 'Oct 24, 2023', needsReview: true, avatar: 'https://picsum.photos/seed/sarah/40/40' },
    { id: 'PROJ-1192', title: 'Design System Documentation', assignee: 'Marcus Wright', status: 'Todo', priority: 'Low', due: 'Oct 28, 2023', avatar: 'https://picsum.photos/seed/marcus/40/40' },
    { id: 'PROJ-1215', title: 'Mobile Responsive Bugfix (Checkout)', assignee: 'Elena Gomez', status: 'Done', priority: 'Medium', due: 'Overdue', avatar: 'https://picsum.photos/seed/elena/40/40' },
    { id: 'PROJ-1188', title: 'Database Migration Scripts', assignee: 'Liam O\'Connor', status: 'In Progress', priority: 'High', due: 'Nov 01, 2023', needsReview: true, avatar: 'https://picsum.photos/seed/liam/40/40' },
    { id: 'PROJ-1222', title: 'Marketing Landing Page Copy', assignee: 'Sofia Rodriguez', status: 'Todo', priority: 'Medium', due: 'Nov 05, 2023', avatar: 'https://picsum.photos/seed/sofia/40/40' },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-10 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">124 Total</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="pl-11 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm w-72 focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
            <Plus className="w-4.5 h-4.5" />
            Create Task
          </button>
        </div>
      </header>

      {/* Filters Bar */}
      <section className="p-6 bg-white border-b border-slate-100 flex items-center gap-6 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filters</span>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['All', 'Todo', 'In Progress', 'Done'].map((filter, idx) => (
              <button 
                key={filter}
                className={cn(
                  "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                  idx === 0 ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center gap-4">
          <select className="bg-white border border-slate-200 rounded-xl text-xs font-bold px-4 py-2 focus:ring-primary focus:border-primary outline-none cursor-pointer">
            <option>Priority: All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative inline-flex items-center">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Needs Review</span>
          </label>
        </div>
        <div className="ml-auto">
          <button className="text-slate-400 hover:text-primary flex items-center gap-2 text-xs font-bold transition-colors">
            <Filter className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </section>

      {/* Table Section */}
      <section className="flex-1 overflow-auto p-10 bg-background-light">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[40%]">Task Title</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assignee</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Priority</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tasks.map((task) => (
                <tr key={task.id} className={cn(
                  "hover:bg-slate-50/50 transition-colors group border-l-4",
                  task.needsReview ? "border-l-amber-400" : "border-l-transparent"
                )}>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{task.title}</span>
                      <div className="flex items-center gap-2 mt-1.5">
                        {task.needsReview && (
                          <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Needs Review</span>
                        )}
                        <span className="text-[11px] text-slate-400 font-medium">{task.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                        <img src={task.avatar} alt={task.assignee} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      task.status === 'In Progress' && "bg-blue-50 text-blue-600",
                      task.status === 'Todo' && "bg-slate-100 text-slate-600",
                      task.status === 'Done' && "bg-emerald-50 text-emerald-600"
                    )}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                      task.priority === 'High' && "bg-rose-50 text-rose-600",
                      task.priority === 'Medium' && "bg-amber-50 text-amber-600",
                      task.priority === 'Low' && "bg-emerald-50 text-emerald-600"
                    )}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "text-xs font-bold",
                      task.due === 'Overdue' ? "text-rose-500 italic" : "text-slate-500"
                    )}>
                      {task.due}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Footer */}
          <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
            <p className="text-xs font-bold text-slate-400">Showing 1 to 10 of 124 tasks</p>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 hover:text-slate-900 transition-all disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3.5 py-1.5 text-xs font-bold bg-primary text-white rounded-lg shadow-sm">1</button>
              <button className="px-3.5 py-1.5 text-xs font-bold text-slate-500 hover:bg-white hover:text-slate-900 rounded-lg transition-all">2</button>
              <button className="px-3.5 py-1.5 text-xs font-bold text-slate-500 hover:bg-white hover:text-slate-900 rounded-lg transition-all">3</button>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-400 hover:text-slate-900 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'tasks' | 'team'>('dashboard');

  return (
    <div className="flex min-h-screen bg-background-light">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col fixed h-full z-20">
        <div className="p-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <DashboardIcon className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 text-sm font-bold">Project Manager</h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Team Workspace</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
              currentPage === 'dashboard' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <DashboardIcon className="w-5 h-5" />
            <span className="text-sm font-bold">Dashboard</span>
          </button>
          <button 
            onClick={() => setCurrentPage('tasks')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
              currentPage === 'tasks' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-sm font-bold">Tasks</span>
          </button>
          <button 
            onClick={() => setCurrentPage('team')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
              currentPage === 'team' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <Users className="w-5 h-5" />
            <span className="text-sm font-bold">Team Members</span>
          </button>
          {[
            { icon: Folder, label: 'Projects' },
            { icon: Calendar, label: 'Calendar' },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          ))}

          <div className="pt-6 pb-2 px-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">System</p>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-bold">Settings</span>
          </button>
        </nav>

        {/* Pro Plan Card */}
        <div className="p-6">
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 group hover:bg-primary/10 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs font-bold text-slate-900">Pro Plan</p>
              <ArrowUpRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-all" />
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mb-4 overflow-hidden">
              <div className="bg-primary h-full w-3/4 rounded-full"></div>
            </div>
            <button className="w-full text-[10px] font-bold text-primary uppercase tracking-widest hover:underline underline-offset-4">
              Upgrade Now
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold border border-primary/20">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900">John Doe</span>
              <span className="text-[10px] text-slate-400 font-medium">Admin Account</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'tasks' && <TasksPage />}
        {currentPage === 'team' && <TeamMembersPage />}
      </main>
    </div>
  );
}
