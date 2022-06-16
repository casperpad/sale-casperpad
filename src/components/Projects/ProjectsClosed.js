import React from "react";
import CasperCard from "../../componentsv2/CasperCard";

export default function ProjectsClosed({ casperProjects = [] }) {
  return (
    <>
      <h1 className="text-center font-weight-bold text-white project-title">
        PROJECTS CLOSED
      </h1>
      <section className="projects">
        {casperProjects.map((project, index) => {
          return (
            <CasperCard
              key={`casperclosed_${index}`}
              project={project}
              status={"Closed"}
            />
          );
        })}
      </section>
    </>
  );
}
