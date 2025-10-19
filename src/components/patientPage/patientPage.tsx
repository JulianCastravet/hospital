import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../context/authContext";
import { Descriptions } from "antd";
import { useTitle } from "../../hooks/useTitle";

const PatientPage = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const params = useParams();
  useTitle("User Page");

  useEffect(() => {
    alert("needs to be fixed");
  }, []);

  return (
    <>
      <Descriptions title="User Info">
        <Descriptions.Item label="Name"> {user?.name}</Descriptions.Item>
        <Descriptions.Item label="Date of birth">
          {user?.dateOfBirth}
        </Descriptions.Item>
        <Descriptions.Item label="Phone"> {user?.phone}</Descriptions.Item>
        <Descriptions.Item label="Email">
          <a href={`mailto:${user?.email}`}>{user?.email}</a>{" "}
        </Descriptions.Item>
        {user?.specialization && (
          <Descriptions.Item label="Specialization">
            {user?.specialization}
          </Descriptions.Item>
        )}
      </Descriptions>
    </>
  );
};

export default PatientPage;
