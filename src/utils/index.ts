import moment from "moment";
import "moment/locale/pt-br";

export const dateUppercase = (data: Date) => {
  const dateString = moment(data).format("LLLL");
  return dateString[0].toUpperCase() + dateString.substring(1);
};
