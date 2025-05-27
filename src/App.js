import React from 'react';
import './App.css';

function App() {
  const skills = [
    '.NET',
    'React',
    'Electron',
    'JavaScript',
    'C#',
    'C',
    'C++',
    'Python',
    'SQL',
    'HTML/CSS',
  ];

  return (
    <div className="app">
      <header className="header">
        <h1 className="name">Nevil Biju</h1>
        <p className="title">Software &amp; Web Developer</p>
      </header>
      
      <section className="about">
        <h2>About Me</h2>
        <p>
          Hi! I’m Nevil, a passionate developer specializing in building
          modern web and desktop applications. I love turning ideas into
          reality with clean, efficient code.
        </p>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <ul>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Add more sections below as needed */}

      <footer className="footer">
        <p>© {new Date().getFullYear()} Nevil Biju</p>
      </footer>
    </div>
  );
}

export default App;