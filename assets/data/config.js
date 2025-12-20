export const config = {
  getCurrency() {
    return localStorage.getItem("currency") || "£";
  },
};
