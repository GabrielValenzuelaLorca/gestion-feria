import React from 'react';
import Navbar from './Navbar';

const NavbarLayout = ({component}) => {
  return (
    <div>
      <Navbar/>
      {component}
    </div>
  )
}

export default NavbarLayout;