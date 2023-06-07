import { defineStore } from "pinia";

interface User {
  email: string;
  token: string | null;
}

const storedToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!).token
  : null;

export const useGlobalStore = defineStore("user", () => {

  const email = ref("");
  const token = ref(storedToken);


  const isLoggedIn = computed<boolean>(() => !!token.value);

  
  function setEmail(value: string): void {
    email.value = value;
  }

  function setToken(value: string): void {
    token.value = value;
  }

  function login(email: string): void {
    const jwtToken =
      "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8";

    setEmail(email);
    setToken(jwtToken);
  }

  function logout(): void {
    localStorage.removeItem("user");
    email.value = "";
    token.value = null;
  }

  // watcher
  watch([email, token], () => {
    const user: User = {
      email: email.value,
      token: token.value,
    };
    const userString = JSON.stringify(user);
    localStorage.setItem("user", userString);
  });

  return {
    email,
    token,
    isLoggedIn,
    setEmail,
    setToken,
    login,
    logout,
  };
});
