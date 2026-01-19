import { useState } from "react";
import { Plus, MoreHorizontal, Eye, KeyRound, UserX, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminLayout } from "@/components/AdminLayout";
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
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TeachersProps {
  onNavigate: (page: string) => void;
}

interface Teacher {
  id: string;
  name: string;
  teacherId: string;
  email: string;
  sessions: number;
}

const initialTeachers: Teacher[] = [
  { id: "1", name: "Prof. John Smith", teacherId: "T001", email: "john.smith@school.edu", sessions: 24 },
  { id: "2", name: "Dr. Sarah Johnson", teacherId: "T002", email: "sarah.johnson@school.edu", sessions: 18 },
  { id: "3", name: "Prof. Michael Brown", teacherId: "T003", email: "michael.brown@school.edu", sessions: 32 },
];

export function Teachers({ onNavigate }: TeachersProps) {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.teacherId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTeacher = () => {
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      name: formData.name,
      teacherId: `T${String(teachers.length + 1).padStart(3, "0")}`,
      email: formData.email,
      sessions: 0,
    };
    setTeachers([...teachers, newTeacher]);
    setIsAddDialogOpen(false);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <AdminLayout currentPage="admin-teachers" onNavigate={onNavigate}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-serif text-3xl font-medium">Teachers</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="rounded-xl gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          <Plus className="w-4 h-4" /> Add Teacher
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search teachers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Teacher ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell className="font-mono text-muted-foreground">{teacher.teacherId}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.sessions}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-xl">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem className="gap-2 cursor-pointer"><Eye className="w-4 h-4" /> View Sessions</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer"><KeyRound className="w-4 h-4" /> Reset Password</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer text-destructive"><UserX className="w-4 h-4" /> Disable Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif">Add Teacher</DialogTitle>
            <DialogDescription>Fill in the details to add a new teacher.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="rounded-xl" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleAddTeacher} className="rounded-xl bg-secondary hover:bg-secondary/90">Add Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
