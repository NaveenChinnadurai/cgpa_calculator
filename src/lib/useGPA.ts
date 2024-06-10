import { useContext } from "react";
import { GPA } from "@/utils/GPAContext";
import { GPAContext } from "@/utils/GPAContext";

export const useGPA = (): GPA => {
    const context = useContext(GPAContext);
    if (!context) {
        throw new Error('useGPA must be used within a GPAProvider');
    }
    return context;
};