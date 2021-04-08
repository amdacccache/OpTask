import "./Footer.css";

function Footer() {
  return (
    <footer className="text-center text-lg-start">
      <div className="p-4">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase colorDesign">OpTask</h5>
            <p> Built by Nabil Arbouz and Anna Daccache (2021)</p>
          </div>
          <div className="col-lg3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase colorDesign">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a
                  href="https://johnguerra.co/classes/webDevelopment_spring_2021/"
                  className="text-dark"
                >
                  Course Website
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/amdacccache/novelish.io"
                  className="text-dark"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
