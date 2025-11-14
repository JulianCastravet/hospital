import { App, Image } from "antd";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { getUserAvatar } from "../../api/user";

export const ImageWithUpload = ({
  avatarUrl,
  userId,
}: {
  avatarUrl: string;
  userId: string;
}) => {
  const inputRef = useRef(null);
  const { updateAvatar } = useUser();
  const { message } = App.useApp();

  const [image, setImage] = useState<string>(avatarUrl);

  const handleImageClick = () => {
    const inputElement = inputRef.current as unknown as HTMLInputElement;
    inputElement.click();
  };

  const handleInputClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return;

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(image);

    const formData = new FormData();
    formData.append("userAvatar", image);
    updateAvatar(userId, formData);
  };
  useEffect(() => {
    getUserAvatar(userId, message).then((data) => console.log(data));
  }, []);

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
        }}
        preview={false}
        src={image || "https://placehold.co/600x400"}
        onClick={handleImageClick}
        className="hover:cursor-pointer"
      />
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
