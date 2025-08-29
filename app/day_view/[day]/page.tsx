import { cookies } from "next/headers";
import getAppointments from "@/lib/getAppointments";
import deleteAppointment from "@/lib/deleteAppointment";
import { UserData } from "@/app/api/appointments/route";
import Appointment, { AppointmentProps } from "@/components/Appointment/Appointment";

export default async function DayView({ params }: { params: { day: string } }) {
  const cookieStore = await cookies();
  const user = cookieStore.get('userId')?.value;

  let userData: UserData = {
    appointments: [],
    contacts: []
  }

  if (user) {
    userData = await getAppointments(user);
  }

  const { day } = await params;

  const placeholderFunction = () => {};

  return (
    <div>
      <h1>Day View: {day}</h1>
    </div>
  );
}