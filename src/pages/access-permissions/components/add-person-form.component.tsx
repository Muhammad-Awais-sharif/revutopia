import { useState } from 'react';
import { Button } from '../../../components/ui/button/button.component';

interface AddPersonFormProps {
  onSubmit: (email: string, role: 'owner' | 'manager') => void;
}

export function AddPersonForm({ onSubmit }: AddPersonFormProps) {
  const [newEmail, setNewEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'owner' | 'manager'>(
    'owner'
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#333]">Add Person</h2>

      <div className="mt-4">
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
        />
      </div>

      <p className="text-sm text-[#7C8BA0] mt-4">
        Select the role you'd like to grant this person to manage this Business
        Profile on Search and Maps. you can change it at any time.
      </p>

      <div className="space-y-4 mt-6">
        <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
          <input
            type="radio"
            name="role"
            value="owner"
            checked={selectedRole === 'owner'}
            onChange={() => setSelectedRole('owner')}
            className="mt-1"
          />
          <div>
            <h3 className="font-medium">Owner</h3>
            <p className="text-sm text-[#7C8BA0]">
              Can edit, add people and transfer ownership of this Business
              Profile on search and Maps.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
          <input
            type="radio"
            name="role"
            value="manager"
            checked={selectedRole === 'manager'}
            onChange={() => setSelectedRole('manager')}
            className="mt-1"
          />
          <div>
            <h3 className="font-medium">Manager</h3>
            <p className="text-sm text-[#7C8BA0]">
              Can make changes to the Business Profile on Google Search and Maps
            </p>
          </div>
        </label>
      </div>

      <Button
        onClick={() => onSubmit(newEmail, selectedRole)}
        className="w-full bg-[#2A9D8F] text-white hover:bg-[#238276] mt-6"
      >
        Continue
      </Button>
    </div>
  );
}
