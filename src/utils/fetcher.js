// data fetcher
// I would prefer to put endpoints in an env file
const GITHUB_API = "https://api.github.com/search";

export async function fetcher(date = "2017-01-10") {
  return await fetch(
    `${GITHUB_API}/repositories?q=created:>${date}&sort=stars&order=desc`
  )
    .then((res) => res.json())
    .then(({ items = {} }) => items)
    .catch((err) => console.log(err));
}
