import 'bulma/css/bulma.min.css';
import React from 'react';
// import fintech from '/'

export default function Welcome() {
  return (
    <div style={{ backgroundImage: '', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>

        <div className='containerScreen'>
        <div>
            <img src="/fintech.jpg" className="background-img" alt="Fintech" />
            <div className="content">
            <div className="box">
                <a href='/login'>Login</a>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}
