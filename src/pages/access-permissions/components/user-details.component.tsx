import { ChevronRight } from 'lucide-react';
import { Button } from '../../../components/ui/button/button.component';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager';
  avatar?: string;
}

interface UserDetailsProps {
  user: User;
  onRemove: (userId: string) => void;
  onContinue: () => void;
}

export function UserDetails({ user, onRemove, onContinue }: UserDetailsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#333]">About</h2>
      <p className="text-sm text-[#7C8BA0]">
        Add, edit or remove people's access to this Business Profile
      </p>

      <div className="flex items-center gap-4 mt-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-[#7C8BA0]">{user.email}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-[#7C8BA0] ml-auto" />
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium mb-1">Access</h4>
        <p className="text-sm text-[#7C8BA0]">{user.role}</p>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium mb-1">
          Remove from this Business Profile
        </h4>
        <p className="text-sm text-[#7C8BA0]">
          This person will no longer be able to access or manage it.
        </p>
        <button
          onClick={() => onRemove(user.id)}
          className="text-[#2A9D8F] text-sm mt-2"
        >
          Remove Person
        </button>
      </div>

      <Button
        onClick={onContinue}
        className="w-full bg-[#2A9D8F] text-white hover:bg-[#238276] mt-6"
      >
        Continue
      </Button>
    </div>
  );
}
