import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo_padding from "../../assets/logo_padding.svg";
import logo_padding_white from "../../assets/logo_padding_white.svg";
import day from "../../assets/day.svg";
import night from "../../assets/night.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeState } from "../../services/store/theme";
import { isLoginState } from "../../services/store/auth";

const Header = ({ isTheme }) => {
  const isLogin = useRecoilValue(isLoginState);
  const [theme, setTheme] = useRecoilState(themeState);

  const handleToggleTheme = () => {
    if (theme === "DARK") {
      localStorage.setItem("theme", "LIGHT");
      setTheme("LIGHT");
      return;
    }

    localStorage.setItem("theme", "DARK");
    setTheme("DARK");
  };

  const nav = useNavigate();

  return (
    <Div>
      {isTheme ? (
        theme === "LIGHT" ? (
          <div className="wrapper">
            <img src={logo_padding} alt="" />
            <img
              className="theme-btn"
              src={day}
              alt=""
              onClick={handleToggleTheme}
            />
          </div>
        ) : (
          <div className="wrapper">
            <img src={logo_padding_white} alt="" />
            <img
              className="theme-btn"
              src={night}
              alt=""
              onClick={handleToggleTheme}
            />
          </div>
        )
      ) : (
        <img src={logo_padding} alt="" onClick={() => nav("/")} />
      )}

      <div
        className="login"
        onClick={() =>
          isLogin ? localStorage.removeItem("token") : nav("/login")
        }
      >
        {isLogin ? "로그아웃" : "로그인"}
      </div>
    </Div>
  );
};

export default Header;

const Div = styled.div`
  display: flex;
  padding: 0 32px 8px 24px;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: end;

  .wrapper {
    display: flex;
    align-items: start;

    .theme-btn {
      padding-top: 8px;
      cursor: pointer;
    }
  }

  .login {
    color: var(--grey2);
    font-variant-numeric: lining-nums tabular-nums;
    font-family: "Pretendard-regular";
    font-weight: 400;
    font-size: 14px;

    padding-bottom: 7px;
    cursor: pointer;
  }
`;
