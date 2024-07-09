import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import login_img from "../assets/images/login_img.svg";
import Parse from "parse";
import Alert from "../primitives/Alert";
import { appInfo } from "../constant/appinfo";
import { useDispatch } from "react-redux";
import { fetchAppInfo } from "../redux/reducers/infoReducer";
import { isEnableSubscription } from "../constant/const";
import { getAppLogo } from "../constant/Utils";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    hideNav: ""
  });
  const [sentStatus, setSentStatus] = useState("");
  const [image, setImage] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const resize = () => {
    let currentHideNav = window.innerWidth <= 760;
    if (currentHideNav !== state.hideNav) {
      setState({ ...state, hideNav: currentHideNav });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.setItem("appLogo", appInfo.applogo);
    localStorage.setItem("userSettings", JSON.stringify(appInfo.settings));
    if (state.email) {
      const username = state.email;
      try {
        await Parse.User.requestPasswordReset(username);
        setSentStatus("success");
      } catch (err) {
        console.log("err ", err.code);
        setSentStatus("failed");
      } finally {
        setTimeout(() => setSentStatus(""), 1000);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchAppInfo());
    saveLogo();
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line
  }, []);
  const saveLogo = async () => {
    if (isEnableSubscription) {
      const logo = await getAppLogo();
      if (logo) {
        setImage(logo);
      } else {
        setImage(appInfo?.applogo || undefined);
      }
    } else {
      setImage(appInfo?.applogo || undefined);
    }
  };
  return (
    <div>
      <Title title="Forgot password page" />
      {sentStatus === "success" && (
        <Alert type="success">
          Reset password link has been sent to your email id
        </Alert>
      )}
      {sentStatus === "failed" && (
        <Alert type={"danger"}>Please setup email adapter </Alert>
      )}
      <div className="md:p-10 lg:p-16">
        <div className="md:p-4 lg:p-10 p-4 bg-base-100 text-base-content op-card">
          <div className="w-[250px] h-[66px] inline-block overflow-hidden">
            {image && (
              <img
                src={image}
                className="object-contain h-full"
                alt="applogo"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
            <div>
              <form onSubmit={handleSubmit}>
                <h2 className="text-[30px] mt-6">Welcome Back !</h2>
                <span className="text-[12px] text-[#878787]">
                  Reset Your Password
                </span>
                <div className="w-full my-4 op-card bg-base-100 shadow-md outline outline-1 outline-slate-300/50">
                  <div className="px-6 py-4">
                    <label className="block text-xs">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="op-input op-input-bordered op-input-sm w-full"
                      value={state.email}
                      onChange={handleChange}
                      required
                    />
                    <hr className="my-2 border-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-center text-xs font-bold">
                  <button type="submit" className="op-btn op-btn-primary">
                    Submit
                  </button>
                  <button
                    onClick={() => navigate("/", { replace: true })}
                    className="op-btn op-btn-secondary"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            {!state.hideNav && (
              <div className="self-center">
                <div className="mx-auto md:w-[300px] lg:w-[500px]">
                  <img src={login_img} alt="bisec" width="100%" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
