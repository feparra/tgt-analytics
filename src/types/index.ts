export interface SolutionItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  metrics: {
    label: string;
    value: string;
  };
  linkText: string;
}

export interface MetricData {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  unit: string;
  sparkline: number[];
}

export interface ArchitectureStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
}

export interface AgentLog {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  status: 'active' | 'synced' | 'queued';
  latency: string;
}
