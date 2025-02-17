import { Box } from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import { PasswordToggle } from "../../utils/PasswordToggle";
import { Button } from "../Button";
import { PasswordInputWithToggle } from "../PasswordInputWithToggle";
import { SignUpPrompt } from "../SignUpPrompt";
import { TextInputWithIcon } from "../TextInputWithIcon";
import { LoginFormFieldsProps } from "./types";

const LoginFormFields = ({
  isLogin,
  formData,
  setFormData,
  passwordVisible,
  setPasswordVisible,
  passwordVisibleTwo,
  setPasswordVisibleTwo,
  loading,
  error,
}: LoginFormFieldsProps) => (
  <>
    {!isLogin && (
      <TextInputWithIcon
        label="Nome de usuário"
        iconName={<BiUser />}
        name="displayName"
        value={formData.displayName}
        minLength={6}
        maxLength={16}
        required
        onChange={(e) =>
          setFormData({ ...formData, displayName: e.target.value })
        }
        placeholder="Nome do usuário"
        alt="Insira seu nome"
      />
    )}

    <TextInputWithIcon
      label="Email"
      name="email"
      value={formData.email}
      iconName={<BiUser />}
      minLength={6}
      required
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      placeholder="Insira seu email"
      alt="Insira seu email"
    />

    <PasswordInputWithToggle
      label="Senha"
      name="password"
      value={formData.password}
      minLength={6}
      maxLength={64}
      required
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      placeholder="Insira sua senha"
      alt="Insira sua senha"
      passwordVisible={passwordVisibleTwo}
      togglePasswordVisibility={() => PasswordToggle(setPasswordVisibleTwo)}
    />

    {!isLogin && (
      <PasswordInputWithToggle
        label="Confirmar Senha"
        placeholder="Confirme a sua senha"
        alt="Confirme a sua senha"
        minLength={6}
        maxLength={64}
        required
        value={formData.confirmPassword}
        passwordVisible={passwordVisible}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        togglePasswordVisibility={() => PasswordToggle(setPasswordVisible)}
        name=""
      />
    )}

    {isLogin && (
      <Box display="flex" justifyContent="flex-end">
        <SignUpPrompt linkText="Recuperar Senha?" linkUrl="/resetPassword" />
      </Box>
    )}

    {!isLogin && (
      <Box display="flex" justifyContent="flex-end">
        <SignUpPrompt linkText="Entrar" linkUrl="/login" />
      </Box>
    )}

    {isLogin ? (
      <>
        {!loading && (
          <Button
            alt="Entrar"
            disabled={formData.email === "" || formData.password.length < 6}
          >
            Entrar
          </Button>
        )}
        {loading && <Button disabled>Aguarde...</Button>}
      </>
    ) : (
      <Button
        alt="Cadastrar"
        disabled={formData.email === "" || formData.password.length < 6}
        type="submit"
      >
        Cadastrar
      </Button>
    )}
    {error && <p className="error">{error}</p>}
  </>
);

export { LoginFormFields };
