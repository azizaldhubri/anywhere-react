import { Link } from 'react-router-dom'
import './404.css'
export default function Err404(){
    return(
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12 text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center">404</h1>
                            </div>
                            <div className="content_box_404">
                                <h2 className="h2">Look Like you ' re lost</h2>
                                <p>the page you are looking for not available</p>
                                <Link to={'/'} className='link_404'>
                                    GO to home 
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}