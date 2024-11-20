import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import Axios from "axios";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: Yup.string().required("Telefone é obrigatório"),
  address: Yup.string().required("Endereço é obrigatório"),
  password: Yup.string()
    .min(6, "A senha precisa ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
});

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleClickRegister = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    Axios.post("http://localhost:3000/api/auth/register", {
      username: values.name,
      useremail: values.email,
      userphone: values.phone,
      useraddress: values.address, 
      userpassword: values.password,
    })
      .then((res) => {
        if (res.data.msg === "Cadastrado com sucesso!") {
          toast.success(res.data.msg, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          setTimeout(() => navigate("/login"), 1000);
          resetForm();
        }
      })
      .catch((error) => {
        const errorMsg =
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "Erro ao concluir registro!";
        toast.error(errorMsg, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      });
  };

  return (
    <div className="w-full h-screen flex flex-col sm:flex-row items-center justify-center bg-gray-100">
      <div className="hidden sm:flex w-full sm:w-[50%] justify-center items-center mb-8 sm:mb-0">
        <img
          className="w-[80%] sm:w-full"
          src="./register.svg"
          alt="Imagem da tela de login"
        />
      </div>

      <div className="flex w-[90%] sm:w-[50%] max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <div className="w-full px-6 flex flex-col justify-center">

          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              address: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleClickRegister}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Nome
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Digite seu nome..."
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Digite seu email..."
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Telefone
                  </label>
                  <Field name="phone">
                    {({ field }: FieldProps) => (
                      <InputMask
                        {...field}
                        mask="(99) 99999-9999"
                        placeholder="Digite seu telefone..."
                        className={`w-full px-4 py-2 mt-2 border rounded-md ${
                          errors.phone && touched.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    )}
                  </Field>
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-sm">{errors.phone}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Endereço
                  </label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Digite seu endereço completo..."
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.address && touched.address
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.address && touched.address && (
                    <div className="text-red-500 text-sm">{errors.address}</div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-600"
                    >
                      Senha
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-sm"
                    >
                      {React.createElement(
                        showPassword ? VisibilityOff : Visibility
                      )}
                    </button>
                  </div>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Digite sua senha..."
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-600"
                    >
                      Confirme a Senha
                    </label>
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="text-sm"
                    >
                      {React.createElement(
                        showConfirmPassword ? VisibilityOff : Visibility
                      )}
                    </button>
                  </div>
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirme sua senha..."
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Registrar-se
                </button>

                <div className="text-sm text-center mt-4 text-blue-600">
                  <Link to="/login">Já tem uma conta? Login</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
