When fetching a User:

- Use `getCurrentUser()` to get the currently logged in user. Do not grab them from session directly (via `auth()`)
- Use `getUserDTO` when you need to fetch user data
