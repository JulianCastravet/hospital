import { Modal } from "antd";

export interface ConfirmationModal {
  open: boolean;
  onOk: (v?: unknown) => void;
  onCancel: (v?: unknown) => void;
  mainTitle?: string;
  secondaryTitle?: string;
  icon: React.ReactNode;
}

export const ConfirmationModal = (props: ConfirmationModal) => {
  const { open, onOk, onCancel, mainTitle, secondaryTitle, icon } = props;
  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel}>
      <div className="flex flex-col justify-center items-center gap-5">
        {icon}
        <h1 className="text-4xl font-bold">{mainTitle}</h1>
        <h4 className="text-1xl italic">{secondaryTitle}</h4>
      </div>
    </Modal>
  );
};
