import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

interface ResetPasswordValues {
  password: string;
}

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "A senha precisa ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas precisam ser iguais")
    .required("A confirmação da senha é obrigatória"),
});

export function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userid, token } = useParams();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleResetPassword = (
    values: ResetPasswordValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    Axios.post(
      `http://localhost:3000/api/auth/reset-password/${userid}/${token}`,
      {
        userpassword: values.password,
      }
    ).then((res) => {
      if (res.data.msg === "Senha atualizada com sucesso") {
        toast.success("Senha atualizada com sucesso", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
      
      setTimeout(() => navigate("/"), 1000);
      resetForm();

    }).catch((error) => {
      const errorMessage =
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : "Erro ao redefinir senha";
      toast.error(errorMessage, {
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
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] sm:w-[80%] max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Redefinir Senha
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Insira sua nova senha e confirme-a abaixo.
        </p>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-600"
                  >
                    Nova Senha
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
                  placeholder="Digite sua nova senha..."
                  className={`w-full px-4 py-2 mt-2 border rounded-md ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  autoComplete="new-password"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-600"
                  >
                    Confirmar Senha
                  </label>
                  <div
                    className="cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                </div>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirme sua nova senha..."
                  className={`w-full px-4 py-2 mt-2 border rounded-md ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Redefinir Senha
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </div>
  );
}
