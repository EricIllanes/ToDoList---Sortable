import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSession } from "../Redux/actions";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;


export default function Login() {
  const navigate = useNavigate();
  const { profileData } = useSelector((state) => state);
  useEffect(() => {
    let token = document.cookie;
    if (token) {
      setTimeout(()=>{
        navigate("/home")
      }, 1000) ;
    }
  }, [navigate, profileData]);

  const dispatch = useDispatch();

  const [loginDatos, setDatos] = useState({});

  const handleChange = (e) => {
    setDatos({
      ...loginDatos,
      [e.target.name]: e.target.value,
    });
  };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loginDatos.name || !loginDatos.password) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor ingrese su Usuario y/o contraseña",
          });
        } else {
          try {
            let datosLogin = await axios.post(
              `${VITE_BACKEND_URL}/login`,
              loginDatos
            );
         
            if (datosLogin.status === 200) { 
              document.cookie = `token${datosLogin.data.name}=${
                datosLogin.data.tokenLogin
              }; max-age=${60 * 10}; path=/; sameSite=strict`;
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Acceso permitido",
                showConfirmButton: false,
                timer: 1000,
              });
              setTimeout(() => {
                navigate("/");
              }, 1000);
              dispatch(loginSession(datosLogin.data))
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.response.data.message}`,
            });
          }
        }
      };

  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-slate-400 py-10">
      <div className="flex shadow-md">
        <div
          className="flex flex-wrap items-stretch content-center justify-center rounded-l-md bg-white"
          style={{ width: "24rem", height: "32rem" }}
        >
          <div className="w-72">
            <h1 className="text-xl font-semibold">Bienvenido!</h1>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-3">
                <label className="mb-2 flex text-xs font-semibold justify-start">
                  Nombre Usuario
                </label>
                <input
                  name="name"
                  onChange={handleChange}
                  placeholder="Ingresa tu usuario"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Contraseña" className="mb-2 flex justify-start text-xs font-semibold ">
                  Contraseña
                </label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <button  className="w-full h-12 text-center text-white bg-slate-800 hover:bg-slate-600 rounded-md">
                  Ingresar
                </button>
              </div>
            </form>

            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                No tienes una cuenta?
              </span>
              <a
                href="/register"
                className=" ml-2 text-xs font-semibold text-blue-700"
              >
                Registrarse
              </a>
            </div>
          </div>
          <footer className="place-self-end">
            <a className="text-xs underline" onClick={()=>{
                  localStorage.setItem('profileData', JSON.stringify({name: 'Invitado'}));
            }} href="/home">Continuar como invitado</a>
          </footer>
        </div>

        <div
          className="flex flex-wrap content-center justify-center rounded-r-md md:"
          style={{ width: "24rem", height: "32rem" }}
        >
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src="https://media.giphy.com/media/Eqz8ZFUScPHH2/giphy.gif"
            alt="todolist-EricIllanes"
          />
        </div>
      </div>
    </div>
  );
}
