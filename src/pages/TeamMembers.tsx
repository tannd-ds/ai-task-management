/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  Mail, 
  ArrowRight 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Member {
  name: string;
  role: string;
  avatar: string;
  status: 'Available' | 'Busy';
  skills: string[];
  email: string;
}

const members: Member[] = [
  {
    name: 'Alex Rivera',
    role: 'Senior Developer',
    avatar: 'https://picsum.photos/seed/alex/100/100',
    status: 'Available',
    skills: ['React', 'Python', 'AWS'],
    email: 'alex.rivera@acme.com'
  },
  {
    name: 'Sam Chen',
    role: 'Product Designer',
    avatar: 'https://picsum.photos/seed/sam/100/100',
    status: 'Busy',
    skills: ['Figma', 'UI/UX', 'Prototyping'],
    email: 'sam.c@acme.com'
  },
  {
    name: 'Jordan Smith',
    role: 'Frontend Engineer',
    avatar: 'https://picsum.photos/seed/jordan/100/100',
    status: 'Available',
    skills: ['Vue.js', 'Tailwind', 'TypeScript'],
    email: 'jordan.s@acme.com'
  },
  {
    name: 'Taylor Wong',
    role: 'Backend Lead',
    avatar: 'https://picsum.photos/seed/taylor/100/100',
    status: 'Available',
    skills: ['Node.js', 'Go', 'PostgreSQL'],
    email: 'taylor.w@acme.com'
  },
  {
    name: 'Casey Jones',
    role: 'UX Researcher',
    avatar: 'https://picsum.photos/seed/casey/100/100',
    status: 'Busy',
    skills: ['Research', 'User Testing'],
    email: 'casey.j@acme.com'
  },
  {
    name: 'Riley Blair',
    role: 'DevOps Engineer',
    avatar: 'https://picsum.photos/seed/riley/100/100',
    status: 'Available',
    skills: ['Docker', 'K8s', 'Terraform'],
    email: 'riley.b@acme.com'
  }
];

const MemberCard = ({ member, ...props }: { member: Member, key?: any }) => (
  <div {...props} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
        <img 
          src={member.avatar} 
          alt={member.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <span className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
        member.status === 'Available' 
          ? "bg-emerald-50 text-emerald-600" 
          : "bg-amber-50 text-amber-600"
      )}>
        <span className={cn(
          "w-1.5 h-1.5 rounded-full",
          member.status === 'Available' ? "bg-emerald-500" : "bg-amber-500"
        )}></span>
        {member.status}
      </span>
    </div>
    
    <div>
      <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
      <p className="text-sm font-medium text-slate-500">{member.role}</p>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      {member.skills.map(skill => (
        <span key={skill} className="px-2.5 py-1 bg-primary/5 text-primary text-[11px] font-bold rounded-lg">
          {skill}
        </span>
      ))}
    </div>

    <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Mail className="w-4 h-4" />
        <span className="truncate">{member.email}</span>
      </div>
      <button className="flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4 transition-all w-fit group/btn">
        View Tasks
        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

export const TeamMembersPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light">
      <header className="p-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Team Members</h2>
            <p className="text-slate-500 font-medium mt-1">Manage and connect with your team across departments.</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            Add Person
          </button>
        </div>

        {/* Filters & Search */}
        <div className="mt-10 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name, role or skill..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all">
              <span>Availability</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all">
              <span>Role</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      <section className="p-10 pt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {members.map((member, idx) => (
          <MemberCard key={idx} member={member} />
        ))}
      </section>
    </div>
  );
};
