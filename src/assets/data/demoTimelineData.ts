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
            impact: "First exposure to engineering in a regulated industry",
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
            title: "Software test engineer",
            description:
              "Worked as a test engineer — automated test scripts, validation reports, and compliance documentation.",
            startDate: "2021-08-01",
            endDate: "2022-12-31",
            images: [],
            impact: "Developed rigorous testing mindset and attention to detail",
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
            title: "Software engineer",
            description:
              "Contributed to an embedded firmware project for a medical device — C/C++, real-time systems, and hardware interfaces.",
            startDate: "2023-01-01",
            endDate: "2024-12-31",
            images: [],
            impact: "Deep understanding of low-level systems and hardware-software integration",
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
            endDate: "2025-07-01",
            images: [],
            impact: "Clarity on career goals — decided to transition to full-stack development",
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
            title: "Fullstack transition",
            description:
              "Active transition into full-stack web development — building projects, contributing to open source, and job searching.",
            startDate: "2025-06-01",
            endDate: undefined,
            images: [],
            impact: "Ongoing — combining engineering background with modern web technologies",
            tags: [],
            isApproved: true,
            comments: [],
            createdAt: now,
            updatedAt: now,
          },
        ],
      },
  // ── Timeline 1: Software Engineering Journey ──
  {
    timelineTitle: "Software Engineering Journey",
    timelineColor: "#4FC3F7", // light blue
    items: [
      {
        _id: id("swe", 1),
        timeline: id("tl", 1),
        creator: "demo-user",
        title: "Bootcamp",
        description:
          "Intensive full-stack web development bootcamp covering React, Node.js, Express, and MongoDB.",
        startDate: "2025-06-01",
        endDate: "2025-08-31",
        images: [],
        impact: "Career pivot into software engineering",
        tags: [],
        isApproved: true,
        comments: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: id("swe", 2),
        timeline: id("tl", 1),
        creator: "demo-user",
        title: "First backend project",
        description:
          "Built a REST API with Express and MongoDB — user auth, CRUD operations, and error handling.",
        startDate: "2025-07-15",
        endDate: "2025-08-10",
        images: [],
        impact: "Learned API design patterns and middleware architecture",
        tags: [],
        isApproved: true,
        comments: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: id("swe", 3),
        timeline: id("tl", 1),
        creator: "demo-user",
        title: "CI/CD integration",
        description:
          "Set up GitHub Actions pipelines for automated testing and deployment to cloud services.",
        startDate: "2025-09-15",
        endDate: "2025-10-10",
        images: [],
        impact: "Understood DevOps fundamentals and deployment workflows",
        tags: [],
        isApproved: true,
        comments: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: id("swe", 4),
        timeline: id("tl", 1),
        creator: "demo-user",
        title: "Docker learning",
        description:
          "Containerized applications with Docker and Docker Compose for local dev and production parity.",
        startDate: "2025-10-20",
        endDate: "2025-11-15",
        images: [],
        impact: "Enabled reproducible environments across teams",
        tags: [],
        isApproved: true,
        comments: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: id("swe", 5),
        timeline: id("tl", 1),
        creator: "demo-user",
        title: "AWS experiment",
        description:
          "Deployed a full-stack app on AWS using EC2, S3, and RDS. Explored Lambda for serverless functions.",
        startDate: "2025-12-01",
        endDate: "2026-01-15",
        images: [],
        impact: "Gained hands-on cloud infrastructure experience",
        tags: [],
        isApproved: true,
        comments: [],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },

];
