import { HeaderComponent } from "../components/header/headerComponent";
import { FooterComponent } from "../components/footer/footerComponent";
import { Typography } from "antd";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const { Title, Paragraph } = Typography;

export const Homepage = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  });

  return (
    <>
      <HeaderComponent />

      <main className="relative min-h-[calc(100vh-120px)] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/mars_hospital_wallpaper.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-10 pt-24 pb-16">
          <div className="max-w-3xl space-y-6">
            <Title
              level={1}
              className="hero-title !text-white !text-6xl !leading-tight drop-shadow-xl text-center"
            >
              Mars Advanced Medical Center
            </Title>

            <Paragraph className="hero-subtitle text-gray-200 text-xl leading-relaxed drop-shadow-lg text-center">
              The first interplanetary hospital dedicated to human life on Mars.
              Designed for zero-delay diagnostics, terraforming environments,
              and long-duration colony health monitoring.
            </Paragraph>
          </div>
        </div>
      </main>

      <FooterComponent />
    </>
  );
};
