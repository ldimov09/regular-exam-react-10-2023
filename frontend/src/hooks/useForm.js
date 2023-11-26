import { useState, useEffect } from "react"

export default function useForm(submitHandler, initialValues, isInitialValuesLate) {
    const [values, setValues] = useState(initialValues);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setValues(initialValues);
    }, isInitialValuesLate ? [initialValues] : []);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        submitHandler(values, e);
    };

    return {
        values,
        onChange,
        onSubmit,
        validated
    }
}
