import { Account, AppwriteException, Client } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6470ae40b8510b3d30c7");

export const getUserData = async (setData: any) => {
  const account = new Account(client);
  const promise = account.get();

  promise.then(
    function (response) {
      console.log(response); // Success
      setData(response);
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

export const login = async (email: string, password: string, setData: any) => {
  const account = new Account(client);
  const promise = account.createEmailSession(email, password);
  promise.then(
    function (response) {
      console.log(response); // Success
      setData(response);
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

export const googleLogin = () => {
  const account = new Account(client);
  account.createOAuth2Session("google");
};

export const logout = async (setData: any) => {
  const account = new Account(client);
  const promise = account.deleteSession("current");
  promise.then(
    function (response) {
      console.log(response); // Success
      setData(null);
      location.reload;
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

export const register = async (email: string, password: string) => {
  try {
    const account = new Account(client);
    return account.create("unique()", email, password);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const updateName = async (name: string) => {
  const account = new Account(client);
  const promise = account.updateName(name);

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

export default client;
