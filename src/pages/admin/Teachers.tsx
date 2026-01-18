import { useState } from "react";
import { ArrowLeft, Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeachersProps {
  onNavigate: (page: string) => void;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  sessions: number;
}

const initialTeachers: Teacher[] = [
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
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", department: "" });

  const openAddDialog = () => {
    setEditingTeacher(null);
    setFormData({ name: "", email: "", department: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({ name: teacher.name, email: teacher.email, department: teacher.department });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingTeacher) {
      // Update existing teacher
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === editingTeacher.id
            ? { ...t, ...formData }
            : t
        )
      );
    } else {
      // Add new teacher
      const newTeacher: Teacher = {
        id: Date.now().toString(),
        ...formData,
        sessions: 0,
      };
      setTeachers((prev) => [...prev, newTeacher]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (teacherId: string) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate("admin-dashboard")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-lg px-2 py-1"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Dashboard
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-medium">
            Teachers
          </h1>
          <Button 
            className="rounded-xl gap-2 bg-secondary hover:bg-secondary/90"
            onClick={openAddDialog}
            aria-label="Add a new teacher"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add Teacher
          </Button>
        </div>

        {/* Teachers List */}
        <div className="bg-card rounded-3xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Name
                  </th>
                  <th scope="col" className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Email
                  </th>
                  <th scope="col" className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Department
                  </th>
                  <th scope="col" className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Sessions
                  </th>
                  <th scope="col" className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {teachers.map((teacher) => (
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-xl"
                            aria-label={`Actions for ${teacher.name}`}
                          >
                            <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem 
                            onClick={() => openEditDialog(teacher)}
                            className="gap-2 cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" aria-hidden="true" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(teacher.id)}
                            className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingTeacher ? "Edit Teacher" : "Add Teacher"}
              </DialogTitle>
              <DialogDescription>
                {editingTeacher 
                  ? "Update the teacher's information below."
                  : "Fill in the details to add a new teacher."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Prof. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane.doe@school.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="Computer Science"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="rounded-xl bg-secondary hover:bg-secondary/90"
              >
                {editingTeacher ? "Save Changes" : "Add Teacher"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
