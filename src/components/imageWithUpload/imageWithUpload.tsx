import React from "react";

import { Image, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { CloseCircleFilled } from "@ant-design/icons";
import { useUserStore } from "../../store/user.store";

export const ImageWithUpload = ({
  avatarUrl,
  userId,
  removeImage,
}: {
  avatarUrl: string;
  userId: string;
  removeImage: () => void;
}) => {
  const inputRef = useRef(null);
  const { updateAvatar } = useUserStore();

  const handleImageClick = () => {
    const inputElement = inputRef.current as unknown as HTMLInputElement;
    inputElement.click();
  };

  const handleInputClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("userAvatar", file);
    updateAvatar(userId, formData, message);
  };

  return (
    <>
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
        src={avatarUrl || "https://placehold.co/600x400"}
        onClick={handleImageClick}
        className="hover:cursor-pointer"
        loading="lazy"
      />

      {avatarUrl && (
        <CloseCircleFilled style={{ color: "red" }} onClick={removeImage} />
      )}

      <input
        type="file"
        accept="image/*"
        multiple={false}
        ref={inputRef}
        onChange={handleInputClick}
        className="hidden"
      />
    </>
  );
};
