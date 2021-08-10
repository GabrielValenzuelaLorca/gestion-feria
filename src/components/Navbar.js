import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="www.youtube.com">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
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
