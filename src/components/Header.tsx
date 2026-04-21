import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/20" />
      <div className="relative z-10 h-full container mx-auto container-padding">
        <div className="flex items-center justify-between h-full">
          <div className="flex flex-col">
            <span className="text-base lg:text-lg font-serif font-semibold tracking-[0.01em] text-foreground leading-none">
              The Scrum Lifeboat
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-primary/80 mt-1 font-mono">
              Communication Indicator
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
