'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import Button from '@/app/components/button';
import InputField from '@/app/components/input-field';
import LogoUploader from '@/app/components/logo-uploader';

export type CompanyFieldValues = {
  name: string;
  status: string;
  country: string;
  category: string;
  date: string;
  description: string;
};

const initialValues: CompanyFieldValues = {
  name: '',
  status: '',
  country: '',
  category: '',
  date: '',
  description: '',
};

export interface CompanyFormProps {
  onSubmit: (values: CompanyFieldValues) => void | Promise<void>;
}

export default function CompanyForm({ onSubmit }: CompanyFormProps) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900">
          Add new company
        </h2>
        <div className="flex gap-8">
          <div className="flex flex-col flex-1 gap-6">
            <LogoUploader label="Logo" placeholder="Upload photo" />
            <InputField
              label="Status"
              placeholder="Enter status"
              name="status"
            />
            <InputField
              label="Country"
              placeholder="Enter country"
              name="country"
            />
          </div>
          <div className="flex flex-col flex-1 gap-6">
            <InputField
              label="Name"
              placeholder="Enter company name"
              name="name"
            />
            <InputField
              label="Category"
              placeholder="Enter category"
              name="category"
            />
            <InputField label="Joined date" type="date" name="date" />
            <InputField
              label="Description"
              placeholder="Enter description"
              name="description"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" className="px-8">
            Add company
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
