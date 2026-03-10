/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Info, 
  Bolt, 
  ClipboardX,
  UserPlus
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ExtractedTask {
  id: number;
  title: string;
  category: string;
  dueDate: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  reasoning: string;
  priority: 'High' | 'Medium' | 'Low' | 'Security' | 'Documentation';
}

const initialTasks: ExtractedTask[] = [
  {
    id: 1,
    title: 'Optimize Landing Page Bundle Size',
    category: 'HIGH PRIORITY',
    dueDate: 'Oct 30',
    priority: 'High',
    assignee: {
      name: 'Sarah Jenkins',
      avatar: 'https://picsum.photos/seed/sarah/100/100'
    },
    reasoning: 'Selected because of extensive React optimization experience and recent work on core library components.'
  },
  {
    id: 2,
    title: 'Draft API Auth Documentation',
    category: 'DOCUMENTATION',
    dueDate: 'Nov 2',
    priority: 'Documentation',
    assignee: {
      name: 'Mark Peterson',
      avatar: 'https://picsum.photos/seed/mark/100/100'
    },
    reasoning: 'Identified as the primary developer for the authentication module; best context for documentation.'
  },
  {
    id: 3,
    title: 'General Review of Security Protocols',
    category: 'SECURITY',
    dueDate: 'Oct 27',
    priority: 'Security',
    reasoning: 'No specific team member was mentioned. Suggest assigning to the Security Lead.'
  }
];

export const AIAnalysisPage = () => {
  const [sourceContent, setSourceContent] = useState(`Subject: Q4 Project Alpha Planning

Hi team, we need to get the following items moving by next Monday. 
Sarah, can you please take a look at the React component library updates and see if we can optimize the landing page bundle size?
Mark, you should start drafting the API documentation for the new authentication flow.
Also, we need a general review of the security protocols before Friday. 

Thanks,
Management`);

  const [tasks, setTasks] = useState<ExtractedTask[]>(initialTasks);

  return (
    <div className="flex flex-col min-h-screen bg-background-light">
      <header className="p-10 pb-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">AI Task Extractor</h2>
            <p className="text-slate-500 font-medium mt-2 max-w-2xl leading-relaxed">
              Transform unstructured content into actionable team tasks using advanced LLM analysis. 
              Paste your raw notes below to begin.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 shadow-sm">
            <Bolt className="w-4 h-4" />
            GPT-4o ACTIVE
          </div>
        </div>
      </header>

      <div className="p-10 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Input Section */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-5">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Source Content</label>
              <button 
                onClick={() => setSourceContent('')}
                className="text-primary text-xs font-bold flex items-center gap-1.5 hover:underline underline-offset-4"
              >
                <ClipboardX className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
            <textarea 
              value={sourceContent}
              onChange={(e) => setSourceContent(e.target.value)}
              className="flex-1 w-full bg-slate-50 border-none rounded-xl p-6 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 transition-all resize-none min-h-[450px] leading-relaxed text-sm"
              placeholder="Paste email threads, meeting transcripts, or rough notes here..."
            />
            <button className="mt-8 w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5" />
              Process with AI
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              Extracted Tasks
              <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {tasks.length} Found
              </span>
            </h3>
            <button className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 active:scale-95">
              <CheckCircle2 className="w-4.5 h-4.5" />
              Approve & Create All
            </button>
          </div>

          <div className="space-y-5">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white border border-slate-200 rounded-2xl p-6 group hover:border-primary/40 transition-all shadow-sm relative overflow-hidden">
                {/* Subtle Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={cn(
                          "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                          task.priority === 'High' && "bg-emerald-100 text-emerald-700",
                          task.priority === 'Documentation' && "bg-blue-100 text-blue-700",
                          task.priority === 'Security' && "bg-amber-100 text-amber-700"
                        )}>
                          {task.category}
                        </span>
                        <span className="text-slate-400 text-[11px] font-bold">Due: {task.dueDate}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg tracking-tight">{task.title}</h4>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5 border-y border-slate-50 mb-5">
                    <div className="flex items-center gap-3">
                      {task.assignee ? (
                        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                          <img src={task.assignee.avatar} alt={task.assignee.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                          <UserPlus className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggested Assignee</p>
                        <p className={cn("text-sm font-bold", task.assignee ? "text-slate-900" : "text-slate-400 italic")}>
                          {task.assignee ? task.assignee.name : 'Unassigned'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-primary/[0.03] p-4 rounded-xl border border-primary/10">
                      <p className="text-[9px] font-bold text-primary uppercase mb-1.5 flex items-center gap-1.5">
                        <Info className="w-3 h-3" />
                        AI Reasoning
                      </p>
                      <p className="text-xs text-slate-600 italic leading-relaxed">
                        "{task.reasoning}"
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="text-slate-900 bg-slate-100 hover:bg-slate-200 font-bold py-2.5 px-6 rounded-xl text-xs transition-all active:scale-95">
                      Confirm This Task
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <footer className="p-10 pt-0 mt-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex items-center justify-between shadow-sm">
          <div className="flex gap-12">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Total Tokens</span>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">1,248</span>
            </div>
            <div className="flex flex-col border-l border-slate-100 pl-12">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Confidence</span>
              <span className="text-2xl font-bold text-emerald-500 tracking-tight">98.4%</span>
            </div>
            <div className="flex flex-col border-l border-slate-100 pl-12">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Saved Time</span>
              <span className="text-2xl font-bold text-primary tracking-tight">~45 mins</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Auto-save enabled</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};
