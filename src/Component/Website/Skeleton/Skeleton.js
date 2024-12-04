import Skeleton from "react-loading-skeleton";

export default function ShowSkeleton(props){

    const ShowSeleton=Array.from({length:props.length}).map((_,index)=>(
        <div key={index} className={props.classess}>
             <div className="mx-1 ">

             <Skeleton            
            height={props.height}
            baseColor={props.baseColor}
            width={props.width}
            />
             </div>
        </div>
    ))
    return(ShowSeleton
        

    )

}