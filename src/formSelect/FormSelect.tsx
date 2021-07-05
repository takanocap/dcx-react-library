import React, { useState, ChangeEvent } from 'react';
import { ErrorMessage, OptionGroup, Hint, Option, Roles } from '../common';
import { ErrorMessageProps, HintProps } from '../common/components/commonTypes';
import { OptionProps } from '../common/components/Option';
import { OptionGroupProps } from '../common/components/OptionGroup';

export type FormSelectProps = {
  /**
   * select class name
   */
  className?: string;
  /**
   * select options
   */
  options?: OptionProps[];
  /**
   * select groups
   */
  optionGroups?: OptionGroupProps[];
  /**
   * handle the change when the user select the option
   */
  onChange?: (evt: ChangeEvent<HTMLSelectElement>) => void;
  /**
   * select name
   */
  name?: string;
  /**
   * select id
   */
  id?: string;
  /**
   * define the aria-label
   */
  ariaLabel?: string;
  /**
   * select label
   */
  label?: string;
  /**
   * select label properties for optional label
   */
  labelProps?: any;
  /**
   * select label hint
   */
  hint?: HintProps;
  /**
   * select error
   */
  error?: ErrorMessageProps;
  /**
   * select style
   */
  style?: any;
  /**
   * you can add an option that will have the specified label but an empty value
   * nullOption will be selected by default
   */
  nullOption?: string;
};

export const FormSelect = ({
  className,
  name,
  optionGroups,
  options = [],
  onChange,
  id,
  ariaLabel,
  label,
  labelProps,
  hint,
  error,
  style,
  nullOption,
}: FormSelectProps) => {
  const sharedOptions: OptionProps[] | undefined = optionGroups
    ? optionGroups.flatMap((group: OptionGroupProps) => [...group.options])
    : undefined;

  const combinedOptions: OptionProps[] | undefined = sharedOptions
    ? [...options, ...sharedOptions]
    : options;

  const preselectedValue: OptionProps | undefined = combinedOptions.find(
    option => option.selected
  );

  const initialValue: string =
    nullOption !== undefined
      ? nullOption
      : preselectedValue !== undefined
      ? preselectedValue.value
      : options.length
      ? options[0].value
      : '';

  const [value, setValue] = useState<string>(initialValue);

  const getOptions = (options: OptionProps[]): JSX.Element[] =>
    options.map((item: OptionProps, index: number) => (
      <Option key={index} {...item} />
    ));

  const getOptionGroups = (optionGroups: OptionGroupProps[]): JSX.Element[] =>
    optionGroups.map((groupOption: OptionGroupProps, index: number) => (
      <OptionGroup key={index} {...groupOption} />
    ));

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    if (onChange) onChange(event);
  };

  return (
    <>
      {label && (
        <label {...labelProps} htmlFor={id}>
          {label}
        </label>
      )}
      {hint && <Hint {...hint} />}
      {error && <ErrorMessage {...error} />}
      <select
        value={value}
        name={name || 'formSelect'}
        id={id || 'formSelect'}
        className={className}
        aria-label={ariaLabel || Roles.list}
        onChange={handleChange}
        style={style}
      >
        {nullOption !== undefined && (
          <Option value="" label={nullOption} selected={true} />
        )}
        {getOptions(options)}
        {optionGroups && getOptionGroups(optionGroups)}
      </select>
    </>
  );
};
