import React, { useState, useMemo } from "react";

type Props<K, V> = {
  initialValues: K;
  validate: (values: K) => V;
  onSubmit: (values: K) => void;
  onValidationError?: (errors: V, timing: "submit") => void;
};

const isEmpty = (values: Record<string, string>) =>
  Object.keys(values).length === 0;

export const useForm = <
  K extends Record<string, any>,
  V extends Record<string, any>,
>({
  initialValues,
  validate,
  onSubmit,
  onValidationError,
}: Props<K, V>) => {
  const [values, setValues] = useState<K>(initialValues);
  const [errors, setErrors] = useState<V>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const submit = () => {
    const errors = validate(values);
    setErrors(errors);
    if (!isEmpty(errors)) {
      onValidationError?.(errors, "submit");
      return;
    }

    onSubmit(values);
  };

  const valid = useMemo(() => Object.keys(errors || {}).length === 0, [errors]);

  return {
    values,
    errors,
    setValues,
    handleChange,
    submit,
  };
};
