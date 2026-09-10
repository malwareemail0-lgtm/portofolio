export interface SystemDomain {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  details?: {
    components: string[];
    typicalTools: string[];
    sampleCommand: string;
  };
}

export interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  flowSteps: string[];
  diagnosticTitle: string;
  diagnosticLog: string[];
  status: 'VERIFIED' | 'ONLINE' | 'ACTIVE';
}

export interface Certification {
  name: string;
  status: 'VERIFIED' | 'COMPLETED' | 'IN PROGRESS';
  issuer: string;
  date?: string;
}

export interface FieldNote {
  id: string;
  number: string;
  title: string;
  lesson: string;
  tags: string[];
}

export interface EngineeringPrinciple {
  number: string;
  title: string;
  description: string;
}
