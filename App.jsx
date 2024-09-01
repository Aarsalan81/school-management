import React , {useState} from "react";
import { Suspense , lazy } from "react";
import { Routes , Route } from "react-router-dom";
import Cookies from "js-cookie"
import PageLoad from "./pages/PageLoad";

const LoginPage = lazy(() => import("./pages/LoginPage"))
const MainPage = lazy(() => import("./pages/MainPage"))


export default function App(props) {
  const [islogin , setIslogin] = useState(false);
  return (
    <div className="App">
      <Routes>
          {Cookies.get("user_data")?(
            <Route 
              path="*"
              element = {
                <Suspense fallback ={<PageLoad/>}>
                  <MainPage  islogin={islogin} setIslogin={setIslogin}/>
                </Suspense>
              }
            />
          ):(
            <Route
              path="*"
              element={
                <Suspense fallback ={<PageLoad/>}>
                  <LoginPage setIslogin={setIslogin}/>
                </Suspense>
              }
            />
          )}
      </Routes>
    </div>
  );
}



