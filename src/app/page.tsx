"use client";

import React, { useState } from "react";
import { Client, Account, ID } from "appwrite";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set: any, get: any) => ({
      count: 0,
      inc: () => set({ count: get().count + 1 }),
    }),
    {
      name: "data-storage", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

function Counter() {
  const { count, inc }: any = useStore();
  return (
    <div className="counter">
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  );
}

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6470ae40b8510b3d30c7");

const Home = () => {
  const [email, setEmail]: [email: string, setEmail: any] = useState("");
  const [data, setData]: any = useState(null);

  const dataStore = create(
    persist(
      (set: any, get: any) => ({
        obj: null,
        add: (data: any) => set({ obj: (get().obj = data) }),
        remove: () => set({ obj: (get().obj = null) }),
      }),
      {
        name: "data-storage", // unique name
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  );

  const { obj, add, remove }: any = dataStore();
  console.log(obj);

  const createAccount = () => {
    const account = new Account(client);

    // Register User
    account.create(ID.unique(), email, "password", "Dopeboi Doe").then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const signIn = () => {
    const account = new Account(client);
    const promise = account.createEmailSession(email, "password");

    promise.then(
      function (response) {
        updateData();
        console.log(response); // Success
        getData();
        setEmail("");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const signOut = () => {
    const account = new Account(client);

    const promise = account.deleteSession("current");

    remove();
    localStorage.clear();

    promise.then(
      function (response) {
        // Clear local storage

        setData(null);
        console.log(response); // Success
        location.reload();
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const getData = () => {
    const account = new Account(client);
    const promise = account.get();

    promise.then(
      function (response) {
        add(response);
        setData(response);
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const updateData = () => {
    const account = new Account(client);
    const promise = account.updatePrefs({ founder: true, currency: 0 });

    promise.then(
      function (response) {
        add(response);
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const googleSignIn = () => {
    const account = new Account(client);
    account.createOAuth2Session("google");
    getData();
  };

  return (
    <div>
      <h1>Hello {obj?.name}</h1>
      <h3>{obj?.email}</h3>
      {!obj && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={createAccount}>submit</button>
        </>
      )}
      <button onClick={getData}>get data</button>
      <button onClick={updateData}>update data</button>
      <br />
      {!obj && <button onClick={signIn}>sign in</button>}
      <br />
      {obj && <button onClick={signOut}>sign out</button>}
      {!obj && <button onClick={googleSignIn}>google sign in</button>}
    </div>
  );
};

export default Home;
