import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../../Pages/Websit/HomePage/Home.css'


export default function Landing(){    

    return(         
          <div className="d-flex align-items-center flex-wrap home position-relative">
       
          <Container  >
            
            <div className="col-lg-5 col-md-8 col-12 text-md-start text-center ">
                <h1 className="display-3 fw-bold">Shampoo Nice</h1>
                <h5 style={{color:'white'}} className="fw-normal ">
                    Anuther nice thing whitch is used be someone  i don,t know 
                </h5>
                <Link to="/shop"
                className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light">
                    Shop now
                </Link>
                
            </div>
          </Container> 
          <div className="position-absolute top-0 start-0    mt-2 ms-2 d-flex flex-column">        
               
         
          </div>
       
    </div>
    )
}