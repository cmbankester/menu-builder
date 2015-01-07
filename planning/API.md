# Internal API


## Table of contents ##

* [Access](#access)
* [Errors](#errors)
* [Requests](#requests)
  * Rules
    * [GET /api/foo-bar](#foo-bar)

## <a name="access"></a>Access ##

Cookie-based authentication with the api is required for most routes.
To authenticate, submit a POST request to `/login` (see [POST /login](#login)).
To rescind authentication, submit a POST request to `/logout`.

## <a name="errors"></a>Errors ##

Requests could result in one of these errors:

<a name="errors-400"></a>`400`:
  * the request was malformed or the structure of the body was incorrect

  ```json
  {
    "error": "invalid request body sent",
    "details": [
      "windowsDomain is not allowed to be empty",
      ...
    ]
  }
  ```

<a name="errors-401"></a>`401`:
  * authentication is required, but the authentication cookie was not sent

  ```json
  {
    "error": "unauthorized"
  }
  ```

<a name="errors-403"></a>`403`:
  * the authenticated account does not have permission to use this http endpoint

  ```json
  {
    "error":  "forbidden", // may also be 'too many users' (see NB below)
    "action": "the action which is forbidden by this account"
  }
  ```

  **NB**: a 403 will happen when:
    * a user who does not have `isAdmin` set to true
  tries to use an endpoint meant for admins only (e.g. `GET /accounts`)
    * a user tries to add a new user when they have already reached their user
  limit

<a name="errors-404"></a>`404`:
  * the requested http endpoint is not valid (does not exist)

  ```json
  {
    "error": "not found",
    "url":   "the route which was not found (e.g. '/')"
  }
  ```

<a name="errors-500"></a>`500`:
  * An unforseen internal server error has occurred

  ```json
  {
    "error": "some error message",
    "stack": "a stack trace"
  }
  ```

## <a name="requests"></a>Requests ##

### <a name="foobar"></a>/api/foobar
  * What params it takes:
    ```json
      {
        "foo": "bar"
      }
    ```
  * What it does:
    1. Adds `foo` to stuff
    2. Optionally sets `barbaz`
  * What it will return:
    * General return structure
    ```json
      {
        "bar": "baz"
      }
    ```
    * Error return structure
    ```json
      {
        "error": "Not enough foo"
      }
    ```
  * Other stuff about this route:
    * Requires admin privilege
    * Will self-destruct after 15 seconds
