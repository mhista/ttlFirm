import "@styles/global.css";
import Header from "@components/layout/header";
import Footer from "@components/layout/footer";

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
        <main className="main">
          <Header />

          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default Rootlayout;
