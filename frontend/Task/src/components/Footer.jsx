import { Link } from 'react-router-dom';

import ROUTES from '../lib/routes';

function Footer() {
    return (
      <footer className="bg-dark py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
           
            <div className="col-12 col-md-3 mb-4 text-center text-md-start">
              <h5 className="text-white">Quespiration</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none"><Link to={ROUTES.PROFILE} className="text-white text-decoration-none">My profile</Link></a></li>
                <li><a href="#" className="text-white text-decoration-none"><Link to={ROUTES.CONSTRUCTOR_OF_QUEST} className="text-white text-decoration-none">Constructor of quests</Link></a></li>
                <li><a href="#" className="text-white text-decoration-none">Language</a></li>
              </ul>
            </div>
  
        
            <div className="col-12 col-md-6 mb-4 text-center">
              <h5 className="text-white">Our quests</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Education</a></li>
                <li><a href="#" className="text-white text-decoration-none">Fun</a></li>
                <li><a href="#" className="text-white text-decoration-none">Team building</a></li>
              </ul>
            </div>
  
         
            <div className="col-12 col-md-3 mb-4 text-center text-md-end">
              <h5 className="text-white">Contact us</h5>
              <ul className="list-unstyled text-white">
                <li>+380972854114</li>
                <li>info@gmail.com</li>
              </ul>
            </div>
          </div>
 
          <div className="text-center mt-4 text-white">
            <p className="mb-0">Copyright (C) Quespiration Corporation</p>
            <p className="mb-0">2025 | All rights reserved</p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  