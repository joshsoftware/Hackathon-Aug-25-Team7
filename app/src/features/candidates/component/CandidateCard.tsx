import React, { useState } from 'react';
import { Search, ArrowLeft, Calendar, FileText, MapPin, Mail, Clock } from 'lucide-react';

// Types
export interface Candidate {
  id: number;
  name: string;
  email: string;
  location: string;
  experience: string;
  description: string;
  skills: string[];
  status: 'scheduled' | 'completed' | 'pending';
  initials: string;
}

// Header Component
export const CandidateHeader: React.FC = () => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">JS</span>
        </div>
        <div>
          <h1 className="font-semibold">Josh Softwares</h1>
          <p className="text-blue-200 text-sm">Interview Management System</p>
        </div>
      </div>
      <button className="text-white hover:text-blue-200 transition-colors">
        Sign Out
      </button>
    </div>
  );
};

// Search Component
interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search candidates by name or skills..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  status: Candidate['status'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: Candidate['status']) => {
    switch (status) {
      case 'scheduled':
        return { color: 'bg-blue-100 text-blue-800', label: 'Scheduled' };
      case 'completed':
        return { color: 'bg-green-100 text-green-800', label: 'Completed' };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

// Candidate Card Component
interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="font-semibold text-gray-600">{candidate.initials}</span>
          </div>

          {/* Candidate Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
              <StatusBadge status={candidate.status} />
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{candidate.location}</span>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
              <Clock className="w-4 h-4" />
              <span>{candidate.experience}</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-4">{candidate.description}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-4">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Schedule</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FileText className="w-4 h-4" />
            <span className="text-sm">Summary</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Page Header Component
export const PageHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Candidates – Job Position</h1>
        <p className="text-gray-600">Manage and review candidates for this position</p>
      </div>
    </div>
  );
};

// Loading Component
export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateHeader />
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading candidates...</p>
        </div>
      </div>
    </div>
  );
};

// Error Component
interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateHeader />
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
interface EmptyStateProps {
  hasSearchQuery: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasSearchQuery }) => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600">
        {hasSearchQuery ? 'No candidates found matching your search.' : 'No candidates found for this job.'}
      </p>
    </div>
  );
};