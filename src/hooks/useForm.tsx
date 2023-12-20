import {ChangeEvent, FormEvent, useCallback, useState} from 'react';

export interface IField {
  value?: string;
  setState?: (event: ChangeEvent<HTMLInputElement>) => {};
}

export interface IField2 {
  value?: Date;
  setState?: (event: ChangeEvent<HTMLInputElement>) => {};
}

export type TFormInputs<T extends string | number | symbol> = {
  [key in T]: IField;
};

export type TFormInputsValue<T extends string | number | symbol> = {
  [key in T]: string;
};

export type ICustomField = IField;

export type ICustomObject = {
  [key: string]: ICustomField;
  }

export type TValuesInput = {
  [key: string]: string;
}

export type IForm = {
  fields: ICustomObject;
  handleSubmit: (onSubmit: Function) => (e: FormEvent) => void;
  handleReset: () => (e: FormEvent) => void;
}


export const useForm = (initialFields:ICustomObject):IForm => {

  const form:ICustomObject = Object.entries<IField>(initialFields).reduce((fields:{}, [name, value]) => {


    //todo из profile-edit передавалось раньше строкой, а не объектом - пофиксить обратно
    const isString = typeof value === 'string';


    const field:IField = {
      [name]: {
        value: (isString && value) || ((!isString && value.value) || ''),
        setState: (value: ChangeEvent<HTMLInputElement>) => handleInput(value, name),
        ...(value),
      },
    };

    return { ...fields, ...field };
  }, {});

  const [fields, setState] = useState<ICustomObject>(form);

  const handleInput = useCallback(
    (element, name) => {
      const input = fields[name];
      const value = element.target.value;
      const field = { ...input, value };

      setState(prevState => ({ ...prevState, [name]: field }));
    }, [fields, setState]);

  const handleSubmit = (onSubmit: Function) => (e: FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const values:TValuesInput = Object.entries(fields).reduce(((prev, [name, {value}]) => ({ ...prev, [name]: value })), {});
    onSubmit(values);
  }

  const handleReset = () => (e:FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setState(form)
  }

  return {
    handleReset,
    handleSubmit,
    fields,
  }
}



