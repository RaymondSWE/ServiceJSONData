import Image from "next/image";

export const timelineData = [
  {
    title: "Born in Gothenburg",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4 mr-4">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Born in Östra Sjukhus, Gothenburg in 1999, and I have lived here ever since.
          </p>
        </div>
        <div className="w-full md:w-1/3 flex gap-8 justify-center">
          <Image
            src="/img/ostra-sjukhus.jpg"
            alt="Östra Sjukhus"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Friendship & Family",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4">

          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            I have a brother, whom you can see in the image. Hes 4 year younger than me. 
          </p>
        </div>
        <div className="w-full md:w-1/3 flex gap-8 justify-center">
          <Image
            src="/img/me-and-brother.png"
            alt="Me and Brother"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Lord Of The Rings ",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Ever since I saw Lord of the rings trilogy, I have been stuck with medeival movies and series.
          </p>
        </div>
        <div className="w-full md:w-1/3 flex gap-8 justify-center">
          <Image
            src="/img/LOTR.jpg"
            alt="Lord Of The Rings"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
  {
    title: "My Dog Kenzo",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4">

          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            In 2022, I got my dog Kenzo, and has been our family member ever since. He is a mix of Malteser and bischon frise.
          </p>
        </div>
        <div className="w-full md:w-1/3 flex gap-8 justify-center">
          <Image
            src="/img/kenzo.jpg"
            alt="My Dog"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Burger",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Always been a fan of burgers, and I have tried many different ones. My favorite is luleå burger from Bastard Burgers.
          </p>
        </div>
        <div className="w-full md:w-1/3 flex gap-8 justify-center">
          <Image
            src="/img/luleåtwo.jfif"
            alt="burger"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Present Day",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Today, I continue learning and improving. I am actively studying and constantly looking for opportunities to grow.
          </p>
        </div>
        <div className="w-full md:w-1/3 flex gap-8 justify-center">
          <Image
            src="/img/chalmers.png"
            alt="Chalmers University Logo"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
];
