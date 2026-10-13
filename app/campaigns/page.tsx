import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Stories in Form", description: "Visual studies of clothing, movement, and the spaces we inhabit." };

const stories = [
  { number: "Campaign 01", title: "Form in Motion", description: "Exploring the relationship between movement, proportion, and contemporary dressing.", label: "The everyday uniform · 2026", image: "photo-1529139574466-a303027c1d8b", alt: "Contemporary fashion styling in a city setting" },
  { number: "Campaign 02", title: "Quiet Structure", description: "Clean silhouettes and considered tailoring meet architectural surroundings.", label: "A study in tailoring · 2026", image: "photo-1539109136881-3be0616acf4b", alt: "Refined contemporary clothing photographed outdoors" },
  { number: "Campaign 03", title: "Everyday Rituals", description: "An intimate study of the pieces that become part of our daily lives.", label: "Notes on the everyday · 2026", image: "photo-1483985988355-763728e1935b", alt: "A quiet editorial moment in modern everyday clothing" },
];

export default function CampaignsPage() {
  return (
    <>
      <section className="editorial-intro"><span className="eyebrow">NOIRÉ / IMAGE JOURNAL</span><h1 className="page-title">Stories in Form</h1><p className="page-intro-text">Visual studies of clothing, movement, and the spaces we inhabit.</p></section>
      <section className="campaign-list">
        {stories.map((story, index) => (
          <article className="campaign-row" key={story.number}>
            <Image className="campaign-row-image" src={`https://images.unsplash.com/${story.image}?auto=format&fit=crop&w=1500&q=85`} alt={story.alt} width={1500} height={1111} sizes="(max-width: 900px) 100vw, 60vw" />
            <div className="campaign-row-copy"><span className="eyebrow">{story.number} &nbsp; / &nbsp; {story.label}</span><h2>{story.title}</h2><p>{story.description}</p>{index === 0 && <Link className="text-link" href="/collections">Explore the pieces <span>↗</span></Link>}</div>
          </article>
        ))}
      </section>
    </>
  );
}
