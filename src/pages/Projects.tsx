import { useState } from "react";
import { ChatIcon, ChevronIcon, StainIcon } from "../components/icons";
import { projects, withProtocol, type Project } from "../lib/projects";
import "../components/projects.css";

function ProjectCard({ p }: { p: Project }) {
  const [broken, setBroken] = useState(false);

  return (
    <article className="project">
      <div className="shot">
        {p.image && !broken ? (
          <img src={p.image} alt="" loading="lazy" onError={() => setBroken(true)} />
        ) : (
          <div className="shot-ph" aria-hidden="true">
            {p.name}
          </div>
        )}
      </div>

      <div className="info">
        <h3 className="p-title">
          <StainIcon width="26" height="26" />
          {p.name}
        </h3>
        <p className="p-desc">{p.description}</p>
        <div className="p-links">
          <a className="p-view" href={withProtocol(p.url)} target="_blank" rel="noreferrer">
            view project
            <ChevronIcon width="16" height="16" />
          </a>
          <a className="p-join" href={withProtocol(p.invite)} target="_blank" rel="noreferrer">
            <ChatIcon width="18" height="18" />
            join server
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <div className="projects-page">
      <section className="pj-inner">
        <p className="pj-eyebrow">my work</p>
        <h2 className="pj-title">projects</h2>
        <p className="pj-sub">things i've built and run</p>

        <div className="pj-list">
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
