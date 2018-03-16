module.exports = {
    RECORDS: {
        FAILED_TO_CREATE_RECORD: {
            code: "FAILED_TO_CREATE_RECORD",
            message: "An error occured trying to save a record."
        },
        FAILED_TO_FIND_RECORD: {
            code: "FAILED_TO_FIND_RECORD",
            message: "No record could be found."
        },
        FAILED_TO_UPDATE_RECORD: {
            code: "FAILED_TO_UPDATE_RECORD",
            message: "An error occured trying to update a record."
        },
        FAILED_TO_MARK_RECORD_DELETED: {
            code: "FAILED_TO_MARK_RECORD_DELETED",
            message: "An error occured trying to mark a record deleted"
        },
        FAILED_TO_LIST_RECORD: {
            code: "FAILED_TO_LIST_RECORD",
            message: "An error occured trying to list all records."
        }
    },
    USERS: {
        FAILED_TO_CREATE_USER: {
            code: "FAILED_TO_CREATE_USER",
            message: "An error occured trying to save a user."
        },
        FAILED_TO_FIND_USER: {
            code: "FAILED_TO_FIND_USER",
            message: "No user could be found."
        },
        FAILED_TO_UPDATE_USER: {
            code: "FAILED_TO_UPDATE_USER",
            message: "An error occured trying to update a user."
        },
        FAILED_TO_MARK_USER_DELETED: {
            code: "FAILED_TO_MARK_USER_DELETED",
            message: "An error occured trying to mark a user deleted"
        },
        FAILED_TO_LIST_USER: {
            code: "FAILED_TO_LIST_USER",
            message: "An error occured trying to list all users."
        }
    },
    AUTH: {
        FAILED_AUTHENTICATE_TOKEN: {
            code: "FAILED_AUTHENTICATE_TOKEN",
            message: "Failed to authenticate your auth token."
        },
        INVALID_TOKEN: {
            code: "INVALID_TOKEN",
            message: "Invalid auth token."
        },
        AUTHENTICATION_ERROR: {
            code: "AUTHENTICATION_ERROR",
            message: "An error occured trying to authenticate you."
        },
        FAILED_TO_LOOKUP_EMAIL: {
            code: "FAILED_TO_LOOKUP_EMAIL",
            message: "No user was found with the email provided."
        },
        INCORRECT_PASSWORD: {
            code: "INCORRECT_PASSWORD",
            message: "An incorrect password was provided."
        }
    },
    INTERNAL_ERROR: {
        code: "INTERNAL_ERROR",
        message: "A server error occured."
    }
}
