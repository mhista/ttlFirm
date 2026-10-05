// Light surface — white.
const Section1 = ({ children, id, className = "" }) => (
  <section id={id} className={`relative z-[1] w-full bg-white text-ink ${className}`}>
    {children}
  </section>
);
export default Section1;
