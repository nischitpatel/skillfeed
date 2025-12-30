'use client';

import { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import SkillSelector from "./SkillSelector";

type Post = {
  id: string;
  username: string;
  skill: string;
  content: string;
  createdAt: string;
};

type Props = {
  posts: Post[];
};

export default function ProfileTabs({ posts }: Props) {
  const [activeTab, setActiveTab] = useState<"all" | "skill">("all");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skills = Array.from(new Set(posts.map(p => p.skill)));

  return (
    <section className="w-full">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {["all", "skill"].map(tab => {
          const active = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any);
                setSelectedSkill(null); // reset when switching tabs
              }}
              className={`pb-3 text-sm font-medium ${
                active
                  ? "text-[rgb(var(--primary))] border-b-2 border-[rgb(var(--primary))]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab === "all" ? "All Posts" : "By Skill"}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === "all" && (
        <ProfilePosts posts={posts} />
      )}

      {activeTab === "skill" && (
        <SkillSelector
          skills={skills}
          posts={posts}
          selectedSkill={selectedSkill}
          onSelect={setSelectedSkill}
        />
      )}
    </section>
  );
}
