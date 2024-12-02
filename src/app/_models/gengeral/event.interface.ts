export interface EventInterface {
    id: string;
    name: string;
    fromDate: number;
    toDate: number;
    address: string,
    numberResigter: number;
    description: string;
}

export interface ListEventInterface {
    data: Array<EventInterface>
}