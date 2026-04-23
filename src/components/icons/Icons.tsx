import React from "react";

type IconProps = { className?: string; title?: string };

export const CityIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3" y="6" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <rect x="7" y="10" width="2" height="2" fill="currentColor" />
    <rect x="11" y="10" width="2" height="2" fill="currentColor" />
    <rect x="15" y="10" width="2" height="2" fill="currentColor" />
    <rect x="7" y="14" width="2" height="2" fill="currentColor" />
    <rect x="11" y="14" width="2" height="2" fill="currentColor" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3.5" y="7" width="17" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <path d="M8 7V6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <rect x="7" y="11" width="3" height="3" fill="currentColor" />
  </svg>
);

export const LeafIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20 4s-4 2-8 6-6 8-6 8 4-2 8-6 6-8 6-8z" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <path d="M8 16c1.5-1 4-3 7-6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AtomIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="7" ry="3.6" stroke="currentColor" strokeWidth="1" fill="none" />
    <ellipse cx="12" cy="12" rx="3.6" ry="7" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M14 3s3 1 5 3c-1.2 2-3 5-3 5l-6 6-3-3 6-6s2.8-1.8 3-3z" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="9.5" cy="14.5" r="1.2" fill="currentColor" />
  </svg>
);

export const GalleryIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M6 15l3-4 3 3 4-5 4 6" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2l1.8 3.6L18 7l-4.2 1.4L12 12l-1.8-3.6L6 7l4.2-1.4L12 2z" fill="currentColor" />
  </svg>
);

export default {};
