import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiBaseURL = "http://localhost:3001/api/v1";

export const userEdit = createAsyncThunk(
  "auth/edit",
  async ({ firstName, lastName }, { rejectWithValue, getState }) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${getState().auth.userToken}`,
        },
      };

      const userInfos = await axios.put(
        `${apiBaseURL}/user/profile`,
        { firstName, lastName },
        headers,
      );

      return { firstName, lastName };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `${apiBaseURL}/user/login`,
        { email, password },
        config,
      );

      // Getting profile data if user loggedIn
      if (res.data.status === 200) {
        const headers = {
          headers: {
            Authorization: `Bearer ${res.data.body.token}`,
          },
        };

        const userInfos = await axios.post(
          `${apiBaseURL}/user/profile`,
          {},
          headers,
        );

        if (userInfos.data && userInfos.data.status === 200) {
          res.data.userInfos = userInfos.data.body;
        }
      }

      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
