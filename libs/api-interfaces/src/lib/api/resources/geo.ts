export interface GeoCountryResource {
    id: number;
    name: string;
    currency_name: string | null;
    currency_sign: string | null;
    // relations
    states: GeoStateResource[];
}

export interface GeoStateResource {
    id: number;
    name: string;
    country_id: number;
    // relations
    lgas: GeoLgaResource[];
}

export interface GeoLgaResource {
    id: number;
    name: string;
    state_id: number;
}

// // export function mapEntityToResource<Entity, Resource>(entity: Entity): Resource;

// export function mapGeoCountryEntityToResource(entity: GeoCountry & { states: GeoState[] }): GeoCountryResource {
//     return {
//         ...entity,
//         states: entity.states.map(mapGeoStateEntityToResource),
//     };
// }

// export function mapGeoStateEntityToResource(entity: GeoState & { lgas: GeoLga[] }): GeoStateResource {
//     return {
//         ...entity,
//         lgas: entity.lgas.map(mapGeoLgaEntityToResource),
//     };
// }

// export function mapGeoLgaEntityToResource(entity: GeoLga): GeoLgaResource {
//     return {
//         ...entity,
//     };
// }