import { useState, useEffect, useRef } from "react"
import validation from '../assets/js/validation'

const Form = ({children, onSubmit}) => {
    const formRef = useRef()
    const [inputs, setInputs] = useState([])
    const [inputAttributes, setInputAttributes] = useState([])

    const validateInput = (input) => {
        let value = input.value
        if (input.type == 'file') value = input.files
        if (!input.required && typeof value == 'string' && value.length < 1) return

        for (let a = 0; a < input.attributes.length; a++) {
            const errorEls = getErrorEl(input.parentElement)
            if (errorEls.length > 0) break // already has error, exit loop
            if (!validation[input.attributes[a].name]) continue // not validation attribute, skip

           // create error element
            const error = validation[input.attributes[a].name](value, input.attributes[a].value)
            if (error.type) {
                const errorEl = document.createElement('div')
                errorEl.classList.add('orca-error')
                errorEl.innerHTML = error.message
                input.parentElement.insertBefore(errorEl, input.nextSibling)
            }
        }
    }

    const getErrorEl = (wrapper) => {
        return wrapper.querySelectorAll('.orca-error')
    }

    const getEventType = (input) => {
        let eventType = 'input'
        if (input.tagName.toLowerCase() == 'select') eventType = 'change'
        return eventType
    }

    const inputEvent = (e) => {
        const errorEls = getErrorEl(e.target.parentElement)
        errorEls.forEach(e => e.remove())
        validateInput(e.target)
    }

    useEffect(() => {
        let formInputs = formRef.current.querySelectorAll('input.orca, select.orca, textarea.orca')
        setInputs(formInputs)

        formInputs.forEach((i, index) => {
            i.addEventListener(getEventType(i), inputEvent)
        })
    }, [])

    useEffect(() => {
        return () => {
            if (inputs.length > 0) {
                inputs.forEach(i => i.removeEventListener(getEventType(i), inputEvent))
            }
        }
    }, [inputs])

    const submitHandler = (e) => {
        e.preventDefault()

        inputs.forEach(i => {
            validateInput(i)
        })

        if (typeof onSubmit == 'function') {
            let isValid = true
            const errorEls = getErrorEl(formRef.current)

            if (errorEls.length > 0) isValid = false
            e.isValid = isValid
            onSubmit(e)
        }
    }

    return (
        <form onSubmit={submitHandler} ref={formRef}>
            {children}
        </form>
    )
}

export default Form