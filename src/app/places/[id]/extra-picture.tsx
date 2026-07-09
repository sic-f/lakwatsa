import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  url: string;
  detailsUrl: string;
  slideNumber: number;
  previousSlide: number;
  nextSlide: number;
};

export default async function ExtraPicture({ url, detailsUrl: deatilsUrl, slideNumber, previousSlide, nextSlide }: Props): Promise<ReactNode> {
  return (
    <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
      <Link href={deatilsUrl} title="🏞 Click to view full size">
        <Image
          src={url}
          width={800}
          height={600}
          alt="extra picture"
        />
      </Link>
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href={`#slide${previousSlide}`} className="btn btn-circle">❮</a>
        <a href={`#slide${nextSlide}`} className="btn btn-circle">❯</a>
      </div>
    </div>
  );
}