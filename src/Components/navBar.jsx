import { useNavigate } from "react-router-dom";
import gitHubIcon from "../assets/gitHubIcon.svg";
import linkedinIcon from "../assets/linkedinIcon.svg";
const NavBar = () => {

  let token = document.cookie.slice(0, 13);

  const navigate = useNavigate();

  const logoutFunction = () => {
    document.cookie = `${token}=; max-age=0; path=/; sameSite=strict`;
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <div className="h-1/5 p-6 flex justify-between">
        <div className="w-1/4 justify-between flex flex-row w-96">
          <p className="text-6xl font-bold">L</p>
          <p className="text-6xl font-bold">I</p>
          <p className="text-6xl font-bold">S</p>
          <p className="text-6xl font-bold">T</p>
        </div>
        <div className="w-96 justify-between flex self-end flex-row">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/EricIllanes"
          >
            <img 
              className="w-12" 
              src={gitHubIcon} 
              alt="gitHub-Eric-Illanes" 
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/ericillanes/"
          >
            <img
              className="w-12"
              src={linkedinIcon}
              alt="linkedin-Eric-Illanes"
            />
          </a>
          <button
            className="w-28 h-12 text-center text-white bg-slate-800 hover:bg-slate-600 rounded-md"
            onClick={() => {
              logoutFunction();
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;