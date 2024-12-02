
interface Level {
    id: number,
    name: string
}

export interface ConfigSubject {
    subjectId: string;
    subjectName: string;
    subjectCode: string;
    subjectTypeName: string;
    level: Level[];
}