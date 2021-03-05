import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {FormInput, position} from '../';
import userEvent from '@testing-library/user-event'

const DummyComponent = ({pos}:any) => {
  const [value, setValue] = React.useState('');
  const handleInputChange = (evt:any) => setValue(evt.currentTarget.value);
  const handleValidity =jest.fn()
  return (<FormInput
    name="password"
    type="text"
    value={value}
    errorPosition={pos}
    onChange={handleInputChange}
    isValid={handleValidity}
    errorProps={{
      'data-testid': 'error-container'
    }}
    validation={{
      rule: {
        type: 'password',
        minLength: 8,
        uppercase: 1,
        numbers: 1,
        matchesOneOf: ['@', '_', '-', '.', '!'],
      },
      message: 'is invalid',
    }}
  />)
}

describe('FormInput', () => {
  it('should display the formInput content', () => {
    const handleChange = jest.fn();
    const handleValidity = jest.fn();
    render(
      <FormInput
        name="password"
        type="text"
        value="test"
        onChange={handleChange}
        isValid={handleValidity}
        inputProps={{
          placeholder: 'enter your email',
        }}
        errorProps={{
          style: {fontSize: '10px', color: 'red', fontWeight: 'bold'},
        }}
        validation={{
          rule: {
            type: 'password',
            minLength: 8,
            uppercase: 1,
            numbers: 1,
            matchesOneOf: ['@', '_', '-', '.', '!'],
          },
          message: 'the value have to be float and more then 100',
        }}
      />,
    );
    expect(screen.getByRole('form-input')).toBeInTheDocument();
  })
  it('should display the formInput prefix content', () => {
    const handleChange = jest.fn();
    const handleValidity = jest.fn();
    render(
      <FormInput
        name="password"
        type="text"
        value="@_-bddcd6A"
        onChange={handleChange}
        isValid={handleValidity}
        validation={{
          rule: {
            type: 'password',
            minLength: 8,
            uppercase: 1,
            numbers: 1,
            matchesOneOf: ['@', '_', '-', '.', '!'],
          },
          message: 'the value have to be float and more then 100',
        }}
        prefix={<div>prefix</div>}
      />,
    );
    const input:any = screen.getByRole("textbox");
    expect(input.name).toBe('password');
    expect(input.type).toBe('text');
    expect(input.value).toBe('@_-bddcd6A');
    expect(input).toBeInTheDocument();
  })

  it('should display the formInput prefix content', () => {
    const handleChange = jest.fn();
    const handleValidity = jest.fn();
    render(
      <FormInput
        name="password"
        type="text"
        value="test"
        onChange={handleChange}
        isValid={handleValidity}
        validation={{
          rule: {
            type: 'password',
            minLength: 8,
            uppercase: 1,
            numbers: 1,
            matchesOneOf: ['@', '_', '-', '.', '!'],
          },
          message: 'the value have to be float and more then 100',
        }}
        suffix={<div>suffix</div>}
      />,
    );
    expect(screen.getByRole('suffix')).toBeInTheDocument();
  })

  it('should display the formInput error', () => {
    render(<DummyComponent pos={position.BOTTOM}/>);
    const input = screen.getByRole("textbox");
    userEvent.type(input, 'TEST VALUE');
    expect(screen.getByRole('error')).toBeInTheDocument();
  })

  it('should display the formInput error message', () => {
    render(<DummyComponent pos={position.BOTTOM}/>);
    const input = screen.getByRole("textbox");
    userEvent.type(input, 'TEST VALUE');
    expect(screen.getByRole('error')).toContainHTML('is invalid');
  })

  it('should display the formInput error message on top', () => {
    const {container} = render(<DummyComponent pos={position.TOP}/>);
    const input = screen.getByRole("textbox");
    userEvent.type(input, 'TEST VALUE');
    let error:any;
    if(container.firstChild && container.firstChild.firstChild) error = (container.firstChild.firstChild).childNodes[0];
    expect(error.innerHTML).toBe('is invalid');
  })

  it('should display the formInput error message on the bottom', () => {
    const {container} = render(<DummyComponent pos={position.BOTTOM}/>);
    const input = screen.getByRole("textbox");
    userEvent.type(input, 'TEST VALUE')
    let error:any;
    if(container.firstChild && container.firstChild.lastChild) error = (container.firstChild.lastChild).childNodes[0];
    expect(error.innerHTML).toBe('is invalid');
  })
})
