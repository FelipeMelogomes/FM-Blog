import {
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Icon } from "../IconComponent";
import { TextInputWithIconProps } from "./types";

const TextInputWithIcon = ({
  label,
  iconName,
  name,
  value,
  minLength,
  maxLength,
  required,
  onChange,
  placeholder,
  alt,
}: TextInputWithIconProps) => {
  return (
    <div>
      <FormLabel color="#151717" fontWeight="medium" textAlign="center">
        {label}
      </FormLabel>
      <InputGroup size="md">
        {iconName && (
          <InputLeftElement pointerEvents="none">
            <Icon name={iconName} />
          </InputLeftElement>
        )}
        <Input
          type="text"
          name={name}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={alt}
          borderColor="#ecedec"
          borderRadius="md"
          focusBorderColor="black"
          pl={iconName ? "2.5rem" : "1rem"}
        />
      </InputGroup>
    </div>
  );
};

export { TextInputWithIcon };
