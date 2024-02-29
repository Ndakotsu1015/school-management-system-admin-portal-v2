import { AdminDtos } from "@hacienda-platform/api-interfaces";

export interface AppAuthState {
    access_token: string | null;
    user: AdminDtos.AdminAuthLoggedInUserDto | null;
}