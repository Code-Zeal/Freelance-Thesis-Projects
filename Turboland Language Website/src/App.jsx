import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { Toaster } from "sonner";
import Home from "./components/Home/Home";
import Dashboard from "./components/Teacher/Dashboard";
import Themes from "./components/ClassroomOptionsStudent/Themes";
import Tests from "./components/ClassroomOptionsStudent/Tests";
import PDF from "./components/ClassroomOptionsStudent/PDF";
import Audios from "./components/ClassroomOptionsStudent/Audios";
import Homework from "./components/ClassroomOptionsStudent/Homework";
import Translator from "./components/ClassroomOptionsStudent/Translator";
import Videos from "./components/ClassroomOptionsStudent/Videos";
import Assistance from "./components/ClassroomOptionsStudent/Assistance";
import Games from "./components/ClassroomOptionsStudent/Games";
import User from "./components/UserStudent/User";
import MyAssistance from "./components/ClassroomOptionsStudent/MyAssistance";
import MyNotes from "./components/ClassroomOptionsStudent/MyNotes";

import ThemesT from "./components/ClassroomOptionsTeacher/Themes";
import TestsT from "./components/ClassroomOptionsTeacher/Tests";
import PDFT from "./components/ClassroomOptionsTeacher/PDF";
import AudiosT from "./components/ClassroomOptionsTeacher/Audios";
import HomeworkT from "./components/ClassroomOptionsTeacher/Homework";
import TranslatorT from "./components/ClassroomOptionsTeacher/Translator";
import VideosT from "./components/ClassroomOptionsTeacher/Videos";
import AssistanceT from "./components/ClassroomOptionsTeacher/Assistance";
import GamesT from "./components/ClassroomOptionsTeacher/Games";
 import UserTeacher from "./components/UserTeacher/User";
import MyAssistanceT from "./components/ClassroomOptionsTeacher/MyAssistance";
import MyNotesT from "./components/ClassroomOptionsTeacher/MyNotes";
import AssistanceActivities from "./components/ClassroomOptionsTeacher/AssistanceActivities";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/user" element={<User />} />
        <Route path="/home" element={<Home />} />


        <Route path="/home/Assistance" element={<Assistance />} />
        <Route path="/home/Assistance/MyNotes" element={<MyNotes />} />
        <Route path="/home/Assistance/MyAssistance" element={<MyAssistance />} />

        <Route path="/home/Audios" element={<Audios />} />

        <Route path="/home/Games" element={<Games />} />

        <Route path="/home/Homework" element={<Homework />} />

        <Route path="/home/PDF" element={<PDF />} />

        <Route path="/home/Tests" element={<Tests />} />

        <Route path="/home/Themes" element={<Themes />} />

        <Route path="/home/Translator" element={<Translator />} />

        <Route path="/home/Videos" element={<Videos />} />

        <Route path="/teacherDashboard/user" element={<UserTeacher />} />
        <Route path="/teacherDashboard" element={<Dashboard />} /> 

         <Route path="/teacherDashboard/Assistance" element={<AssistanceT />} />
         
         <Route path="/teacherDashboard/AssistanceActivities" element={<AssistanceActivities />} />

        <Route path="/teacherDashboard/Assistance/MyNotes" element={<MyNotesT />} />
        <Route path="/teacherDashboard/Assistance/MyAssistance" element={<MyAssistanceT />} />

        <Route path="/teacherDashboard/Audios" element={<AudiosT />} />

        <Route path="/teacherDashboard/Games" element={<GamesT />} />

        <Route path="/teacherDashboard/Homework" element={<HomeworkT />} />

        <Route path="/teacherDashboard/PDF" element={<PDFT />} />

        <Route path="/teacherDashboard/Tests" element={<TestsT />} />

        <Route path="/teacherDashboard/Themes" element={<ThemesT />} />

        <Route path="/teacherDashboard/Translator" element={<TranslatorT />} />

        <Route path="/teacherDashboard/Videos" element={<VideosT />} /> 
      </Routes>
    </div>
  );
}

export default App;
