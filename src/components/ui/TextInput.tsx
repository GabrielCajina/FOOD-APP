import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldError } from "react-hook-form";

interface TextInputProps extends InputProps {
  label: string;
  errors: { [key: string]: FieldError | undefined };
}

const TextInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = ({ label, errors, ...props }, ref) => {
  return (
    <FormControl isInvalid={!!errors[props.name!]}>
      <FormLabel>{label}</FormLabel>
      <Input {...props} ref={ref} />
      <ErrorMessage
        errors={errors}
        name={props.name!}
        render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
      />
    </FormControl>
  );
};

export default React.forwardRef(TextInput);
