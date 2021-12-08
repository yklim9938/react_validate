import { useState, useEffect } from "react"
import validation from '../assets/js/validation'

const ErrorMessage = (props) => {
    const [errorMsg, setErrorMsg] = useState()
    const [isFirstTime, setIsFirstTime] = useState(true)
    const types = ['required', 'minlength', 'maxlength', 'min', 'max', 'equalto', 'validemail', 'accept', 'maxfile', 'maxsize']
    const validate = (val) => {
        if (val != undefined && val != null) {
            if (!props.required && typeof val == 'string' && val.length < 1) return ''
            let hasError = false
            let msg = ''
            types.forEach(t => {
                if (!hasError && props[t] != undefined && props[t] != null) {
                    const error = validation[t](val, props[t])
                    if (error.type) {
                        msg = error.message
                        hasError = true
                    }
                }
            })
            return msg
        }
        return ''
    }

    useEffect(() => {
        if (isFirstTime) {
            setIsFirstTime(false)
            return
        }
        setErrorMsg(validate(props.value))
    }, [props.value])

    return (
        <div className="orca-error-msg">
            {errorMsg && (
                <div className="orca-error">{errorMsg}</div>
            )}
        </div>
    )
}

export default ErrorMessage