export interface gpa {
    id: number,
    subjectName: string,
    credits: number,
    grade: string
}

export interface SemesterGPA {
    id: number,
    totalSum:number,
    totalCredits: number,
    GPA: number,
}