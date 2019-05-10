export function getEmployeeDetail(id) {
    return (dispatch)=>{
        dispatch({type:'GET_DETAILS_BEGIN'})
        return fetch(`https://reqres.in/api/users/${id}`)
        .then(res => res.json())
        .then(json => {
            //console.log(json.data)
            dispatch({
                type:"GET_DETAILS_SUCCESS",
                empDetails: json.data
            })
        })
    }
}