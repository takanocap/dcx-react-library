import * as React from 'react';
import { FormCheckbox } from 'dcx-react-library';

export const FormCheckboxDemo = () => {
  const [value, setValue] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(true);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.currentTarget.value);
    setIsChecked(!isChecked);
  };

  return (
    <>
      <h1>Single Checkboxes</h1>
      <h2>Standard Checkbox</h2>
      <FormCheckbox
        id="checkbox-2"
        name="group1"
        value={value}
        label="Checkbox 2 label text"
        onChange={handleChange}
      />
      <h2>Pre-checked checkbox</h2>
      <FormCheckbox
        id="checkbox-1"
        name="group1"
        value={value}
        label="Checkbox 1 label text"
        onChange={handleChange}
        defaultChecked={isChecked}
      />
      <h2>Disabled Checkbox</h2>
      <FormCheckbox
        id="checkbox-4"
        name="group1"
        value={value}
        label="Checkbox 4 label text"
        onChange={handleChange}
        disabled={true}
      />
    </>
  );
};
