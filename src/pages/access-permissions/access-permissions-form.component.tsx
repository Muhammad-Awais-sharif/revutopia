import { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { AccessPermissionsInputs } from '../access-permissions/access-permissions-form.schema';
import { UserDetails } from './components/user-details.component';
import { AddPersonForm } from './components/add-person-form.component';
import { User, UserList } from './components/users-list.component';
import { Button } from '../../components/ui/button/button.component';

interface AccessPermissionsFormProps {
  onSubmit: (data: AccessPermissionsInputs) => void;
  defaultValues?: AccessPermissionsInputs;
}

export function AccessPermissionsForm({
  onSubmit,
  defaultValues,
}: AccessPermissionsFormProps) {
  const [view, setView] = useState<'main' | 'people' | 'addPerson' | 'about'>(
    'main'
  );
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
  const [people, setPeople] = useState<User[]>(defaultValues?.users || []);

  const handleAddPerson = (email: string, role: 'owner' | 'manager') => {
    const newPerson = {
      id: String(people?.length + 1),
      name: email.split('@')[0],
      email,
      role: role === 'owner' ? ('Owner' as const) : ('Manager' as const),
      avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg`,
      status: 'pending' as 'pending',
    };
    setPeople([...people, newPerson]);
    setView('people');
  };

  const handleRemovePerson = (userId: string) => {
    setPeople(people.filter((p) => p.id !== userId));
    setView('people');
  };

  const handleSubmit = () => {
    onSubmit({
      users: people,
      settings: { advancedEnabled: false },
    });
  };

  if (view === 'about' && selectedPerson) {
    return (
      <UserDetails
        user={selectedPerson}
        onRemove={handleRemovePerson}
        onContinue={() => setView('people')}
      />
    );
  }

  if (view === 'addPerson') {
    return <AddPersonForm onSubmit={handleAddPerson} />;
  }

  if (view === 'people') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#333]">
          People and access
        </h2>
        <p className="text-sm text-[#7C8BA0]">
          Add, edit or remove people's access to this Business Profile
        </p>

        <UserList
          users={people}
          onUserClick={(user) => {
            setSelectedPerson(user);
            setView('about');
          }}
        />

        <button
          onClick={() => setView('addPerson')}
          className="flex items-center gap-2 text-[#2A9D8F] mt-6"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>

        <Button
          onClick={handleSubmit}
          className="w-full bg-[#2A9D8F] text-white hover:bg-[#238276] mt-6"
        >
          Submit
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#333]">
        Access and Permissions
      </h2>

      <div className="space-y-4">
        <div
          onClick={() => setView('people')}
          className="bg-[#F7F5FA] p-4 rounded-lg cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">People and access</h3>
              <p className="text-sm text-[#7C8BA0]">
                Add, edit or remove people's access
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#7C8BA0]" />
          </div>
        </div>

        <div className="p-4 rounded-lg border border-[#E4E3E3]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Advanced settings</h3>
              <p className="text-sm text-[#7C8BA0]">
                See profile ID and manage labels, shop codes and other settings
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#7C8BA0]" />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="text-[#2A9D8F] text-sm">Skip</button>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-[#2A9D8F] text-white hover:bg-[#238276] mt-6"
      >
        Continue
      </Button>
    </div>
  );
}
