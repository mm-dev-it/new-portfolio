import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import ProjectPageLegacy from "@/components/legacy/ProjectPageLegacy";
import { getProjectBySlug, projectSlugs } from "@/data/projects";
import { siteConfig } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Progetto Web - Matteo Malaspina`,
    description: project.description.slice(0, 160),
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description.slice(0, 160),
      url: `${siteConfig.url}/${slug}`,
      images: [{ url: project.ogImage ?? project.image }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <SiteLayout>
      <ProjectPageLegacy project={project} />
    </SiteLayout>
  );
}

export const dynamicParams = false;
