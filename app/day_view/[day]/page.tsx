import { cookies } from "next/headers";
import getAppointments from "@/lib/getAppointments";
import { UserData } from "@/app/api/appointments/route";
import AppointmentContainer from "@/components/AppointmentContainer/AppointmentContainer";
import { Day } from "@/lib/getOrderedDays";

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

  const dayAppointments = userData.appointments.filter(appointment => appointment.dateTime.slice(0, 10) === day);

  return (
    <div>
      <h1>Day View: {day}</h1>
      <AppointmentContainer appointments={dayAppointments} date={day}/>
    </div>
  );
}