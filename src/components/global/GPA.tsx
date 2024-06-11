import React, { ChangeEvent, useState } from 'react'

import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { gpa } from '@/utils/types'
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
    deleteSemester: (i: number) => void,
    keys: number,
    getCurrGPA: (id: number, gpa: number, credits: number, sum: number) => void
}

const GPA: React.FC<prop> = ({ id, deleteSemester, keys, getCurrGPA }) => {
    const [currGPA, setCurrGPA] = useState<number[]>([10, 3, 10])
    const [subjects, setSubjects] = useState<gpa[]>([
        {
            id: 1,
            subjectName: "",
            credits: 3,
            grade: 'O'
        },
        {
            id: 2,
            subjectName: "",
            credits: 3,
            grade: 'O'
        },
        {
            id: 3,
            subjectName: "",
            credits: 3,
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

    const resetFields = () => {
        setSubjects(prev => prev.map(e => {
            return { ...e, subjectName: "", credits: 3, grade: 'O' }
        }))
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

    const getGPA = () => {
        setCurrGPA(calculateGPA(subjects))
        console.log(currGPA)
        getCurrGPA(id, currGPA[0], currGPA[1], currGPA[2])
    }
    return (
        <div className='bg-slate-500 w-5/6 my-3 p-5 rounded-xl' key={keys}>
            <div className='flex justify-between'>
                <h2 className="text-2xl">Semester-{keys + 1}</h2>
                <Button className='bg-slate-700 sm:hidden' onClick={resetFields}>Reset</Button>
            </div>
            <div>
                {
                    subjects.map((e, i) => {
                        return (
                            <div className='flex gap-2 p-3' key={i}>
                                <div className='flex flex-wrap sm:flex-nowrap w-full gap-2'>
                                    <div className='flex gap-2 flex-shrink w-full sm:w-1/3'>
                                        <Input
                                            type="text"
                                            name="subjectName"
                                            value={e.subjectName}
                                            placeholder={`Subject ${i + 1}`}
                                            onChange={(a) => handleChange(e.id, a)}
                                            className='w-full sm:w-full placeholder-black text-black'
                                        />
                                        <Button onClick={() => removeSubject(e.id)} className='sm:hidden'><Delete className="text-xl " /></Button>
                                    </div>
                                    <div className='w-full sm:w-2/3 flex gap-2'>
                                        <Input
                                            type="number"
                                            name="credits"
                                            value={e.credits}
                                            placeholder='Credits'
                                            min={3} max={4}
                                            onChange={(a) => handleChange(e.id, a)}
                                            className='w-1/2 placeholder-black text-black'
                                        />
                                        <Select name="grade" value={e.grade} onValueChange={(value) => getGradeInput(e.id, value)}>
                                            <SelectTrigger className="w-1/2 bg-slate-300 text-black">
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
                                    </div>
                                </div>
                                <Button onClick={() => removeSubject(e.id)} className='hidden sm:flex'><Delete className="text-xl " /></Button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-between sm:items-center p-3">
                <div className="flex gap-2 flex-col sm:flex-row">
                    <Button className='bg-slate-700 w-fit' onClick={addSubject}>
                        <Plus className='text-lg mr-1' />
                        <span className='hidden md:flex'>Add Subjects</span>
                    </Button>
                    <Button className='bg-slate-700 ' onClick={() => getGPA()}>Calculate</Button>
                </div>
                <p className='hidden lg:flex'>GPA of this Semester: {currGPA[0].toFixed(2)}</p>
                <div className='flex gap-2'>
                    <Button className='bg-slate-700 hidden sm:flex' onClick={resetFields}>Reset</Button>
                    <Button className='bg-slate-700' onClick={() => deleteSemester(keys)}>
                        <Delete className="text-xl mr-1" />Delete Semester
                    </Button>
                </div>
            </div>
            <p className='lg:hidden text-center'>GPA of this Semester: {currGPA[0].toFixed(2)}</p>
        </div>
    )
}

export default GPA