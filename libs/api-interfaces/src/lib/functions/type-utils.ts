export function excludeKeysFromRecord<Record, Key extends keyof Record>(
    record: Record,
    ...keys: Key[]
): Omit<Record, Key> {
    for (const key of keys) {
        delete record[key];
    }
    return record;
}