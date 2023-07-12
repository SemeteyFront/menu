import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMenu = createAsyncThunk(
  'getMenu/getMenu',
  async function(_, {rejectWithValue}) {
    try {
        const response = await fetch('http://localhost:3001/menu');
        if (!response.ok) {
            throw new Error('Server Error!');
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
  }
);