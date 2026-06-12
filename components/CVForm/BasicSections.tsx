// components/CVForm/BasicSections.tsx
'use client';

import { CVData, EducationEntry, ProjectEntry, SkillCategory } from '@/lib/cv-types';

interface Props {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

export default function BasicSections({ cvData, setCvData }: Props) {
  // Education handlers (existing)
  const addEducation = () => {
    const newEdu: EducationEntry = { degree: "", institution: "", dates: "", gpa: "" };
    setCvData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (index: number, field: keyof EducationEntry, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (index: number) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Projects handlers (existing)
  const addProject = () => {
    const newProj: ProjectEntry = { title: "", dates: "", description: [""] };
    setCvData(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const updateProject = (index: number, field: 'title' | 'dates', value: string) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }));
  };

  const updateProjectDescription = (index: number, value: string) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.map((p, i) =>
        i === index ? { ...p, description: value.split('\n').filter(Boolean) } : p
      )
    }));
  };

  // Skills handlers
  const addSkillCategory = () => {
    const newCat: SkillCategory = { category: "", skills: [] };
    setCvData(prev => ({ ...prev, skills: [...prev.skills, newCat] }));
  };

  const updateSkillCategory = (index: number, field: 'category' | 'skills', value: string | string[]) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map((cat, i) => i === index ? { ...cat, [field]: value } : cat)
    }));
  };

  const removeSkillCategory = (index: number) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Achievements handlers
  const addAchievement = () => {
    setCvData(prev => ({ ...prev, achievements: [...prev.achievements, ""] }));
  };

  const updateAchievement = (index: number, value: string) => {
    setCvData(prev => ({
      ...prev,
      achievements: prev.achievements.map((a, i) => i === index ? value : a)
    }));
  };

  const removeAchievement = (index: number) => {
    setCvData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Education */}
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium text-lg">Education</h3>
          <button onClick={addEducation} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">+ Add</button>
        </div>
        {cvData.education.map((edu, i) => (
          <div key={i} className="bg-zinc-800 p-5 rounded-xl mb-4 space-y-3">
            {/* inputs for degree, institution, dates, gpa */}
            <input placeholder="Degree" value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3" />
            <input placeholder="Institution" value={edu.institution} onChange={e => updateEducation(i, 'institution', e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Dates" value={edu.dates} onChange={e => updateEducation(i, 'dates', e.target.value)} className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3" />
              <input placeholder="CGPA (optional)" value={edu.gpa || ''} onChange={e => updateEducation(i, 'gpa', e.target.value)} className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3" />
            </div>
            <button onClick={() => removeEducation(i)} className="text-red-500 text-sm">Remove</button>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium text-lg">Projects</h3>
          <button onClick={addProject} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">+ Add</button>
        </div>
        {cvData.projects.map((proj, i) => (
          <div key={i} className="bg-zinc-800 p-5 rounded-xl mb-4 space-y-3">
            <input placeholder="Project Title" value={proj.title} onChange={e => updateProject(i, 'title', e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3" />
            <input placeholder="Dates (optional)" value={proj.dates || ''} onChange={e => updateProject(i, 'dates', e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3" />
            <textarea 
              placeholder="Description (one point per line)"
              value={proj.description.join('\n')}
              onChange={e => updateProjectDescription(i, e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 h-28"
            />
            <button onClick={() => setCvData(prev => ({...prev, projects: prev.projects.filter((_, idx) => idx !== i)}))} className="text-red-500 text-sm">Remove</button>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium text-lg">Skills</h3>
          <button onClick={addSkillCategory} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">+ Add Category</button>
        </div>
        {cvData.skills.map((cat, i) => (
          <div key={i} className="bg-zinc-800 p-5 rounded-xl mb-4">
            <input placeholder="Category (e.g. Frontend)" value={cat.category} onChange={e => updateSkillCategory(i, 'category', e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 mb-3" />
            <input placeholder="Skills (comma separated)" value={cat.skills.join(', ')} onChange={e => updateSkillCategory(i, 'skills', e.target.value.split(',').map(s => s.trim()))} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3" />
            <button onClick={() => removeSkillCategory(i)} className="text-red-500 text-sm mt-3">Remove Category</button>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium text-lg">Achievements</h3>
          <button onClick={addAchievement} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">+ Add</button>
        </div>
        {cvData.achievements.map((ach, i) => (
          <div key={i} className="flex gap-3 mb-3">
            <input 
              value={ach} 
              onChange={e => updateAchievement(i, e.target.value)}
              placeholder="Achievement / Award"
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3"
            />
            <button onClick={() => removeAchievement(i)} className="text-red-500 px-4">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}