import { ApiError } from "./errors";
import { constants } from "http2";

const apiErrorToStatusCode: Record<number, number> = {
    [ApiError.VALIDATION_ERROR]: constants.HTTP_STATUS_BAD_REQUEST,
    [ApiError.ENTITY_EXISTS]: constants.HTTP_STATUS_BAD_REQUEST,
    [ApiError.UNAUTHORIZED]: constants.HTTP_STATUS_UNAUTHORIZED,
    [ApiError.UNKNOWN_ERROR]: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
};

export function mapToStatusCode(apiError: ApiError) {
    return apiErrorToStatusCode[apiError] || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
}
