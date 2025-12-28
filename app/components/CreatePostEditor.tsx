"use client";

import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

const skills = ["JavaScript", "Next.js", "Python", "UI/UX", "AI Basics"];
const postTypes = ["Tip", "Explanation", "Snippet"];

type Props = {
  selectedSkill: string;
  setSelectedSkill: (skill: string) => void;
};

export default function CreatePostEditor() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [postType, setPostType] = useState(postTypes[0]);
  const [content, setContent] = useState("");
  const maxChars = 500;

  async function handleSubmit() {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ selectedSkill, postType, content }),
    });
    alert("Post submitted! (mock)");
    window.location.href = `/feed?skill=${selectedSkill}`;
  }

  return (
    <div className="frosted bg-app border border-app rounded-xl p-6 space-y-4">
      
      {/* Skill + Type selectors */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="frosted p-2 rounded border border-app bg-app text-app"
        >
          {skills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          className="frosted p-2 rounded border border-app bg-app text-app"
        >
          {postTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Markdown Editor */}
      <div className="flex flex-col md:flex-row gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here (max 500 chars)..."
          maxLength={maxChars}
          className="flex-1 overflow-auto p-4 rounded border border-app bg-app text-app resize-none h-48"
        />

        {/* Live Preview */}
        <div className="flex-1 overflow-auto p-4 rounded border border-app bg-[rgb(var(--muted))] resize-none">
          <h3 className="font-medium mb-2">Preview</h3>
          <MarkdownRenderer content={content} />
        </div>
      </div>

      {/* Character counter + Post button */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{content.length}/{maxChars}</span>
        <button
          className="bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] px-4 py-2 rounded hover:opacity-90"
          disabled={content.length === 0}
          onClick={() => handleSubmit()}
        >
          Post
        </button>
      </div>
    </div>
  );
}
