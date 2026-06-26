import type { Project } from "@/data/projects";
import { SiteFooter } from "@/components/SiteLayout";
import "./project-page-mat.css";

export default function ProjectPageLegacy({ project }: { project: Project }) {
  return (
    <div className="mat-project-page">
      <div
        id="page-header"
        className="ph-full ph-bg-image ph-image-shadow ph-image-cover-5 ph-content-parallax mat-ph-enter"
      >
        <div className="ph-image">
          <div className="ph-image-inner">
            <img src={project.image} alt={project.title} />
          </div>
        </div>

        <div className="page-header-inner tt-wrap">
          <div className="ph-caption">
            <div className="ph-categories ph-appear">
              <div className="ph-category">{project.type}</div>
            </div>
            <h2 className="ph-caption-title ph-appear">{project.title}</h2>
          </div>

          <div className="project-info-list margin-top-60">
            <ul>
              <li>
                <div className="pi-list-heading">Cliente</div>
                <div className="pi-list-cont">{project.client}</div>
              </li>
              <li>
                <div className="pi-list-heading">Anno</div>
                <div className="pi-list-cont">{project.year}</div>
              </li>
              <li>
                <div className="pi-list-heading">Tipologia</div>
                <div className="pi-list-cont">{project.type}</div>
              </li>
              {project.website && (
                <li>
                  <div className="pi-list-heading">Website</div>
                  <div className="pi-list-cont">
                    <a href={project.website} target="_blank" rel="noopener noreferrer">
                      Visita il sito
                      <span className="pi-list-icon">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        <a href="#page-content" className="scroll-down-circle" data-offset="30">
          <div className="sdc-inner ph-appear">
            <div className="sdc-icon">
              <i className="fas fa-chevron-down"></i>
            </div>
            <svg viewBox="0 0 500 500">
              <defs>
                <path
                  d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
                  id="textcircle-project"
                />
              </defs>
              <text dy="30">
                <textPath xlinkHref="#textcircle-project">
                  Scorri sotto - Scorri sotto -
                </textPath>
              </text>
            </svg>
          </div>
        </a>

        <div className="made-with-love ph-appear">
          <div className="mwl-inner">
            <div className="mwl-text">Made with</div>
            <div className="mwl-icon">
              <i className="far fa-heart"></i>
            </div>
          </div>
        </div>
      </div>

      <div id="page-content">
        <div className="tt-section padding-top-xlg-180 padding-left-sm-3-p padding-right-sm-3-p">
          <div className="tt-section-inner tt-wrap">
            <div className="tt-row">
              <div className="tt-col-lg-4 padding-right-md-5-p">
                <div className="tt-heading tt-heading-xsm margin-bottom-60 anim-fadeinup">
                  <h2 className="tt-heading-title">About</h2>
                </div>
              </div>
              <div className="tt-col-lg-8">
                <div className="anim-fadeinup text-gray">
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tt-section padding-bottom-xlg-150">
          <div className="tt-section-inner tt-wrap">
            <div className="tt-page-nav tt-pn-scroll">
              <a href="/i-miei-lavori" className="tt-pn-link anim-fadeinup">
                <div className="tt-pn-title">Portfolio</div>
                <div className="tt-pn-hover-title">Portfolio</div>
              </a>
              <div className="tt-pn-subtitle anim-fadeinup">I miei lavori</div>
              <div className="tt-pn-image">
                <img src="/assets/img/page-header/work-hero-mm.jpg" alt="Portfolio — I miei lavori" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
