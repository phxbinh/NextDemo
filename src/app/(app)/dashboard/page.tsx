
import { supabaseServerComponent } from '../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import { LogoutButton } from '../../../components/signout';

export default async function DashboardPage() {
  const supabase = await supabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (<>
    <h1>Welcome {user.email}</h1>
    < LogoutButton />
    </>);
}


