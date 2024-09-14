
import welcome from "../assets/welcome.png"
import girl from "../assets/girl-home.png"
import boy from "../assets/boy-home.png"
import enter from "../assets/enter-home.png"
import { Link } from "react-router-dom";
const Home = () => {
  
    return (
      <div className=" w-[100vw] h-[100vh] bg-home absolute bg-no-repeat bg-cover">
        <img draggable={false} className="absolute z-50 top-[17.5vh] h-[35vh] w-[90vw] left-[5vw]" src={welcome} />
        <img draggable={false} className="absolute z-50 top-[70vh] h-[30vh] w-[20vw] left-[75vw]" src={boy} />
        <img draggable={false} className="absolute z-50 top-[70vh] h-[30vh] w-[20vw] left-[5vw]" src={girl} />
          <Link to="/menu" className="absolute z-50 hover:scale-105 top-[47vh] h-[50vh] w-[35vw] left-[32.5vw]">
          <div className="relative">
        <img draggable={false} className="absolute h-[50vh] w-[35vw]" src={enter} />
          </div>
          </Link>

          </div>
    );
  

  return <></>;
};
export default Home