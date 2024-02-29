import { AdminDtos } from "@hacienda-platform/api-interfaces";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const AppAuthActions = createActionGroup({
    source: '[Authentication]',
    events: {
        'login': props<{ access_token: string, user: AdminDtos.AdminAuthLoggedInUserDto }>(),
        'logout': emptyProps(),
    },
});