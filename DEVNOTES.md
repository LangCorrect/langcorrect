When fetching a User:

- Use `getCurrentUser()` to get the currently logged in user. Do not grab them from session directly (via `auth()`)
- Use `getUserDTO` when you need to fetch user data.

General

- Switched to feature folder structure since it was getting a bit out of hand and it feels familiar with how django app structure works. E.g.:
    ```
    /features
        /users
            / types.ts
            / schema.ts
            / permissions.ts
            / permissions.test.ts
            / data.ts (data layer)
    ```
