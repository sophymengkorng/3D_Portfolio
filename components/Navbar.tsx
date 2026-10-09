export default function Navbar() {
  return (
    <nav className="navbar navbar-expand sticky-top portfolio-nav">
      <div className="container py-2">
        <a className="navbar-brand fw-bold" href="#home" aria-label="Korng home">
          Korng<span className="accent-text">.</span>
        </a>

        <div className="navbar-nav flex-row gap-2 gap-sm-4">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#projects">Work</a>
          <a className="nav-link" href="#skills">Skills</a>
          <a className="nav-link" href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}