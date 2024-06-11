import { SemesterGPA, gpa } from "./types";

export const calculateGPA = (gpaArray: gpa[]): number[] => {
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

    gpaArray.map(e=>{
        const gradeValue = gradeMap[e.grade] || 9;
        sum += e.credits * gradeValue;
        totalCredits += Number(e.credits);
    })

    const gpa = sum / totalCredits
    return [gpa, totalCredits, sum];
};

export const calculateCGPA = (sem: SemesterGPA[]) => {
    let totalCredits = 0;
    let sum = 0;

    sem.map(e => {
        sum += e.totalSum
        totalCredits += e.totalCredits;
    })

    return sum / totalCredits
}

export const greetText=(n:number):string=>{
    if(n>=9){
        return "Well, Good Score!! Keep it up.."
    }else if(n>=8){
        return "Yeah, Good!! Need to improve."
    }else if(n>7){
        return "Score is quite lesser!! Try to improve."
    }else if(n>=6){
        return "Need more care on your Studies."
    }else{
        return "Study well to increase your CGPA."
    }
}