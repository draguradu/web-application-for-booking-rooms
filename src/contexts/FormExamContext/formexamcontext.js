import React, { useState } from 'react';

const FormExamContext = React.createContext();

const initialState = {
    specializationForm: {},
    subjectForm: {},
    appointmentForm: {}
};

function FormExamProvider(props) {
    const [formExamState, setFormExamState] = useState(initialState);

    return (
        <FormExamContext.Provider value={{ formExamState, setFormExamState }}>
            {props.children}
        </FormExamContext.Provider>
    );
}

function useFormExamContext() {
    const formExamStateContext = React.useContext(FormExamContext);
    if (!formExamStateContext) {
        throw new Error('useFormExamContext must be used within a FormExamContext');
    }
    return formExamStateContext;
}

export { FormExamProvider, useFormExamContext };