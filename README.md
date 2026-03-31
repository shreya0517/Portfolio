# Shreya Garg Netflix Portfolio

A Netflix-inspired personal portfolio built with React, TypeScript, and DatoCMS. The project blends a cinematic landing experience with dynamic portfolio content such as certifications, work experience, timeline entries, recommendations, blog posts, and a resume viewer.

## Overview

This portfolio is designed to feel playful and polished while still being practical for recruiters, collaborators, and hiring teams. Content is driven by DatoCMS wherever possible, with graceful fallbacks and empty states for sections that may not have data yet.

## Features

- Netflix-style intro screen and branded navigation
- Dynamic DatoCMS-powered sections for:
  - Certifications
  - Work Experience
  - Professional Timeline
  - Recommendations
  - Blog Posts
  - Resume
- Netflix-themed resume page with modal viewer and download support
- Responsive layouts for desktop and mobile
- Reusable empty states for sections without content
- TypeScript-based data normalization for CMS responses

## Tech Stack

- React 18
- TypeScript
- React Router
- GraphQL Request
- DatoCMS
- React Icons
- CSS modules-by-feature style organization

## Routes

Main routes currently available in the app:

- `/` - animated landing screen
- `/browse` - portfolio browse page
- `/resume` - Netflix-style resume viewer
- `/experience` and `/work-experience` - work experience page
- `/professional-timeline` - tree-style timeline page
- `/certifications` - certifications page
- `/recommendations` - recommendations page
- `/blogs` - blog posts page
- `/skills` - skills page
- `/projects` - projects page
- `/music` - music page
- `/reading` - reading page
- `/contact-me` - contact page
- `/work-permit` - work permit page

## DatoCMS Models

The app currently expects the following DatoCMS models and fields.

### `timeline`

- `name`
- `timelineType`
- `title`
- `dateRange`
- `techStack`
- `summaryPoints`

### `work_experience`

- `company`
- `role`
- `location`
- `startDate`
- `endDate`
- `isCurrentRole`
- `summaryPoints`
- `techStack`

### `certification`

- `title`
- `issuer`
- `issueddate`
- `iconname`
- `link`

### `recommendation`

- `name`
- `role`
- `company`
- `date`
- `image`
- `content`

### `blog_post`

- `title`
- `description`
- `link`

### `resume`

- `title`
- `file`

### `profilebanner`

- `backgroundImage`
- `headline`
- `resumeLink`
- `linkedinLink`
- `profileSummary`

## Example GraphQL Queries

### Resume

```graphql
query {
  allResumes {
    title
    file {
      url
    }
  }
}
```

### Work Experience

```graphql
query {
  allWorkExperiences(orderBy: _createdAt_DESC) {
    id
    company
    role
    location
    startDate
    endDate
    isCurrentRole
    summaryPoints
    techStack
  }
}
```

### Timeline

```graphql
query {
  allTimelines(orderBy: _createdAt_DESC) {
    timelineType
    name
    title
    techStack
    summaryPoints
    dateRange
  }
}
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file and set the DatoCMS tokens you use locally.

Example:

```env
REACT_APP_DATOCMS_FRONTEND_TOKEN=your_token_here
REACT_APP_DATOCMS_NODE_TOKEN=your_token_here
REACT_APP_DATOCMS_ROR_TOKEN=your_token_here
REACT_APP_DATOCMS_JAVA_TOKEN=your_token_here
```

Optional:

```env
REACT_APP_RESUME_URL=https://your-public-resume-url.pdf
```

`REACT_APP_RESUME_URL` is useful when you want the resume viewer to use a public PDF or document URL directly.

### 3. Start the project

```bash
npm start
```

### 4. Type check

```bash
npx tsc --noEmit
```

## Resume Viewer Notes

The resume experience supports two sources:

1. The DatoCMS `resume` model
2. `REACT_APP_RESUME_URL` as an override or fallback

For the smoothest in-browser viewing experience, use a PDF file. Non-PDF files may rely on an external viewer and can behave differently on localhost.

## Content Fallbacks

This portfolio is built to fail gracefully when CMS content is unavailable or intentionally empty.

Current fallback behavior includes:

- recommendations empty state
- blogs empty state
- work permit empty state
- certifications fallback data
- timeline fallback data

This makes the portfolio safe to deploy even when some sections are still being filled in.

## Scripts

- `npm start` - start development server
- `npm run build` - create production build
- `npm test` - run tests
- `npx tsc --noEmit` - run TypeScript validation

## Deployment Notes

If you deploy this project publicly, make sure:

- the DatoCMS environment and tokens point to the correct published content
- resume/blog/recommendation entries are published, not draft
- any externally hosted files are publicly accessible

## License

This project is private unless you choose to publish it under a separate license.

Inspired by Sumanth Samala, the original owner of the project concept and portfolio direction.
