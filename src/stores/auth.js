import { writable } from "svelte/store";

/** Initializes with auth details. */
export const authStore = writable(
  (typeof window != "undefined" && JSON.parse(localStorage.getItem("auth")))
);

