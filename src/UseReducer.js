import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({name}){
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({type: actionTypes.confirm})
    const onError = () => dispatch({type: actionTypes.error})
    const onCheck = () => dispatch({type: actionTypes.check})
    const onDelete = () =>  dispatch({type: actionTypes.delete})
    const onReset = () => dispatch({type: actionTypes.reset})

    const onWrite = ({ target: { value }}) => {
        dispatch({type: actionTypes.write, payload: value})
    }


    React.useEffect(() =>{
        if (!!state.loading) {
            setTimeout(()=>{
                if (state.value !== SECURITY_CODE) {
                    onError()
                }else {
                    onConfirm()
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
                    onChange={onWrite}
                />
                <button onClick={onCheck}>
                    Comprobar
                </button>
            </>
        )
    }else if(!!state.confirmed && !state.deleted ) {
        return (
            <React.Fragment>
                <p>Pedimos confirmacion ¿Estas seguro?</p>
                <button onClick={onDelete} >Sí, eliminar</button>
                <button onClick={onReset} >No, me arrepenti</button>
            </React.Fragment>
        )
    }else{
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>Resetear, volver a tras</button>
            </React.Fragment>
        )
    }
}


const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const actionTypes = {
    error: 'ERROR',
    check: 'CHECK',
    write: 'WRITE',
    delete: 'DELETE',
    confirm: 'CONFIRM',
    reset: 'RESET'
}

const reducerObjet = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        loading: false,
        error: true
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
        error: false
    },
    [actionTypes.write]: {
        ...state, value: payload
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    },
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
        value: ''
    }


});

const reducer = (state, action) => {
    if (reducerObjet(state)[action.type]) {
        return reducerObjet(state, action.payload)[action.type];
    }
    return state;
}

export { UseReducer }