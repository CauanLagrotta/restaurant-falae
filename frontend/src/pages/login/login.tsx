import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(6, "A senha precisa ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
});

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClickLogin = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    Axios.post("http://localhost:3000/api/auth/login", {
      useremail: values.email,
      userpassword: values.password,
    })
      .then((res) => {
        if (res.data.msg === "Login efetuado com sucesso") {
          toast.success("Login realizado com sucesso!", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          setTimeout(() => navigate("/"), 1000);
          resetForm();
        }
      })
      .catch(() => {
        toast.error("Email ou senha inválidos", {
          icon: false,
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
          src="./login.svg"
          alt="Imagem da tela de login"
        />
      </div>

      <div className="flex w-[90%] sm:w-[50%] max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <div className="w-full px-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleClickLogin}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
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

                <div className="relative">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-600"
                    >
                      Senha
                    </label>
                    <div
                      className="cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </div>
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

                <div className="flex justify-between text-sm text-blue-600 mt-4">
                  <Link to="/register">Registrar-se</Link>
                  <Link to="/forgot-password">Esqueceu a senha?</Link>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
