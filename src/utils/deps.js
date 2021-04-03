import djs from "dayjs";
import utc from "dayjs/plugin/utc";

export function dayjs() {
  if (typeof window != "undefined") {
    djs.extend(utc);
    return djs();
  } else {
    // fake a server rendered dayjs API to avoid errors
    const isomorphicdjs = {
      add: fn,
      subtract: fn,
      endOf: fn,
      startOf: fn,
      utc: fn,
      isSame: fn1,
      daysInMonth: fn1,
      day: fn1,
      format() {
        return "";
      },
    };
    function fn() {
      return isomorphicdjs;
    }
    function fn1() {
      return 1;
    }
    return isomorphicdjs;
  }
}
