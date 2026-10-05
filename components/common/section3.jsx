// Dark surface — navy.
const Section3 = ({ children, id, className = "" }) => (
  <section id={id} className={`relative z-[1] w-full bg-navy-900 text-white ${className}`}>
    {children}
  </section>
);
export default Section3;
