import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { timelineData } from "@/lib/about-data";


export default function About() {
  return (
    <div className="p-4">
      <Timeline data={timelineData} />
    </div>
  );
}
