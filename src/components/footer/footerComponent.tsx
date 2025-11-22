import { Layout, Typography } from "antd";
const { Footer } = Layout;
const { Text } = Typography;

export const FooterComponent = () => {
  return (
    <Footer
      className="backdrop-blur-md bg-black/40 text-white"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "16px 10px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-center max-w-7xl mx-auto w-full text-sm px-4">
        
        <div className="text-gray-300 mb-2 md:mb-0">
          <Text className="text-gray-400">
            © 2025 Mars Advanced Medical Center — Olympus Mons Sector
          </Text>
        </div>

        <div className="flex flex-col md:flex-row md:gap-6 text-gray-300 text-xs mb-2 md:mb-0">
          <Text>Interplanetary Healthcare Division</Text>
          <Text>Emergency Channel: 991-MARS</Text>
          <Text>Comms Link: medcenter@mars.colony</Text>
        </div>

        <div className="text-gray-300 text-xs">
          <Text>Life Support Status: Stable • Oxygen 98%</Text>
        </div>
      </div>
    </Footer>
  );
};
