import { gpa } from "./types";

export const calculateGPA = (data: gpa[]):number[] => {
    const gradeMap: Record<string, number> = {
        'O': 10,
        'A+': 9,
        'A': 8,
        'B+': 7,
        'B': 6,
        'C': 5,
    };

    let sum = 0;
    let totalCredits = 0;

    for (const { grade, credits } of data) {
        const gradeValue = gradeMap[grade] || 9;
        sum += credits * gradeValue;
        totalCredits += Number(credits);
    }

    return [Number((sum / totalCredits).toFixed(2)),totalCredits];
};