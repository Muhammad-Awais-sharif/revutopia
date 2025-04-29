import { ChevronRight } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager';
  avatar?: string;
  status?: 'active' | 'pending';
}

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
}

export function UserList({ users, onUserClick }: UserListProps) {
  const activeUsers = users.filter((user) => user.status !== 'pending');
  const pendingUsers = users.filter((user) => user.status === 'pending');

  return (
    <div className="space-y-6">
      {activeUsers.map((user) => (
        <div
          key={user.id}
          onClick={() => onUserClick(user)}
          className="flex items-center gap-4 cursor-pointer"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-[#7C8BA0]">
              {user.email} {user.role === 'Owner' && '(Owner)'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#7C8BA0] ml-auto" />
        </div>
      ))}

      {pendingUsers.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Pending</h3>
          {pendingUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => onUserClick(user)}
              className="flex items-center gap-4 cursor-pointer mt-2"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm text-[#7C8BA0]">{user.email}</p>
                <p className="text-sm text-[#7C8BA0]">{user.role}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7C8BA0] ml-auto" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
