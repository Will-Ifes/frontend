import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    cpf: string;
    company: string;
    birthDate: string;
    dailyExposureHours: number;
  };
}

export default function ViewUserModal({
  isOpen,
  onClose,
  user,
}: ViewUserModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>CPF:</strong> {user.cpf}
          </div>
          <div>
            <strong>Company:</strong> {user.company}
          </div>
          <div>
            <strong>Birth Date:</strong> {user.birthDate}
          </div>
          <div>
            <strong>Daily Exposure Hours:</strong> {user.dailyExposureHours}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
