"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AdminPage() {
  const submissions = useQuery(api.emails.getAllSubmissions);
  const count = useQuery(api.emails.getSubmissionCount);

  if (submissions === undefined || count === undefined) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Email Submissions Admin</h1>
      
      <div className="mb-6">
        <p className="text-lg">Total submissions: <strong>{count}</strong></p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Submissions:</h2>
        {submissions.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet.</p>
        ) : (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <div key={submission._id} className="border p-4 rounded-lg">
                <p><strong>Email:</strong> {submission.email}</p>
                <p><strong>Source:</strong> {submission.source}</p>
                <p><strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
                <p><strong>ID:</strong> {submission._id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
