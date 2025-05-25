import axios from "axios";
import { UserState } from "../user/userSlice";

const baseUrl = "http://localhost:3000";

export class UserAPI {
  static async login(
    email: string,
    password: string
  ): Promise<{ access_token: string; user: UserState }> {
    const response = await axios.post<{
      access_token: string;
      user: UserState;
    }>(`${baseUrl}/auth/login`, { email, password });
    return response.data;
  }

  static async signup(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    const response = await axios.post(`${baseUrl}/users/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  }

  static async getUser(token: string): Promise<UserState> {
    const response = await axios.get<UserState>(`${baseUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}
