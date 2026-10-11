export const profile = {
  name: 'Ragunath Anbarasu',
  title: 'Senior DevOps Developer',
  location: 'Ottawa, Ontario, Canada',
  email: 'ragunathanbarasu2695@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ragunathanbarasu/',
  github: 'https://github.com/RagunathAnbarasu',
  credly: 'https://www.credly.com/users/ragunath-anbarasu',
  description: 'Senior DevOps Developer in Ottawa. Building cloud platforms, delivery automation, and observability across AWS, Azure, and Kubernetes.',
  summary: 'I build cloud platforms and automation that help engineering teams deliver with confidence. My work connects infrastructure, software delivery, and observability across AWS and Azure.',
  education: {
    degree: 'Master of Engineering',
    field: 'Electrical and Computer Engineering',
    specialization: 'Data Science Specialization',
    school: 'Carleton University',
    location: 'Ottawa',
    dates: '2019 – 2021',
  },
  publication: {
    title: 'Towards a Decentralized Access Control System for IoT Platforms based on Blockchain Technology',
    venue: 'ISNCC · 2020',
    url: 'https://doi.org/10.1109/ISNCC49221.2020.9297174',
  },
};

export interface Experience {
  title: string;
  employer: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}

// Employment and impact statements: owner-supplied resume, reviewed October 10, 2026.
export const experience: Experience[] = [
  {
    title: 'Senior Software Developer - DevOps',
    employer: 'OpenText', location: 'Ottawa', start: 'Aug 2025', end: 'Present',
    highlights: [
      'Automated AKS upgrades, operational feature gates, and KMS key rotation with Terraform and Terragrunt, reducing manual upgrade effort to approximately one-quarter.',
      'Designed AI-assisted infrastructure and CI/CD troubleshooting, reducing issue MTTR from hours to minutes; supported responsible GitHub Copilot adoption.',
      'Partnered with engineering teams to reduce monthly cloud spending by approximately 69%, improve shift-left security, and reduce deployment effort to approximately one-third.',
    ],
  },
  {
    title: 'Software Developer - DevOps',
    employer: 'OpenText', location: 'Ottawa', start: 'Feb 2023', end: 'Aug 2025',
    highlights: [
      'Built Jenkins, GitLab CI, and Python automation for AWS infrastructure validation and artifact publishing, accelerating PR validation by approximately 4×.',
      'Optimized Kubernetes observability with OpenTelemetry, Prometheus, and Grafana, reducing metrics volume by approximately 10× and TSDB storage usage by approximately 5×.',
      'Created reusable Azure Terraform modules supporting AWS-to-Azure migrations in under four months; built identity automation and mentored two interns.',
    ],
  },
  {
    title: 'Associate Software Developer - DevOps',
    employer: 'Micro Focus (now OpenText)', location: 'Ottawa', start: 'Jan 2022', end: 'Feb 2023',
    highlights: [
      'Standardized AWS infrastructure with Terraform and Terragrunt to improve deployment consistency, state traceability, and auditing.',
      'Reduced cloud operational costs by approximately 30% through cleanup automation for failed deployments and unused resources.',
      'Built a Python-based tool for single-command AWS provisioning, reducing deployment time from days to hours.',
    ],
  },
  {
    title: 'Engineering Intern - DevOps',
    employer: 'Micro Focus (now OpenText)', location: 'Ottawa', start: 'Sep 2021', end: 'Jan 2022',
    highlights: [
      'Built Python/Boto3 and Jenkins automation to identify and clean up unused AWS resources.',
      'Contributed to lower recurring cloud costs through automated resource cleanup.',
    ],
  },
  {
    title: 'Application Software Development Sr. Associate Consultant - Java',
    employer: 'NTT DATA Services', location: 'Bengaluru', start: 'Jul 2016', end: 'Nov 2017',
    highlights: [
      'Enhanced and supported large-scale data migration workflows using Linux scripting, Hive, Impala, Oozie, and SnapLogic.',
      'Enabled reliable high-volume data processing and integration.',
    ],
  },
];

export const capabilities = [
  { title: 'Cloud & Kubernetes', description: 'Infrastructure and day-to-day platform operations.', technologies: ['AWS', 'Azure', 'Kubernetes', 'EKS', 'AKS', 'Docker', 'Helm'] },
  { title: 'Infrastructure as code', description: 'Reusable foundations for consistent deployments.', technologies: ['Terraform', 'Terragrunt', 'Pulumi', 'Gruntwork IaC', 'Azure Verified Modules'] },
  { title: 'Delivery automation', description: 'From pull request validation to repeatable releases.', technologies: ['Jenkins', 'GitLab CI', 'Python', 'Bash', 'Groovy', 'Git'] },
  { title: 'Observability', description: 'Useful telemetry for understanding system health.', technologies: ['OpenTelemetry', 'Prometheus', 'Grafana', 'CloudWatch', 'Azure Monitor'] },
  { title: 'Security', description: 'Earlier detection and remediation in software delivery.', technologies: ['Black Duck', 'Fortify on Demand', 'Prisma scanning', 'CVE remediation', 'Least-privilege access'] },
  { title: 'Developer enablement', description: 'Better workflows, documentation, and team support.', technologies: ['GitHub Copilot', 'AI-assisted troubleshooting', 'Internal documentation', 'Mentoring'] },
];

export interface Credential {
  acronym: string;
  name: string;
  issued: string;
  expires: string;
  badgeId: string;
  image: string;
}

// Dates and badge IDs verified against the public Credly profile on October 10, 2026.
export const credentials: Credential[] = [
  { acronym: 'CKA', name: 'Certified Kubernetes Administrator', issued: '2024-11-09', expires: '2026-11-10', badgeId: '541a7cbf-ffa5-4920-8fdf-2dfb611ca4a5', image: '/images/badges/cka.png' },
  { acronym: 'CAPA', name: 'Certified Argo Project Associate', issued: '2025-11-15', expires: '2027-11-16', badgeId: '24352251-3538-43db-b69d-d180b16d5d1f', image: '/images/badges/capa.png' },
  { acronym: 'OTCA', name: 'OpenTelemetry Certified Associate', issued: '2025-12-31', expires: '2028-01-01', badgeId: 'c12d48a9-4ef6-4783-8976-d923a502dfb7', image: '/images/badges/otca.png' },
  { acronym: 'PCA', name: 'Prometheus Certified Associate', issued: '2026-10-05', expires: '2028-10-04', badgeId: '507399b7-0b22-4075-98f9-a05e76802fb3', image: '/images/badges/pca.png' },
];

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-CA', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
