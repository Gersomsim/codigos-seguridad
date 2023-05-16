import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({name}) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    })

    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
            value: ''
        })
    }
    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true
        })
    }
    const onWrilte = (e) => {
        setState({...state, value: e.target.value})
    }
    const onCheck = () => {
        setState({...state, loading: true, error: false})
    }
    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        })
    }
    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ''
        })
    }

    React.useEffect(() =>{
        if (!!state.loading) {
            setTimeout(()=>{
                if (state.value !== SECURITY_CODE) {
                    onError();
                }else {
                    onConfirm();
                }
            }, 3000)
        }
    }, [state.loading])
    if (!state.confirmed && !state.deleted) {
        return (
            <>
                <h2>Eliminar {name}</h2>
                <p>Por favor escribe el codigo de seguridad</p>

                {(state.error && !state.loading) && (
                    <p>Error: El codigo es incorrecto</p>
                )}

                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input
                    type="text"
                    placeholder='Codigo de seguridad'
                    value={state.value}
                    onChange={onWrilte}
                />
                <button
                    onClick={onCheck}
                >
                    Comprobar
                </button>
            </>
        )
    }else if(!!state.confirmed && !state.deleted ) {
        return (
            <React.Fragment>
                <p>Pedimos confirmacion ¿Estas seguro?</p>
                <button
                    onClick={onDelete}
                >Sí, eliminar</button>
                <button
                    onClick={onReset}
                >No, me arrepenti</button>
            </React.Fragment>
        )
    }else{
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={onReset}
                >Resetear, volver a tras</button>
            </React.Fragment>
        )
    }
}

export { UseState }