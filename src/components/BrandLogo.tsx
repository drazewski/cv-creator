import type { MouseEventHandler } from 'react';

interface BrandLogoProps {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function BrandLogo({ href, onClick }: BrandLogoProps) {
  return (
    <a href={href} onClick={onClick} className="cv-toolbar__logo" title="MyCeeVee">
      My
      <span className="cv-toolbar__logo-c">C</span>
      <span className="cv-toolbar__logo-ee">ee</span>
      <span className="cv-toolbar__logo-v">V</span>
      <span className="cv-toolbar__logo-ee">ee</span>
    </a>
  );
}
