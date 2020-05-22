import React from 'react'; 
import './menu-item.styles.scss'
import { withRouter } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, size, history}) => (
    <div className={`${size} menu-item`}>
        <div className='background-image'
           style = {{
            backgroundImage: `url(${ imageUrl })`
            }}
           
        />
        <div className='content'
            onClick={()=>{history.push('/shop/`${title}`')}}> 
            <h1 className='title'>{ title.toUpperCase() }</h1>
                <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
    
);

export default withRouter(MenuItem);