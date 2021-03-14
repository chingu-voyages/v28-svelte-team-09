import { writable } from "svelte/store";

/** Redirect if at a path that requires login and user is not logged in. */
function checkPaths(arr) {
  var curPath = location.pathname;
  if (!arr.filter((v) => curPath.includes(v) || curPath == "/").length)
    location.pathname = `/signin`;
}

/** Initializes with auth details. Redirect check is only performed once for the app's init. */
export const authStore = writable(
  JSON.parse(localStorage.getItem("auth")) ||
    checkPaths(["signin", "signup"])
);