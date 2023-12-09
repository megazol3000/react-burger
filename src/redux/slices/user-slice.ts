import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NORMA_API } from "../../utils/burger-api";
import { IUser } from "../../utils/types";

interface IFetchRegistrationParams {
  name: string;
  email: string;
  password: string;
  hidePreloader: () => void;
}

interface IFetchLoginParams {
  email: string;
  password: string;
  hidePreloader: () => void;
}

interface IPasswordRecoveryParams {
  email: string | null;
  hidePreloader: () => void;
}

interface IPasswordResetParams {
  password: string;
  token: string;
  hidePreloader: () => void;
}

export const fetchRegistration = createAsyncThunk(
  "user/fetchRegistration",
  async function ({
    name,
    email,
    password,
    hidePreloader,
  }: IFetchRegistrationParams) {
    const response = await fetch(`${NORMA_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    await hidePreloader();

    return data;
  }
);

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async function ({ email, password, hidePreloader }: IFetchLoginParams) {
    const response = await fetch(`${NORMA_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    await hidePreloader();

    return data;
  }
);

export const fetchLogout = createAsyncThunk(
  "user/fetchLogout",
  async function ({ hidePreloader }: { hidePreloader: () => void }) {
    const response = await fetch(`${NORMA_API}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
    const data = await response.json();
    await hidePreloader();

    return data;
  }
);

export const fetchPasswordRecovery = createAsyncThunk(
  "user/fetchPasswordRecovery",
  async function ({ email, hidePreloader }: IPasswordRecoveryParams) {
    const response = await fetch(`${NORMA_API}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    await hidePreloader();

    return data;
  }
);

export const fetchResetPassword = createAsyncThunk(
  "user/fetchResetPassword",
  async function ({ password, token, hidePreloader }: IPasswordResetParams) {
    const response = await fetch(`${NORMA_API}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    });
    const data = await response.json();
    await hidePreloader();

    return data;
  }
);

const initialState: IUser = {
  registrationState: "",
  loginRequestState: "",
  logoutState: "",
  passwordRecoveryState: "",
  passwordResetState: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPasswordRecoveryState: (state) => {
      state.passwordRecoveryState = "";
    },
    setPasswordResetState: (state) => {
      state.passwordResetState = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.registrationState = "ok";
      } else {
        state.registrationState = "";
      }
    });

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.loginRequestState = "ok";
        state.logoutState = "";
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      } else {
        state.loginRequestState = "";
        state.logoutState = "ok";
      }
    });

    builder.addCase(fetchLogout.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.logoutState = "ok";
        state.loginRequestState = "";
        state.registrationState = "";
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } else {
        state.logoutState = "";
        state.loginRequestState = "ok";
      }
    });

    builder.addCase(fetchPasswordRecovery.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.passwordRecoveryState = "ok";
      } else {
        state.passwordRecoveryState = "";
      }
    });

    builder.addCase(fetchResetPassword.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.passwordResetState = "ok";
      } else {
        state.passwordResetState = "";
      }
    });
  },
});

export const { setPasswordRecoveryState, setPasswordResetState } =
  userSlice.actions;

export default userSlice.reducer;
