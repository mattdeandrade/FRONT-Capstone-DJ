import { useState } from "react";
export function EditPage() {
  const [value, setValue] = useState(100);

  return (
    <input
      type="range"
      min="0"
      max="200"
      value={value}
      step="20"
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
}
