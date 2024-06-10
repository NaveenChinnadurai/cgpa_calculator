"use client"
import GPA from '@/components/global/GPA'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function Home() {
    const [CGPA, setCGPA] = useState<number>()
    const [semesters, setSemesters] = useState([
        {
            id: 1,
            totalCredits:0,
            GPA:0,
        }
    ])

    const addSemester = () => {
        setSemesters([
            ...semesters,
            {
                id: semesters.length!=0?semesters[semesters.length - 1].id + 1 :1,
                totalCredits:0,
                GPA:0
            }
        ])
    }

    const delSemester = (id: number) => {
        setSemesters(prev => prev.filter((e,i) => i != id))
    }

    const updateGPAOfCurrentSem=(id:number,gpa:number,credits:number)=>{
        setSemesters(prev=>prev.map(e=>{
                if(e.id==id){
                    return {...e,GPA:gpa,totalCredits:credits};
                }
                return e;
            })
        )
        console.log(semesters)
    }
    return (
        <div className=' w-full flex flex-col items-center justify-center py-10'>
            <h1 className='text-3xl font-semibold'>CGPA Calculator</h1>
            <div className='w-full flex flex-col justify-center items-center'>
                {
                    semesters.map((e, i) => {
                        return (
                            <>
                                <GPA id={e.id} func={delSemester} keys={i} finalFunc={updateGPAOfCurrentSem}/>
                            </>
                        )
                    })
                }
            </div>
            <div>
                <Button onClick={() => { addSemester() }}>Add Semester</Button>
            </div>
        </div>
    )
}

export default Home