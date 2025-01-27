import { getUrlAnalytics } from "@/api/urlApi"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"; 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function calculatemonthlydata(shortId : string | undefined) {
  

  try {
    const response = await getUrlAnalytics(shortId);
    const analytics = response.data;
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();
    const directVisits = analytics.directvisits.visitHistory.filter((visit) => {
      const visitDate = dayjs(visit.timestamp);
      return (
        visitDate.month() === currentMonth && visitDate.year() === currentYear
      );
    }).length;
    const qrVisits = analytics.qrvisits.visitHistory.filter((visit) => {
      const visitDate = dayjs(visit.timestamp);
      return (
        visitDate.month() === currentMonth && visitDate.year() === currentYear
      );
    }).length;
    const totalVisits = directVisits + qrVisits;

    console.log({
      directVisits,
      qrVisits,
      totalVisits,
    });

    return {
      directVisits,
      qrVisits,
      totalVisits,
    };
  } catch (error) {
    console.error("Error fetching URL analytics:", error);
    throw new Error("Failed to calculate monthly data");
  }
}
