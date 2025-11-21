import React from "react";

import { Image, message, Spin } from "antd";
import { useRef } from "react";
import { CloseCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { useUserStore } from "../../store/user.store";

interface ImageWithUploadInterface {
  avatarUrl: string;
  userId: string;
  removeImage: () => void;
  loading: boolean;
}

export const ImageWithUpload = ({
  avatarUrl,
  userId,
  removeImage,
  loading,
}: ImageWithUploadInterface) => {
  const inputRef = useRef(null);
  const { updateAvatar } = useUserStore();
  const inputElement = inputRef.current as unknown as HTMLInputElement;

  const handleImageClick = () => {
    inputElement.click();
  };

  const handleInputClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("userAvatar", file);
    updateAvatar({ id: userId, data: formData }, message);
    e.target.value = "";
  };

  return (
    <div className="relative size-fit">
      {avatarUrl && (
        <CloseCircleFilled
          className="absolute text-red-500 right-[10px] top-[10px] z-1"
          onClick={removeImage}
        />
      )}
      {loading && (
        <Spin
          className="absolute z-1 inset-0 top-[50px]"
          indicator={<LoadingOutlined spin style={{ fontSize: 48 }} />}
          size="large"
        />
      )}

      <Image
        style={{
          objectFit: "cover",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "160px",
          height: "100%",
          maxHeight: "160px",
          position: "relative",
        }}
        preview={false}
        src={
          avatarUrl ||
          "https://dugonvenomlab.com/assets/images/imgPlaceholder.jpg"
        }
        onClick={!loading ? handleImageClick : () => {}}
        className="hover:cursor-pointer"
        loading="lazy"
      />

      <input
        type="file"
        accept="image/*"
        multiple={false}
        ref={inputRef}
        onChange={handleInputClick}
        className="hidden"
      />
    </div>
  );
};
