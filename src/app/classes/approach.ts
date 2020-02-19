export interface Approach {
    approachPK: number;
    carrierPK: number;
    lctAppPK: number;
    lcApErPK: number;
    typeTruck: number;
    modality: number;
    routePK: number;
    store: {
        storeId: number;
        storeName: string;
    };
    locarionDestiny: {
        lctionPK: number;
        lctionNameSector: string;
        lctionNameProvince: string;
        lctionNameRegion: string;
    };
    cost: number;
}