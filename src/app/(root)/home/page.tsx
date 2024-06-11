"use client"
import React, { useState } from 'react'

import GPA from '@/components/global/GPA'
import { Button } from '@/components/ui/button'

import { FaPlus as Plus } from "react-icons/fa"

import { calculateCGPA, greetText } from '@/utils/gpa'
import { SemesterGPA } from '@/utils/types'

function Home() {
    const [CGPA, setCGPA] = useState<number>()
    const [semesters, setSemesters] = useState<SemesterGPA[]>([
        {
            id: 1,
            totalCredits: 0,
            totalSum: 0,
            GPA: 0,
        }
    ])

    const addSemester = () => {
        setSemesters([
            ...semesters,
            {
                id: semesters.length != 0 ? semesters[semesters.length - 1].id + 1 : 1,
                totalCredits: 0,
                totalSum: 0,
                GPA: 0
            }
        ])
    }

    const delSemester = (id: number) => {
        setSemesters(prev => prev.filter((e, i) => i != id))
    }

    const updateGPAOfCurrentSem = (id: number, gpa: number, credits: number, sum: number) => {
        setSemesters(prev => prev.map(e => {
            if (e.id == id) {
                return { ...e, GPA: gpa, totalCredits: credits, totalSum: sum };
            }
            return e;
        })
        )
        console.log(semesters)
    }

    const calcCGPA = () => {
        const currCGPA = calculateCGPA(semesters)
        setCGPA(currCGPA)
    }
    return (
        <div className=' w-full flex flex-col items-center justify-center py-10'>
            <h1 className='text-3xl font-semibold w-5/6 text-center'>Zween CGPA Calculator</h1>
            <div className='w-full flex flex-col justify-center items-center'>
                {
                    semesters.map((e, i) => {
                        return (
                            <>
                                <GPA id={e.id} deleteSemester={delSemester} keys={i} getCurrGPA={updateGPAOfCurrentSem} />
                            </>
                        )
                    })
                }
            </div>
            <div className='w-5/6 flex flex-col'>
                <div className='flex justify-between w-full pt-3'>
                    <Button onClick={calcCGPA} className='bg-slate-700 hover:bg-slate-500'>
                        Calculate CGPA
                    </Button>
                    <Button onClick={() => { addSemester() }} className='bg-slate-700 hover:bg-slate-500'>
                        <Plus className='text-md mr-1' />
                        Add Semester
                    </Button>
                </div>
                <div className="text-center mt-3">
                    <p className='text-2xl mb-2'>Your Current CGPA is {CGPA?.toFixed(3)}</p>
                    <p className=''>{CGPA && greetText(CGPA)}</p>
                </div>
            </div>
        </div>
    )
}

export default Home