import { Button } from "@/shared/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function InterviewSubmitPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-muted/20 p-4 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-600" />
      <h1 className="mt-4 text-3xl font-bold">Thank You!</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Thank you for interviewing with us. We will review your performance and get back to you shortly.
      </p>
      <Button className="mt-6 cursor-pointer" onClick={() => (window.location.href = "/")}>
        Back to Home
      </Button>
    </div>
  )
}
