"use client";

import React, { useEffect, useState } from "react";
import LabelDemo from "@/components/common/Label/Label";
import { getUserData, googleLogin, login, logout } from "@/appwrite";
import DialogDemo from "@/components/common/Dialog/Dialog";
import FormDemo from "@/components/common/Form/Form";

const Home = () => {
  const [data, setData]: [data: any, setData: any] = useState(null);
  console.log(data);
  const [name, setName]: [name: string, setName: any] = useState("");
  const [email, setEmail]: [email: string, setEmail: any] = useState("");

  useEffect(() => {
    getUserData(setData);
    console.log("data:", data);
    setName(data?.name);
    setEmail(data?.email);
  }, [data]);

  return (
    <>
      <h1>Hello {data?.name}</h1>
      {!data && <FormDemo setData={setData} />}
      {data && <DialogDemo name={name} email={email} />}

      <button
        onClick={() => {
          login("ant@mail.com", "password", setData);
        }}
      >
        sign in
      </button>
      <br />
      <button
        onClick={() => {
          logout(setData);
        }}
      >
        sign out
      </button>
      <button
        onClick={() => {
          getUserData(setData);
        }}
      >
        get data
      </button>
      <br />
      <button onClick={googleLogin}>google sign in</button>
    </>
  );
};

export default Home;
