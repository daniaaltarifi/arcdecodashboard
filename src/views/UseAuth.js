import * as React from "react";
    
const authContext = React.createContext();

function UseAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
 });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}
export default UseAuth;
export function AuthProvider({ children }) {
  const auth = UseAuth();

  return  }