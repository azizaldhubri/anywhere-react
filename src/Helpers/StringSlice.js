export default function StringSlice(data,slieEnd){

    return(
         data.length>slieEnd ? data.slice(0,slieEnd)+'...' :data
    )

}