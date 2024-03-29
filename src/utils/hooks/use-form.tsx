import { useState } from "react";

export function useForm(inputValues = {}) {
  const [values, setValues] = useState<any>(inputValues);

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
