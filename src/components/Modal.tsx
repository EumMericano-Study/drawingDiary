import React, { Dispatch, useEffect, useState } from "react";
import styled from "styled-components";
import AWS from "aws-sdk";
import { client } from "./lib/axios";

interface Props {
  setModal: Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = ({ setModal }: Props) => {
  const [permission, setPermission] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    "https://eumericano.s3.ap-northeast-2.amazonaws.com/dev/bg/2.webp"
  );
  const [content, setContent] = useState<string>("");

  const region = "ap-northeast-2";
  const bucket = "dirary-image";

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  useEffect(() => {
    const checkOwner = async () => {
      return await Promise.resolve()
        .then(() => {
          return localStorage.getItem("checkOwner");
        })
        .then((res) => {
          if (res === process.env.REACT_APP_PERMISSION) setPermission(true);
        });
    };
    checkOwner();
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const fileList = e.target.files;
    // if (!fileList || !fileList[0]) return;
    // const upload = await new AWS.S3()
    //   .upload({
    //     Bucket: "eumericano",
    //     Key: "sdf.png",
    //     ACL: "public-read",
    //     Body: fileList[0],
    //   })
    //   .promise();
    // console.log(upload);
    // return upload.Location || "";
    setImage(
      "https://eumericano.s3.ap-northeast-2.amazonaws.com/dev/bg/2.webp"
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleSumbit = async () => {
    if (image === "" && content === "") return;
    await client
      .post("/diary", { image, content })
      .then((res) => console.log(res));
  };

  return (
    <Container>
      <ModalBg onClick={() => setModal(false)} />
      {permission && (
        <BoxContainer>
          <input type="file" accept="image" onChange={handleImageUpload} />
          <input type="text" onChange={handleInputChange} maxLength={30} />
          <button onClick={handleSumbit}>제출하기</button>
        </BoxContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const BoxContainer = styled.div`
  width: 50%;
  height: 40%;

  position: absolute;
  top: 50%;
  left: 50%;

  background-color: white;
  transform: translate3d(-50%, -50%, 0);
`;
