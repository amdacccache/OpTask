import "./Landing.css";
import LogoImage from "../Images/TinyLogo.png";
import CheckIcon from "../Images/checklist.png";
import Project from "../Images/project.png";
import ComputerWoman from "../Images/computerWoman.png";
import WorkFlow from "../Images/bookkeeping.png";
import Progress from "../Images/progressChart.png";
import Complete from "../Images/completed.png";
import { Link } from "react-router-dom";

const Landing = (props) => {

    return (
        <body>
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div class="container">
                    <a class="navbar-nav" href="/"><img src={LogoImage} alt="OpTask Logo"/></a>
                    <button class="navbar-toggler button-color" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/login">Log In</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/register">Sign Up</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <header class="page-header gradient">
                <div class="container pt-3">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-5">
                            <h2>Welcome to OpTask!</h2>
                            <p>A space where you can easily manage all your project tasks.</p>
                            <Link type="button" class="btn btn-outline-info btn-lg" to="/register">Sign Up</Link>
                        </div>
                        <div class="col-md-5"><img src={CheckIcon} alt=""/></div>
                        {/* image from: https://www.vecteezy.com/vector-art/2043859-man-completed-checklist */}
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,138.7C672,128,768,64,864,53.3C960,43,1056,85,1152,90.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </header>
            <section class="optask">
                <div class="container text-center">
                    <div class="row g-5 align-items-center justify-content-center">
                        {/* Image from: https://www.vecteezy.com/free-vector/project-management*/}
                        <div class="col-md-3"><img src={WorkFlow} alt="work flow" class="img-fluid pic1"/></div>
                        {/* Image from: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.project-management-prepcast.com%2Ffree%2Fpmp-exam%2Farticles%2F1108-online-kanban-tools-a-buyers-guide&psig=AOvVaw21sD2KVkPOXuJVAJgOmkhR&ust=1617667855440000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKC3lMXo5e8CFQAAAAAdAAAAABAD */}
                        <div class="col-md-4"><img src={Progress} alt="progress chart" class="img-fluid"/></div>
                        {/* Image from: https://www.vecteezy.com/vector-art/2043827-woman-completes-checklist */}
                        <div class="col-md-3"><img src={Complete} alt="" class="img-fluid"/></div>
                    </div>
                </div>
                
            </section>
            <section class="feature gradient">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,64L48,58.7C96,53,192,43,288,64C384,85,480,139,576,181.3C672,224,768,256,864,229.3C960,203,1056,117,1152,96C1248,75,1344,117,1392,138.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-5"><img src={ComputerWoman} alt=""/></div>
                        {/* image from: https://www.vecteezy.com/vector-art/227880-female-developer-vector*/}
                        <div class="col-md-5">
                            <h1 class="my-3">What can OpTask do?</h1>
                            <p class="my-4">
                                OpTask is reimaging how project management can be done. By streamlining the process and giving you a place to keep track of all of your projects,
                                you no longer need to go anywhere else to keep track of your work.
                            </p>
                            <ul>
                                <li> Lorem Ipsum.</li>
                                <li> Lorem Ipsum.</li>
                                <li> Lorem Ipsum.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="text-center text-lg-start">
                <div class="p-4">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 class="text-uppercase">OpTask</h5>
                            <p>
                            © 2021 Copyright: Nabil Arbouz and Anna Daccache
                            </p>
                        </div>
                        <div class="col-lg3 col-md-6 mb-4 mb-md-0">
                            <h5 class="text-uppercase">Links</h5>
                            <ul class="list-unstyled mb-0">
                                <li>
                                    <a href="https://johnguerra.co/classes/webDevelopment_spring_2021/" class="text-dark">
                                        Course Website
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/amdacccache/novelish.io" class="text-dark">
                                        Github
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </body>
    );
} 

export default Landing;