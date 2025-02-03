'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { Trash2, Plus, Copy, Send, CalendarIcon } from 'lucide-react'
import { toast } from 'sonner'

export function DailyUpdateForm() {
  const [updates, setUpdates] = useState<string[]>([''])
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [isGenerating, setIsGenerating] = useState(false)

  const handleUpdateChange = (index: number, value: string) => {
    const newUpdates = [...updates]
    newUpdates[index] = value
    setUpdates(newUpdates)
  }

  const addUpdate = () => {
    setUpdates([...updates, ''])
  }

  const removeUpdate = (index: number) => {
    const newUpdates = updates.filter((_, i) => i !== index)
    setUpdates(newUpdates)
  }

  const generateEmail = async () => {
    if (updates.every(u => !u.trim())) {
      toast.error('Please add at least one update')
      return
    }

    setIsGenerating(true)
    const prompt = `
    Here are the inputs for today's email:
    
    Date:
    <date> ${format(new Date(date), 'dd MM yyyy')}</date>
    
    Updates:
    <updates>${updates.filter(u => u.trim()).join('\n')}</updates>

    Please generate an email with the above inputs.`
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      if (!data.email) {
        throw new Error('No email content received')
      }
      
      setGeneratedEmail(data.email)
      toast.success('Email generated successfully')
    } catch (error) {
      console.error('Error generating email:', error)
      toast.error('Failed to generate email. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail)
      toast.success('Copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CalendarIcon className="h-6 w-6" />
            Daily Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-xs">
            <Label htmlFor="date" className="text-sm font-medium">
              Date
            </Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1.5"
            />
          </div>
          
          <div className="space-y-4">
            {updates.map((update, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-6">
                  <div className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground">
                    Update {index + 1}
                  </div>
                  <div className="flex gap-3 items-start">
                    <Textarea
                      id={`update-${index}`}
                      value={update}
                      onChange={(e) => handleUpdateChange(index, e.target.value)}
                      placeholder="What did you work on today?"
                      className="min-h-[100px] resize-y"
                    />
                    {updates.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeUpdate(index)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 border-t pt-6">
          <Button onClick={addUpdate} variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Update
          </Button>
          
          <Button 
            onClick={generateEmail} 
            className="flex-1 flex items-center gap-2"
            disabled={isGenerating}
          >
            <Send className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate Email'}
          </Button>
        </CardFooter>
      </Card>

      {generatedEmail && (
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl">Generated Email</CardTitle>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy to Clipboard
            </Button>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-6 whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {generatedEmail}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 