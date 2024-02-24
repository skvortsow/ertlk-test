import usersList from "../usersList";
import { defineStore } from "pinia";

const loadUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usersList);
    }, 1000);
  });
};

const loadAddresses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usersList);
    }, 1000);
  });
};

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: null,
      usersList: null,
    };
  },
  actions: {
    userIsRegistered(user) {
      return this.usersList.find((regUser) => {
        return (
          regUser.login === user.login && regUser.password === user.password
        );
      });
    },
    async loadUsers() {
      try {
        this.usersList = await loadUsers();
      } catch (error) {
        console.log(error);
      }
    },
    addUser(user) {
      this.usersList.push(user);
    },
    setUser(user) {
      this.user = user;
    },
  },
});

export const useTableStore = defineStore("tableStore", {
  state: () => {
    return {
      addresTable: null,
    };
  },
  actions: {
    loadAddresses() {},
  },
});
