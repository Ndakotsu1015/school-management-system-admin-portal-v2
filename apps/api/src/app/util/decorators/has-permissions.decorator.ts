import { SetMetadata } from "@nestjs/common";

export const REFLECTOR_KEY_HAS_PERMISSIONS = 'permissions';

export const HasPermissions = (...permissions: string[]) => SetMetadata(REFLECTOR_KEY_HAS_PERMISSIONS, permissions);