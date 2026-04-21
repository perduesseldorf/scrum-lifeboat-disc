const FooterSection = () => {
  return (
    <footer className="relative h-14 mt-8">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-primary/20" />
      <div className="relative z-10 h-full container mx-auto container-padding">
        <div className="flex items-center justify-center h-full">
          <p className="text-[11px] text-foreground/70 text-center">
            Indicative assessment for didactic use. Not a validated instrument. Nothing is stored or transmitted.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
