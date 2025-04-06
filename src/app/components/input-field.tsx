'use client';

import React from 'react';
import { Field } from 'formik';

export interface InputFieldProps {
  label?: string;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  id,
  ...rest
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 text-base text-gray-900 font-medium"
        >
          {label}
        </label>
      )}
      <Field
        {...rest}
        id={id}
        className="w-full p-3 h-11 text-sm rounded-lg border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
      />
    </div>
  );
}
