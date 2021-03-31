import { debounce } from 'lodash';
import React from 'react';

export enum BUTTON_TYPE {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

type ButtonProps = {
  /**
   * display the label
   */
  label: string;
  /**
   * handler for the click event
   */
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * define the button type: button/submit/reset - by default button
   */
  type?: BUTTON_TYPE;
  /**
   * allow to enable disable the button
   */
  disabled?: boolean;
  /**
   * define the aria-label for accessibility. If no value is passed it will render {type}-button
   */
  ariaLabel?: string;
  /**
   * Disable the button for a specific amount of time in ms
   */
  disableClickForMs?: number;
  /**
   * allow to add an image before the label
   */
  customPrefixImg?: JSX.Element;
  /**
   * allow to add an image after the label
   */
  customPostfixImg?: JSX.Element;
};

export const Button = ({
  label,
  onClick,
  type = BUTTON_TYPE.BUTTON,
  disabled = false,
  ariaLabel = `${type}-button`,
  disableClickForMs = 0,
  customPrefixImg,
  customPostfixImg,
  ...props
}: ButtonProps) => {
  const [disable, setDisable] = React.useState(disabled);

  const delayNextClick = React.useCallback(
    debounce(() => {
      setDisable(false);
    }, disableClickForMs),
    []
  );

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    setDisable(true);
    delayNextClick();
    onClick(evt);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disable}
      type={type}
      aria-label={ariaLabel}
      {...props}
    >
      {customPrefixImg && <>{customPrefixImg}</>}
      {label}
      {customPostfixImg && <>{customPostfixImg}</>}
    </button>
  );
};
