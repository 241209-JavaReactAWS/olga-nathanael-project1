import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

interface Props { }


const Registration: React.FC<Props> = () => {

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Registration;
