import React, { useState, useEffect } from 'react';
import ExamsComponent from './ExamsComponent';
import { FormExamsService } from 'services';

function ExamsContainer() {
    const [exams, setExams]=useState([]);

    useEffect(() => {
        async function getExamInfo(){
            const response = await FormExamsService.getExamInfo();
            if(response.status===200){
                setExams(response.data.exams);
            } else {
                //error
            }
        }
        getExamInfo();
    }, [])

    return (
        <ExamsComponent 
        exams={exams} />
    )
}

export default ExamsContainer;
