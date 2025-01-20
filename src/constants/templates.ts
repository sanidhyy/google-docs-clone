export const templates = [
  { id: 'blank', label: 'Blank Document', imageUrl: '/blank-document.svg', initialContent: '' },
  {
    id: 'software-proposal',
    label: 'Software development proposal',
    imageUrl: '/software-proposal.svg',
    initialContent: `
      <h1>Software Development Proposal</h1>
      <p><strong>Prepared for:</strong> Client's Name</p>
      <p><strong>Prepared by:</strong> Your Company Name</p>
      <hr />
      <h2>Project Overview</h2>
      <p>Describe the purpose of the project, its goals, and the desired outcomes.</p>
      <h2>Scope of Work</h2>
      <ul>
        <li>Task 1: Description</li>
        <li>Task 2: Description</li>
        <li>Task 3: Description</li>
      </ul>
      <h2>Timeline</h2>
      <p>Provide a breakdown of project phases and estimated completion times.</p>
      <h2>Budget</h2>
      <p>Detail the estimated costs associated with the project.</p>
    `,
  },
  {
    id: 'project-proposal',
    label: 'Project proposal',
    imageUrl: '/project-proposal.svg',
    initialContent: `
      <h1>Project Name</h1>
      <p>Date: <strong>MM/DD/YYYY</strong></p>
      <p><strong>Prepared by:</strong> Your Name</p>
      <p>Your Company</p>
      <p>Your Address</p>
      <hr />
      <h2>Objective</h2>
      <p>Provide a brief summary of the project's objective.</p>
      <h2>Deliverables</h2>
      <ul>
        <li>Deliverable 1: Description</li>
        <li>Deliverable 2: Description</li>
      </ul>
      <h2>Methodology</h2>
      <p>Explain the approach and methods you will use to complete the project.</p>
    `,
  },
  {
    id: 'business-letter',
    label: 'Business letter',
    imageUrl: '/business-letter.svg',
    initialContent: `
      <p>Your Company</p>
      <p>Your Street</p>
      <p>Your City, State ZIP Code</p>
      <p>Date: <strong>MM/DD/YYYY</strong></p>
      <p>Dear [Recipient's Name],</p>
      <p>We are pleased to provide you with our latest product offerings. Thank you for your interest in our services.</p>
      <p>Please contact us if you have any questions.</p>
      <p>Sincerely,</p>
      <p>Your Name</p>
    `,
  },
  {
    id: 'resume',
    label: 'Resume',
    imageUrl: '/resume.svg',
    initialContent: `
      <h1>Your Name</h1>
      <p>Your Address | Your Phone | Your Email</p>
      <hr />
      <h2>Skills</h2>
      <p>Highlight your key skills and competencies.</p>
      <h2>Experience</h2>
      <ul>
        <li>Job Title, Company (Month Year - Month Year)</li>
        <li>Key responsibilities and achievements</li>
      </ul>
      <h2>Education</h2>
      <p>Degree, Institution, Graduation Year</p>
      <h2>Awards</h2>
      <p>List any significant awards or recognitions.</p>
    `,
  },
  {
    id: 'cover-letter',
    label: 'Cover Letter',
    imageUrl: '/cover-letter.svg',
    initialContent: `
      <p>Your Name</p>
      <p>Your Address</p>
      <p>Your City, State ZIP Code</p>
      <p>Date: <strong>MM/DD/YYYY</strong></p>
      <p>Dear Hiring Manager,</p>
      <p>I am writing to express my interest in the [Position] role at [Company Name]. With my background in [Field/Skill], I believe I am a strong candidate for this position.</p>
      <p>Thank you for considering my application. I look forward to the opportunity to contribute to your team.</p>
      <p>Sincerely,</p>
      <p>Your Name</p>
    `,
  },
  {
    id: 'letter',
    label: 'Letter',
    imageUrl: '/letter.svg',
    initialContent: `
      <p>Your Band</p>
      <p>Date: <strong>MM/DD/YYYY</strong></p>
      <p>Dear Fan,</p>
      <p>Thank you for being an amazing supporter of our music! We’re excited to announce our new album is coming soon. Stay tuned for exclusive updates.</p>
      <p>Can't wait to see you at our next show!</p>
      <p>Lots of love,</p>
      <p>Your Name</p>
    `,
  },
];
