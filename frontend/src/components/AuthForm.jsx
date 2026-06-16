import React from "react";
import styled from "styled-components";

export default function AuthForm({
  type, // "login" или "register"
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  onSwitchClick,
}) {
  return (
    <StyledWrapper>
      <form className="form" onSubmit={onSubmit}>
        {type === "register" && (
          <>
            <div className="flex-column">
              <label>Username</label>
            </div>
            <div className="inputForm">
              <input
                type="text"
                className="input"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <svg
            height={20}
            viewBox="0 0 32 32"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </g>
          </svg>
          <input
            type="email"
            className="input"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <svg
            height={20}
            viewBox="-64 0 512 512"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg>
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" id="remember" />
            <label
              htmlFor="remember"
              style={{ marginLeft: "5px", cursor: "pointer" }}
            >
              Remember me
            </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>

        <button type="submit" className="button-submit">
          {type === "login" ? "Sign In" : "Sign Up"}
        </button>

        <p className="p">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="span"
            onClick={onSwitchClick}
            style={{ cursor: "pointer" }}
          >
            {type === "login" ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 400px;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .flex-column > label {
    color: #151717;
    font-weight: 600;
    font-size: 14px;
  }
  .inputForm {
    border: 1.5px solid #eceff1;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }
  .inputForm:focus-within {
    border: 1.5px solid #2d3748;
  }
  .input {
    margin-left: 10px;
    border: none;
    width: 85%;
    height: 100%;
    outline: none;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d3748;
    font-weight: 500;
    cursor: pointer;
  }
  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  .button-submit:hover {
    background-color: #2d3748;
  }
  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }
  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1.5px solid #eceff1;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  .btn:hover {
    background-color: #f7fafc;
  }
  .line {
    color: #a0aec0;
    position: relative;
  }
`;
