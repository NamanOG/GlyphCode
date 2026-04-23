import { memo } from "react";
import MagneticButton from "./MagneticButton";

const links = [
  { href: "#work", label: "WORK" },
  { href: "#capabilities", label: "CAPABILITIES" },
  { href: "#process", label: "PROCESS" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

function NavbarComponent() {
  return (
    <header className="fixed left-0 top-0 z-[100] h-14 w-full border-b border-[#252c35] bg-[rgba(11,13,16,0.78)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4 sm:px-10">
        <a
          href="#top"
          className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#FAFAFA] font-courier"
        >
          GLYPHCODE.
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <MagneticButton key={link.href}>
              <a
                href={link.href}
                className="text-[13px] text-[#8f98a3] transition-colors duration-150 ease-in hover:text-[#FAFAFA]"
              >
                {link.label}
              </a>
            </MagneticButton>
          ))}
        </nav>

        <MagneticButton>
          <a
            href="#contact"
            className="border border-[#313945] bg-transparent px-5 py-2 text-[12px] tracking-[0.08em] text-[#FAFAFA] transition-all duration-200 ease-in hover:bg-[#FAFAFA] hover:text-[#080808] rounded-[4px]"
          >
            INITIATE PROJECT →
          </a>
        </MagneticButton>
      </div>
    </header>
  );
}

const Navbar = memo(NavbarComponent);
Navbar.displayName = "Navbar";

export default Navbar;
