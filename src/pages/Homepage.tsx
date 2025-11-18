import { HeaderComponent } from "../components/header/headerComponent";
import { FooterComponent } from "../components/footer/footerComponent";
import { Flex } from "antd";
import { useTitle } from "../hooks/useTitle";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAuthStore } from "../store/auth.store";

gsap.registerPlugin(useGSAP);

export const Homepage = () => {
  useTitle("Hospital - Homepage");
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("dashboard/overview");
    }
  }, [isAuthenticated, navigate]);

  useGSAP(() => {
    gsap.fromTo(".title", { x: "100vw" }, { x: 0 }).duration(1);
    gsap.fromTo(".subtitle", { x: "-100vw" }, { x: 0 }).duration(1);
  });

  return (
    <>
      <HeaderComponent />
      <div className="homepage_wrapper">
        <Flex vertical justify="center" align="center">
          <h1 className="title">The nextGen Hospital</h1>
          <h3 className="subtitle">
            Embracing the mission to help people heal on Mars.
          </h3>
        </Flex>
      </div>
      <FooterComponent />
    </>
  );
};
