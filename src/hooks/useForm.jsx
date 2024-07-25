import { useEffect, useState } from "react";

function useForm({ initialValues, validate, onSubmit, fetchInitialValues }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (fetchInitialValues && typeof fetchInitialValues === "function") {
      const getTemplate = async () => {
        const { data } = await fetchInitialValues();
        setValues(data);
      };

      getTemplate();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    const fieldError = validate({ [name]: values[name] });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError[name],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const touchedFields = Object.keys(values).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});

    setTouched(touchedFields);

    const validationErrors = validate(values);

    setErrors(validationErrors);

    if (Object.values(validationErrors).every((v) => !v)) {
      await onSubmit(values);
    }
  };

  const getFieldProps = (name) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;

    return {
      name,
      value,
      onBlur,
      onChange,
    };
  };

  return {
    errors,
    touched,
    obSubmit: handleSubmit,
    getFieldProps,
  };
}

export default useForm;
