import menu from "../assets/menu.png"
import girl from "../assets/girl-menu.png"
import boy from "../assets/boy-menu.png"
import { Link } from "react-router-dom";
const Menu = () => {
  
    return (
      <div className=" w-[100vw] h-[100vh] bg-menu absolute bg-no-repeat bg-cover">
        <img draggable={false} className="absolute z-50 top-[10vh] h-[90vh] w-[40vw] left-[30vw]" src={menu} />
        <img draggable={false} className="absolute z-50 top-[40vh] h-[50vh] w-[30vw] right-[10vw]" src={girl} />
        <img draggable={false} className="absolute z-50 top-[40vh] h-[50vh] w-[30vw] left-[0vw]" src={boy} />
        <Link to="/puzzle" className="absolute z-50  top-[20.5vh] h-[10vh] w-[15vw] left-[40vw]  rounded-full ">
          </Link>

          <Link to="/letterSoup" className="absolute z-50  top-[31vh] h-[10vh] w-[16vw] left-[43vw]  rounded-full ">
          </Link>

          <Link to="/numbers" className="absolute z-50  top-[42vh] h-[10vh] w-[16vw] left-[40vw]  rounded-full ">
          </Link>

          <Link to="/words" className="absolute z-50  top-[53vh] h-[7vh] w-[14vw] left-[44vw]  rounded-full ">
          </Link>

          <Link to="/" className="absolute z-50  top-[61vh] h-[8vh] w-[12vw] left-[42vw]  rounded-full  ">
          </Link>

          </div>
    );
  

  return <></>;
};
export default Menu