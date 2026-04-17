import type { IconType } from "react-icons";

export interface ServiceSubsection {
  heading: string;
  items?: string[];
  text?: string;
}

export interface ServiceConfig {
  index?: string;
  icon: IconType;
  title: string;
  description: string;
  subsections?: ServiceSubsection[];
  primaryCta: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
}
