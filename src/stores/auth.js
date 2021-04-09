import { writable } from "svelte/store";
  
/** Redirect if at a path that requires login and user is not logged in.
 * @param {Array.<string>} excludedPaths - Paths that don't require login (index page included by default)
 */
function checkPaths(excludedPaths = ["/published/"]) {
  var curPath = location.pathname;
  if (!excludedPaths.some((v) => curPath.includes(v)) && curPath != "/")
    location.pathname = `/`; // login page path
}

/** Initializes with auth details. */
export const authStore = writable(
  typeof window != "undefined" &&
    (JSON.parse(localStorage.getItem("auth")) || checkPaths())
);
