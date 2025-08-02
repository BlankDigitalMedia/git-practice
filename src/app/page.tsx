"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitEmail = useMutation(api.emails.submitEmail);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const result = await submitEmail({ 
        email, 
        source: "landing-page" 
      });
      
      if (result.success) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to submit email. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError("");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center max-w-md w-full">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight font-heading">Blank Survey</h1>
          <p className="text-xl text-muted-foreground font-body">
            Help us improve by sharing your email for our upcoming survey
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Part of the Convex Resend Component hackathon
          </p>
        </div>

        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="font-heading">
              {isSubmitted ? "Thank you!" : "Join Our Survey"}
            </CardTitle>
            <CardDescription className="font-body">
              {isSubmitted 
                ? "We appreciate your participation! We&apos;ll be in touch soon." 
                : "Enter your email address to participate in our survey"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <HeartHandshake className="w-16 h-16 mx-auto mb-4 text-green-600 dark:text-green-400" />
                  <p className="text-lg font-medium text-green-600 dark:text-green-400 font-heading">
                    Thank you for your help!
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 font-body">
                    Your email has been recorded and we&apos;ll send you the survey soon.
                  </p>
                </div>
                <Button 
                  onClick={handleReset} 
                  variant="outline" 
                  className="w-full"
                >
                  Submit Another Email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                  {error && (
                    <p className="text-sm text-red-600 dark:text-red-400 font-body">
                      {error}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || !email}
                >
                  {isLoading ? "Submitting..." : "Submit Email"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
