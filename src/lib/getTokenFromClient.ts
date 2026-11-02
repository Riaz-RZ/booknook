import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
    const { data, error } = await authClient.token()
    const token = data?.token

    if (!token) {
        throw new Error(
            error?.message ?? "Unable to retrieve your authentication token. Please sign in again."
        );
    }

    return token;
}