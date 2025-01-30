import { DailyUpdateForm } from '@/components/DailyUpdateForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <DailyUpdateForm />
      </div>
    </div>
  )
} 