import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { login } from "@/appwrite";

const FormDemo = (setData: any) => {
  const [email, setEmail]: [email: string, setEmail: any] = useState("");
  const [password, setPassword]: [password: string, setPassword: any] =
    useState("");

  return (
    <Form.Root className="FormRoot">
      <h3>Sign In</h3>

      <Form.Field className="FormField" name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Email</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="password">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Password</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your password
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Incorrect password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button
          className="Button"
          onClick={() => {
            login(email, password, setData);
          }}
          style={{ marginTop: 10 }}
        >
          Sign In
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export default FormDemo;
