export interface Trip {
    date: string;
    lift_id: string;
    lbb_data: LBBData[];
    lmd_data: LMDData[];
    trip_num: number;
}

export interface LBBData {
    timestamp: string;
    x : number;
    y : number;
    z : number;
}

interface LMDData {
    c : string;
    l: string;
    m: string;
    n : FloorInfo;

}

interface FloorInfo {
    ac: string;
    ar:number;
    b: string;
    f: number;
    h_d: number[];
    h_u: number[];
    l : number;
    p: number;
    s: number;
    u: number;
    t: string;
}