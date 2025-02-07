
import "@styles/global.css";
import Footer from "@components/layout/footer";
import ScrollToTop from "@components/common/scrollToTop";


export const metadata = {
  title: "turuchilawfirm",
  description: "Expert in legal profession",
};

const Rootlayout = ({ children }) => {

  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <body>
        <main className="main font-jost">

          {children}
          <Footer />
          <ScrollToTop/>
        </main>
      </body>
    </html>
  );
};

export default Rootlayout;
