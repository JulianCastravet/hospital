import { HeaderComponent } from "../components/header/headerComponent";
import { FooterComponent } from "../components/footer/footerComponent";
import { Flex } from "antd";
import { useTitle } from "../hooks/useTitle";

export const Homepage = () => {

  useTitle('Home - hospital')
  return (
    <>
      <HeaderComponent />
    <div className="homepage_wrapper">
      <Flex vertical justify="center" align="center">
        <h1>best hospital in the world</h1>
        <h3> here we take care of you like nowhere else</h3>
      </Flex>
    </div>
      <FooterComponent />
    </>
  );
};
