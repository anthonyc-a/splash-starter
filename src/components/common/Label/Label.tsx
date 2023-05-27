import React from "react";
import * as Label from "@radix-ui/react-label";

const LabelDemo = ({ id, type, name, value, setValue }: any) => (
  <div
    style={{
      display: "flex",
      padding: "0 20px",
      flexWrap: "wrap",
      gap: 15,
      alignItems: "center",
    }}
  >
    <Label.Root className="LabelRoot" htmlFor={id}>
      {type}
    </Label.Root>

    <input
      className="Input"
      type="text"
      id={id}
      defaultValue={name}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
);

export default LabelDemo;
