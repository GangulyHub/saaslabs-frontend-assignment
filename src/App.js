import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectsTable from "./components/ProjectsTable";

function App() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const API_URL = "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(API_URL);
        setProjects(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]); 
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  if (loading) {
    return <div className="container">Loading...</div>;
  }
  return (
    <div>
      <ProjectsTable projects={projects}/>
    </div>
  );
}

export default App;
