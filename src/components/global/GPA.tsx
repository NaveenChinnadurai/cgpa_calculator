import React, { ChangeEvent, useState } from 'react'
import { Input } from '../ui/input'
import { gpa } from '@/utils/types'
import { Button } from '../ui/button'
import { calculateGPA } from '@/utils/gpa'
import { MdOutlineDelete as Delete } from "react-icons/md";
import { FaPlus as Plus } from "react-icons/fa";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue
} from '../ui/select'

interface prop {
    id: number,
    func: (i: number) => void,
    keys: number,
    finalFunc: (id: number, gpa: number, credits: number) => void
}
const GPA: React.FC<prop> = ({ id, func, keys, finalFunc }) => {
    const [currGPA, setCurrGPA] = useState<number[]>([10,3])
    const [subjects, setSubjects] = useState<gpa[]>([
        {
            id: 1,
            subjectName: "",
            credits: 1,
            grade: 'O'
        },
        {
            id: 2,
            subjectName: "",
            credits: 1,
            grade: 'O'
        },
        {
            id: 3,
            subjectName: "",
            credits: 1,
            grade: 'O'
        },
    ])


    const addSubject = () => {
        const newSub = {
            id: subjects.length != 0 ? subjects[subjects.length - 1].id + 1 : 1,
            subjectName: "",
            grade: 'O',
            credits: 1
        }
        setSubjects([...subjects, newSub])
    };

    const removeSubject = (id: number) => {
        setSubjects(subjects.filter(prev => prev.id != id))
    }

    const handleChange = (id: number, tag: ChangeEvent<HTMLInputElement>) => {
        setSubjects(prev =>
            prev.map(a => {
                if (a.id === id) {
                    return { ...a, [tag.target.name]: tag.target.value };
                }
                return a;
            })
        );
    };

    const getGradeInput = (id: number, value: string) => {
        setSubjects(prev => prev.map((e) =>
            e.id === id ? { ...e, grade: value } : e
        )
        );
    };

    const GetGPA = () => {
        setCurrGPA(calculateGPA(subjects))
        console.log(currGPA)
        finalFunc(id,currGPA[0],currGPA[1])
    }
    return (
        <div className='bg-slate-500 w-5/6 my-3 p-5 rounded-xl' key={keys}>
            <h2 className="text-2xl">Semeter-{keys + 1}</h2>
            <div>
                {
                    subjects.map((e, i) => {
                        return (
                            <div className='flex gap-2 p-3' key={i}>
                                <Input
                                    type="text"
                                    name="subjectName"
                                    value={e.subjectName}
                                    placeholder={`Subject-${i + 1} Name`}
                                    onChange={(a) => handleChange(e.id, a)}
                                    className='placeholder-black text-black'
                                />
                                <Input
                                    type="number"
                                    name="credits"
                                    value={e.credits}
                                    placeholder='Credits'
                                    min={3} max={4}
                                    onChange={(a) => handleChange(e.id, a)}
                                    className='placeholder-black text-black'
                                />
                                <Select name="grade" value={e.grade} onValueChange={(value) => getGradeInput(e.id, value)}>
                                    <SelectTrigger className="bg-slate-300 text-black">
                                        <SelectValue placeholder="Select a grade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="O" className='font-semibold'>O</SelectItem>
                                            <SelectItem value="A+" className='font-semibold'>A+</SelectItem>
                                            <SelectItem value="A" className='font-semibold'>A</SelectItem>
                                            <SelectItem value="B+" className='font-semibold'>B+</SelectItem>
                                            <SelectItem value="B" className='font-semibold'>B</SelectItem>
                                            <SelectItem value="C" className='font-semibold'>C</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Button onClick={() => removeSubject(e.id)}><Delete className="text-xl" /></Button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-between items-center p-3">
                <div className="flex gap-2">
                    <Button className='bg-slate-700' onClick={addSubject}>
                        <Plus className='text-lg mr-1' />
                        Add Subject
                    </Button>
                    <Button className='bg-slate-700' onClick={()=>GetGPA()}>Calculate</Button>
                </div>
                <p>GPA Of this Semester: {currGPA[0]}</p>
                <div className='flex gap-2'>
                    <Button className='bg-slate-700'>Reset</Button>
                    <Button className='bg-slate-700' onClick={() => func(keys)}>
                        <Delete className="text-xl mr-1" />
                        Delete Semester
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GPA