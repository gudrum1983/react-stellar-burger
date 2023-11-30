import {useCallback, useState} from 'react';

export const useForm = (initialFields = {}) => {

  const form = Object.entries(initialFields).reduce((fields, [name, value]) => {
    const isString = typeof value === 'string';

    const field = {
      [name]: {
        value: (isString && value) || ((!isString && value.value) || ''),
        setState: (value) => handleInput(value, name),
        ...(!isString && value),
      },
    };

    return { ...fields, ...field };
  }, {});

  const [fields, setState] = useState(form);

  const handleInput = useCallback(
    (element, name) => {
      const input = fields[name];
      const value = element.target.value;
      const field = { ...input, value };

      setState(prevState => ({ ...prevState, [name]: field }));
    }, [fields, setState]);

  const handleSubmit = (onSubmit) => (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const values = Object.entries(fields).reduce(((prev, [name, {value}]) => ({ ...prev, [name]: value })), {});

    onSubmit({ values });
  }

  const handleReset = (onReset) => (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setState(form)
    onReset()
  }

  return {
    handleReset,
    handleSubmit,
    fields,
  }
}