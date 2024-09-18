import Image from "next/image";

export const timelineData = [
  {
    title: "1999",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="w-full md:w-2/3 max-w-[400px] mb-4 md:mb-0 mr-4">
          <p className="text-justify">
            Born in Gothenburg 1999, I was born in Östra Sjukhus and have lived here since.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-1/3 justify-center">
          <Image
            src="/img/ostra-sjukhus.jpg"
            alt="Östra Sjukhus"
            width={200}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
          <Image
            src="/img/raman-as-a-kid.jpg"
            alt="Raman as a kid"
            width={200}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2006",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="w-full md:w-2/3 max-w-[400px] mb-4 md:mb-0 mr-4">
          <p className="text-justify">
            I have a brother, whom you can see in the image to the right. On the left is a childhood friend, and we’ve been friends from kindergarten till today.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-1/3 justify-center">
          <Image
            src="/img/me-and-friend.png"
            alt="Me and Friend"
            width={200}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
          <Image
            src="/img/me-and-brother.png"
            alt="Me and Brother"
            width={200}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2019",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="w-full md:w-2/3 max-w-[400px] mb-4 md:mb-0 mr-4">
          <p className="text-justify">
            2019 was the year I graduated from high school. I studied the Natural Science program at Gymnasieakademin in Gothenburg. Thereafter, I started working at Mathem.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-1/3 justify-center">
          <Image
            src="/img/me-and-parents.png"
            alt="Me and Parents"
            width={150}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
          <Image
            src="/img/raman-mathem.jpg"
            alt="Raman at Mathem"
            width={200}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="w-full md:w-2/3 max-w-[400px] mb-4 md:mb-0 mr-4">
          <p className="text-justify">
            I started studying at University of Skövde in 2021. I completed my Bachelor of Science in Computer Science program.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-1/3 justify-center">
          <Image
            src="/img/cpu.jpg"
            alt="CPU"
            width={200}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
          <Image
            src="/img/raman-mathem.jpg"
            alt="Raman at Mathem"
            width={200}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="w-full md:w-2/3 max-w-[400px] mb-4 md:mb-0 mr-4">
          <p className="text-justify">
            Now I am here still trying to learn new things and improve. Keeping myself busy with studying and learning new things.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-1/3 justify-center">
          <Image
            src="/img/chalmers.png"
            alt="CPU"
            width={180}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
          <Image
            src="/img/raman-mathem.jpg"
            alt="Raman at Mathem"
            width={200}
            height={200}
            className="rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-700 object-cover w-[200px] h-[200px]"
          />
        </div>
      </div>
    ),
  },
];
