import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="www.youtube.com">
          <img
            src="https://lh3.googleusercontent.com/proxy/jOPvS2PScGj-JM1BXIfPfXBwar3NG3Y6Zuyb2OILrvUmtss16wRnOg6f-CiDgB_VeoZeszQsX0x1PvclDeYHvOaWSFbtC1z-Ayg0MvkoV98aD7Q86TbqKzM"
            width="100"
            height="28"
            alt="Logo"
          />
        </a>

				<div className="navbar-item">
						<span>Titulo</span>
					</div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
					{/* Aquí iría algo */}
        </div>

        <div className="navbar-end">
					{/* Aquí iría algo */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
