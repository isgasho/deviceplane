import React, { forwardRef, useState } from 'react';
import { RHFInput } from 'react-hook-form-input';
import styled from 'styled-components';
import { space, color, typography } from 'styled-system';

import utils from '../utils';
import { Group, Row, Column, Input, Textarea, Label, Text, Icon } from './core';

const PasswordButton = styled(Row)`
  user-select: none;
  cursor: pointer;
  align-items: center;

  & span {
    transition: ${props => props.theme.transitions[0]};
  }
  &:hover span {
    color: ${props => props.theme.colors.primary};
  }
  & svg {
    transition: ${props => props.theme.transitions[0]};
  }
  &:hover svg {
    fill: ${props => props.theme.colors.primary} !important;
  }
`;

const FieldLabel = styled.label`
${space} ${color} ${typography}
`;
FieldLabel.defaultProps = {
  ...Label.defaultProps,
  marginBottom: 0,
};

const Field = forwardRef(
  (
    {
      label,
      hint,
      description,
      name,
      as,
      setValue,
      register,
      onChangeEvent,
      autoComplete = 'off',
      multi,
      inline,
      errors = [],
      marginBottom = Group.defaultProps.marginBottom,
      ...props
    },
    ref
  ) => {
    const [type, setType] = useState(props.type);

    errors = Array.isArray(errors) ? errors : [errors];
    const getComponent = () => {
      if (as) {
        return (
          <RHFInput
            as={as}
            id={name}
            name={name}
            register={register}
            setValue={setValue}
            onChangeEvent={data => ({ value: data[0] })}
            {...props}
          />
        );
      }

      switch (type) {
        case 'textarea':
          return <Textarea name={name} id={name} ref={ref} {...props} />;
        default:
          return (
            <Input
              autoComplete={autoComplete}
              name={name}
              id={name}
              ref={ref}
              {...props}
              type={type}
            />
          );
      }
    };

    return (
      <Column flex={1} marginBottom={inline ? 0 : multi ? 4 : marginBottom}>
        {(label || description) && (
          <Column marginBottom={Label.defaultProps.marginBottom}>
            <Row justifyContent="space-between">
              {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
              {props.type === 'password' && (
                <PasswordButton
                  onClick={() =>
                    setType(type => (type === 'password' ? 'text' : 'password'))
                  }
                >
                  <Icon
                    icon={type === 'password' ? 'eye-open' : 'eye-off'}
                    size={16}
                    color="primary"
                  />
                  <Text
                    fontSize={1}
                    marginLeft={1}
                    fontWeight={2}
                    width="45px"
                    textAlign="right"
                    color="primary"
                  >
                    {type === 'password' ? 'SHOW' : 'HIDE'}
                  </Text>
                </PasswordButton>
              )}
            </Row>

            {description && (
              <Text marginTop={2} fontSize={1} fontWeight={1} color="grays.8">
                {description}
              </Text>
            )}
          </Column>
        )}
        <Row>{getComponent()}</Row>
        {hint && (
          <Text marginTop={2} fontSize={0} fontWeight={1} color="grays.8">
            {hint}
          </Text>
        )}
        {errors.map(({ message }) => (
          <Row marginTop={2} alignItems="flex-start">
            <Icon
              icon="error"
              color="red"
              size={16}
              flexShrink={0}
              marginTop={2}
            />
            <Text color="red" marginLeft={2}>
              {utils.capitalize(message)}
            </Text>
          </Row>
        ))}
      </Column>
    );
  }
);

export default Field;
