export const config = {
  getCurrency() {
    return localStorage.getItem("currency") || "£";
  },
  getFirstName() {
    return localStorage.getItem("first-name") || "you";
  },
};
