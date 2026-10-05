// Deep accentless band for conversion sections.
// Previously `bg-accent-500 opacity-55`, which washed out every child element
// with it — opacity on a parent cannot be undone by a child.
const Section4 = ({ children, id, className = "" }) => (
  <section
    id={id}
    className={`relative z-[1] w-full bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white ${className}`}
  >
    {children}
  </section>
);
export default Section4;
