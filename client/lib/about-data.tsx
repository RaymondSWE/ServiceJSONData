import Image from "next/image";

export const timelineData = [
  {
    title: "1999",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4 mr-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Born in Gothenburg
          </h3>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Born in Östra Sjukhus, Gothenburg in 1999, and I have lived here
            ever since.
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
          <Image
            src="/img/raman-as-a-kid.jpg"
            alt="Raman as a kid"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2006",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Friendship & Family
          </h3>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            I have a brother, whom you can see in the image on the right. On the
            left is a childhood friend, with whom I’ve been friends since
            kindergarten.
          </p>
        </div>
        <div className="w-full md:w-1/3 flex gap-8 justify-center">
          <Image
            src="/img/me-and-friend.png"
            alt="Me and Friend"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
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
    title: "2019",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            High School Graduation
          </h3>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            I graduated from high school in 2019. I studied the Natural Science
            program at Gymnasieakademin, then started working at Mathem.
          </p>
        </div>
        <div className="w-full md:w-1/3 flex gap-8 justify-center">
          <Image
            src="/img/me-and-parents.png"
            alt="Me and Parents"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
          <Image
            src="/img/raman-mathem.jpg"
            alt="Raman at Mathem"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            University of Skövde
          </h3>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            In 2021, I started studying at the University of Skövde and
            completed my Bachelor of Science in Computer Science.
          </p>
        </div>
        <div className="w-full md:w-1/3 flex gap-8 justify-center">
          <Image
            src="/img/cpu.jpg"
            alt="CPU"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
          <Image
            src="/img/raman-mathem.jpg"
            alt="Raman at Mathem"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Present Day
          </h3>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Today, I continue learning and improving. I am actively studying and
            constantly looking for opportunities to grow.
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
          <Image
            src="/img/raman-mathem.jpg"
            alt="Raman at Mathem"
            width={200}
            height={200}
            className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    ),
  },
];
