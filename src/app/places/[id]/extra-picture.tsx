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

export default async function ExtraPicture({
  url,
  detailsUrl: deatilsUrl,
  slideNumber,
  previousSlide,
  nextSlide,
}: Props): Promise<ReactNode> {
  return (
    <div className="carousel-item relative w-full">
      <Link href={deatilsUrl} title="🏞 Click to view full size">
        <Image src={url} width={896} height={600} alt="extra picture" />
      </Link>
      <div
        id={`slide${slideNumber}`}
        className="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between"
      >
        <a href={`#slide${previousSlide}`} className="btn btn-circle">
          ❮
        </a>
        <a href={`#slide${nextSlide}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
}
