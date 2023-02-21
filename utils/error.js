export const createError = ( status, message ) => {
    const error = new Error();
    error.status = status;
    error.message = message;

    return error;
}

export const ERROR_MESSAGE = {
    NOTFOUND: "Login Error: User not found",
    INVALID: "Login Error: Invalid Credentials"
}