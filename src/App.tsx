/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
  MoreHorizontal
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

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const chartData = [
  { name: 'MON', value: 60 },
  { name: 'TUE', value: 45 },
  { name: 'WED', value: 75 },
  { name: 'THU', value: 40 },
  { name: 'FRI', value: 90 },
  { name: 'SAT', value: 30 },
  { name: 'SUN', value: 25 },
];

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

export default function App() {
  return (
    <div className="flex min-h-screen bg-background-light">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col fixed h-full z-10">
        <div className="p-8 flex flex-col gap-1">
          <h1 className="text-primary text-2xl font-bold tracking-tight">TaskFlow</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Professional Workspace</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary transition-all group">
            <DashboardIcon className="w-5 h-5" />
            <span className="text-sm font-semibold">Dashboard</span>
          </a>
          {[
            { icon: CheckSquare, label: 'Tasks' },
            { icon: Users, label: 'People' },
            { icon: BrainCircuit, label: 'AI Analysis' },
          ].map((item) => (
            <a key={item.label} href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
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
      </main>
    </div>
  );
}
