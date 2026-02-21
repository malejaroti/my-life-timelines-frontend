import type { ITimelineItem } from "../../pages/TimelineItemsPage";

interface ITimelineWithItems {
  timelineTitle: string;
  timelineColor: string;
  items: ITimelineItem[];
}

// Helper to generate deterministic fake IDs
const id = (prefix: string, n: number) => `demo-${prefix}-${n}`;
const now = new Date().toISOString();

export const demoTimelinesWithItems: ITimelineWithItems[] = [
        // ── Timeline 2: Professional Experience ──
      {
        timelineTitle: "Professional Experience",
        timelineColor: "#FFB74D", // orange
        items: [
          {
            _id: id("pro", 1),
            timeline: id("tl", 2),
            creator: "demo-user",
            title: "LivaNova internship",
            description:
              "Internship at LivaNova in the medical devices division — quality assurance and testing protocols.",
            startDate: "2020-12-01",
            endDate: "2021-07-31",
            images: [],
            tags: [],
            isApproved: true,
            comments: [],
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("pro", 2),
            timeline: id("tl", 2),
            creator: "demo-user",
            title: "Software Test Engineer",
            description:
              "Worked as a test engineer — automated test scripts, validation reports, and compliance documentation.",
            startDate: "2021-08-01",
            endDate: "2022-12-31",
            images: [],
            tags: [],
            isApproved: true,
            comments: [],
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("pro", 3),
            timeline: id("tl", 2),
            creator: "demo-user",
            title: "Software Engineer",
            description:
              "Contributed to an embedded firmware project for a medical device — C/C++, real-time systems, and hardware interfaces.",
            startDate: "2023-01-01",
            endDate: "2024-12-31",
            images: [],
            tags: [],
            isApproved: true,
            comments: [],
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("pro", 4),
            timeline: id("tl", 2),
            creator: "demo-user",
            title: "Career break",
            description:
              "Intentional career break for personal development, travel, and exploring new career directions.",
            startDate: "2025-01-01",
            endDate: "2025-06-30",
            images: [],
            tags: [],
            isApproved: true,
            comments: [],
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("pro", 5),
            timeline: id("tl", 2),
            creator: "demo-user",
            title: "Bootcamp Full-Stack Web Development",
            description:
              "Active transition into full-stack web development — building projects, contributing to open source, and job searching.",
            startDate: "2025-07-01",
            endDate: "2025-10-03",
            images: [],
            tags: [],
            isApproved: true,
            comments: [],
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("pro", 6),
            timeline: id("tl", 2),
            creator: "demo-user",
            title: "Full Stack Developer (Independent Projects)",
            description:
              "Building independent full-stack projects, exploring new technologies, and continuing professional growth.",
            startDate: "2025-10-04",
            images: [],
            tags: [],
            isApproved: true,
            comments: [],
            createdAt: now,
            updatedAt: now,
          },
        ],
      },
      {
        timelineTitle: "Books",
        timelineColor: "#81C784", // green
        items: [
          {
            _id: id("book", 1),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "Eat Pray Love",
            description: "Liz Gilbert is one of the best discoveries of my life",
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1758004734/timeline-app/rq7vil6qkq1thahguxte.jpg"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("book", 2),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "The Covenant of Water",
            description: "Me encantó. Empecé a leerlo en India y fue muy bueno para repasar, recordar y aprender más de Kerala y de India en general. También me encantó que aprendí de medicina",
            startDate: "2025-01-17",
            endDate: "2025-03-17",
            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1757971796/timeline-app/f9okzk2pre9wfzey3lxi.jpg"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("book", 3),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "Onyx Storm",
            description: "El más malito de la serie hasta ahora",
            startDate: "2025-02-18",
            endDate: "2025-03-18",
            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1757971417/timeline-app/tggxqp8gsf8nephfjrj5.webp"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("book", 4),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "Committed",
            description: "Interesting and listening to Liz is always awesome.",
            startDate: "2025-04-13",
            endDate: "2025-05-01",
            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1757972877/timeline-app/ci19yv1vzvc2gdanvcw1.jpg"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("book", 5),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "Conversations with God",
            description: "",
            startDate: "2025-03-21",
            endDate: "2025-06-01",

            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1759768880/timeline-app/pj5vt7hfvtcqqwhw1ory.jpg"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("book", 6),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "Un animal sauvage",
            description: "Joel Dicker no suele fallar.",
            startDate: "2025-07-14",
            endDate: "2025-07-27",
            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1757970855/timeline-app/jdqlech57fra2ytobvan.jpg"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("book", 7),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "Jim Knopf",
            description: "Me encantó. I read it in German",
            startDate: "2025-08-01",
            endDate: "2025-08-31",
            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1757969284/timeline-app/a5bqb6uj39csslcljlfr.jpg"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("book", 9),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "Feel Good Productivity",
            description: "",
            startDate: "2025-09-20",
            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1761727241/timeline-app/ldwudjitp6notentcydi.jpg"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("book", 10),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "The Lord of the Rings: The Return of the King",
            description: "I finished it without appendixes on the Flixbus to Copenhagen",
            startDate: "2025-09-22",
            endDate: "2025-11-14",
            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1758575358/timeline-app/gab0dqtps9fiunurdys5.jpg"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          },
          {
            _id: id("book", 13),
            timeline: id("tl", 3),
            creator: "demo-user",
            title: "Think big",
            description: "",
            startDate: "2025-12-05",
            images: [
              "https://res.cloudinary.com/dvrfurzie/image/upload/v1765663279/timeline-app/gvzmtj6ed3e5jk0jxap7.jpg"
            ],
            tags: [],
            comments: [],
            isApproved: true,
            createdAt: now,
            updatedAt: now,
          }
        ]
      }
     

];
