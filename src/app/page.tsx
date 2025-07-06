import hero from "/public/hero.jpg";
import Image from "next/image";
import heroSub from "/public/hero-sub.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full font-playfair">
      <section className="relative h-screen w-full text-center text-white">
        <Image
          src={hero}
          alt="sky"
          className="object-cover absolute inset-0 opacity-60"
        />
        <div className="absolute inset-0  bg-gradient-to-b from-transparent to-black" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-6 px-4">
          <h5 className="text-xl">Welcome to</h5>
          <h1 className="font-playfair text-5xl font-bold">Celestia</h1>
          <p className="text-xl max-w-xl">
            Personalized astrology at your fingertips. <br />
            Daily guidance based on your zodiac, birth chart, and cosmic energy.
          </p>
          <Button asChild variant="outline">
            <Link className="text-foreground" href="/signin">
              Get Started with Celestia
            </Link>
          </Button>
        </div>
      </section>

      <section className="relative w-full bg-black text-white py-24 px-6">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2">
            <h1 className="font-playfair text-3xl mb-4">
              We can find your Future <br /> With Celestia
            </h1>
            <p className="text-md leading-relaxed">
              We analyze your zodiac, birth chart, and daily transits. Then our
              AI interprets it all to give real insights. Love, career, or
              chaos? We help you navigate it like a boss.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="/signin">Learn more</Link>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={heroSub}
              alt="celestial chart"
              height={500}
              width={500}
              className="w-auto h-auto max-w-sm"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
