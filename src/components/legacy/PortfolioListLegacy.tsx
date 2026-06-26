import type { Project } from "@/data/projects";
import "./portfolio-list-legacy.css";

function PortfolioListItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const titleHtml = project.title.includes(" ")
    ? project.title.replace(" ", '<br class="hide-from-sm"> ')
    : project.title;

  return (
    <div
      className={`portfolio-list-item${project.lightImage ? " pli-image-is-light" : ""}`}
    >
      <div className="pli-inner">
        <div className="pli-image-col">
          <a
            href={`/${project.slug}`}
            className="pli-image-link"
            data-cursor="Vedi il<br>Progetto"
          >
            <div className="pli-image-holder">
              {project.video ? (
                <div className="pli-image cover-opacity-2">
                  <figure className="pli-video-wrap anim-image-parallax">
                    <video
                      className="pli-video"
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={project.poster}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  </figure>
                </div>
              ) : (
                <figure className="pli-image cover-opacity-2">
                  <img
                    className="anim-image-parallax tt-lazy"
                    src={project.image}
                    data-src={project.image}
                    alt={project.title}
                  />
                </figure>
              )}
            </div>

            <div className="pli-info-col pli-info-inner">
              <div className="pli-info">
                <h2
                  className="pli-title"
                  dangerouslySetInnerHTML={{ __html: titleHtml }}
                />
                <div className="pli-categories-wrap">
                  <div className="pli-category">{project.category}</div>
                  {project.portfolioSubtitle && (
                    <>
                      <br />
                      <div className="pli-category">{project.portfolioSubtitle}</div>
                    </>
                  )}
                  {project.collaboration && (
                    <>
                      <br /> &nbsp;
                      <div className="pli-category">{project.collaboration}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="pli-info-col pli-info-outer">
          <div className="pli-info">
            <div className="pli-counter" aria-hidden="true" />
            <h2 className="pli-title">
              <a
                href={`/${project.slug}`}
                dangerouslySetInnerHTML={{ __html: titleHtml }}
              />
            </h2>
            <div className="pli-categories-wrap">
              <div className="pli-category">{project.category}</div>
              {project.portfolioSubtitle && (
                <>
                  <br />
                  <div className="pli-category">{project.portfolioSubtitle}</div>
                </>
              )}
              {project.collaboration && (
                <>
                  <br />
                  <div className="pli-category">{project.collaboration}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioListLegacy({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="portfolio-list pli-cropped pli-info-xlg pl-alter pli-info-overlay pli-title-stroke pli-hover">
      {projects.map((project, index) => (
        <PortfolioListItem key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
