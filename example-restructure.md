# Component Restructuring Examples

## 1. Layout Components

### src/components/layout/Navbar.tsx (from Header.tsx)
```typescript
import React from 'react'
import { useAuth } from '@/hooks/auth/useAuth'
import { Bell, Search } from 'lucide-react'

interface NavbarProps {
  title?: string
  showSearch?: boolean
  showNotifications?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ 
  title, 
  showSearch = true, 
  showNotifications = true 
}) => {
  const { user } = useAuth()
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {title || 'Dashboard'}
          </h1>
          {user?.role === 'supervisor' && (
            <p className="text-sm text-gray-600 mt-1">
              Welcome, {user.name}!
            </p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {showSearch && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {showNotifications && (
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          )}

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
```

## 2. Feature Components

### src/components/features/supervisors/StudentProgress.tsx
```typescript
import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useStudentProgress } from '@/hooks/feedback/useFeedback'
import { Student } from '@/types/student'

interface StudentProgressProps {
  students: Student[]
  onViewDetails: (studentId: string) => void
  onSubmitFeedback: (studentId: string) => void
}

export const StudentProgress: React.FC<StudentProgressProps> = ({
  students,
  onViewDetails,
  onSubmitFeedback
}) => {
  const { getProgressData } = useStudentProgress()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Student Progress</h2>
      
      <div className="grid gap-4">
        {students.map((student) => {
          const progress = getProgressData(student.id)
          
          return (
            <Card key={student.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.university}</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${progress?.percentage || 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {progress?.percentage || 0}% Complete
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewDetails(student.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => onSubmitFeedback(student.id)}
                  >
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
```

### src/components/features/supervisors/WeeklyFeedback.tsx
```typescript
import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { useFeedback } from '@/hooks/feedback/useFeedback'
import { WeeklyFeedback as WeeklyFeedbackType } from '@/types/feedback'

interface WeeklyFeedbackProps {
  studentId: string
  weekNumber: number
  onSubmit: (feedback: WeeklyFeedbackType) => void
  onCancel: () => void
}

export const WeeklyFeedback: React.FC<WeeklyFeedbackProps> = ({
  studentId,
  weekNumber,
  onSubmit,
  onCancel
}) => {
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState<number>(5)
  const { submitWeeklyFeedback, isLoading } = useFeedback()

  const handleSubmit = async () => {
    const feedbackData: WeeklyFeedbackType = {
      studentId,
      weekNumber,
      feedback,
      rating,
      submissionDate: new Date().toISOString()
    }

    try {
      await submitWeeklyFeedback(feedbackData)
      onSubmit(feedbackData)
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        Week {weekNumber} Feedback
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Performance Rating
          </label>
          <Select
            value={rating.toString()}
            onValueChange={(value) => setRating(parseInt(value))}
          >
            <option value="5">Excellent (5)</option>
            <option value="4">Good (4)</option>
            <option value="3">Average (3)</option>
            <option value="2">Below Average (2)</option>
            <option value="1">Poor (1)</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Detailed Feedback
          </label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Provide detailed feedback on the student's performance this week..."
            rows={6}
          />
        </div>

        <div className="flex space-x-4">
          <Button 
            onClick={handleSubmit}
            disabled={!feedback.trim() || isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

## 3. Page Components

### src/pages/dashboard/SupervisorDashboard.tsx
```typescript
import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { StatCard } from '@/components/features/dashboard/StatCard'
import { RecentActivity } from '@/components/features/dashboard/RecentActivity'
import { QuickActions } from '@/components/features/dashboard/QuickActions'
import { StudentProgress } from '@/components/features/supervisors/StudentProgress'
import { useAuth } from '@/hooks/auth/useAuth'
import { useSupervisorData } from '@/hooks/supervisors/useSupervisorData'

export const SupervisorDashboard: React.FC = () => {
  const { user } = useAuth()
  const { 
    stats, 
    students, 
    recentActivity, 
    isLoading 
  } = useSupervisorData()

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your students today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={stats?.totalStudents || 0}
            change="+12%"
            icon="Users"
          />
          <StatCard
            title="Pending Reviews"
            value={stats?.pendingReviews || 0}
            change="-5%"
            icon="ClipboardList"
          />
          <StatCard
            title="This Week's Reports"
            value={stats?.weeklyReports || 0}
            change="+8%"
            icon="FileText"
          />
          <StatCard
            title="Average Rating"
            value={stats?.averageRating || 0}
            change="+2%"
            icon="Star"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StudentProgress
              students={students || []}
              onViewDetails={(id) => console.log('View details:', id)}
              onSubmitFeedback={(id) => console.log('Submit feedback:', id)}
            />
          </div>
          
          <div className="space-y-6">
            <RecentActivity activities={recentActivity || []} />
            <QuickActions />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
```

## 4. API Services

### src/services/api/supervisors.ts
```typescript
import { apiClient } from './base'
import { SupervisorProfile, StudentProgress, WeeklyFeedback } from '@/types/supervisor'
import { Student } from '@/types/student'

export const supervisorAPI = {
  // Get all students assigned to supervisor
  getStudents: async (): Promise<Student[]> => {
    const response = await apiClient.get('/supervisors/students')
    return response.data
  },

  // Get progress for a specific student
  getStudentProgress: async (studentId: string): Promise<StudentProgress> => {
    const response = await apiClient.get(`/supervisors/students/${studentId}/progress`)
    return response.data
  },

  // Submit weekly feedback
  submitWeeklyFeedback: async (feedback: WeeklyFeedback): Promise<void> => {
    await apiClient.post('/supervisors/feedback/weekly', feedback)
  },

  // Get supervisor profile
  getProfile: async (): Promise<SupervisorProfile> => {
    const response = await apiClient.get('/supervisors/profile')
    return response.data
  },

  // Update supervisor profile
  updateProfile: async (profile: Partial<SupervisorProfile>): Promise<SupervisorProfile> => {
    const response = await apiClient.put('/supervisors/profile', profile)
    return response.data
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await apiClient.get('/supervisors/dashboard/stats')
    return response.data
  }
}
```

## 5. Custom Hooks

### src/hooks/feedback/useFeedback.ts
```typescript
import { useState, useCallback } from 'react'
import { supervisorAPI } from '@/services/api/supervisors'
import { WeeklyFeedback, Evaluation } from '@/types/feedback'

export const useFeedback = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitWeeklyFeedback = useCallback(async (feedback: WeeklyFeedback) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await supervisorAPI.submitWeeklyFeedback(feedback)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getStudentFeedback = useCallback(async (studentId: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      return await supervisorAPI.getStudentProgress(studentId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch feedback')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    submitWeeklyFeedback,
    getStudentFeedback,
    isLoading,
    error
  }
}
```