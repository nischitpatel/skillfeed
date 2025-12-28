"use client";

import { useState } from "react";
import CreatePostEditor from "../components/CreatePostEditor";

export default function CreatePage() {
  const [selectedSkill, setSelectedSkill] = useState("");

  return (
    <div className="min-h-screen bg-frosted text-app p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <CreatePostEditor
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
        />
      </div>
    </div>
  );
}
