// Tinted surface — used to separate two light sections without a border.
const Section2 = ({ children, id, className = "" }) => (
  <section id={id} className={`relative z-[1] w-full bg-surface-alt text-ink ${className}`}>
    {children}
  </section>
);
export default Section2;
