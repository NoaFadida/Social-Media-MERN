import AuthApi from "../api/AuthApi";
import apiClient from "../api/ClientApi"

export type User = {
  email: String;
  password: String;
  name?: String;
  avatarUrl?: String;
};

export type Token = {
  refreshtoken: string;
};

type UserInfo = {
  accessToken: string;
  refreshToken: string;
  id: string;
};

const register = async (user: User) => {
  const data = {
    email: user.email,
    name: user.name,
    password: user.password,
    avatarUrl: user.avatarUrl,
  };
  try {
    const res = await AuthApi.register(data);
    if (res.status == 400) {
      return res;
    } else if (res.status == 200) {
      return res
    }
  } catch (err) {
    console.log("register failed");
  }
};

const login = async (user: User): Promise<string | UserInfo | any> => {
  const userData: User = {
    email: user.email,
    password: user.password,
  };
  try {
    const res = await AuthApi.login(userData);
    const data: UserInfo | any = res?.data;
    const { accessToken, id, refreshToken } = data || {};
    if (!id) {
      console.log("id is undefined");
      return;
    } else {
      const userRes = [accessToken, id, refreshToken];
      console.log("good data");
      return userRes;
    }
  } catch (err) {
    console.log("login failed");
    throw err;
  }
};

const logout = async (): Promise<void> => {
  console.log("logout");
  await AuthApi.logout();
};

export default { register, login, logout };
