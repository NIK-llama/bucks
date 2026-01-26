import { updateProfile } from "@/app/actions/user";

export default function EditProfilePage() {
  return (
    <form action={updateProfile}>
      <input name="firstName" placeholder="First Name" required />
      <input name="lastName" placeholder="Last Name" required />
      <button type="submit">Update Profile</button>
    </form>
  );
}