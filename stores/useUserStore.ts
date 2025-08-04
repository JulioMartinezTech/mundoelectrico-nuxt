import { defineStore } from "pinia";

type User = {
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
};

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {
      documentId: "",
      username: "",
      email: "",
      provider: "",
      confirmed: false,
      blocked: false,
    } as User,
    token: <string>"",
    isLogin: <boolean>false,
  }),
  actions: {
    addUser(data: User, jwt: string) {
      this.userData = data;
      this.token = jwt;
      this.isLogin = true;
    },
    cleanUser() {
      this.userData = {
        documentId: "",
        username: "",
        email: "",
        provider: "",
        confirmed: false,
        blocked: false,
      };
      this.token = "";
      this.isLogin = false;
    },
  },
});
