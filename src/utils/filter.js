// these functions filter elements according to selected criteria

export const getProjectLangs = (repositories) => {
  const set = new Set(
    repositories
      .map((r) => r.language)
      .filter((l) => l && l !== "")
      .sort()
  );
  return Array.from(set);
};
