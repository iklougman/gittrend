export { fetcher } from "./fetcher";
export { getLastWeekDate } from "./date";
export { getProjectLangs } from "./filter";
export { isStarred, unStarRepo, starRepo } from "./starHandler";

// open window
export const opener = (url) => window.open(url, "_blamk");
