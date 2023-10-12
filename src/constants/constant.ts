import { constants } from "buffer"

const Constants = {
    MESSAGES: {
        EXPIRED_TOKEN:"User expired token",
        USER_EXIST: "User already exists",
        USER_LOGGED: "User logged in successfully",
        USER_LOGGED_OUT: "User logged out in successfully",
        USER_UPDATED: "User updated successfully",
        USER_NOT_EXIST: "User does not exist",
        USER_ACTIVITY_GOTTEN: "User activities gotten successfully", 
        UPLOADED: "Upload Successful",
        ALREADY_EXIST: "Resource already exists",
        ALREADY_VERIFIED: "User has already been verified",
        CREATED: "Resource created successfully",
        FETCHED: "Resource fetch successfull",
        UPDATED: "Resource updated successfully",
        DELETED: "Resource deleted successfully",
        NOT_FOUND: "Not found",
        SERVER_ERROR:"Internal server error",
        MISSING_FIELDS: "Please fill in the missing fields",
        INVALID_CREDENTIALS: "Invalid credentials",
        INVALID_INPUT: "Invalid input data or bad request",
        INVALID_TOKEN: "Invalid token",
        UNSUPPORTED_MEDIA_TYPE: "Unsupported Media Type",
        FORBIDDEN: "Forbidden",
        BAD_REQUEST: "Bad Request",
        UNPROCESSABLE_ENTITY: "Unprocessable Entity",
        NO_CONTENT: "No Content",
        METHOD_NOT_ALLOWED: "Method Not Allowed",
        LOCKED: "User account is locked",
      },
}
export default Constants;