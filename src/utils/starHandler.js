// save repo id of starred repo
export const starRepo = (repoId = "") => localStorage.setItem(repoId, "star");
// remove star from repo by id
export const unStarRepo = (repoId = "") => localStorage.removeItem(repoId);
// check whenever repo has a star in LS
export const isStarred = (repoId = "") => !!localStorage.getItem(repoId);
