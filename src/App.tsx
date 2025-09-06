import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Linkedin,
  Mail,
  Download,
  Phone,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [showWorks, setShowWorks] = useState(false);
  const worksRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    // Use a filename without spaces in the public folder for a reliable URL
    // Put your actual PDF at `public/resume.pdf`
    link.href = "/resume.pdf"; // Ensure `public/resume.pdf` exists
    link.download = "K M Jayaraj - Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewWork = () => {
    setShowWorks(true);
    // wait for the section to render then scroll and focus the vertical slider
    setTimeout(() => {
      if (worksRef.current) {
        worksRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        worksRef.current.focus();
        // ensure slider starts at left
        if (sliderRef.current) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
          sliderRef.current.focus();
        }
      }
    }, 120);
  };

  const scrollNext = (amount?: number) => {
    if (!sliderRef.current) return;
    const step = amount ?? sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  const scrollPrev = (amount?: number) => {
    if (!sliderRef.current) return;
    const step = amount ?? sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const skills = {
    languages: ["C#", "JavaScript", "TypeScript", "SQL", "Python"],
    technologies: [
      "React",
      "Microservices",
      "MVC",
      "Azure DevOps",
      "Git",
      "SQL Server",
    ],
  };

  const experience = [
    {
      company: "EGC Global Services India Pvt. Ltd.",
      role: "Software Engineer",
      duration: "Nov 2021 – Present",
      highlights: [
        ".NET Development with high-performance web apps",
        "React Microservices migration with modular components",
        "Optimized performance & scalability",
      ],
    },
    {
      company: "Sieva Network Solutions",
      role: "Business Intelligence Analyst",
      duration: "Jul 2020 – Feb 2021",
      highlights: [
        "Technical support for BI",
        "Lead generation coordination with Marketing",
      ],
    },
  ];

  const projects = [
    {
      title: "Project Management Tool",
      tech: "React, .NET",
      description:
        "Developed a project management tool with React frontend and .NET backend for task tracking and collaboration.",
      link: "https://projectmanagement270725.z30.web.core.windows.net/",
    },
    {
      title: "E-Commerce Platform",
      tech: "React, Node.js",
      description:
        "Built a full-stack e-commerce platform with user authentication, product management, and payment integration.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),transparent_50%)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              <img
                src="/visionauts(s).ico"
                alt="Logo"
                className="w-8 h-8 rounded-full"
              />
              K M Jayaraj
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors duration-200 border border-purple-500/30"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-purple-400" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-purple-500/20 transition-colors duration-200 border border-purple-500/30"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden backdrop-blur-md bg-black/20 border-t border-purple-500/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 min-h-screen flex items-center justify-center relative"
      >
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  KMJ
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                K M Jayaraj
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Full-Stack Developer | React & Microservices | Innovator in
              AI-Driven Solutions
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              Full-stack developer blending React, microservices, and AI/ML to
              build practical, future-ready solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleDownloadCV}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download CV
              </button>
              <button
                onClick={handleViewWork}
                className="px-8 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Works Section - vertical slider shown when View My Work is clicked */}
      {showWorks && (
        <section
          id="works"
          ref={worksRef}
          tabIndex={-1}
          className="py-12 relative outline-none"
          aria-label="Works slider"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                My Works
              </h2>
              <button
                onClick={() => setShowWorks(false)}
                className="px-3 py-1 border border-purple-500 text-purple-400 rounded hover:bg-purple-500/10"
              >
                Close
              </button>
            </div>

            {/* Horizontal slider container */}
            <div className="relative">
              <button
                onClick={() => scrollPrev()}
                aria-label="Previous"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full hover:bg-black/40"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>

              <div
                ref={sliderRef}
                tabIndex={0}
                role="list"
                aria-label="Projects slider"
                className="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 py-6 px-2 md:px-6 scroll-smooth scrollbar-thin scrollbar-thumb-purple-500/40"
              >
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    viewport={{ once: true, amount: 0.4 }}
                    role="listitem"
                    className="snap-start flex-shrink-0 w-[85%] md:w-1/2 bg-white/5 border border-purple-500/20 rounded-lg p-6 backdrop-blur-md shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="md:flex md:items-center md:justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-purple-400 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {project.description}
                        </p>
                        <div className="flex gap-2 items-center">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                            {project.tech}
                          </span>
                          <a
                            href={project.link}
                            className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>

                      <div className="mt-6 md:mt-0 md:ml-6 w-full md:w-1/3">
                        <div className="w-full h-52 md:h-56 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center overflow-hidden">
                          {project.title === "Project Management Tool" ? (
                            <img
                              src="/pmt.png"
                              alt="Project Management Tool Screenshot"
                              className="w-full h-full object-contain rounded-lg shadow-lg"
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                          ) : (
                            <span className="text-2xl font-bold text-purple-400">
                              {project.title.split(" ")[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => scrollNext()}
                aria-label="Next"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full hover:bg-black/40"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              I’m a full-stack developer with 4+ years of experience building
              scalable web applications, specializing in React and
              microservices. Beyond coding, I’m deeply curious about how
              technology can solve everyday challenges. I love researching
              emerging tools, experimenting with AI/ML, and identifying the most
              practical solutions to bring into client projects. For me,
              development isn’t just about delivering software — it’s about
              creating future-ready systems that balance feasibility with
              innovation. Whether it’s building robust microservices, crafting
              intuitive UIs, or integrating AI into workflows, I thrive on
              transforming complex problems into impactful digital solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="p-6 backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">
                    Frontend Development
                  </h3>
                  <p className="text-gray-300">
                    Creating responsive and interactive user interfaces with
                    React, TypeScript, and modern CSS frameworks.
                  </p>
                </div>
                <div className="p-6 backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">
                    Backend Development
                  </h3>
                  <p className="text-gray-300">
                    Building robust APIs and microservices with .NET, Python,
                    and cloud technologies.
                  </p>
                </div>
                <div className="p-6 backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">
                    DevOps & Cloud
                  </h3>
                  <p className="text-gray-300">
                    Experience with Azure DevOps, Git, and cloud deployment
                    strategies.
                  </p>
                </div>
                <div className="p-6 backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">
                    AI/ML Technologies
                  </h3>
                  <p className="text-gray-300">
                    Experience with TensorFlow, PyTorch, and Azure Machine
                    Learning.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-72 h-72 bg-slate-900 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                        4+
                      </div>
                      <div className="text-xl text-gray-300">
                        Years of Experience
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce"></div>
                <div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are the technologies I've been working with recently.
            </p>
          </motion.div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-purple-400">
              Programming Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {skills.languages.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto rounded-lg mb-4 flex items-center justify-center">
                    {skill === "C#" && (
                      <span className="text-white font-bold text-xl">C#</span>
                    )}
                    {skill === "JavaScript" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                        alt="JavaScript"
                        className="h-10 w-10"
                      />
                    )}
                    {skill === "TypeScript" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                        alt="TypeScript"
                        className="h-10 w-10"
                      />
                    )}
                    {skill === "SQL" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
                        alt="SQL"
                        className="h-10 w-10"
                      />
                    )}
                    {skill === "Python" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                        alt="Python"
                        className="h-10 w-10"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-200">{skill}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-purple-400">
              Technologies & Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {skills.technologies.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto  rounded-lg mb-4 flex items-center justify-center">
                    {skill === "React" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                        alt="React"
                        className="h-10 w-10"
                      />
                    )}
                    {skill === "Microservices" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                        alt="Microservices"
                        className="h-10 w-10"
                      />
                    )}
                    {skill === "MVC" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg"
                        alt="MVC"
                        className="h-10 w-10"
                      />
                    )}
                    {skill === "Azure DevOps" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"
                        alt="Azure DevOps"
                        className="h-10 w-10"
                      />
                    )}
                    {skill === "Git" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                        alt="Git"
                        className="h-10 w-10"
                      />
                    )}
                    {skill === "SQL Server" && (
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg"
                        alt="SQL Server"
                        className="h-10 w-10"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-200">{skill}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              My journey in software development and business intelligence.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>

            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative mb-12 ${
                  index % 2 === 0
                    ? "md:text-right md:pr-8"
                    : "md:text-left md:pl-8"
                }`}
              >
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="p-6 backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 bg-purple-500 rounded-full absolute left-6 md:left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">
                      {exp.role}
                    </h3>
                    <h4 className="text-lg font-medium text-gray-200 mb-2">
                      {exp.company}
                    </h4>
                    <p className="text-purple-300 mb-4">{exp.duration}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li
                          key={hIndex}
                          className="text-gray-300 flex items-start"
                        >
                          <span className="text-purple-400 mr-2">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are some of the projects I've worked on recently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                  <span className="text-2xl font-bold text-purple-400">
                    {project.title.split(" ")[0]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                      {project.tech}
                    </span>
                  </div>
                  <a
                    href={project.link}
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I'll try my best to get back to
              you!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "jayarajkm54@gmail.com",
                href: "mailto:jayarajkm54@gmail.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91-860-679-4732",
                href: "tel:+918606794732",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "k-m-jayaraj-87306965",
                href: "https://linkedin.com/in/k-m-jayaraj-87306965",
              },
            ].map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
                  <contact.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  {contact.label}
                </h3>
                <a
                  href={contact.href}
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200 break-all"
                  target={contact.label === "LinkedIn" ? "_blank" : undefined}
                  rel={
                    contact.label === "LinkedIn"
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {contact.value}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full p-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 K M Jayaraj. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
