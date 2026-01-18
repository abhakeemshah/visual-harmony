import { ArrowLeft, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeachersProps {
  onNavigate: (page: string) => void;
}

const mockTeachers = [
  {
    id: "1",
    name: "Prof. John Smith",
    email: "john.smith@school.edu",
    department: "Computer Science",
    sessions: 24,
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    department: "Mathematics",
    sessions: 18,
  },
  {
    id: "3",
    name: "Prof. Michael Brown",
    email: "michael.brown@school.edu",
    department: "Physics",
    sessions: 32,
  },
];

export function Teachers({ onNavigate }: TeachersProps) {
  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate("admin-dashboard")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-medium">
            Teachers
          </h1>
          <Button className="rounded-xl gap-2 bg-secondary hover:bg-secondary/90">
            <Plus className="w-4 h-4" />
            Add Teacher
          </Button>
        </div>

        {/* Teachers List */}
        <div className="bg-card rounded-3xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Department
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Sessions
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium">{teacher.name}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {teacher.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm">
                        {teacher.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">{teacher.sessions}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="rounded-xl">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
